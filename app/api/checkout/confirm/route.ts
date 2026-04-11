import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { z } from "zod";
import crypto from "crypto";

const confirmSchema = z.object({
  orderId: z.string(),
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

// POST /api/checkout/confirm — Verify Razorpay payment and confirm order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = confirmSchema.parse(body);

    // 1. Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated !== razorpay_signature) {
      throw new AppError(400, "Payment verification failed", "PAYMENT_INVALID");
    }

    // 2. Update order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        paymentId: razorpay_payment_id,
      },
      include: {
        items: {
          include: {
            variant: {
              include: { supplier: true },
            },
          },
        },
      },
    });

    // 3. Decrement stock for each variant
    for (const item of order.items) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 4. Create supplier orders (group items by supplier)
    const supplierGroups = new Map<string, typeof order.items>();
    for (const item of order.items) {
      const supplierId = item.variant.supplierId || "unknown";
      if (!supplierGroups.has(supplierId)) supplierGroups.set(supplierId, []);
      supplierGroups.get(supplierId)!.push(item);
    }

    for (const [supplierId, items] of supplierGroups) {
      if (supplierId === "unknown") continue;
      await prisma.supplierOrder.create({
        data: {
          orderId: order.id,
          supplierId,
          status: "PENDING",
          cost: items.reduce((sum, i) => sum + i.costPrice * i.quantity, 0),
        },
      });
    }

    // 5. Update coupon usage
    if (order.couponCode) {
      await prisma.coupon.updateMany({
        where: { storeId: order.storeId, code: order.couponCode },
        data: { usedCount: { increment: 1 } },
      });
    }

    return successResponse({
      orderId: order.id,
      status: "CONFIRMED",
      total: order.total,
      message: "Payment confirmed successfully!",
    });
  } catch (error) {
    return errorResponse(error);
  }
}
