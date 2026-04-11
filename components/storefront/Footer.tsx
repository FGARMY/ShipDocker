"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Mail, Instagram, Twitter, Facebook, Check, Loader2 } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Trending", href: "/collections/trending" },
    { label: "Sale", href: "/collections/sale" },
  ],
  Support: [
    { label: "Contact Us", href: "/pages/contact" },
    { label: "FAQ", href: "/pages/faq" },
    { label: "Shipping Info", href: "/pages/shipping" },
    { label: "Returns Policy", href: "/pages/returns" },
  ],
  Company: [
    { label: "About Us", href: "/pages/about" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/pages/privacy" },
    { label: "Terms of Service", href: "/pages/terms" },
  ],
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setErrorMsg("Please enter your email"); return; }
    if (!isValidEmail(email)) { setErrorMsg("Please enter a valid email"); return; }

    setStatus("loading");
    setErrorMsg("");

    // Simulate API call — replace with actual newsletter endpoint
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Check size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">You&apos;re in! 🎉</p>
          <p className="text-xs text-muted-foreground">Check your inbox for your 10% off code.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto">
      <div className="flex gap-2">
        <div className="relative flex-1 md:w-72">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            aria-label="Email for newsletter"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60 flex items-center gap-2"
        >
          {status === "loading" ? (
            <><Loader2 size={14} className="animate-spin" /> Subscribing...</>
          ) : (
            "Get 10% Off"
          )}
        </button>
      </div>
      {errorMsg && <p className="text-xs text-red-500 mt-1.5 ml-1">{errorMsg}</p>}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">Get 10% Off Your First Order</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Join 8,000+ Indian shoppers. Get exclusive deals, new drops & your discount code instantly.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <span className="text-lg font-bold">ShipDocker</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Premium products, unbeatable prices. Your one-stop shop for trending products delivered across India.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label="Social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ShipDocker. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Package size={14} />
              Powered by ShipDocker
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
