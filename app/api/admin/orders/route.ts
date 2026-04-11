import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
import { errorResponse, successResponse, paginatedResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { extractToken, verifyAccessToken } from "@/lib/security/jwt";

function requireAdmin(req: NextRequest) {
  const token = extractToken(req.headers.get("authorization"));
  const payload = verifyAccessToken(token);
  if (payload.role !== "admin") throw new AppError(403, "Admin access required", "FORBIDDEN");
  return payload;
}

// GET /api/admin/orders
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const page = parseInt(params.page || "1");
    const limit = parseInt(params.limit || "20");
    const status = params.status;
    const paymentStatus = params.paymentStatus;

    const where: Record<string, unknown> = { storeId: STORE_ID };
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: where as any,
        include: {
          items: { include: { variant: { include: { product: { select: { title: true } } } } } },
          supplierOrders: { select: { status: true, supplierId: true, trackingNumber: true } },
          _count: { select: { items: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: where as any }),
    ]);

    return paginatedResponse(orders, total, page, limit);
  } catch (error) {
    return errorResponse(error);
  }
}
