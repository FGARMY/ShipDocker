"use client";

import { Truck, RotateCcw, Zap } from "lucide-react";

export function TrustBar() {
  return (
    // FILE: components/TrustBar.tsx
    <div className="w-full border-t border-border bg-card/50 backdrop-blur-sm section-padding">
      <div className="container-max">
        {/* Main Trust Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          
          {/* Item 1: Free Shipping */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck size={22} />
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Free Shipping</span>
          </div>

          {/* Item 2: Secure Payments (Mobile: Item in grid, Desktop: Combined with Icons) */}
          <div className="flex flex-col items-center md:flex-row md:justify-center md:col-span-1 gap-3 md:gap-4">
            <div className="flex flex-col items-center gap-3 md:hidden">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Secure Payments</span>
            </div>
            
            {/* Desktop Version with inline text */}
            <div className="hidden md:flex flex-col items-center gap-2">
               <div className="flex items-center gap-2">
                 {/* UPI */}
                 <span className="font-bold text-xs text-[#6B3FA0]">UPI</span>
                 {/* Visa */}
                 <svg width="32" height="12" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><rect width="750" height="471" rx="40" fill="#1A1F71"/><text x="375" y="320" textAnchor="middle" fontSize="280" fontWeight="700" fill="white" fontStyle="italic">VISA</text></svg>
                 {/* Mastercard */}
                 <svg width="24" height="16" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="12" r="12" fill="#EB001B"/><circle cx="24" cy="12" r="12" fill="#F79E1B" opacity="0.9"/></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secure Payments</span>
            </div>
          </div>

          {/* Item 3: Easy Returns */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RotateCcw size={22} />
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Easy Returns</span>
          </div>

          {/* Item 4: Fast Delivery */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap size={22} />
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Fast Delivery</span>
          </div>

        </div>

        {/* Mobile Payment Icons - Fix 5: Horizontal Scroll */}
        <div className="mt-10 md:hidden overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center justify-center gap-6 min-w-max px-4">
            <span className="font-bold text-sm text-[#6B3FA0] opacity-60">UPI</span>
            <svg width="40" height="16" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><rect width="750" height="471" rx="40" fill="#1A1F71"/><text x="375" y="320" textAnchor="middle" fontSize="280" fontWeight="700" fill="white" fontStyle="italic">VISA</text></svg>
            <svg width="34" height="22" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="12" r="12" fill="#EB001B"/><circle cx="24" cy="12" r="12" fill="#F79E1B" opacity="0.9"/></svg>
            <svg width="20" height="24" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="0,30 10,0 24,0 14,30" fill="#3395FF"/></svg>
            <span className="text-[10px] font-black tracking-tighter opacity-40">RAZORPAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
