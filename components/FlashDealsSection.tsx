"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShoppingBag, Star, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { FLASH_DEALS } from "@/lib/utils/demo";
import { useCartStore } from "@/lib/store/cart";

function useCountdown() {
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

  return timeLeft;
}

function FlashDealCard({ product }: { product: typeof FLASH_DEALS[0] }) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const claimedPercent = Math.min(95, Math.max(60, 100 - (product.stock * 4)));

  const handleAdd = () => {
    addItem({
      variantId: product.variantId,
      productId: product.id,
      title: product.title,
      variantTitle: "Default",
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.image,
      stock: product.stock,
      sku: product.sku,
    });
  };

  return (
    <div className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Image */}
        <Link href={`/products/${product.slug}`} className="relative aspect-square sm:aspect-auto sm:min-h-[280px] overflow-hidden bg-accent/30">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-black rounded-lg shadow-lg animate-bounce-subtle">
              {discount}% OFF
            </span>
          )}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full">
            <span className="live-dot" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
          </div>
        </Link>

        {/* Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>

          <h3 className="text-lg font-bold tracking-tight mb-3 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-black text-primary">{formatCurrency(product.price)}</span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</span>
            )}
          </div>

          {/* Progress bar - Urgency */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-red-500">🔥 {claimedPercent}% Claimed</span>
              <span className="text-muted-foreground">Only {product.stock} left</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full progress-fill"
                style={{ "--progress-width": `${claimedPercent}%` } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Viewers */}
          <p className="text-xs text-muted-foreground mb-5">
            👀 <span className="font-bold text-foreground">{product.viewers}</span> people are viewing this right now
          </p>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 min-h-[48px]"
          >
            <ShoppingBag size={18} />
            Grab Before It&apos;s Gone
          </button>
        </div>
      </div>
    </div>
  );
}

export function FlashDealsSection() {
  const timeLeft = useCountdown();

  return (
    <section className="bg-gradient-to-b from-red-500/5 via-background to-background py-16 lg:py-24 border-y border-border/30 overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest">
              <Zap size={12} className="fill-current" />
              Limited Time Deals
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Flash <span className="text-gradient-gold">Sale.</span>
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-muted-foreground" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">Ends in</span>
            <div className="flex gap-1.5">
              {[
                { v: timeLeft.hours, l: "h" },
                { v: timeLeft.minutes, l: "m" },
                { v: timeLeft.seconds, l: "s" },
              ].map((u) => (
                <div key={u.l} className="flex items-center gap-1">
                  <span className="w-10 h-10 flex items-center justify-center bg-foreground text-background rounded-lg font-bold text-lg font-mono">
                    {String(u.v).padStart(2, "0")}
                  </span>
                  {u.l !== "s" && <span className="text-muted-foreground font-bold">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FLASH_DEALS.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FlashDealCard product={deal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
