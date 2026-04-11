"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  city: string;
  product: string;
  rating: number;
  problem: string;
  outcome: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    product: "Smart Watch Ultra Fitness",
    rating: 5,
    problem: "I was paying ₹4K+ for fitness trackers from brands that broke in 2 months.",
    outcome: "This watch has been going strong for 3 months. Battery lasts a full week. Best purchase under ₹2K!",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    city: "Bengaluru",
    product: "Wireless NC Headphones",
    rating: 5,
    problem: "Needed quality ANC headphones for WFH calls but couldn't justify ₹10K+.",
    outcome: "Noise cancellation is genuinely impressive. My colleagues can't tell I'm working from a noisy café.",
    avatar: "RV",
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    product: "Minimalist Leather Wallet",
    rating: 4,
    problem: "Tired of bulky wallets that don't fit in my jeans. Tried 3 from Amazon — all faux leather.",
    outcome: "Slim, fits perfectly, real leather feel. The RFID blocking is a nice bonus. Gifted one to my brother too.",
    avatar: "AR",
  },
  {
    name: "Vikram Patel",
    city: "Ahmedabad",
    product: "Portable Bluetooth Speaker",
    rating: 5,
    problem: "Cheap speakers I bought online had terrible bass and died in the rain.",
    outcome: "Took it on a Goa trip — survived the beach, pool, and a full day of music. Sound quality is 🔥",
    avatar: "VP",
  },
  {
    name: "Sneha Nair",
    city: "Kochi",
    product: "LED Desk Lamp + Charger",
    rating: 5,
    problem: "My desk was a mess of cables — separate lamp, charger, and USB hub.",
    outcome: "One device replaced all three. The warm light mode is perfect for late-night reading. Zero regrets.",
    avatar: "SN",
  },
  {
    name: "Arjun Singh",
    city: "Delhi",
    product: "Urban Travel Backpack",
    rating: 4,
    problem: "My old backpack strap broke during a metro rush. Needed something sturdy for daily 17\" laptop carry.",
    outcome: "Anti-theft pocket is clutch for crowded metros. Waterproof coating saved my laptop in Delhi rain.",
    avatar: "AS",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
          <Star size={12} className="fill-current" />
          VERIFIED REVIEWS
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">Real Customers, Real Stories</h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Don&apos;t just take our word for it — hear from people across India who&apos;ve made the switch.
        </p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            className="relative p-5 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow duration-300"
          >
            <Quote size={20} className="text-primary/20 absolute top-4 right-4" />

            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < t.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground/20"
                  }
                />
              ))}
            </div>

            {/* Problem → outcome */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-red-400/80 font-medium">Before:</span> {t.problem}
            </p>
            <p className="text-sm leading-relaxed mt-2">
              <span className="text-green-500 font-medium">After:</span> {t.outcome}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{t.avatar}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.city} · Bought {t.product}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
