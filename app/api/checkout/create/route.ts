import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().min(1),
  })),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  shippingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string().default("IN"),
    zip: z.string(),
    phone: z.string(),
  }),
  couponCode: z.string().optional(),
});

// POST /api/checkout/create - Create order and Razorpay order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = checkoutSchema.parse(body);

    // 1. Validate all items and calculate totals
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: data.items.map((i) => i.variantId) } },
      include: { product: { select: { title: true, images: true } } },
    });

    if (variants.length !== data.items.length) {
      throw new AppError(400, "Some items are no longer available", "INVALID_ITEMS");
    }

    let subtotal = 0;
    const orderItems: Array<{
      variantId: string;
      quantity: number;
      unitPrice: number;
      costPrice: number;
      total: number;
    }> = [];

    for (const item of data.items) {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) throw new AppError(400, "Variant not found", "INVALID_VARIANT");
      if (variant.stock < item.quantity) {
        throw new AppError(400, `${variant.title} is out of stock (only ${variant.stock} remaining)`, "OUT_OF_STOCK");
      }

      const lineTotal = variant.sellPrice * item.quantity;
      subtotal += lineTotal;
      orderItems.push({
        variantId: variant.id,
        quantity: item.quantity,
        unitPrice: variant.sellPrice,
        costPrice: variant.costPrice,
        total: lineTotal,
      });
    }

    // 2. Apply coupon if present
    let discount = 0;
    if (data.couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          storeId: STORE_ID,
          code: data.couponCode.toUpperCase(),
          isActive: true,
        },
      });

      if (coupon) {
        if (coupon.expiresAt && coupon.expiresAt < new Date()) {
          throw new AppError(400, "Coupon has expired", "COUPON_EXPIRED");
        }
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          throw new AppError(400, "Coupon usage limit reached", "COUPON_LIMIT");
        }
        if (coupon.minOrder && subtotal < coupon.minOrder) {
          throw new AppError(400, `Minimum order ₹${coupon.minOrder} required`, "COUPON_MIN_ORDER");
        }

        switch (coupon.type) {
          case "PERCENTAGE":
            discount = subtotal * (coupon.value / 100);
            break;
          case "FIXED":
            discount = coupon.value;
            break;
          case "FREE_SHIPPING":
            discount = 0; // Applied to shipping
            break;
        }
      }
    }

    const shippingCost = subtotal > 999 ? 0 : 79;
    const tax = Math.round((subtotal - discount) * 0.18 * 100) / 100; // 18% GST
    const total = Math.round((subtotal - discount + shippingCost + tax) * 100) / 100;

    // 3. Create Razorpay order
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: { storeId: STORE_ID },
    });

    // 4. Create order in DB
    const order = await prisma.order.create({
      data: {
        storeId: STORE_ID,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        shippingAddress: JSON.stringify(data.shippingAddress),
        status: "PENDING",
        paymentStatus: "UNPAID",
        paymentMethod: "razorpay",
        paymentId: razorpayOrder.id,
        subtotal,
        shippingCost,
        discount,
        tax,
        total,
        couponCode: data.couponCode?.toUpperCase(),
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    return successResponse({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
