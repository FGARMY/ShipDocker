"use client";

import { Truck, ShieldCheck, RotateCcw, Banknote } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Truck, label: "Free Shipping", sub: "Orders above ₹999" },
  { icon: Banknote, label: "COD Available", sub: "Pay on delivery" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day hassle-free" },
];

export function TrustStrip() {
  return (
    <section className="relative z-20 border-y border-border/50 bg-accent/30 backdrop-blur-sm">
      <div className="container-max py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {item.label}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
