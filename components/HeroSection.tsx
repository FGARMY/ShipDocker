"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

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
    <section className="relative overflow-hidden bg-black/90">
      <Image
        src="https://images.unsplash.com/photo-1620825937374-87fc1e6aaf36?w=1600&q=80"
        alt="Electronics Store Hero"
        fill
        sizes="100vw"
        priority
        quality={85}
        className="object-cover opacity-30 pointer-events-none"
      />
      
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 mix-blend-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
            Top-rated products. <span className="gradient-text">Delivered across India in 3–7 days.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Join 10,000+ happy customers. Use code FIRST10 for 10% off your first order.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Claim 10% Off Now
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/collections/trending"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border bg-card/50 backdrop-blur-sm font-semibold rounded-xl hover:bg-accent hover:border-border/80 transition-all"
            >
              See what&apos;s trending →
            </Link>
          </div>

          <div className="mt-8 text-sm font-semibold text-red-500 border border-red-500/20 bg-red-500/10 px-4 py-2 rounded-lg inline-flex items-center gap-2">
            <span>Offer expires in</span>
            <span className="font-mono">
              {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
