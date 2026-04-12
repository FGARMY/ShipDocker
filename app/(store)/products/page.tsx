"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Sparkles, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "@/components/storefront/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/utils/demo";

const DEMO_PRODUCTS = FEATURED_PRODUCTS;

const CATEGORIES = ["All", "Electronics", "Accessories", "Home", "Sports", "Bags"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = DEMO_PRODUCTS.filter((p) => {
    if (activeCategory === "All") return true;
    return true; // In real app, filter by category tag
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price_asc": return a.price - b.price;
      case "price_desc": return b.price - a.price;
      case "popular": return (b.reviewCount || 0) - (a.reviewCount || 0);
      default: return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* ═══ PRODUCTS BANNER ═══ */}
      <div className="mb-12 relative h-48 sm:h-64 rounded-3xl overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
          alt="Products Banner"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 sm:px-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white mb-3 w-fit tracking-widest uppercase">
            <Zap size={12} className="text-amber-400" />
            Seasonal Sale
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Premium Picks. <br />
            <span className="text-white/60 lowercase italic">Curated for you.</span>
          </h1>
          <p className="mt-2 text-white/50 text-xs sm:text-sm font-medium">
            Explore our widest range of electronics and lifestyle essentials.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Browse All</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Showing {sorted.length} premium products
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Filter buttons */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 text-sm bg-accent border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-accent border border-border hover:bg-accent/80 transition-colors"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : sorted.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
        }
      </motion.div>
    </div>
  );
}
