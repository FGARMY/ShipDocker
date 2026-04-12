"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, TrendingUp, Sparkles, Star, Clock } from "lucide-react";

export type HeroVariant = "A" | "B" | "C";

export interface HeroSectionProps {
  variant?: HeroVariant;
}

// 24-hour countdown timer resets on refresh
function CountdownTimer24h() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    // End time is exactly 24 hours from when the component first mounts
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
    <div className="inline-flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full mb-6 text-red-500 font-medium">
      <Clock size={14} className="text-red-500" />
      <span>Offer expires in</span>
      <div className="flex gap-1 font-bold">
        <span className="font-mono text-xs">{String(timeLeft.hours).padStart(2, "0")}h</span>:
        <span className="font-mono text-xs">{String(timeLeft.minutes).padStart(2, "0")}m</span>:
        <span className="font-mono text-xs">{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  );
}

export function HeroSection({ variant = "A" }: HeroSectionProps) {
  const copyVariants = {
    A: {
      tagline: (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
          <Sparkles size={14} /> ₹399 Minimum Order Value
        </div>
      ),
      headline: <>Premium electronics at <span className="gradient-text">unbeatable</span> Indian prices.</>,
      subhead: "Shop our curated collection of trending gear. 100% satisfaction guaranteed with free and fast shipping across India.",
      primaryCta: "Shop the Collection",
      primaryLink: "/products",
      secondaryCta: "View Trending Deals",
      secondaryLink: "/collections/trending",
      iconSecondary: <TrendingUp size={18} />
    },
    B: {
      tagline: (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-medium text-green-600 dark:text-green-400 mb-6">
          <Star size={14} className="fill-current" /> India&apos;s #1 Trending Store
        </div>
      ),
      headline: <>Join <span className="gradient-text">10,000+ smart shoppers</span> this week alone.</>,
      subhead: "Discover why thousands of tech-savvy Indians choose us for premium electronics, verified specs, and lightning-fast shipping.",
      primaryCta: "See What's Popular",
      primaryLink: "/collections/trending",
      secondaryCta: "Read Customer Reviews",
      secondaryLink: "#reviews",
      iconSecondary: <Star size={18} />
    },
    C: {
      tagline: <CountdownTimer24h />,
      headline: <>Claim your <span className="gradient-text">10% welcome discount</span> right now.</>,
      subhead: "Use code FIRST10 to get an instant 10% off your entire first order. Hurry, this exclusive offer expires soon!",
      primaryCta: "Claim 10% Off Now",
      primaryLink: "/products",
      secondaryCta: "Browse Categories",
      secondaryLink: "/collections",
      iconSecondary: <ArrowRight size={18} />
    }
  };

  const current = copyVariants[variant];

  // Optional: Scroll handling for jumping to reviews in Variant B
  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(link.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-black/90">
      {/* Background Image Optimized for LCP */}
      <Image
        src="https://images.unsplash.com/photo-1620825937374-87fc1e6aaf36?w=1600&q=80"
        alt="Electronics Store Hero"
        fill
        sizes="100vw"
        priority
        quality={60}
        className="object-cover opacity-30 pointer-events-none"
      />
      
      {/* Background mesh glow */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 mix-blend-overlay" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {current.tagline}
          </motion.div>

          {/* Headline string replacement safely wrapped */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
            {current.headline}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            {current.subhead}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={current.primaryLink}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {current.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={current.secondaryLink}
              onClick={(e) => handleSecondaryClick(e, current.secondaryLink)}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border bg-card/50 backdrop-blur-sm font-semibold rounded-xl hover:bg-accent hover:border-border/80 transition-all"
            >
              {current.iconSecondary}
              {current.secondaryCta}
            </Link>
          </div>

          {/* Social Proof (Static) */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["PS", "RV", "AR", "VP", "SN"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-purple-500/60 border-2 border-background flex items-center justify-center shrink-0"
                >
                  <span className="text-[9px] font-bold text-white">{initials}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-sm font-semibold ml-1">4.8</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                from <span className="font-semibold text-foreground">2,400+</span> verified reviews
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
