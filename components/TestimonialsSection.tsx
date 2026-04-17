"use client";

import { useRef, useEffect, useState } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { TESTIMONIALS } from "@/lib/utils/demo";

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] snap-start bg-card border border-border/50 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 min-h-[240px]">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-sm leading-relaxed text-foreground flex-grow">
        &quot;{testimonial.review}&quot;
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold", testimonial.color)}>
            {testimonial.initial}
          </div>
          <div>
            <h4 className="text-sm font-bold">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground">{testimonial.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-bold text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-wider">
          <ShieldCheck size={10} />
          <span>Verified</span>
        </div>
      </div>

      {/* Product */}
      <p className="text-[10px] text-muted-foreground mt-3">
        Purchased: <span className="font-semibold text-foreground">{testimonial.product}</span>
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let direction = 1;
    const interval = setInterval(() => {
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) direction = -1;
      if (el.scrollLeft <= 10) direction = 1;
      el.scrollBy({ left: direction * 1, behavior: "auto" });
    }, 30);

    // Pause on hover
    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -380 : 380,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase">
              Real Reviews · Real Customers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by <span className="gradient-text">10,000+</span> Shoppers.
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                canScrollLeft ? "border-border hover:bg-accent text-foreground" : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                canScrollRight ? "border-border hover:bg-accent text-foreground" : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar snap-x-mandatory pl-4 sm:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-8"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
