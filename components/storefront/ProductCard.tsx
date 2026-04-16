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
      className="group relative"
    >
      <Link href={`/products/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-accent/30 mb-4 border border-transparent group-hover:border-primary/20 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={90}
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

          {/* Badges Container */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 items-start pointer-events-none">
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-[10px] md:text-xs font-black rounded-lg shadow-xl uppercase tracking-widest">
                {discount}% OFF
              </span>
            )}
            {badge && (
              <span className={cn(
                "px-3 py-1 text-white text-[10px] md:text-xs font-black rounded-lg shadow-xl uppercase tracking-widest",
                badge === 'bestseller' ? "bg-amber-500" : 
                badge === 'new' ? "bg-blue-600" : "bg-primary animate-pulse"
              )}>
                {badge.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Wishlist heart */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl z-20 backdrop-blur-md",
              wishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/10 text-white hover:bg-red-500 hover:text-white border border-white/20"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={20} className={wishlisted ? "fill-current" : ""} />
          </button>

          {/* Out of stock */}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
              <span className="px-6 py-2 bg-white text-black text-xs md:text-sm font-black rounded-full uppercase tracking-widest">
                Sold Out
              </span>
            </div>
          )}

          {/* Quick Add Overlay - Glassmorphic */}
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
            {variantId && stock > 0 && (
              <button
                onClick={handleQuickAdd}
                className="w-full py-4 bg-white/90 backdrop-blur-md text-black text-xs font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-2xl min-h-[44px]"
              >
                <ShoppingBag size={16} />
                ADD TO CART
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-2 space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-black tracking-tight">{formatCurrency(price)}</span>
              {comparePrice && comparePrice > price && (
                <span className="text-xs md:text-sm text-muted-foreground line-through decoration-red-500/50">
                  {formatCurrency(comparePrice)}
                </span>
              )}
            </div>
            
            {reviewCount > 0 && (
              <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-md">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] md:text-xs font-bold text-amber-600">{rating}</span>
                <span className="text-[10px] text-muted-foreground ml-0.5">({reviewCount})</span>
              </div>
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
