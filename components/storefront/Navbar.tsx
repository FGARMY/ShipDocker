"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, Sun, Moon, Heart, Package, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlist } from "@/context/WishlistContext";
import { useThemeStore } from "@/lib/store/theme";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  {
    href: "#",
    label: "Categories",
    children: [
      { href: "/collections/electronics", label: "Electronics" },
      { href: "/collections/accessories", label: "Accessories" },
      { href: "/collections/home-living", label: "Home & Living" },
      { href: "/collections/sports-fitness", label: "Sports & Fitness" },
    ],
  },
  { href: "/collections/trending", label: "Deals" },
];

const MARQUEE_ITEMS = [
  "🚚 Free Shipping on Orders Above ₹999",
  "🏷️ Use Code FIRST250 for ₹250 Off",
  "💳 COD Available on All Orders",
  "🔄 7-Day Easy Returns",
  "⭐ 10,000+ Happy Customers",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
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
      {/* ═══ Marquee Announcement Bar ═══ */}
      <div className="bg-primary text-white text-[10px] sm:text-xs py-2 px-4 font-semibold overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 sm:mx-12 inline-flex items-center gap-1">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ Main Navbar ═══ */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-xl py-2 shadow-sm border-b border-border"
            : "bg-background py-3 border-b border-transparent"
        )}
      >
        <nav className="container-max">
          <div className="flex items-center justify-between h-14">
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <Package className="text-white" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">
                    SM<span className="gradient-text">Drop</span>
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mt-0.5">
                    Premium Estore
                  </span>
                </div>
              </Link>

              {/* Center: Nav links (Desktop) */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div key={link.label} className="relative">
                      <button
                        onMouseEnter={() => setCatOpen(true)}
                        onMouseLeave={() => setCatOpen(false)}
                        className="relative px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-1 group"
                      >
                        {link.label}
                        <ChevronDown size={12} className={cn("transition-transform", catOpen && "rotate-180")} />
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </button>

                      <AnimatePresence>
                        {catOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            onMouseEnter={() => setCatOpen(true)}
                            onMouseLeave={() => setCatOpen(false)}
                            className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-xl p-2 z-50"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Search size={18} />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Search</span>
              </button>

              <Link
                href="/wishlist"
                className="relative w-10 h-10 rounded-xl hover:bg-accent transition-all flex items-center justify-center group"
              >
                <Heart size={18} className="group-hover:text-red-500 transition-colors" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-background"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative w-10 h-10 rounded-xl hover:bg-accent transition-all flex items-center justify-center group"
              >
                <ShoppingBag size={18} className="group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-background"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl hover:bg-accent transition-all flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                className="lg:hidden w-10 h-10 rounded-xl hover:bg-accent transition-all flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* ═══ Mobile Navigation ═══ */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[100px] bg-black/40 backdrop-blur-md lg:hidden z-40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-[300px] h-full bg-background border-l border-border z-50 lg:hidden p-8 flex flex-col pt-24"
              >
                {/* Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-accent flex items-center justify-center"
                >
                  <X size={20} />
                </button>

                <div className="space-y-2">
                  {NAV_LINKS.map((link) =>
                    link.children ? (
                      <div key={link.label}>
                        <p className="text-lg font-bold tracking-tight text-muted-foreground mb-3 px-2">
                          {link.label}
                        </p>
                        <div className="space-y-1 pl-4 mb-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-xl font-bold tracking-tight hover:text-primary transition-colors py-2 px-2"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>

                <div className="mt-auto border-t border-border pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Appearance</span>
                    <button
                      onClick={toggleTheme}
                      className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center"
                    >
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20"
                  >
                    <User size={18} />
                    My Account
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ Search Overlay ═══ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-start justify-center pt-24"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -50, scale: 0.95 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center bg-card border border-white/10 rounded-2xl p-1.5 shadow-2xl">
                <Search className="ml-5 text-muted-foreground" size={22} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full bg-transparent border-none outline-none px-4 py-5 text-lg font-medium placeholder:text-muted-foreground/40"
                />
                <button className="bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-sm">
                  Search
                </button>
              </div>

              {/* Trending tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Smartwatches", "Headphones", "Wallets", "Sunglasses", "Speakers"].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
