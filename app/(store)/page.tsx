"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Zap,
  Star,
  TrendingUp,
  Package,
  Sparkles,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard, ProductCardSkeleton } from "@/components/storefront/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FEATURED_PRODUCTS, COLLECTIONS } from "@/lib/utils/demo";

const TRUST_BADGES = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999" },
  { icon: Shield, title: "Secure Payments", desc: "UPI, Cards & COD accepted" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day no-questions-asked" },
  { icon: Zap, title: "Fast Delivery", desc: "3–7 business days PAN India" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CouponCopyButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("FIRST10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-mono text-white transition-colors"
    >
      FIRST10
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set deadline to midnight tonight
    const getDeadline = () => {
      const now = new Date();
      const deadline = new Date(now);
      deadline.setHours(23, 59, 59, 999);
      return deadline;
    };

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = getDeadline().getTime() - now;
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
    <div className="inline-flex items-center gap-2 text-sm">
      <Clock size={14} className="text-amber-400" />
      <span className="text-muted-foreground">Ends in</span>
      <div className="flex gap-1">
        {[
          { v: timeLeft.hours, l: "h" },
          { v: timeLeft.minutes, l: "m" },
          { v: timeLeft.seconds, l: "s" },
        ].map((u) => (
          <span key={u.l} className="px-1.5 py-0.5 bg-foreground/10 rounded font-mono text-xs font-bold">
            {String(u.v).padStart(2, "0")}{u.l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ TRUST BADGES ═══ */}
      <section className="border-y border-border bg-card/50 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <badge.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      <section className="container-max section-padding">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Shop by Category</h1>
            <p className="text-muted-foreground mt-1 text-sm">Browse our curated collections</p>
          </div>
          <Link
            href="/collections"
            className="text-sm font-medium text-primary hover:underline hidden sm:flex items-center gap-1 min-h-[44px]"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {COLLECTIONS.map((col) => (
            <CategoryCard key={col.slug} {...col} />
          ))}
        </motion.div>
      </section>

      {/* ═══ PROMOTIONAL BANNER (User Provided) ═══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[250px] sm:h-[400px] rounded-[2rem] overflow-hidden group shadow-2xl shadow-primary/10"
        >
          <Image
            src="/home-banner.png"
            alt="Flash Deals - SM Drop"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            priority
          />
          <Link 
            href="/products" 
            className="absolute inset-0 z-10"
            aria-label="Shop now"
          />
        </motion.div>
      </section>

      {/* ═══ TRENDING PRODUCTS ═══ */}
      <section className="bg-accent/30 section-padding">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-semibold text-primary mb-3">
                <TrendingUp size={12} />
                TRENDING NOW
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Most Popular Products</h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-primary hover:underline hidden sm:flex items-center gap-1 min-h-[44px]"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {FEATURED_PRODUCTS.map((product, i) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard {...product} priority={i < 4} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSection />

      {/* ═══ PROMO BANNER ═══ */}
      <section className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-blue-600 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              First Time Here? Save ₹250+
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Use code <CouponCopyButton /> at checkout.
              Valid on orders above ₹499. Today only.
            </p>
            <div className="mt-4">
              <CountdownTimer />
            </div>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-2xl min-h-[44px]"
            >
              Claim My 10% Off
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="border-t border-border bg-card/50 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "8,000+", label: "Happy Indian Customers" },
              { value: "500+", label: "Premium Products" },
              { value: "2,400+", label: "Verified Reviews" },
              { value: "4.8★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <NewsletterSection />
    </>
  );
}
