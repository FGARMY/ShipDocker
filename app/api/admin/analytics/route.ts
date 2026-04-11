import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { extractToken, verifyAccessToken } from "@/lib/security/jwt";

function requireAdmin(req: NextRequest) {
  const token = extractToken(req.headers.get("authorization"));
  const payload = verifyAccessToken(token);
  if (payload.role !== "admin") throw new AppError(403, "Admin access required", "FORBIDDEN");
  return payload;
}

// GET /api/admin/analytics
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const days = parseInt(params.days || "30");
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [
      totalRevenue,
      totalOrders,
      paidOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      prisma.order.aggregate({
        where: { storeId: STORE_ID, paymentStatus: "PAID", createdAt: { gte: since } },
        _sum: { total: true, discount: true },
        _count: true,
      }),
      prisma.order.count({ where: { storeId: STORE_ID, createdAt: { gte: since } } }),
      prisma.order.findMany({
        where: { storeId: STORE_ID, paymentStatus: "PAID", createdAt: { gte: since } },
        select: { total: true, items: { select: { costPrice: true, quantity: true } } },
      }),
      prisma.product.count({ where: { storeId: STORE_ID, status: "ACTIVE" } }),
      prisma.customer.count({ where: { storeId: STORE_ID } }),
      prisma.order.findMany({
        where: { storeId: STORE_ID },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true, customerName: true, total: true, status: true,
          paymentStatus: true, createdAt: true, _count: { select: { items: true } },
        },
      }),
      prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { storeId: STORE_ID, paymentStatus: "PAID", createdAt: { gte: since } } },
        _sum: { quantity: true, total: true },
        orderBy: { _sum: { total: "desc" } },
        take: 5,
      }),
    ]);

    const totalCOGS = paidOrders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.costPrice * i.quantity, 0), 0
    );
    const revenue = totalRevenue._sum.total || 0;
    const margin = revenue > 0 ? ((revenue - totalCOGS) / revenue) * 100 : 0;

    // Get top product details
    const topProductDetails = await Promise.all(
      topProducts.map(async (tp) => {
        const variant = await prisma.productVariant.findUnique({
          where: { id: tp.variantId },
          include: { product: { select: { title: true, images: true } } },
        });
        return {
          title: variant?.product.title || "Unknown",
          image: (variant?.product.images as string[])?.[0],
          revenue: tp._sum.total || 0,
          unitsSold: tp._sum.quantity || 0,
        };
      })
    );

    return successResponse({
      revenue,
      totalOrders,
      paidOrderCount: totalRevenue._count,
      totalCOGS: Math.round(totalCOGS * 100) / 100,
      grossMargin: Math.round(margin * 10) / 10,
      totalDiscount: totalRevenue._sum.discount || 0,
      totalProducts,
      totalCustomers,
      averageOrderValue: totalRevenue._count > 0 ? Math.round((revenue / totalRevenue._count) * 100) / 100 : 0,
      recentOrders,
      topProducts: topProductDetails,
      period: `${days}d`,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
