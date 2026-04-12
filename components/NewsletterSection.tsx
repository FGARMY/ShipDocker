"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <section className="py-16 text-center px-4 bg-accent/30 flex flex-col items-center">
        <h2 className="text-2xl font-bold">You're in! Check your inbox.</h2>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-accent/30 text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Get 10% off</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm w-full mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-2 border rounded outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          Subscribe
        </button>
      </form>
    </section>
  );
}
