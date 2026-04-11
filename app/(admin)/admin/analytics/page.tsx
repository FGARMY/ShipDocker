"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ShoppingCart, Package, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const METRICS = [
  { title: "Total Revenue", value: 284590, prev: 253200, format: "currency" },
  { title: "Total COGS", value: 142295, prev: 128600, format: "currency" },
  { title: "Gross Profit", value: 142295, prev: 124600, format: "currency" },
  { title: "Gross Margin", value: 50, prev: 49.2, format: "percent" },
  { title: "Avg Order Value", value: 1824, prev: 1650, format: "currency" },
  { title: "Orders", value: 156, prev: 142, format: "number" },
];

const TOP_PRODUCTS = [
  { name: "Smart Watch Ultra Fitness", revenue: 53970, units: 30, margin: 52 },
  { name: "Wireless NC Headphones", revenue: 49980, units: 20, margin: 52 },
  { name: "Urban Travel Backpack", revenue: 38970, units: 30, margin: 50 },
  { name: "Mechanical Gaming Keyboard", revenue: 34485, units: 15, margin: 52 },
  { name: "Minimalist Leather Wallet", revenue: 29950, units: 50, margin: 53 },
];

const TOP_SUPPLIERS = [
  { name: "AliExpress", orders: 98, revenue: 184500, fulfillRate: 96 },
  { name: "CJ Dropshipping", orders: 45, revenue: 78590, fulfillRate: 98 },
  { name: "Printful", orders: 13, revenue: 21500, fulfillRate: 100 },
];

// Revenue chart bars
const MONTHLY = [18500, 22400, 19800, 28600, 25400, 31200, 27800, 34500, 29800, 38200, 32100, 42000];
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Last 30 days performance overview</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {METRICS.map((m, i) => {
          const change = ((m.value - m.prev) / m.prev) * 100;
          const up = change >= 0;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl border border-border bg-card"
            >
              <p className="text-xs text-muted-foreground mb-1">{m.title}</p>
              <p className="text-lg font-bold">
                {m.format === "currency" ? formatCurrency(m.value) : m.format === "percent" ? `${m.value}%` : m.value}
              </p>
              <div className={cn("flex items-center gap-1 mt-1 text-[10px] font-semibold", up ? "text-green-600" : "text-red-500")}>
                {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(change).toFixed(1)}%
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-bold mb-6">Monthly Revenue</h3>
        <div className="flex items-end gap-2 h-48">
          {MONTHLY.map((val, i) => {
            const max = Math.max(...MONTHLY);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / max) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={cn(
                    "w-full rounded-t-md min-h-[4px]",
                    i === MONTHLY.length - 1 ? "bg-primary shadow-lg shadow-primary/30" : "bg-primary/20 hover:bg-primary/40 transition-colors"
                  )}
                />
                <span className="text-[10px] text-muted-foreground">{LABELS[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-bold mb-4">Top Products by Revenue</h3>
          <div className="space-y-3">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-6 text-xs text-muted-foreground font-mono">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.units} units · {p.margin}% margin</p>
                </div>
                <span className="text-sm font-bold">{formatCurrency(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-bold mb-4">Supplier Performance</h3>
          <div className="space-y-4">
            {TOP_SUPPLIERS.map((s) => (
              <div key={s.name} className="p-4 rounded-xl bg-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{s.name}</h4>
                  <span className="text-sm font-bold">{formatCurrency(s.revenue)}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{s.orders} orders</span>
                  <span>·</span>
                  <span className="text-green-600">{s.fulfillRate}% fulfillment rate</span>
                </div>
                <div className="mt-2 h-1.5 bg-accent rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.fulfillRate}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
