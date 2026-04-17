"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Banknote, RotateCcw, Star, Check, Eye, Zap } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/lib/utils/demo";
import { formatCurrency } from "@/lib/utils/format";
import { useCartStore } from "@/lib/store/cart";

const HERO_TRUST = [
  { icon: Banknote, text: "Cash on Delivery" },
  { icon: Truck, text: "Free Shipping" },
  { icon: RotateCcw, text: "7-Day Easy Returns" },
  { icon: ShieldCheck, text: "Secure Checkout" },
];

export function HeroSection() {
  const heroProduct = FEATURED_PRODUCTS[2]; // NC Headphones — best seller
  const addItem = useCartStore((s) => s.addItem);
  const discount = heroProduct.comparePrice
    ? Math.round(((heroProduct.comparePrice - heroProduct.price) / heroProduct.comparePrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addItem({
      variantId: heroProduct.variantId,
      productId: heroProduct.id,
      title: heroProduct.title,
      variantTitle: "Default",
      price: heroProduct.price,
      comparePrice: heroProduct.comparePrice,
      image: heroProduct.image,
      stock: heroProduct.stock,
      sku: heroProduct.sku,
    });
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden bg-background">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="container-max relative z-10 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-5">
              <Sparkles size={12} />
              ⭐ #1 Best Seller — 3,000+ Sold
            </div>

            {/* Problem → Solution Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-4">
              Stop Settling for
              <br />
              <span className="text-muted-foreground/40 line-through decoration-red-400 decoration-2">Cheap Audio.</span>
              <br />
              <span className="gradient-text">Hear Every Detail.</span>
            </h1>

            <p className="text-base text-muted-foreground mb-4 leading-relaxed max-w-md">
              Noise-cancelling headphones that block the world out and let the music in.
              Premium quality at a price that doesn&apos;t hurt.
              <span className="font-bold text-foreground"> Loved by 10,000+ Indians.</span>
            </p>

            {/* Urgency line */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <span className="live-dot" />
              <span className="font-bold text-red-500 animate-pulse">
                🔥 Only {heroProduct.stock} left in stock — selling fast
              </span>
            </div>

            {/* Product quick info card */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-accent/40 border border-border/50 max-w-sm">
              <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 border border-border/50">
                <Image src={heroProduct.image} alt={heroProduct.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold line-clamp-1">{heroProduct.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-black text-primary">{formatCurrency(heroProduct.price)}</span>
                  {heroProduct.comparePrice && (
                    <span className="text-xs text-muted-foreground line-through">{formatCurrency(heroProduct.comparePrice)}</span>
                  )}
                  {discount > 0 && (
                    <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">SAVE {discount}%</span>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/products/${heroProduct.slug}`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 min-h-[52px] animate-glow-pulse"
              >
                <Zap size={18} className="fill-current" />
                Buy Now
              </Link>
              <button
                onClick={handleBuyNow}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground text-sm font-bold rounded-2xl hover:bg-accent hover:border-primary/30 transition-all min-h-[52px]"
              >
                Add to Cart
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {HERO_TRUST.map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                    <item.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hero Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative order-1 lg:order-2"
          >
            <Link href={`/products/${heroProduct.slug}`} className="block group">
              <div className="relative aspect-square max-w-[540px] mx-auto rounded-3xl overflow-hidden bg-accent/30 border border-border/50 shadow-2xl shadow-primary/5 group-hover:shadow-primary/10 transition-all duration-500">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Discount badge */}
                {discount > 0 && (
                  <div className="absolute top-5 left-5 px-4 py-2 bg-red-500 text-white text-sm font-black rounded-xl shadow-xl animate-bounce-subtle">
                    {discount}% OFF
                  </div>
                )}

                {/* Rating overlay */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-2 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-xl shadow-lg">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold">{heroProduct.rating}</span>
                  <span className="text-xs text-muted-foreground">({heroProduct.reviewCount})</span>
                </div>

                {/* Viewers overlay */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-xl shadow-lg">
                  <div className="live-dot" />
                  <Eye size={14} className="text-primary" />
                  <span className="text-xs font-bold">{heroProduct.viewers} viewing now</span>
                </div>

                {/* Benefits overlay */}
                <div className="absolute bottom-5 right-5 px-4 py-3 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-xl shadow-lg hidden sm:block">
                  <div className="space-y-1.5">
                    {heroProduct.benefits?.slice(0, 3).map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs font-medium">
                        <Check size={12} className="text-green-500 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Social proof bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 flex items-center justify-center gap-3 py-3 px-5 bg-card border border-border/50 rounded-2xl max-w-[540px] mx-auto"
            >
              <div className="flex -space-x-2">
                {["PS", "RV", "AI", "VN", "SP"].map((initial, i) => (
                  <div
                    key={initial}
                    className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-white ${
                      ["bg-pink-500", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-amber-500"][i]
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by <span className="font-bold text-foreground">10,000+</span> customers across India
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
