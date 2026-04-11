"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatRelativeTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const ORDERS = [
  { id: "SD-A1B2C3", customer: "Rahul Sharma", email: "rahul@example.com", items: 1, total: 2098, cost: 850, status: "SHIPPED", payment: "PAID", method: "Razorpay", date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), supplier: "AliExpress", tracking: "TRACKYN7X2K9" },
  { id: "SD-D4E5F6", customer: "Priya Patel", email: "priya@example.com", items: 2, total: 1299, cost: 650, status: "CONFIRMED", payment: "PAID", method: "Razorpay", date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), supplier: "CJ Dropshipping", tracking: null },
  { id: "SD-G7H8I9", customer: "Amit Kumar", email: "amit@example.com", items: 3, total: 3798, cost: 1830, status: "PROCESSING", payment: "PAID", method: "Razorpay", date: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), supplier: "Multiple", tracking: null },
  { id: "SD-J1K2L3", customer: "Sneha Reddy", email: "sneha@example.com", items: 1, total: 599, cost: 280, status: "DELIVERED", payment: "PAID", method: "Razorpay", date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), supplier: "AliExpress", tracking: "TRACKAE4K2M" },
  { id: "SD-M4N5O6", customer: "Vikram Singh", email: "vikram@example.com", items: 1, total: 1799, cost: 850, status: "PENDING", payment: "UNPAID", method: "-", date: new Date(Date.now() - 26 * 3600 * 1000).toISOString(), supplier: "-", tracking: null },
  { id: "SD-P7Q8R9", customer: "Ananya Iyer", email: "ananya@example.com", items: 2, total: 2498, cost: 1200, status: "CANCELLED", payment: "REFUNDED", method: "Razorpay", date: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), supplier: "AliExpress", tracking: null },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600",
  CONFIRMED: "bg-blue-500/10 text-blue-600",
  PROCESSING: "bg-indigo-500/10 text-indigo-600",
  SHIPPED: "bg-purple-500/10 text-purple-600",
  DELIVERED: "bg-green-500/10 text-green-600",
  CANCELLED: "bg-red-500/10 text-red-500",
};

const PAYMENT_STYLES: Record<string, string> = {
  PAID: "text-green-600",
  UNPAID: "text-amber-600",
  REFUNDED: "text-muted-foreground",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ORDERS.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRevenue = ORDERS.filter((o) => o.payment === "PAID").reduce((s, o) => s + o.total, 0);
  const totalProfit = ORDERS.filter((o) => o.payment === "PAID").reduce((s, o) => s + (o.total - o.cost), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{ORDERS.length} orders · {formatCurrency(totalRevenue)} revenue · {formatCurrency(totalProfit)} profit</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {["all", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all", statusFilter === s ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground hover:text-foreground")}
            >
              {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Order</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Customer</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden lg:table-cell">Payment</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden xl:table-cell">Supplier</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Total</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden sm:table-cell">Profit</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden md:table-cell">Time</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs font-semibold text-primary">{order.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items} item{order.items !== 1 ? "s" : ""}</p>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full", STATUS_STYLES[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className={cn("py-3 px-4 text-xs font-semibold hidden lg:table-cell", PAYMENT_STYLES[order.payment])}>{order.payment}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden xl:table-cell">{order.supplier}</td>
                  <td className="py-3 px-4 text-right font-semibold">{formatCurrency(order.total)}</td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">
                    <span className="text-green-600 font-semibold">{formatCurrency(order.total - order.cost)}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-xs text-muted-foreground hidden md:table-cell">{formatRelativeTime(order.date)}</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                      <Eye size={14} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
