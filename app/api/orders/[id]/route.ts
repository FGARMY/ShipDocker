import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: params.id, storeId: STORE_ID },
      include: {
        items: {
          include: {
            variant: {
              include: { product: { select: { title: true, slug: true, images: true } } },
            },
          },
        },
        fulfillments: true,
        supplierOrders: {
          select: { status: true, trackingNumber: true, carrier: true, shippedAt: true, deliveredAt: true },
        },
      },
    });

    if (!order) throw new AppError(404, "Order not found", "NOT_FOUND");

    return successResponse(order);
  } catch (error) {
    return errorResponse(error);
  }
}
