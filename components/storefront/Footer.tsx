"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Mail, Instagram, Twitter, Facebook, Check, Loader2, ShieldCheck, Truck, RotateCcw, Zap, CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FOOTER_LINKS = {
  "Shop Lifestyle": [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Bestsellers", href: "/collections/trending" },
    { label: "Electronics", href: "/collections/electronics" },
    { label: "Accessories", href: "/collections/accessories" },
  ],
  "Our Service": [
    { label: "Track Order", href: "/account/orders" },
    { label: "Shipping Policy", href: "/pages/shipping" },
    { label: "Returns Center", href: "/pages/returns" },
    { label: "Help Center (FAQ)", href: "/pages/faq" },
  ],
  "The Company": [
    { label: "About SMDrop", href: "/pages/about" },
    { label: "Authenticity", href: "/pages/authenticity" },
    { label: "Privacy Policy", href: "/pages/privacy" },
    { label: "Terms of Service", href: "/pages/terms" },
  ],
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-green-500/5 border border-green-500/10 rounded-2xl">
        <Check size={18} className="text-green-500" />
        <p className="text-sm font-semibold text-green-600">You're in! 🎉</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full pl-12 pr-4 py-4 bg-accent/30 border border-border/30 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Join
        </button>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-24 pt-24 pb-12">
      <div className="container-max">
        {/* Top: Trust Badges (Minimal) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-border mb-16">
            {[
                { icon: ShieldCheck, title: "100% Secure", desc: "Trusted SSL" },
                { icon: CreditCard, title: "Payments", desc: "UPI, Cards, EMI" },
                { icon: Lock, title: "Privacy", desc: "Data Encrypted" },
                { icon: Truck, title: "Express", desc: "Fast Delivery" },
            ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary flex-shrink-0">
                        <item.icon size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest">{item.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                <Package className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SM<span className="gradient-text">Drop</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your destination for premium electronics and lifestyle gear. 
              Join 10,000+ satisfied customers across India.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-accent/50 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="lg:col-span-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-8">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-1 min-w-[200px]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-8">
              Join the Insider
            </h4>
            <NewsletterForm />
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed uppercase tracking-widest font-semibold opacity-50">
                Early drops & exclusive price-cuts.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} SMDrop India. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6 grayscale opacity-30">
            {/* Payment Icons Simulation */}
            <span className="text-[9px] font-bold uppercase tracking-widest">VISA</span>
            <span className="text-[9px] font-bold uppercase tracking-widest">MASTERCARD</span>
            <span className="text-[9px] font-bold uppercase tracking-widest">UPI</span>
            <span className="text-[9px] font-bold uppercase tracking-widest">RAZORPAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
