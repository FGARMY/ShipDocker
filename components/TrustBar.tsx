"use client";

import { Truck, RotateCcw, Zap } from "lucide-react";

export function TrustBar() {
  return (
    // FILE: components/TrustBar.tsx
    <div className="w-full border-t border-border bg-card/50 backdrop-blur-sm py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          
          {/* Item 1: Free Shipping */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck size={20} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free Shipping</span>
          </div>

          {/* Item 2: Secure Payments (Icons) */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {/* UPI */}
              <svg width="32" height="14" viewBox="0 0 80 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="26" fontSize="28" fontWeight="700" fill="#6B3FA0">UPI</text>
              </svg>
              {/* Visa */}
              <svg width="38" height="14" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg">
                <rect width="750" height="471" rx="40" fill="#1A1F71"/>
                <text x="375" y="320" textAnchor="middle" fontSize="280" fontWeight="700" fill="white" fontStyle="italic">VISA</text>
              </svg>
              {/* Mastercard */}
              <svg width="28" height="18" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="12" r="12" fill="#EB001B"/>
                <circle cx="24" cy="12" r="12" fill="#F79E1B" opacity="0.9"/>
              </svg>
              {/* Razorpay */}
              <svg width="14" height="18" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,30 10,0 24,0 14,30" fill="#3395FF"/>
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Secure Payments</span>
          </div>

          {/* Item 3: Easy Returns */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RotateCcw size={20} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Easy Returns</span>
          </div>

          {/* Item 4: Fast Delivery */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap size={20} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fast Delivery</span>
          </div>

        </div>
      </div>
    </div>
  );
}
