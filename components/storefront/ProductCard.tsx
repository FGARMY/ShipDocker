"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Eye, Heart } from "lucide-react";
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
}

export function ProductCard({
  id,
  title,
  slug,
  image,
  price,
  comparePrice,
  stock = 99,
  reviewCount = 0,
  rating,
  variantId,
  sku,
  priority = false,
  badge,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(slug);
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/products/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-accent/50 mb-3 border border-transparent group-hover:border-border transition-colors duration-300">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={85}
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ShoppingBag size={40} />
            </div>
          )}

          {/* Badges Container - Fix 4: Smaller on mobile */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 items-start pointer-events-none">
            {discount > 0 && (
              <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                -{discount}%
              </span>
            )}
            {badge && (
              <span className={cn(
                "px-1.5 md:px-2.5 py-0.5 md:py-1 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg uppercase tracking-wider",
                badge === 'bestseller' ? "bg-amber-500" : 
                badge === 'new' ? "bg-blue-500" : "bg-red-600 animate-pulse"
              )}>
                {badge.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Wishlist heart - Fix 11: 44x44px tap target */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-2 right-2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10",
              wishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/80 dark:bg-black/40 backdrop-blur-sm text-muted-foreground hover:bg-red-500 hover:text-white"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} className={wishlisted ? "fill-current" : ""} />
          </button>

          {/* Out of stock */}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <span className="px-4 py-2 bg-background/80 text-foreground text-xs md:text-sm font-medium rounded-full border border-border">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick Add Overlay - Fix 4: Visible on mobile, hover on desktop */}
          <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
            {variantId && stock > 0 && (
              <button
                onClick={handleQuickAdd}
                className="w-full py-2.5 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-xl min-h-[44px] md:min-h-0"
              >
                <ShoppingBag size={14} />
                Quick Add
              </button>
            )}
          </div>
        </div>

        {/* Info - Fix 4: Compact mobile typography */}
        <div className="px-1">
          <h3 className="text-xs md:text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 md:mt-1.5">
            <span className="text-sm md:text-base font-bold">{formatCurrency(price)}</span>
            {comparePrice && comparePrice > price && (
              <span className="text-[10px] md:text-sm text-muted-foreground line-through">
                {formatCurrency(comparePrice)}
              </span>
            )}
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1 mt-1 md:mt-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={cn(
                      "md:size-3",
                      i < Math.round(rating || 0)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          )}
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
