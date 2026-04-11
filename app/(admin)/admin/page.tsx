"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  Package, Users, AlertTriangle, ArrowRight, ArrowUpRight,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const KPI_DATA = [
  { title: "Total Revenue", value: 284590, change: 12.5, icon: DollarSign, prefix: "₹" },
  { title: "Orders", value: 156, change: 8.2, icon: ShoppingCart },
  { title: "Active Products", value: 48, change: 4, icon: Package },
  { title: "Customers", value: 1243, change: -2.1, icon: Users },
];

const RECENT_ORDERS = [
  { id: "SD-A1B2C3", customer: "Rahul Sharma", total: 2098, status: "SHIPPED", date: "2 hrs ago", items: 1 },
  { id: "SD-D4E5F6", customer: "Priya Patel", total: 1299, status: "CONFIRMED", date: "4 hrs ago", items: 2 },
  { id: "SD-G7H8I9", customer: "Amit Kumar", total: 3798, status: "PROCESSING", date: "6 hrs ago", items: 3 },
  { id: "SD-J1K2L3", customer: "Sneha Reddy", total: 599, status: "DELIVERED", date: "1 day ago", items: 1 },
  { id: "SD-M4N5O6", customer: "Vikram Singh", total: 1799, status: "PENDING", date: "1 day ago", items: 1 },
];

const SUPPLIER_ISSUES = [
  { supplier: "AliExpress", message: "3 products low stock (<10 units)", severity: "warning" },
  { supplier: "CJ Dropshipping", message: "API rate limit approaching", severity: "info" },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  CONFIRMED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  PROCESSING: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  SHIPPED: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  DELIVERED: "bg-green-500/10 text-green-600 dark:text-green-400",
  CANCELLED: "bg-red-500/10 text-red-600 dark:text-red-400",
};

// Simple revenue chart using inline bars
const RevenueChart = () => {
  const data = [45, 52, 38, 65, 59, 80, 72, 85, 97, 75, 88, 95, 62, 78];
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1.5 h-40 px-2">
      {data.map((value, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className={cn(
            "flex-1 rounded-t-md min-w-[8px] transition-colors",
            i === data.length - 1
              ? "bg-primary shadow-lg shadow-primary/25"
              : "bg-primary/20 hover:bg-primary/40"
          )}
        />
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon size={18} className="text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                kpi.change >= 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              )}>
                {kpi.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {formatPercentage(kpi.change)}
              </div>
            </div>
            <p className="text-2xl font-bold">
              {kpi.prefix}{kpi.prefix ? formatNumber(kpi.value) : kpi.value.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Last 14 days</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
              <ArrowUpRight size={16} />
              +23.5%
            </div>
          </div>
          <RevenueChart />
          <div className="flex justify-between mt-2 px-2 text-[10px] text-muted-foreground">
            <span>Mar 29</span>
            <span>Apr 5</span>
            <span>Apr 11</span>
          </div>
        </div>

        {/* Supplier Alerts */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-bold mb-4">Alerts</h3>
          <div className="space-y-3">
            {SUPPLIER_ISSUES.map((issue, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-accent/50">
                <AlertTriangle size={16} className={issue.severity === "warning" ? "text-amber-500 mt-0.5" : "text-blue-500 mt-0.5"} />
                <div>
                  <p className="text-sm font-medium">{issue.supplier}</p>
                  <p className="text-xs text-muted-foreground">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="font-semibold text-sm mb-3">Quick Stats</h4>
            <div className="space-y-2.5">
              {[
                { label: "Pending fulfillments", value: "12" },
                { label: "Low stock items", value: "5" },
                { label: "Avg. order value", value: "₹1,824" },
                { label: "Conversion rate", value: "3.2%" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Items</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Total</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="py-3 px-2">
                    <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs font-semibold text-primary hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3 px-2 font-medium">{order.customer}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{order.items}</td>
                  <td className="py-3 px-2">
                    <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", STATUS_STYLES[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-semibold">{formatCurrency(order.total)}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground text-xs hidden md:table-cell">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
