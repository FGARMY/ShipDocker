"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight, Star, Zap } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/lib/utils/demo";
import { formatCurrency } from "@/lib/utils/format";

const PAIN_POINTS = [
  "Cheap headphones that break in 2 months",
  "Terrible sound that ruins your music",
  "No noise cancellation on your commute",
  "Uncomfortable after 30 minutes of use",
];

const SOLUTIONS = [
  "Premium build quality — lasts 3+ years",
  "Studio-grade audio with deep bass",
  "Active noise cancellation blocks everything",
  "Memory foam cushions for all-day comfort",
];

export function ProductStorySection() {
  const product = FEATURED_PRODUCTS[2]; // NC Headphones
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
            Why This Product Exists
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            We Solved a Problem <span className="gradient-text">You Know Too Well.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Tired of spending money on audio products that disappoint? Here&apos;s why 3,000+ Indians switched.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Before (Pain) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-5">
                <X size={12} />
                The Problem
              </div>
              <h3 className="text-xl font-bold mb-5 text-red-600 dark:text-red-400">
                What you&apos;re dealing with now
              </h3>
              <div className="space-y-4">
                {PAIN_POINTS.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={12} className="text-red-500" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center: Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 relative"
          >
            <Link href={`/products/${product.slug}`} className="block group">
              <div className="relative aspect-square max-w-[360px] mx-auto rounded-3xl overflow-hidden bg-accent/30 border border-border/50 shadow-2xl shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-black rounded-lg shadow-lg">
                    SAVE {discount}%
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg shadow-lg">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold">{product.rating}</span>
                </div>
              </div>
            </Link>

            {/* Price + CTA below image */}
            <div className="mt-6 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">
                {product.title}
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl font-black text-primary">{formatCurrency(product.price)}</span>
                {product.comparePrice && (
                  <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</span>
                )}
              </div>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/15 min-h-[48px]"
              >
                <Zap size={16} className="fill-current" />
                Buy Now — Save {discount}%
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right: After (Solution) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                <Check size={12} />
                The Solution
              </div>
              <h3 className="text-xl font-bold mb-5 text-green-600 dark:text-green-400">
                What changes with SMDrop
              </h3>
              <div className="space-y-4">
                {SOLUTIONS.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-green-500" />
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
