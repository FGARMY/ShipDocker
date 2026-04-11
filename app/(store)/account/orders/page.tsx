"use client";

import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Package, ArrowLeft, Eye } from "lucide-react";

const DEMO_ORDERS = [
  { id: "SD-M1X2Y3-A4B5", status: "SHIPPED", total: 2098, items: 1, date: "2024-12-20" },
  { id: "SD-N3P4Q5-C6D7", status: "DELIVERED", total: 1299, items: 2, date: "2024-12-15" },
  { id: "SD-R5S6T7-E8F9", status: "PROCESSING", total: 599, items: 1, date: "2024-12-22" },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600",
  CONFIRMED: "bg-blue-500/10 text-blue-600",
  PROCESSING: "bg-blue-500/10 text-blue-600",
  SHIPPED: "bg-indigo-500/10 text-indigo-600",
  DELIVERED: "bg-green-500/10 text-green-600",
  CANCELLED: "bg-red-500/10 text-red-600",
};

export default function OrderHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {DEMO_ORDERS.length === 0 ? (
        <div className="text-center py-16">
          <Package size={40} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No orders yet</p>
          <Link href="/products" className="text-sm text-primary hover:underline mt-2 inline-block">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {DEMO_ORDERS.map((order) => (
            <Link
              key={order.id}
              href={`/order/${order.id}`}
              className="flex items-center justify-between p-5 rounded-2xl border border-border bg-card hover:bg-accent/30 transition-colors group"
            >
              <div>
                <p className="font-semibold text-sm">{order.id}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(order.date)} · {order.items} item{order.items !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold text-sm">{formatCurrency(order.total)}</p>
                  <span className={cn("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full mt-1", STATUS_STYLES[order.status])}>
                    {order.status}
                  </span>
                </div>
                <Eye size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
