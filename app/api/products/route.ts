import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
import { errorResponse, successResponse, paginatedResponse } from "@/lib/utils/errors";
import { STORE_ID, PAGINATION } from "@/lib/utils/constants";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).default("newest"),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).default("ACTIVE"),
});

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const { page, limit, category, minPrice, maxPrice, sort, status } = querySchema.parse(params);

    const where: Record<string, unknown> = {
      storeId: STORE_ID,
      status,
    };

    if (category) {
      where.tags = { has: category };
    }

    if (minPrice || maxPrice) {
      where.variants = {
        some: {
          sellPrice: {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {}),
          },
        },
      };
    }

    const orderBy: Record<string, string> = {};
    switch (sort) {
      case "price_asc":
        orderBy.createdAt = "asc";
        break;
      case "price_desc":
        orderBy.createdAt = "desc";
        break;
      case "newest":
        orderBy.createdAt = "desc";
        break;
      default:
        orderBy.createdAt = "desc";
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: where as any,
        include: {
          variants: {
            orderBy: { position: "asc" },
            take: 5,
          },
          _count: { select: { reviews: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where: where as any }),
    ]);

    const formatted = products.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      images: p.images,
      tags: p.tags,
      status: p.status,
      price: p.variants[0]?.sellPrice || 0,
      comparePrice: p.variants[0]?.comparePrice,
      stock: p.variants.reduce((sum, v) => sum + v.stock, 0),
      variantCount: p.variants.length,
      reviewCount: p._count.reviews,
      createdAt: p.createdAt,
    }));

    return paginatedResponse(formatted, total, page, limit);
  } catch (error) {
    return errorResponse(error);
  }
}
