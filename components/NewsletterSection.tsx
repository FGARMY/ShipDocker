"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";

export function NewsletterSection() {
  // FILE: components/NewsletterSection.tsx
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

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

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <section className="relative py-20 px-4 overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600"
          alt="Success Background"
          fill
          className="object-cover opacity-40 grayscale"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-green-500 rounded-full mb-6 shadow-xl shadow-green-500/40">
            <CheckCircle2 className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            You&apos;re in! <br />
            <span className="text-green-400">Check your inbox for your 10% off code.</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-28 px-4 bg-black overflow-hidden">
      {/* Dynamic Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1534452203294-49c8913721b2?w=1600"
        alt="Newsletter Background"
        fill
        className="object-cover opacity-50 grayscale hover:scale-105 transition-transform duration-[10s]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="glass-strong p-8 sm:p-12 rounded-[2.5rem] border border-white/10 text-center shadow-2xl overflow-hidden backdrop-blur-2xl">
          {/* Decorative mesh */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white mb-6 uppercase tracking-widest border border-white/5">
            <Sparkles size={12} className="text-amber-400" />
            Join the inner circle
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Stay in the loop. <br />
            <span className="text-white/50 italic font-serif">Get 10% off today.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto font-medium">
            Be the first to hear about new drops, exclusive deals and 
            limited edition colorways.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/30 transition-all font-medium backdrop-blur-md"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-white/90 transition-all disabled:opacity-50 flex items-center gap-2 min-w-[140px] justify-center shadow-xl shadow-white/10"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    ...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {error && (
              <p className="mt-4 text-sm text-red-400 font-bold">{error}</p>
            )}
          </form>
          
          <p className="mt-6 text-[10px] text-white/30 uppercase tracking-widest font-bold">
            No spam. No bullshit. Just good products.
          </p>
        </div>
      </div>
    </section>
  );
}
