import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
import { errorResponse, successResponse } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";
    if (query.length < 2) {
      return successResponse({ products: [], total: 0 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: STORE_ID,
        status: "ACTIVE",
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { tags: { hasSome: [query.toLowerCase()] } },
        ],
      },
      include: {
        variants: { take: 1, orderBy: { position: "asc" } },
      },
      take: 12,
    });

    const formatted = products.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      image: (p.images as string[])?.[0] || "",
      price: p.variants[0]?.sellPrice || 0,
      comparePrice: p.variants[0]?.comparePrice,
    }));

    return successResponse({ products: formatted, total: products.length });
  } catch (error) {
    return errorResponse(error);
  }
}
