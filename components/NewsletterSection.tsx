"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg("Please enter your email address");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to subscribe. Please try again.");
    }
  };

  // ── Success state ──
  if (status === "success") {
    return (
      <section className="w-full py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold">You&apos;re in! 🎉</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Check your inbox — your 10% off code is on its way.
          </p>
        </div>
      </section>
    );
  }

  // ── Idle / Loading / Error state ──
  return (
    <section className="w-full py-16 px-4 bg-accent/30">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Don&apos;t Miss Out
        </h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Get 10% off your first order + early access to new drops.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {/* Email input */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your email"
              aria-label="Email address"
              className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-red-500">
              <AlertCircle size={13} />
              {errorMsg}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Subscribing…
              </>
            ) : (
              "Get 10% Off →"
            )}
          </button>

          <p className="text-[11px] text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
