"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/utils/demo";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  
  const wishlistedProducts = FEATURED_PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl">
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}
