"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/storefront/ProductCard";

// Using the same demo data as the homepage to hydrate the visual cards
const ALL_PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", price: 599, comparePrice: 899, stock: 200, reviewCount: 124, rating: 4.5, variantId: "v1", sku: "WL-001" },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", price: 1799, comparePrice: 2499, stock: 150, reviewCount: 89, rating: 4.7, variantId: "v2", sku: "WH-002" },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", price: 2499, comparePrice: 3499, stock: 80, reviewCount: 203, rating: 4.8, variantId: "v3", sku: "HP-003" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299, comparePrice: 1699, stock: 250, reviewCount: 67, rating: 4.3, variantId: "v4", sku: "BG-004" },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, comparePrice: 999, stock: 300, reviewCount: 156, rating: 4.6, variantId: "v5", sku: "SG-005" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, comparePrice: 1599, stock: 120, reviewCount: 92, rating: 4.4, variantId: "v6", sku: "SP-006" },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600", price: 399, comparePrice: 599, stock: 500, reviewCount: 45, rating: 4.2, variantId: "v7", sku: "PH-007" },
  { id: "8", title: "LED Desk Lamp + Charger", slug: "led-desk-lamp-charger", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600", price: 1599, comparePrice: 2199, stock: 100, reviewCount: 78, rating: 4.5, variantId: "v8", sku: "LT-008" },
];

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist();

  // Find products that match our wishlist slugs
  // If a slug isn't in ALL_PRODUCTS, we mock a basic visual representation using the slug
  const savedItems = wishlist.map((slug) => {
    const found = ALL_PRODUCTS.find(p => p.slug === slug);
    if (found) return found;
    // Fallback if real product data isn't hardcoded
    return {
      id: slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      slug: slug,
      image: "",
      price: 999,
      stock: 50,
      priority: false
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
          <Heart size={20} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
        {wishlist.length > 0 && (
          <span className="ml-2 text-muted-foreground text-sm font-medium bg-accent px-2.5 py-1 rounded-full">
            {wishlist.length} item{wishlist.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 px-4 bg-accent/30 rounded-3xl border border-border mt-10"
        >
          <div className="w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center shadow-sm mb-6">
            <Heart size={32} className="text-muted-foreground/30" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your wishlist is empty.</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Start saving products you love. They will be waiting for you right here when you return, no account needed!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 hover:-translate-y-0.5"
          >
            Start Browsing
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedItems.map((product) => (
            <div key={product.slug} className="relative group">
              <ProductCard {...product} priority />
              {/* Quick Remove Button sitting above the card text */}
              <button
                onClick={() => toggle(product.slug)}
                className="mt-2 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors w-full text-left ml-1"
              >
                Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
