import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const collection = await prisma.collection.findFirst({
      where: { storeId: STORE_ID, slug: params.slug },
      include: {
        products: {
          include: {
            product: {
              include: {
                variants: { take: 1, orderBy: { position: "asc" } },
                _count: { select: { reviews: true } },
              },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!collection) throw new AppError(404, "Collection not found", "NOT_FOUND");

    return successResponse({
      ...collection,
      products: collection.products
        .filter((cp) => cp.product.status === "ACTIVE")
        .map((cp) => ({
          id: cp.product.id,
          title: cp.product.title,
          slug: cp.product.slug,
          images: cp.product.images,
          price: cp.product.variants[0]?.sellPrice || 0,
          comparePrice: cp.product.variants[0]?.comparePrice,
          reviewCount: cp.product._count.reviews,
        })),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
