"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/storefront/ProductCard";

const ALL_PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", price: 599, comparePrice: 899, stock: 200, reviewCount: 124, rating: 4.5, variantId: "v1", sku: "WL-001" },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", price: 1799, comparePrice: 2499, stock: 150, reviewCount: 89, rating: 4.7, variantId: "v2", sku: "WH-002" },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", price: 2499, comparePrice: 3499, stock: 80, reviewCount: 203, rating: 4.8, variantId: "v3", sku: "HP-003" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299, comparePrice: 1699, stock: 250, reviewCount: 67, rating: 4.3, variantId: "v4", sku: "BG-004" },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, comparePrice: 999, stock: 300, reviewCount: 156, rating: 4.6, variantId: "v5", sku: "SG-005" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, comparePrice: 1599, stock: 120, reviewCount: 92, rating: 4.4, variantId: "v6", sku: "SP-006" },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600", price: 399, comparePrice: 599, stock: 500, reviewCount: 45, rating: 4.2, variantId: "v7", sku: "PH-007" },
  { id: "8", title: "LED Desk Lamp + Charger", slug: "led-desk-lamp-charger", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600", price: 1599, comparePrice: 2199, stock: 100, reviewCount: 78, rating: 4.5, variantId: "v8", sku: "LT-008" },
  { id: "9", title: "Mechanical Gaming Keyboard", slug: "mechanical-gaming-keyboard", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600", price: 2299, comparePrice: 2999, stock: 170, reviewCount: 56, rating: 4.6, variantId: "v9", sku: "KB-009" },
  { id: "10", title: "Ergonomic Wireless Mouse", slug: "ergonomic-wireless-mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600", price: 899, comparePrice: 1199, stock: 200, reviewCount: 34, rating: 4.3, variantId: "v10", sku: "MS-010" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof ALL_PRODUCTS>([]);

  useEffect(() => {
    if (initialQuery) performSearch(initialQuery);
  }, [initialQuery]);

  const performSearch = (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    setTimeout(() => {
      const filtered = ALL_PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-center mb-6">Search Products</h1>
        <form onSubmit={handleSubmit} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            autoFocus
            className="w-full pl-12 pr-12 py-4 text-lg bg-card border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setResults([]); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-accent"
            >
              <X size={18} />
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{initialQuery || query}&rdquo;
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {results.map((p) => <ProductCard key={p.id} {...p} />)}
          </motion.div>
        </>
      ) : query ? (
        <div className="text-center py-16">
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
