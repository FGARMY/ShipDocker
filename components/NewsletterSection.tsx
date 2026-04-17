"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Sparkles, Copy, Check, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const validateEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("FIRST250");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "success") {
    return (
      <section className="section-padding">
        <div className="container-max">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-border/50 p-12 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-green-500 rounded-full mb-6 shadow-xl shadow-green-500/20">
              <CheckCircle2 className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              You&apos;re in! 🎉
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Check your inbox for your exclusive <span className="font-bold text-primary">₹250 off</span> coupon code.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-border/50 p-8 sm:p-12 lg:p-16">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 rounded-full text-[10px] font-bold text-primary mb-6 uppercase tracking-widest">
              <Sparkles size={12} />
              Exclusive Offer
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Get <span className="gradient-text">₹250 Off</span> Your First Order.
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-lg mx-auto">
              Join 10,000+ insiders who get early access to new drops, flash sales,
              and members-only discounts.
            </p>

            {/* Promo code */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border/50 rounded-xl mb-8 shadow-sm">
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Your Code</p>
                <p className="text-lg font-black tracking-tight text-primary">FIRST250</p>
              </div>
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  placeholder="Enter your email address"
                  className="w-full sm:flex-1 px-5 py-4 bg-card border border-border/50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 justify-center shadow-lg shadow-primary/20 text-sm min-h-[52px]"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Claim Now
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
              )}
            </form>

            <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
