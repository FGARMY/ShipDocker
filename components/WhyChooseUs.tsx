"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Lightning Fast Delivery",
    description: "Free PAN-India shipping on orders above ₹999. Most orders delivered in 2-5 business days.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payments",
    description: "All transactions are secured with 256-bit SSL encryption. We accept UPI, Cards, Net Banking & COD.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Sparkles,
    title: "Quality Guaranteed",
    description: "Every product goes through a 3-step quality check before dispatch. We only source from verified suppliers.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: RotateCcw,
    title: "Hassle-Free Returns",
    description: "Not satisfied? Return within 7 days — no questions asked. Refund processed within 48 hours.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyChooseUs() {
  return (
    <section className="container-max section-padding">
      <div className="text-center mb-12">
        <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
          Why 10,000+ Customers Trust Us
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          The SMDrop <span className="gradient-text">Promise.</span>
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            className="group relative bg-card border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
          >
            <div
              className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon size={24} />
            </div>
            <h3 className="text-base font-bold tracking-tight mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
