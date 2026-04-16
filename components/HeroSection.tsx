"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Search, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden bg-background text-foreground">
      {/* Background Image with optimized quality - Sophisticated Minimalism */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_premium_electronics_1776321124309.png"
          alt="Premium Electronics"
          fill
          priority
          className="object-cover opacity-10 dark:opacity-20 scale-100"
        />
        {/* Subtle radial lighting instead of heavy shadows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,transparent_20%,rgba(var(--background),0.8)_80%)]" />
      </div>

      <div className="container-max relative z-10 w-full pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              Refined Tech & Essentials
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Quality Above <br />
              <span className="gradient-text">Everything Else.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Curated selection of high-performance electronics and premium goods. 
              Designed for the modern professional.
            </p>

            {/* Search Bar - Minimalist Integration */}
            <div className={cn(
              "relative max-w-lg transition-all duration-300 mb-10",
              searchFocused ? "shadow-2xl shadow-primary/5 ring-1 ring-primary/20" : "shadow-sm shadow-black/5"
            )}>
              <div className="relative flex items-center bg-card border border-border rounded-2xl p-1 group">
                <Search className="ml-4 text-muted-foreground/50" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-transparent border-none outline-none px-4 py-3.5 text-sm font-medium"
                />
                <button className="bg-primary text-white px-6 py-3 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/10">
                  Find
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-95 transition-all shadow-xl shadow-primary/20 min-h-[44px]"
              >
                Explore Shop
                <ArrowRight size={18} />
              </Link>
              
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/50 rounded-lg">
                  <Star className="text-yellow-500 fill-yellow-500" size={12} />
                  <span>Trusted by 10,000+ Customers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Countdown (Minimalist) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="bg-card glass border border-border p-10 rounded-[2.5rem] relative">
              <div className="text-center space-y-6 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground italic">Flash Offer Ending Soon</p>
                <div className="flex gap-4">
                  {[
                    { label: "HRS", value: timeLeft.hours },
                    { label: "MIN", value: timeLeft.minutes },
                    { label: "SEC", value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-accent/50 flex items-center justify-center rounded-2xl text-3xl font-bold mb-1">
                        {String(unit.value).padStart(2, "0")}
                      </div>
                      <span className="text-[8px] font-bold text-muted-foreground/60">{unit.label}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-border mt-6 grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="text-green-500" size={14} />
                    Secure
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Zap className="text-yellow-500" size={14} />
                    Instant
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient overlay at bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
