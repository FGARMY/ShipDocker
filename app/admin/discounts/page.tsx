"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Tag, Calendar, Percent, DollarSign, Truck, Trash2, Copy, ToggleLeft, ToggleRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const COUPONS = [
  { id: "1", code: "FIRST10", type: "PERCENTAGE", value: 10, minOrder: 499, usageLimit: null, usedCount: 243, isActive: true, expiresAt: null },
  { id: "2", code: "FLAT200", type: "FIXED", value: 200, minOrder: 999, usageLimit: 500, usedCount: 127, isActive: true, expiresAt: "2025-03-31" },
  { id: "3", code: "FREESHIP", type: "FREE_SHIPPING", value: 0, minOrder: 1499, usageLimit: null, usedCount: 56, isActive: true, expiresAt: null },
  { id: "4", code: "WELCOME25", type: "PERCENTAGE", value: 25, minOrder: 1999, usageLimit: 100, usedCount: 100, isActive: false, expiresAt: "2024-12-31" },
];

const TYPE_CONFIG: Record<string, { icon: typeof Percent; label: string; color: string }> = {
  PERCENTAGE: { icon: Percent, label: "Percentage Off", color: "text-blue-500" },
  FIXED: { icon: DollarSign, label: "Fixed Amount", color: "text-green-500" },
  FREE_SHIPPING: { icon: Truck, label: "Free Shipping", color: "text-purple-500" },
};

export default function AdminDiscountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discounts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{COUPONS.length} coupon codes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
          <Plus size={16} />
          Create Coupon
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {COUPONS.map((coupon, i) => {
          const cfg = TYPE_CONFIG[coupon.type];
          const Icon = cfg?.icon || Tag;
          const usagePercent = coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : null;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn("p-5 rounded-2xl border bg-card", coupon.isActive ? "border-border" : "border-border/50 opacity-60")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl bg-accent flex items-center justify-center", cfg?.color)}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold font-mono">{coupon.code}</code>
                      <button className="p-1 rounded hover:bg-accent transition-colors" title="Copy code">
                        <Copy size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{cfg?.label}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                  {coupon.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-semibold">
                    {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : coupon.type === "FIXED" ? formatCurrency(coupon.value) : "Free Shipping"}
                  </span>
                </div>
                {coupon.minOrder && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Order</span>
                    <span>{formatCurrency(coupon.minOrder)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Used</span>
                  <span>{coupon.usedCount}{coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}</span>
                </div>
                {coupon.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span className={new Date(coupon.expiresAt) < new Date() ? "text-red-500" : ""}>{formatDate(coupon.expiresAt)}</span>
                  </div>
                )}
              </div>

              {usagePercent !== null && (
                <div className="mt-3 h-1.5 bg-accent rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", usagePercent >= 100 ? "bg-red-500" : usagePercent >= 75 ? "bg-amber-500" : "bg-primary")} style={{ width: `${Math.min(100, usagePercent)}%` }} />
                </div>
              )}

              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 py-2 text-xs font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors">Edit</button>
                <button className="py-2 px-3 text-xs bg-accent hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
