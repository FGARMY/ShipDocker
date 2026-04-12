"use client";

import { useState } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

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
    <section className="container-max section-padding">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow min-h-[180px]">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20 fill-transparent"}
          />
        ))}
      </div>

      <div className="flex-grow">
        <p className={cn(
          "text-sm leading-relaxed text-foreground",
          !isExpanded && "line-clamp-4"
        )}>
          &quot;{testimonial.review}&quot;
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-bold text-primary hover:underline min-h-[44px] flex items-center"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-medium">{testimonial.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{testimonial.city}</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full shrink-0 uppercase tracking-wider">
            <ShieldCheck size={12} />
            <span>Verified Purchase</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Purchased: <span className="font-semibold text-foreground">{testimonial.product}</span>
        </p>
      </div>
    </div>
  );
}
