"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Upload,
  Filter, ChevronDown, Package, CheckCircle, Archive,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200", price: 599, costPrice: 280, stock: 200, status: "ACTIVE", variants: 3, supplier: "AliExpress" },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", price: 1799, costPrice: 850, stock: 150, status: "ACTIVE", variants: 3, supplier: "AliExpress" },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", price: 2499, costPrice: 1200, stock: 80, status: "ACTIVE", variants: 3, supplier: "AliExpress" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200", price: 1299, costPrice: 650, stock: 250, status: "ACTIVE", variants: 3, supplier: "AliExpress" },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200", price: 699, costPrice: 320, stock: 300, status: "ACTIVE", variants: 3, supplier: "AliExpress" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200", price: 1199, costPrice: 580, stock: 0, status: "DRAFT", variants: 3, supplier: "AliExpress" },
  { id: "7", title: "Mechanical Gaming Keyboard", slug: "mechanical-gaming-keyboard", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200", price: 2299, costPrice: 1100, stock: 170, status: "ACTIVE", variants: 2, supplier: "CJ Dropshipping" },
  { id: "8", title: "Ergonomic Wireless Mouse", slug: "ergonomic-wireless-mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", price: 899, costPrice: 420, stock: 200, status: "ACTIVE", variants: 2, supplier: "CJ Dropshipping" },
];

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Package; style: string }> = {
  ACTIVE: { label: "Active", icon: CheckCircle, style: "bg-green-500/10 text-green-600" },
  DRAFT: { label: "Draft", icon: Edit, style: "bg-amber-500/10 text-amber-600" },
  ARCHIVED: { label: "Archived", icon: Archive, style: "bg-gray-500/10 text-gray-500" },
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = PRODUCTS.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };
  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{PRODUCTS.length} total products</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors">
            <Upload size={16} />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25">
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {["all", "ACTIVE", "DRAFT", "ARCHIVED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-lg transition-all",
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/5 border border-primary/20"
        >
          <span className="text-sm font-medium">{selected.length} selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-accent rounded-lg hover:bg-accent/80">Publish</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-accent rounded-lg hover:bg-accent/80">Archive</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20">Delete</button>
          </div>
        </motion.div>
      )}

      {/* Product Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="py-3 px-4 text-left w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" />
                </th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Product</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden lg:table-cell">Supplier</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Cost</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Price</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden sm:table-cell">Stock</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Margin</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const margin = ((product.price - product.costPrice) / product.price * 100).toFixed(0);
                const cfg = STATUS_CONFIG[product.status] || STATUS_CONFIG.DRAFT;
                return (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                    <td className="py-3 px-4">
                      <input type="checkbox" checked={selected.includes(product.id)} onChange={() => toggleSelect(product.id)} className="rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-accent/30 flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium truncate max-w-[200px]">{product.title}</p>
                          <p className="text-xs text-muted-foreground">{product.variants} variants</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full", cfg.style)}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{product.supplier}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{formatCurrency(product.costPrice)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(product.price)}</td>
                    <td className="py-3 px-4 text-right hidden sm:table-cell">
                      <span className={cn(product.stock === 0 ? "text-red-500 font-semibold" : product.stock < 20 ? "text-amber-500" : "")}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-green-600 dark:text-green-400 font-semibold">{margin}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                        <MoreHorizontal size={16} className="text-muted-foreground" />
                      </button>
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
