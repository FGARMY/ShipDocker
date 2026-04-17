"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, ShieldCheck, Star, Award, MessageCircle, Truck, RotateCcw, CreditCard } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";
import { ProductCard } from "@/components/storefront/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FlashDealsSection } from "@/components/FlashDealsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FEATURED_PRODUCTS, COLLECTIONS } from "@/lib/utils/demo";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ═══ 1. HERO — Single Product Focus ═══ */}
      <HeroSection />

      {/* ═══ 2. TRUST STRIP — Instant Credibility ═══ */}
      <TrustStrip />

      {/* ═══ 3. TRENDING PRODUCTS — 6 Products Only ═══ */}
      <section className="bg-accent/20 py-16 lg:py-24 border-y border-border/30">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-red-500 tracking-widest uppercase">🔥 Trending Now</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Our <span className="gradient-text">Best Sellers.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Handpicked products loved by thousands. Quality guaranteed or your money back.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10 min-h-[48px] whitespace-nowrap"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {FEATURED_PRODUCTS.slice(0, 6).map((product, i) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard {...product} priority={i < 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. WHY CHOOSE US — Trust Building ═══ */}
      <WhyChooseUs />

      {/* ═══ 5. FLASH DEALS — Urgency + Conversion ═══ */}
      <FlashDealsSection />

      {/* ═══ 6. SHOP BY CATEGORY ═══ */}
      <section className="container-max section-padding">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Browse</p>
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {COLLECTIONS.map((col) => (
            <motion.div key={col.slug} variants={fadeInUp}>
              <CategoryCard {...col} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ 7. CUSTOMER REVIEWS — Social Proof ═══ */}
      <TestimonialsSection />

      {/* ═══ 8. TRUST & LEGITIMACY — Full-Width ═══ */}
      <section className="bg-accent/20 border-y border-border/30 py-16 lg:py-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2">Your Safety Matters</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Shop with <span className="gradient-text">Confidence.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: CreditCard, title: "COD Available", desc: "Pay at your doorstep. No online payment needed.", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: RotateCcw, title: "7-Day Returns", desc: "Not happy? Easy returns within 7 days, no questions.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: ShieldCheck, title: "Secure Checkout", desc: "256-bit SSL encryption. Your data is always safe.", color: "text-purple-500", bg: "bg-purple-500/10" },
              { icon: MessageCircle, title: "WhatsApp Support", desc: "Chat with us anytime. We reply within 30 minutes.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. STATS — Social Proof Numbers ═══ */}
      <section className="bg-background section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Users, value: "10,000+", label: "Happy Shoppers" },
              { icon: ShieldCheck, value: "500+", label: "Vetted Products" },
              { icon: Star, value: "4.8★", label: "Store Rating" },
              { icon: Award, value: "100%", label: "Authentic Items" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. NEWSLETTER — Lead Capture ═══ */}
      <NewsletterSection />
    </div>
  );
}
