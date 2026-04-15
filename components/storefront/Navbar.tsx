"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, Sun, Moon, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlist } from "@/context/WishlistContext";
import { useThemeStore } from "@/lib/store/theme";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/trending", label: "Trending" },
  { href: "/collections/sale", label: "Sale" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemCount = useCartStore((s) => s.getItemCount());
  const { count: wishlistCount } = useWishlist();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-white text-[10px] sm:text-xs text-center py-2 px-4 font-bold tracking-widest uppercase overflow-hidden">
        <span className="opacity-90 inline-flex items-center gap-2 max-w-full truncate md:whitespace-normal">
          ⚡ Limited Offer: Free pan-india shipping on orders above ₹999 — Code: <span className="text-white border-b border-white/50">FIRST10</span>
        </span>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass-strong shadow-lg shadow-black/5"
            : "bg-background/80 backdrop-blur-lg border-b border-border/50"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group min-h-[44px]">
                <img src="/favicon.png" alt="SMDrop Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-bold tracking-tight">
                  SM<span className="gradient-text">Drop</span>
                </span>
              </Link>
            </div>

            {/* Center: Nav links (Tablet/Desktop) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 group min-h-[44px] flex items-center"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2/3" />
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={toggleTheme}
                className="hidden sm:flex p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Hamburger Mobile */}
              <button
                className="md:hidden p-2.5 rounded-lg hover:bg-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Nav Slide-down */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop to close on click outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[104px] bg-black/20 backdrop-blur-sm md:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden bg-background border-t border-border/50 relative z-20"
              >
                <div className="px-4 py-6 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 h-12 text-base font-semibold rounded-xl hover:bg-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between px-4">
                    <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                    <button
                      onClick={toggleTheme}
                      className="p-3 bg-accent rounded-xl text-foreground"
                    >
                      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="max-w-2xl mx-auto px-4 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-4 text-lg bg-card border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-accent text-muted-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Press <kbd className="px-1.5 py-0.5 bg-accent rounded text-xs font-mono">Enter</kbd> to search or{" "}
                <kbd className="px-1.5 py-0.5 bg-accent rounded text-xs font-mono">Esc</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
