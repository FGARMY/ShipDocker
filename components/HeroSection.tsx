"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Banknote, RotateCcw } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/lib/utils/demo";
import { formatCurrency } from "@/lib/utils/format";

const HERO_TRUST = [
  { icon: Truck, text: "Free Shipping" },
  { icon: Banknote, text: "COD Available" },
  { icon: RotateCcw, text: "Easy Returns" },
  { icon: ShieldCheck, text: "Secure Checkout" },
];

export function HeroSection() {
  const showcaseProducts = FEATURED_PRODUCTS.slice(0, 4);

  return (
    <section className="relative min-h-[600px] lg:min-h-[720px] flex items-center overflow-hidden bg-background">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

      <div className="container-max relative z-10 w-full pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              Trending Products · Delivered Fast
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              Premium Products,
              <br />
              <span className="gradient-text">Unbeatable Prices.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Curated quality products at wholesale prices. Free shipping,
              easy returns, and COD available across India.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 min-h-[52px]"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/collections/trending"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground text-sm font-bold rounded-2xl hover:bg-accent hover:border-primary/30 transition-all min-h-[52px]"
              >
                Explore Deals
              </Link>
            </div>

            {/* Trust badges - inline */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {HERO_TRUST.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon size={16} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product showcase grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {showcaseProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className={`group relative block overflow-hidden rounded-2xl bg-accent/30 border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ${
                      i === 0 ? "row-span-1" : ""
                    }`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Quick info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                        <p className="text-white text-xs font-bold truncate">{product.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white text-sm font-black">{formatCurrency(product.price)}</span>
                          {product.comparePrice && (
                            <span className="text-white/60 text-xs line-through">{formatCurrency(product.comparePrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 text-white text-[9px] font-black rounded-md shadow-lg uppercase tracking-wider ${
                        product.badge === 'bestseller' ? 'bg-amber-500' :
                        product.badge === 'new' ? 'bg-blue-600' : 'bg-primary'
                      }`}>
                        {product.badge === 'bestseller' ? '⭐ Best Seller' :
                         product.badge === 'new' ? '✨ New' : '🔥 Limited'}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social proof counter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-3 py-3 px-5 bg-card border border-border/50 rounded-2xl"
            >
              <div className="flex -space-x-2">
                {["PS", "RV", "AI", "VN"].map((initial, i) => (
                  <div
                    key={initial}
                    className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-white ${
                      ["bg-pink-500", "bg-blue-500", "bg-purple-500", "bg-green-500"][i]
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">10,000+</span> happy customers across India
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
