"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Mail, Instagram, Twitter, Facebook, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <footer className="bg-card border-t border-border mt-auto pt-12 pb-8">
      <div className="container-max">
        {/* Top Section: Desktop layout */}
        <div className="hidden lg:flex flex-row gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="flex-1 max-w-sm">
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Premium products, unbeatable prices. Your one-stop shop for trending products delivered across India.
            </p>
            <SocialLinks />
          </div>

          {/* Links Grid */}
          <div className="flex-[2] grid grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-widest">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex-1 max-w-sm">
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Get 10% Off</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Join 8,000+ Indian shoppers. Get exclusive deals & your discount code instantly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-10">
          {/* Tablet Grid for Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* Logo Section (Mobile/Tablet) */}
            <div className="md:col-span-1">
              <Logo />
              <p className="text-sm text-muted-foreground mt-4 mb-6">
                Premium products delivered across India.
              </p>
              <SocialLinks />
            </div>

            {/* Newsletter (Mobile/Tablet) */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-primary">Stay in the loop</h4>
              <NewsletterForm />
            </div>

            {/* Links - Accordion on Mobile, Static on Tablet */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="border-b border-border md:border-none">
                <button
                  onClick={() => toggleSection(title)}
                  className="w-full py-4 flex items-center justify-between md:cursor-default md:pointer-events-none min-h-[44px]"
                >
                  <h4 className="font-bold text-sm uppercase tracking-widest">{title}</h4>
                  <span className={cn(
                    "md:hidden transition-transform duration-200",
                    openSections[title] ? "rotate-180" : ""
                  )}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </button>
                <ul className={cn(
                  "space-y-3 pb-4 md:pb-0 md:block",
                  openSections[title] ? "block" : "hidden"
                )}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground py-2 block min-h-[44px]">
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
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} SMDrop India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 grayscale opacity-50">
              <Package size={14} />
              Powered by SMDrop
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 min-h-[44px]">
      <img src="/logo.png" alt="SMDrop Logo" className="w-10 h-10 object-contain" />
      <span className="text-lg font-bold">SMDrop</span>
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {[Instagram, Twitter, Facebook].map((Icon, i) => (
        <a
          key={i}
          href="#"
          className="w-11 h-11 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
          aria-label="Social"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
