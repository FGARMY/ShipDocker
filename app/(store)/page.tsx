"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  TrendingUp,
  Package,
  Sparkles,
  Clock,
  Copy,
  Check,
  Star,
  Users,
  Award,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/storefront/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FEATURED_PRODUCTS, COLLECTIONS } from "@/lib/utils/demo";
import { cn } from "@/lib/utils/cn";

const TRUST_BADGES = [
  { icon: Truck, title: "Shipping", desc: "Fast PAN India" },
  { icon: ShieldCheck, title: "Quality", desc: "Cerified Genuine" },
  { icon: RotateCcw, title: "Returns", desc: "7-Day No-Questions" },
  { icon: Zap, title: "Secure", desc: "UPI, Cards, EMI" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const deadline = new Date(now);
      deadline.setHours(23, 59, 59, 999);
      const distance = deadline.getTime() - now.getTime();
      if (distance <= 0) return;
      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2">
      {[
        { v: timeLeft.hours, l: "h" },
        { v: timeLeft.minutes, l: "m" },
        { v: timeLeft.seconds, l: "s" },
      ].map((u) => (
        <div key={u.l} className="flex flex-col items-center">
          <span className="w-10 h-10 flex items-center justify-center bg-accent text-foreground rounded-lg font-bold text-lg shadow-sm">
            {String(u.v).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ TRUST BAR (Minimal) ═══ */}
      <section className="relative z-20 -mt-10 lg:-mt-16 container-max mb-16 lg:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-card border border-border/50 shadow-sm p-4 sm:p-6 rounded-[1.5rem] flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <badge.icon size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold tracking-tight uppercase">{badge.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="container-max section-padding">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Collections</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Shop by <span className="gradient-text">Category.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all h-11"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
        >
          {COLLECTIONS.map((col) => (
            <motion.div key={col.slug} variants={fadeInUp}>
              <CategoryCard {...col} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ TRENDING PRODUCTS (Minimal) ═══ */}
      <section className="bg-accent/10 py-20 lg:py-32 overflow-hidden border-y border-border/30">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Top Rated</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Trending <span className="gradient-text">Now.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-xs font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/10 h-14"
            >
              Shop All Products
              <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {FEATURED_PRODUCTS.slice(0, 4).map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PROMO (Minimal) ═══ */}
      <section className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-accent/30 border border-border/50 p-8 sm:p-16 lg:p-24"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                Insider Pass
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none">
                Get ₹250 OFF <br />
                <span className="text-muted-foreground">Your First Order.</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-md">
                Join the SMDrop community and unlock your exclusive welcome discount. Valid for new members only.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="px-5 py-3 bg-white border border-border rounded-xl flex items-center gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Code</p>
                    <p className="text-lg font-bold tracking-tight text-primary">FIRST10</p>
                  </div>
                  <button className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Copy size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <CountdownTimer />
                </div>
              </div>
              
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/10 h-16"
              >
                Claim Now
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="hidden lg:block relative aspect-square">
                <Image 
                    src="/hero_premium_electronics_1776321124309.png" 
                    alt="SMDrop Essentials" 
                    fill 
                    className="object-contain drop-shadow-2xl opacity-20 dark:opacity-40"
                />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSection />

      {/* ═══ STATS (Minimal) ═══ */}
      <section className="bg-background py-24 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Users, value: "10,000+", label: "Happy Shoppers" },
              { icon: ShieldCheck, value: "500+", label: "Vetted Items" },
              { icon: Star, value: "4.8★", label: "Store Rating" },
              { icon: Award, value: "100%", label: "Authentic" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center text-primary">
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight gradient-text">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <NewsletterSection />
    </div>
  );
}
