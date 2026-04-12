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
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-64 h-64 mb-10 overflow-hidden rounded-full">
              <Image 
                src="https://images.unsplash.com/photo-1518131394553-c36c8413182b?w=600" 
                alt="Empty Wishlist" 
                fill
                className="object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart size={80} className="text-muted-foreground/20" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Your wishlist is empty</h2>
            <p className="text-muted-foreground mt-3 mb-10 max-w-sm">
              Save your favorite items here to keep track of what you love. They&apos;ll be waiting for you.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-2xl shadow-primary/25"
            >
              Discover New Favorites
            </Link>
          </motion.div>
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
