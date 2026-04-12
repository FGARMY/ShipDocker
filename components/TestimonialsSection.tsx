"use client";

import { Star, ShieldCheck } from "lucide-react";

interface Testimonial {
  name: string;
  city: string;
  product: string;
  rating: number;
  review: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Patel",
    city: "Mumbai",
    product: "Smart Watch Ultra Fitness",
    rating: 5,
    review: "I was skeptical about buying electronics from a new store, but this watch exceeded my expectations. The battery lasts for a solid 6 days and the fitness tracking is surprisingly accurate. Definitely worth the price.",
  },
  {
    name: "Neha Sharma",
    city: "Bengaluru",
    product: "Wireless NC Headphones",
    rating: 5,
    review: "The active noise cancellation is fantastic for my daily commute on the metro. They fit comfortably even after 4 hours of continuous use at work. Highly recommend to anyone working in a noisy office.",
  },
  {
    name: "Vikram Singh",
    city: "Delhi",
    product: "Urban Travel Backpack",
    rating: 4,
    review: "Solid build quality and the anti-theft zipper feature gives me peace of mind when travelling in crowded areas. The material seems waterproof enough to survive unexpected Delhi rains so far.",
  },
  {
    name: "Priya Reddy",
    city: "Hyderabad",
    product: "Minimalist Leather Wallet",
    rating: 5,
    review: "Bought this as an anniversary gift for my husband. The leather feels genuinely premium and it easily holds 8 cards without bulging in his pocket. A total steal at this price point.",
  },
  {
    name: "Rohit Desai",
    city: "Pune",
    product: "Portable Bluetooth Speaker",
    rating: 4,
    review: "For its size, the bass on this speaker is phenomenal. Took it on a weekend trip to Lonavala and it easily filled our entire villa with sound. The battery takes a bit long to charge, but it lasts all night.",
  },
  {
    name: "Riya Kapoor",
    city: "Chandigarh",
    product: "Polarized Aviator Sunglasses",
    rating: 5,
    review: "They feel sturdy and the polarization really cuts out the glare when I'm driving in harsh afternoon sunlight. They don't have that cheap plastic feel like other fast-fashion brands.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What our customers say</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            Real feedback from verified buyers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={`${testimonial.name}-${testimonial.product}`}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20 fill-transparent"}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm leading-relaxed text-foreground flex-grow">
                &quot;{testimonial.review}&quot;
              </p>

              {/* Customer Info */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{testimonial.city}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full shrink-0">
                    <ShieldCheck size={12} />
                    <span>Verified</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Purchased: <span className="font-medium text-foreground">{testimonial.product}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
