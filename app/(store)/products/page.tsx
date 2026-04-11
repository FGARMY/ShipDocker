"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/storefront/ProductCard";

const DEMO_PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", price: 599, comparePrice: 899, stock: 200, reviewCount: 124, rating: 4.5, variantId: "v1", sku: "WL-001" },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", price: 1799, comparePrice: 2499, stock: 150, reviewCount: 89, rating: 4.7, variantId: "v2", sku: "WH-002" },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", price: 2499, comparePrice: 3499, stock: 80, reviewCount: 203, rating: 4.8, variantId: "v3", sku: "HP-003" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299, comparePrice: 1699, stock: 250, reviewCount: 67, rating: 4.3, variantId: "v4", sku: "BG-004" },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, comparePrice: 999, stock: 300, reviewCount: 156, rating: 4.6, variantId: "v5", sku: "SG-005" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, comparePrice: 1599, stock: 120, reviewCount: 92, rating: 4.4, variantId: "v6", sku: "SP-006" },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600", price: 399, comparePrice: 599, stock: 500, reviewCount: 45, rating: 4.2, variantId: "v7", sku: "PH-007" },
  { id: "8", title: "LED Desk Lamp + Charger", slug: "led-desk-lamp-charger", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600", price: 1599, comparePrice: 2199, stock: 100, reviewCount: 78, rating: 4.5, variantId: "v8", sku: "LT-008" },
  { id: "9", title: "Mechanical Gaming Keyboard", slug: "mechanical-gaming-keyboard", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600", price: 2299, comparePrice: 2999, stock: 170, reviewCount: 56, rating: 4.6, variantId: "v9", sku: "KB-009" },
  { id: "10", title: "Ergonomic Wireless Mouse", slug: "ergonomic-wireless-mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600", price: 899, comparePrice: 1199, stock: 200, reviewCount: 34, rating: 4.3, variantId: "v10", sku: "MS-010" },
  { id: "11", title: "Insulated Water Bottle", slug: "insulated-water-bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600", price: 699, comparePrice: 899, stock: 300, reviewCount: 88, rating: 4.4, variantId: "v11", sku: "BT-011" },
  { id: "12", title: "Non-Slip Yoga Mat", slug: "non-slip-yoga-mat", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600", price: 999, comparePrice: 1299, stock: 150, reviewCount: 41, rating: 4.1, variantId: "v12", sku: "YG-012" },
];

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Showing {sorted.length} products
        </p>
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
