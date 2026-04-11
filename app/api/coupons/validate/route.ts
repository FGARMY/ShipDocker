import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { z } from "zod";

const couponSchema = z.object({
  code: z.string().min(1),
  subtotal: z.number().min(0),
});

// POST /api/coupons/validate
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, subtotal } = couponSchema.parse(body);

    const coupon = await prisma.coupon.findFirst({
      where: { storeId: STORE_ID, code: code.toUpperCase(), isActive: true },
    });

    if (!coupon) throw new AppError(404, "Invalid coupon code", "COUPON_INVALID");
    if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new AppError(400, "Coupon has expired", "COUPON_EXPIRED");
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) throw new AppError(400, "Coupon usage limit reached", "COUPON_LIMIT");
    if (coupon.minOrder && subtotal < coupon.minOrder) throw new AppError(400, `Minimum order ₹${coupon.minOrder} required`, "COUPON_MIN_ORDER");

    let discount = 0;
    switch (coupon.type) {
      case "PERCENTAGE":
        discount = subtotal * (coupon.value / 100);
        break;
      case "FIXED":
        discount = Math.min(coupon.value, subtotal);
        break;
      case "FREE_SHIPPING":
        discount = 0;
        break;
    }

    return successResponse({
      valid: true,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount: Math.round(discount * 100) / 100,
      message: coupon.type === "FREE_SHIPPING"
        ? "Free shipping applied!"
        : `₹${Math.round(discount)} discount applied!`,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
