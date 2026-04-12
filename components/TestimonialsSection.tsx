"use client";

import { Star, ShieldCheck } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    product: "Wireless NC Headphones",
    rating: 5,
    review: "The active noise cancellation is a lifesaver for my daily commute on the local train. Super comfortable and the battery easily lasts a week.",
  },
  {
    name: "Rahul Verma",
    city: "Bengaluru",
    product: "Smart Watch Ultra Fitness",
    rating: 5,
    review: "Extremely accurate step and heart rate tracking. Syncs beautifully with my phone and the display is super bright even in direct sunlight.",
  },
  {
    name: "Ananya Iyer",
    city: "Chennai",
    product: "Polarized Aviator Sunglasses",
    rating: 5,
    review: "These sunglasses look so premium! They completely block out the harsh afternoon sun and are surprisingly lightweight.",
  },
  {
    name: "Vikram Nair",
    city: "Hyderabad",
    product: "Magnetic Phone Mount",
    rating: 4,
    review: "Sticks to my car dashboard like glue. The magnet is incredibly strong; my phone has never fallen even on bad city roads.",
  },
  {
    name: "Sneha Patel",
    city: "Ahmedabad",
    product: "Portable Bluetooth Speaker",
    rating: 5,
    review: "Unbelievable bass for such a compact speaker. Took it to a family picnic and everyone was amazed by how loud and clear it gets.",
  },
  {
    name: "Arjun Mehta",
    city: "Delhi",
    product: "Minimalist Leather Wallet",
    rating: 5,
    review: "The leather quality is top-notch and it genuinely feels like a luxury product. Holds all my cards without adding bulk to my pocket.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Customer Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20 fill-transparent"}
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-foreground flex-grow">
                &quot;{testimonial.review}&quot;
              </p>

              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{testimonial.city}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full shrink-0">
                    <ShieldCheck size={12} />
                    <span>Verified Purchase</span>
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
