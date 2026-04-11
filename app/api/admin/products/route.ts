import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
import { errorResponse, successResponse, paginatedResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { extractToken, verifyAccessToken } from "@/lib/security/jwt";
import { z } from "zod";
import { slugify } from "@/lib/utils/format";

function requireAdmin(req: NextRequest) {
  const token = extractToken(req.headers.get("authorization"));
  const payload = verifyAccessToken(token);
  if (payload.role !== "admin") throw new AppError(403, "Admin access required", "FORBIDDEN");
  return payload;
}

const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  variants: z.array(z.object({
    title: z.string().default("Default"),
    sku: z.string(),
    costPrice: z.number().min(0),
    sellPrice: z.number().min(0),
    comparePrice: z.number().optional(),
    stock: z.number().min(0).default(0),
    weight: z.number().optional(),
    options: z.record(z.string()).default({}),
    images: z.array(z.string()).default([]),
    supplierId: z.string().optional(),
    supplierSku: z.string().optional(),
  })).min(1),
});

// GET /api/admin/products — List all products (admin)
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const page = parseInt(params.page || "1");
    const limit = parseInt(params.limit || "20");
    const status = params.status as string | undefined;
    const search = params.search;

    const where: Record<string, unknown> = { storeId: STORE_ID };
    if (status) where.status = status;
    if (search) where.title = { contains: search, mode: "insensitive" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: where as any,
        include: {
          variants: { orderBy: { position: "asc" } },
          _count: { select: { reviews: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where: where as any }),
    ]);

    return paginatedResponse(products, total, page, limit);
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/admin/products — Create product
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const body = await req.json();
    const data = productSchema.parse(body);
    const slug = slugify(data.title);

    // Check slug uniqueness
    const existing = await prisma.product.findFirst({
      where: { storeId: STORE_ID, slug },
    });
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

    const product = await prisma.product.create({
      data: {
        storeId: STORE_ID,
        title: data.title,
        slug: finalSlug,
        description: data.description,
        status: data.status,
        images: data.images,
        tags: data.tags,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        variants: {
          create: data.variants.map((v, i) => ({
            ...v,
            position: i,
          })),
        },
      },
      include: { variants: true },
    });

    return successResponse(product, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
