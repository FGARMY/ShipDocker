"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, ShieldCheck, Star, Award } from "lucide-react";
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
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ═══ 1. HERO ═══ */}
      <HeroSection />

      {/* ═══ 2. TRUST STRIP ═══ */}
      <TrustStrip />

      {/* ═══ 3. SHOP BY CATEGORY ═══ */}
      <section className="container-max section-padding">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Collections</p>
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

      {/* ═══ 4. TRENDING PRODUCTS ═══ */}
      <section className="bg-accent/20 py-16 lg:py-24 border-y border-border/30 overflow-hidden">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-primary tracking-widest uppercase">🔥 Hot Right Now</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Trending <span className="gradient-text">Products.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10"
            >
              Shop All Products
              <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {FEATURED_PRODUCTS.slice(0, 8).map((product, i) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard {...product} priority={i < 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. WHY CHOOSE US ═══ */}
      <WhyChooseUs />

      {/* ═══ 6. FLASH DEALS ═══ */}
      <FlashDealsSection />

      {/* ═══ 7. TESTIMONIALS ═══ */}
      <TestimonialsSection />

      {/* ═══ 8. STATS ═══ */}
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

      {/* ═══ 9. NEWSLETTER ═══ */}
      <NewsletterSection />
    </div>
  );
}
