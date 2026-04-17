"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Heart, Eye, TrendingUp, Flame } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlist } from "@/context/WishlistContext";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  comparePrice?: number;
  stock?: number;
  reviewCount?: number;
  rating?: number;
  variantId?: string;
  sku?: string;
  priority?: boolean;
  badge?: 'bestseller' | 'new' | 'limited';
  viewers?: number;
  soldCount?: number;
}

const BADGE_CONFIG = {
  bestseller: { label: "Best Seller", icon: TrendingUp, class: "bg-amber-500" },
  new: { label: "New Arrival", icon: Star, class: "bg-blue-600" },
  limited: { label: "Limited Stock", icon: Flame, class: "bg-red-500 animate-pulse" },
};

export function ProductCard({
  id,
  title,
  slug,
  image,
  price,
  comparePrice,
  stock = 99,
  reviewCount = 0,
  rating = 4.0,
  variantId,
  sku,
  priority = false,
  badge,
  viewers,
  soldCount,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(slug);
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  // Simulated live viewer count with slight randomization
  const [liveViewers, setLiveViewers] = useState(viewers || Math.floor(Math.random() * 50) + 15);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((v) => Math.max(10, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId) {
      addItem({
        variantId,
        productId: id,
        title,
        variantTitle: "Default",
        price,
        comparePrice,
        image,
        stock,
        sku: sku || "",
      });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <Link href={`/products/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-accent/30 mb-3 border border-transparent group-hover:border-primary/20 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={85}
              priority={priority}
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ShoppingBag size={40} />
            </div>
          )}

          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top Left: Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start pointer-events-none">
            {discount > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white text-[9px] md:text-[10px] font-black rounded-md shadow-lg uppercase tracking-wider">
                {discount}% OFF
              </span>
            )}
            {badgeConfig && (
              <span className={cn(
                "px-2 py-1 text-white text-[9px] md:text-[10px] font-black rounded-md shadow-lg uppercase tracking-wider flex items-center gap-1",
                badgeConfig.class
              )}>
                <badgeConfig.icon size={10} />
                {badgeConfig.label}
              </span>
            )}
          </div>

          {/* Top Right: Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg z-20 backdrop-blur-md",
              wishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/10 text-white hover:bg-red-500 hover:text-white border border-white/20"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} className={wishlisted ? "fill-current" : ""} />
          </button>

          {/* Out of stock */}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
              <span className="px-6 py-2 bg-white text-black text-xs font-black rounded-full uppercase tracking-widest">
                Sold Out
              </span>
            </div>
          )}

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
            {variantId && stock > 0 && (
              <button
                onClick={handleQuickAdd}
                className="w-full py-3.5 bg-white/95 backdrop-blur-md text-black text-xs font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-2xl min-h-[44px]"
              >
                <ShoppingBag size={14} />
                ADD TO CART
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-1 space-y-1.5">
          <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Price + Rating row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight">{formatCurrency(price)}</span>
              {comparePrice && comparePrice > price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(comparePrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
              <Star size={10} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-bold text-amber-600">{rating}</span>
              <span className="text-[9px] text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          {/* Urgency triggers */}
          <div className="flex items-center justify-between pt-0.5">
            {stock > 0 && stock <= 30 && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                <Flame size={10} className="fill-current" />
                Only {stock} left
              </span>
            )}
            {liveViewers > 0 && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 ml-auto">
                <Eye size={10} />
                {liveViewers} viewing
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-2xl skeleton mb-3" />
      <div className="px-1 space-y-2">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-5 skeleton rounded w-1/3" />
        <div className="h-3 skeleton rounded w-1/2" />
      </div>
    </div>
  );
}
