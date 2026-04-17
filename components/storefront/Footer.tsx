"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Mail, Instagram, Twitter, Facebook, Check, ShieldCheck, Truck, CreditCard, Lock, Phone, MapPin, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  "Shop": [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Bestsellers", href: "/collections/trending" },
    { label: "Electronics", href: "/collections/electronics" },
    { label: "Accessories", href: "/collections/accessories" },
    { label: "All Products", href: "/products" },
  ],
  "Support": [
    { label: "Track Order", href: "/account/orders" },
    { label: "Shipping Policy", href: "/pages/shipping" },
    { label: "Returns Center", href: "/pages/returns" },
    { label: "Help Center (FAQ)", href: "/pages/faq" },
    { label: "WhatsApp Support", href: "https://wa.me/919XXXXXXXXX" },
  ],
  "Company": [
    { label: "About SMDrop", href: "/pages/about" },
    { label: "Authenticity", href: "/pages/authenticity" },
    { label: "Privacy Policy", href: "/pages/privacy" },
    { label: "Terms of Service", href: "/pages/terms" },
    { label: "Contact Us", href: "/pages/contact" },
  ],
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      <div className="flex items-center gap-3 px-4 py-3 bg-green-500/5 border border-green-500/10 rounded-xl">
        <Check size={18} className="text-green-500" />
        <p className="text-sm font-semibold text-green-600">You&apos;re in! 🎉</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full pl-11 pr-4 py-3.5 bg-accent/30 border border-border/30 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Join
        </button>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16 pt-16 pb-8">
      <div className="container-max">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-border mb-12">
          {[
            { icon: ShieldCheck, title: "100% Secure", desc: "Trusted SSL Checkout" },
            { icon: CreditCard, title: "All Payments", desc: "UPI, Cards, COD, EMI" },
            { icon: Lock, title: "Data Privacy", desc: "Encrypted & Protected" },
            { icon: Truck, title: "Free Delivery", desc: "On Orders Above ₹999" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary flex-shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Info + Contact */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                <Package className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SM<span className="gradient-text">Drop</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your destination for premium products at unbeatable prices.
              Join 10,000+ satisfied customers across India.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={14} className="text-primary" />
                <span>support@smdrop.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={14} className="text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
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
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">
              Stay Updated
            </h4>
            <NewsletterForm />
            <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
              Get early access to deals and new drops.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} SMDrop India. All Rights Reserved.
            </p>
            <span className="text-xs">🇮🇳</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Payment Icons */}
            <div className="flex items-center gap-4 opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-widest">VISA</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">MASTERCARD</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">UPI</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">COD</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">RAZORPAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
