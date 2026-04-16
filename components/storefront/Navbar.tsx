"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, Sun, Moon, Heart, Sparkles, Package } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlist } from "@/context/WishlistContext";
import { useThemeStore } from "@/lib/store/theme";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/products", label: "Shop All" },
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/trending", label: "Bestsellers" },
  { href: "/collections/sale", label: "Special Offers" },
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
      {/* Minimal Announcement Bar */}
      <div className="bg-accent/30 text-muted-foreground text-[10px] sm:text-xs py-2 px-4 font-bold tracking-[0.1em] uppercase border-b border-border/50">
        <div className="flex items-center justify-center gap-6">
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            Free PAN-India Shipping on Orders Above ₹999
          </span>
          <span className="hidden md:inline opacity-30">|</span>
          <span className="hidden md:flex items-center gap-2">
            Use Code: <span className="text-primary font-bold">FIRST10</span> for 10% Off
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl py-2 shadow-sm border-b border-border"
            : "bg-background py-4 border-b border-transparent"
        )}
      >
        <nav className="container-max">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <Package className="text-white" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">
                    SM<span className="gradient-text">Drop</span>
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mt-0.5">Premium Estore</span>
                </div>
              </Link>

              {/* Center: Nav links (Desktop) */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 group"
                  >
                    {link.label}
                    <motion.span 
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" 
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden sm:flex items-center bg-accent/50 rounded-2xl p-1 border border-border/50 mr-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="px-4 py-2 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all group"
                >
                  <Search size={18} className="group-hover:text-primary transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-widest">Global Search</span>
                  <span className="text-[10px] bg-background border border-border px-1.5 py-0.5 rounded-lg opacity-40">⌘K</span>
                </button>
              </div>

              <div className="flex items-center">
                <Link
                  href="/wishlist"
                  className="relative w-12 h-12 rounded-2xl hover:bg-accent transition-all flex items-center justify-center group"
                >
                  <Heart size={20} className="group-hover:text-red-500 transition-colors" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-background"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative w-12 h-12 rounded-2xl hover:bg-accent transition-all flex items-center justify-center group"
                >
                  <ShoppingBag size={20} className="group-hover:text-primary transition-colors" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-primary text-primary-foreground text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-background"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Link>

                <button
                  onClick={toggleTheme}
                  className="w-12 h-12 rounded-2xl hover:bg-accent transition-all flex items-center justify-center"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  className="lg:hidden w-12 h-12 rounded-2xl hover:bg-accent transition-all flex items-center justify-center"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
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
                className="fixed top-0 right-0 w-[300px] h-full bg-background border-l border-border z-50 lg:hidden p-8 flex flex-col pt-32"
              >
                <div className="space-y-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-2xl font-black tracking-tight hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto border-t border-border pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Appearance</span>
                    <button
                      onClick={toggleTheme}
                      className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center"
                    >
                      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>
                  <Link
                    href="/account"
                    className="flex lg:hidden items-center justify-center gap-3 w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20"
                  >
                    <User size={20} />
                    MY ACCOUNT
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay (Enhanced) */}
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
              initial={{ y: -50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -50, scale: 0.9 }}
              className="w-full max-w-3xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-card border border-white/10 rounded-[2.5rem] p-2 shadow-2xl">
                  <Search className="ml-6 text-muted-foreground" size={24} />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for premium products..."
                    className="w-full bg-transparent border-none outline-none px-6 py-6 text-xl font-bold placeholder:text-muted-foreground/40"
                  />
                  <button className="bg-primary text-white px-8 py-4 rounded-[1.8rem] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20">
                    Find
                  </button>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Smartwatches", "Headphones", "Wallets", "Home Decor"].map((tag) => (
                  <button key={tag} className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white/50 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all">
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
