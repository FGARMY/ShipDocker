"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  // FILE: components/HeroSection.tsx
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
    <section className="relative bg-black overflow-hidden border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* LEFT COLUMN: Image (Hidden on mobile) */}
        <div className="hidden md:block relative h-full w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
            alt="Premium products"
            fill
            sizes="50vw"
            quality={90}
            priority={true}
            className="object-cover"
          />
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-20 bg-black">
          {/* Animated background mesh for premium feel */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-20 mix-blend-overlay pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Top-rated products. <span className="gradient-text">Delivered across India.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Join 10,000+ happy customers. Use code FIRST10 for 10% off your first order.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-2xl shadow-primary/20 hover:-translate-y-0.5"
              >
                Claim 10% Off Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/collections/trending"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border bg-white/5 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/10 transition-all underline decoration-primary/50 underline-offset-4"
              >
                See what&apos;s trending →
              </Link>
            </div>

            {/* Countdown Pulse */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Offer expires in</span>
              <span className="font-mono text-lg font-black tracking-widest">
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
