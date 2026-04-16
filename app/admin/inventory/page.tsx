"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Search, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const INVENTORY = [
  { id: "1", product: "Minimalist Leather Wallet", variant: "Black", sku: "WL-001-BK", stock: 200, supplier: "AliExpress", costPrice: 280, threshold: 20, lastSync: "2h ago" },
  { id: "2", product: "Minimalist Leather Wallet", variant: "Brown", sku: "WL-001-BR", stock: 150, supplier: "AliExpress", costPrice: 280, threshold: 20, lastSync: "2h ago" },
  { id: "3", product: "Smart Watch Ultra Fitness", variant: "Midnight Black", sku: "WH-002-BK", stock: 15, supplier: "AliExpress", costPrice: 850, threshold: 20, lastSync: "1h ago" },
  { id: "4", product: "Wireless NC Headphones", variant: "Black", sku: "HP-003-BK", stock: 80, supplier: "AliExpress", costPrice: 1200, threshold: 10, lastSync: "30m ago" },
  { id: "5", product: "Urban Travel Backpack", variant: "Navy Blue", sku: "BG-004-NV", stock: 8, supplier: "AliExpress", costPrice: 670, threshold: 15, lastSync: "2h ago" },
  { id: "6", product: "Portable Bluetooth Speaker", variant: "Red", sku: "SP-006-RD", stock: 0, supplier: "AliExpress", costPrice: 580, threshold: 10, lastSync: "4h ago" },
  { id: "7", product: "Mechanical Gaming Keyboard", variant: "White", sku: "KB-001-WH", stock: 170, supplier: "CJ Dropshipping", costPrice: 1100, threshold: 20, lastSync: "30m ago" },
  { id: "8", product: "Ergonomic Wireless Mouse", variant: "Silver", sku: "MS-002-SV", stock: 3, supplier: "CJ Dropshipping", costPrice: 440, threshold: 10, lastSync: "1h ago" },
];

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  const filtered = INVENTORY.filter((item) => {
    if (filter === "low" && item.stock >= item.threshold) return false;
    if (filter === "out" && item.stock > 0) return false;
    if (search && !item.product.toLowerCase().includes(search.toLowerCase()) && !item.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const lowCount = INVENTORY.filter((i) => i.stock > 0 && i.stock < i.threshold).length;
  const outCount = INVENTORY.filter((i) => i.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {INVENTORY.length} tracked variants · <span className="text-amber-500">{lowCount} low stock</span> · <span className="text-red-500">{outCount} out of stock</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
          <RefreshCw size={16} />
          Sync All Suppliers
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SKU or product..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex gap-2">
          {[
            { key: "all" as const, label: "All" },
            { key: "low" as const, label: `Low Stock (${lowCount})` },
            { key: "out" as const, label: `Out of Stock (${outCount})` },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={cn("px-3 py-2 text-xs font-medium rounded-lg transition-all", filter === f.key ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground hover:text-foreground")}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Product</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">SKU</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Supplier</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Stock</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden lg:table-cell">Threshold</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden md:table-cell">Cost</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden lg:table-cell">Last Sync</th>
                <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.stock > 0 && item.stock < item.threshold;
                const isOut = item.stock === 0;
                return (
                  <tr key={item.id} className={cn("border-b border-border/50 transition-colors", isOut ? "bg-red-500/5" : isLow ? "bg-amber-500/5" : "hover:bg-accent/20")}>
                    <td className="py-3 px-4">
                      <p className="font-medium">{item.product}</p>
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs hidden sm:table-cell">{item.sku}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{item.supplier}</td>
                    <td className={cn("py-3 px-4 text-right font-bold", isOut ? "text-red-500" : isLow ? "text-amber-500" : "")}>
                      {item.stock}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground hidden lg:table-cell">{item.threshold}</td>
                    <td className="py-3 px-4 text-right hidden md:table-cell">{formatCurrency(item.costPrice)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground text-xs hidden lg:table-cell">{item.lastSync}</td>
                    <td className="py-3 px-4 text-center">
                      {isOut ? (
                        <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-red-500/10 text-red-500">OUT</span>
                      ) : isLow ? (
                        <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-600 flex items-center gap-1 justify-center">
                          <AlertTriangle size={10} /> LOW
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-green-500/10 text-green-600">OK</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
