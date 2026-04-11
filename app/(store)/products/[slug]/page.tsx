"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw,
  Star, ChevronLeft, ChevronRight, Check, Minus, Plus,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { ProductCard } from "@/components/storefront/ProductCard";

// Demo product data for the dynamic route
const DEMO_PRODUCT = {
  id: "1",
  title: "Minimalist Leather Wallet",
  slug: "minimalist-leather-wallet",
  description:
    "Premium genuine leather bifold wallet with RFID protection. Crafted from full-grain Italian leather, this slim-profile wallet features 6 card slots, a bill compartment, and a hidden pocket. The RFID-blocking technology protects your cards from unauthorized scanning.\n\nDesigned to age beautifully over time, developing a unique patina that tells your story. Fits perfectly in your front pocket without any bulk.",
  images: [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    "https://images.unsplash.com/photo-1612902456551-404b9a18b646?w=800",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800",
    "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800",
  ],
  variants: [
    { id: "v1-bk", title: "Black", sku: "WL-001-BK", sellPrice: 599, comparePrice: 899, costPrice: 280, stock: 200, options: { color: "Black" } },
    { id: "v1-br", title: "Brown", sku: "WL-001-BR", sellPrice: 599, comparePrice: 899, costPrice: 280, stock: 150, options: { color: "Brown" } },
    { id: "v1-tn", title: "Tan", sku: "WL-001-TN", sellPrice: 649, comparePrice: 899, costPrice: 290, stock: 100, options: { color: "Tan" } },
  ],
  reviews: [
    { id: "r1", author: "Rahul S.", rating: 5, title: "Excellent quality!", body: "The leather quality is amazing. Very slim and fits perfectly.", createdAt: "2024-12-15" },
    { id: "r2", author: "Priya M.", rating: 4, title: "Great wallet", body: "Very well made. The RFID protection is a nice touch.", createdAt: "2024-12-10" },
    { id: "r3", author: "Amit K.", rating: 5, title: "Perfect gift", body: "Bought this as a gift and it was a hit. Highly recommend!", createdAt: "2024-11-28" },
  ],
  avgRating: 4.7,
  reviewCount: 124,
  shippingDays: 5,
};

const RELATED = [
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, comparePrice: 999, stock: 300, reviewCount: 156, rating: 4.6, variantId: "v5", sku: "SG-005" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299, comparePrice: 1699, stock: 250, reviewCount: 67, rating: 4.3, variantId: "v4", sku: "BG-004" },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600", price: 399, comparePrice: 599, stock: 500, reviewCount: 45, rating: 4.2, variantId: "v7", sku: "PH-007" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, comparePrice: 1599, stock: 120, reviewCount: 92, rating: 4.4, variantId: "v6", sku: "SP-006" },
];

const COLOR_MAP: Record<string, string> = {
  Black: "bg-gray-900",
  Brown: "bg-amber-800",
  Tan: "bg-amber-600",
  Silver: "bg-gray-400",
  White: "bg-white border border-gray-300",
  "Rose Gold": "bg-rose-300",
  Navy: "bg-blue-900",
  Red: "bg-red-600",
  Blue: "bg-blue-600",
  Gold: "bg-amber-500",
};

export default function ProductDetailPage() {
  const product = DEMO_PRODUCT;
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const discount = selectedVariant.comparePrice
    ? Math.round(((selectedVariant.comparePrice - selectedVariant.sellPrice) / selectedVariant.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.sellPrice,
        comparePrice: selectedVariant.comparePrice,
        image: product.images[0],
        stock: selectedVariant.stock,
        sku: selectedVariant.sku,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ── Gallery ── */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-accent/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                -{discount}%
              </span>
            )}

            <button
              onClick={() => setSelectedImage((i) => (i > 0 ? i - 1 : product.images.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setSelectedImage((i) => (i < product.images.length - 1 ? i + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all",
                  selectedImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Info ── */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < Math.round(product.avgRating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.avgRating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={cn(
                  "p-2.5 rounded-xl border transition-all",
                  wishlist ? "bg-red-500/10 border-red-500/30 text-red-500" : "border-border hover:bg-accent"
                )}
              >
                <Heart size={18} fill={wishlist ? "currentColor" : "none"} />
              </button>
              <button className="p-2.5 rounded-xl border border-border hover:bg-accent transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-bold">{formatCurrency(selectedVariant.sellPrice)}</span>
            {selectedVariant.comparePrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(selectedVariant.comparePrice)}</span>
                <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-md">
                  Save {formatCurrency(selectedVariant.comparePrice - selectedVariant.sellPrice)}
                </span>
              </>
            )}
          </div>

          {/* Variant selector */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground">{selectedVariant.title}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
                    selectedVariant.id === v.id
                      ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className={cn("w-4 h-4 rounded-full", COLOR_MAP[v.options.color] || "bg-gray-500")} />
                  {v.title}
                  {selectedVariant.id === v.id && <Check size={14} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2.5 hover:bg-accent transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-6 py-2.5 text-sm font-semibold border-x border-border min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                className="px-4 py-2.5 hover:bg-accent transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-xs text-muted-foreground ml-3">{selectedVariant.stock} available</span>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3 mt-8">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={selectedVariant.stock <= 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              Add to Cart — {formatCurrency(selectedVariant.sellPrice * quantity)}
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
            {[
              { icon: Truck, label: `Delivery in ${product.shippingDays} days` },
              { icon: Shield, label: "Secure Payment" },
              { icon: RotateCcw, label: "30-Day Returns" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center text-center gap-1.5 py-2">
                <b.icon size={18} className="text-primary" />
                <span className="text-xs text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-semibold mb-3">Description</h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.reviews.map((review) => (
            <div key={review.id} className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={cn(i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30")} />
                ))}
              </div>
              <p className="font-semibold text-sm">{review.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{review.body}</p>
              <p className="text-xs text-muted-foreground mt-3">{review.author} · {review.createdAt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Products ── */}
      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {RELATED.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}
