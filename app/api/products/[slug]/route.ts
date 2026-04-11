import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: { storeId: STORE_ID, slug: params.slug, status: "ACTIVE" },
      include: {
        variants: {
          include: { supplier: { select: { name: true, type: true } } },
          orderBy: { position: "asc" },
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        collections: {
          include: { collection: { select: { id: true, title: true, slug: true } } },
        },
      },
    });

    if (!product) throw new AppError(404, "Product not found", "NOT_FOUND");

    const avgRating = product.reviews.length
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

    // Get related products from same collections
    const collectionIds = product.collections.map((c) => c.collectionId);
    const related = collectionIds.length
      ? await prisma.product.findMany({
          where: {
            storeId: STORE_ID,
            status: "ACTIVE",
            id: { not: product.id },
            collections: { some: { collectionId: { in: collectionIds } } },
          },
          include: { variants: { take: 1, orderBy: { position: "asc" } } },
          take: 4,
        })
      : [];

    return successResponse({
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length,
      related: related.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        images: r.images,
        price: r.variants[0]?.sellPrice || 0,
        comparePrice: r.variants[0]?.comparePrice,
      })),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
