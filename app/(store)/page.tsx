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
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";

// ═══ Demo Data ═══
const FEATURED_PRODUCTS = [
  { id: "1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", price: 599, comparePrice: 899, stock: 200, reviewCount: 124, rating: 4.5, variantId: "v1", sku: "WL-001" },
  { id: "2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", price: 1799, comparePrice: 2499, stock: 150, reviewCount: 89, rating: 4.7, variantId: "v2", sku: "WH-002" },
  { id: "3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", price: 2499, comparePrice: 3499, stock: 80, reviewCount: 203, rating: 4.8, variantId: "v3", sku: "HP-003" },
  { id: "4", title: "Urban Travel Backpack", slug: "urban-travel-backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", price: 1299, comparePrice: 1699, stock: 250, reviewCount: 67, rating: 4.3, variantId: "v4", sku: "BG-004" },
  { id: "5", title: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", price: 699, comparePrice: 999, stock: 300, reviewCount: 156, rating: 4.6, variantId: "v5", sku: "SG-005" },
  { id: "6", title: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", price: 1199, comparePrice: 1599, stock: 120, reviewCount: 92, rating: 4.4, variantId: "v6", sku: "SP-006" },
  { id: "7", title: "Magnetic Phone Mount", slug: "magnetic-phone-mount", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600", price: 399, comparePrice: 599, stock: 500, reviewCount: 45, rating: 4.2, variantId: "v7", sku: "PH-007" },
  { id: "8", title: "LED Desk Lamp + Charger", slug: "led-desk-lamp-charger", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600", price: 1599, comparePrice: 2199, stock: 100, reviewCount: 78, rating: 4.5, variantId: "v8", sku: "LT-008" },
];

const COLLECTIONS = [
  { title: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600", count: 24 },
  { title: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600", count: 18 },
  { title: "Home & Living", slug: "home-living", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600", count: 15 },
  { title: "Sports & Fitness", slug: "sports-fitness", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600", count: 12 },
];

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
      <HeroSection variant="C" />

      {/* ═══ TRUST BADGES ═══ */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Browse our curated collections</p>
          </div>
          <Link
            href="/collections"
            className="text-sm font-medium text-primary hover:underline hidden sm:flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {COLLECTIONS.map((col) => (
            <motion.div key={col.slug} variants={item}>
              <Link
                href={`/collections/${col.slug}`}
                className="group block relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  quality={75}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{col.title}</h3>
                  <p className="text-white/70 text-sm mt-0.5">{col.count} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ TRENDING PRODUCTS ═══ */}
      <section className="bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary mb-3">
                <TrendingUp size={12} />
                TRENDING NOW
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Most Popular Products</h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-primary hover:underline hidden sm:flex items-center gap-1"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
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

      {/* ═══ TESTIMONIALS (Problem 3) ═══ */}
      <TestimonialsSection />

      {/* ═══ PROMO BANNER ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-2xl"
            >
              Claim My 10% Off
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <NewsletterSection />

      {/* ═══ STATS ═══ */}
      <section className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
    </>
  );
}
