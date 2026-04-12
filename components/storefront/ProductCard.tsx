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
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-accent/50 mb-3">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              quality={75}
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ShoppingBag size={40} />
            </div>
          )}

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start pointer-events-none">
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                -{discount}%
              </span>
            )}
            {badge === 'bestseller' && (
              <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                Best Seller
              </span>
            )}
            {badge === 'new' && (
              <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                New Arrival
              </span>
            )}
            {badge === 'limited' && (
              <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                Limited Stock
              </span>
            )}
          </div>

          {/* Wishlist heart */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10",
              wishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/80 dark:bg-black/40 backdrop-blur-sm text-muted-foreground hover:bg-red-500 hover:text-white"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} className={wishlisted ? "fill-current" : ""} />
          </button>

          {/* Out of stock */}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <span className="px-4 py-2 bg-background/80 text-foreground text-sm font-medium rounded-full border border-border">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick actions overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              {variantId && stock > 0 && (
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-xl"
                >
                  <ShoppingBag size={14} />
                  Quick Add
                </button>
              )}
              <Link
                href={`/products/${slug}`}
                className="py-2.5 px-3 glass rounded-xl hover:bg-white/30 dark:hover:bg-white/10 transition-colors shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-1">
          <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base font-bold">{formatCurrency(price)}</span>
            {comparePrice && comparePrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(comparePrice)}
              </span>
            )}
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={cn(
                      i < Math.round(rating || 0)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
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
