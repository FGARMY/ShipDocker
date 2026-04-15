"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: string[];
  toggle: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("smdrop-wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const toggle = (slug: string) => {
    setWishlist((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("smdrop-wishlist", JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
