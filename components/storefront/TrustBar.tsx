"use client";

import { Shield, Lock, BadgeCheck, Undo2 } from "lucide-react";

const PAYMENT_ICONS = [
  { name: "UPI", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="UPI">
      <rect width="48" height="32" rx="4" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="24" y="20" textAnchor="middle" fill="#00695C" fontSize="11" fontWeight="700" fontFamily="system-ui">UPI</text>
    </svg>
  )},
  { name: "Visa", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#1a1f71"/>
      <text x="24" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui">VISA</text>
    </svg>
  )},
  { name: "Mastercard", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Mastercard">
      <rect width="48" height="32" rx="4" fill="#000000"/>
      <circle cx="19" cy="16" r="8" fill="#eb001b"/>
      <circle cx="29" cy="16" r="8" fill="#f79e1b"/>
      <path d="M24 9.5a8 8 0 010 13" fill="#ff5f00"/>
    </svg>
  )},
  { name: "Razorpay", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Razorpay">
      <rect width="48" height="32" rx="4" fill="#072654"/>
      <text x="24" y="20" textAnchor="middle" fill="#3395FF" fontSize="8" fontWeight="700" fontFamily="system-ui">Razorpay</text>
    </svg>
  )},
  { name: "PayPal", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="PayPal">
      <rect width="48" height="32" rx="4" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="24" y="20" textAnchor="middle" fill="#003087" fontSize="8.5" fontWeight="700" fontFamily="system-ui">PayPal</text>
    </svg>
  )},
  { name: "RuPay", svg: (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="RuPay">
      <rect width="48" height="32" rx="4" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="24" y="20" textAnchor="middle" fill="#0074df" fontSize="9" fontWeight="700" fontFamily="system-ui">RuPay</text>
    </svg>
  )},
];

const TRUST_ITEMS = [
  { icon: Lock, text: "256-bit SSL Secured" },
  { icon: Shield, text: "100% Payment Protection" },
  { icon: Undo2, text: "7-Day Easy Returns" },
  { icon: BadgeCheck, text: "Genuine Products" },
];

export function TrustBar() {
  return (
    <section className="border-t border-border bg-card/80 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-5">
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon size={15} className="text-green-500 flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Payment icons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-muted-foreground mr-1">We accept:</span>
          {PAYMENT_ICONS.map((p) => (
            <div key={p.name} title={p.name} className="opacity-80 hover:opacity-100 transition-opacity">
              {p.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Compact inline version for cart/checkout sidebar */
export function TrustBarCompact() {
  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {PAYMENT_ICONS.map((p) => (
          <div key={p.name} title={p.name} className="opacity-70">
            {p.svg}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Lock size={12} className="text-green-500" /> SSL Secured</span>
        <span className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> Safe Payments</span>
      </div>
    </div>
  );
}
