"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/storefront/ProductCard";

// Using the same demo data for simplicity, but ideally we'd fetch this from via API based on slugs
const DEMO_PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", price: 599 },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", price: 1799 },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", price: 2499 },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299 },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, badge: "new" as const },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, badge: "new" as const },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600", price: 399, badge: "limited" as const },
  { id: "8", title: "LED Desk Lamp + Charger", slug: "led-desk-lamp-charger", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600", price: 1599 },
];

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  
  const wishlistedProducts = DEMO_PRODUCTS.filter((p) => wishlist.includes(p.slug));

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
