"use client";

import { Lock } from "lucide-react";

const PAYMENT_ICONS = [
  {
    name: "UPI",
    svg: (
      <svg viewBox="0 0 48 32" className="h-6 w-auto shrink-0" aria-label="UPI">
        <rect width="48" height="32" rx="4" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
        <text x="24" y="20" textAnchor="middle" fill="#00695C" fontSize="11" fontWeight="700" fontFamily="system-ui">UPI</text>
      </svg>
    ),
  },
  {
    name: "Razorpay",
    svg: (
      <svg viewBox="0 0 48 32" className="h-6 w-auto shrink-0" aria-label="Razorpay">
        <rect width="48" height="32" rx="4" fill="#072654" />
        <text x="24" y="20" textAnchor="middle" fill="#3395FF" fontSize="8" fontWeight="700" fontFamily="system-ui">Razorpay</text>
      </svg>
    ),
  },
  {
    name: "Visa",
    svg: (
      <svg viewBox="0 0 48 32" className="h-6 w-auto shrink-0" aria-label="Visa">
        <rect width="48" height="32" rx="4" fill="#1a1f71" />
        <text x="24" y="20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui">VISA</text>
      </svg>
    ),
  },
  {
    name: "Mastercard",
    svg: (
      <svg viewBox="0 0 48 32" className="h-6 w-auto shrink-0" aria-label="Mastercard">
        <rect width="48" height="32" rx="4" fill="#000000" />
        <circle cx="19" cy="16" r="8" fill="#eb001b" />
        <circle cx="29" cy="16" r="8" fill="#f79e1b" />
        <path d="M24 9.5a8 8 0 010 13" fill="#ff5f00" />
      </svg>
    ),
  },
];

export function TrustBar() {
  return (
    <div className="border-t border-border bg-card/50 py-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Security Signal */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap shrink-0">
            <Lock size={14} className="text-green-500" />
            <span>Secure checkout · 256-bit SSL</span>
          </div>

          {/* Spacer / Divider hidden on mobile */}
          <div className="hidden sm:block w-px h-4 bg-border" />

          {/* Icons container - scrollable horizontally on mobile, wrapped on desktop */}
          <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="flex items-center sm:justify-center gap-2 min-w-max px-1">
              {PAYMENT_ICONS.map((p) => (
                <div key={p.name} title={p.name} className="opacity-80 hover:opacity-100 transition-opacity">
                  {p.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
