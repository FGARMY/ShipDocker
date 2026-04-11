"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils/cn";

export default function AccountPage() {
  const { isAuthenticated, customer, logout } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "", password: "", firstName: "", lastName: "",
  });

  const updateField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = mode === "register"
        ? "/api/customers"
        : "/api/customers?action=login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      useAuthStore.getState().login(data.token, data.refreshToken, data.customer);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated && customer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-4">
              {(customer.firstName || customer.email)[0].toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold">
              Welcome back{customer.firstName ? `, ${customer.firstName}` : ""}!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{customer.email}</p>
          </div>

          <div className="grid gap-3">
            <Link
              href="/account/orders"
              className="flex items-center justify-between px-6 py-4 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="font-medium">📦 My Orders</span>
              <ArrowRight size={16} className="text-muted-foreground" />
            </Link>
            <Link
              href="/account/profile"
              className="flex items-center justify-between px-6 py-4 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="font-medium">👤 Edit Profile</span>
              <ArrowRight size={16} className="text-muted-foreground" />
            </Link>
            <Link
              href="/account/addresses"
              className="flex items-center justify-between px-6 py-4 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="font-medium">📍 Address Book</span>
              <ArrowRight size={16} className="text-muted-foreground" />
            </Link>
            <button
              onClick={logout}
              className="flex items-center justify-between px-6 py-4 rounded-2xl border border-border bg-card hover:bg-destructive/5 hover:border-destructive/20 transition-colors text-left"
            >
              <span className="font-medium text-destructive">🚪 Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "login" ? "Sign in to your account" : "Start shopping with us"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-accent p-1 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all",
                mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              )}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} placeholder="First Name" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
              </div>
              <div>
                <input value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Last Name" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
              </div>
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={form.email} onChange={(e) => updateField("email", e.target.value)} type="email" placeholder="Email address" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" required />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={form.password} onChange={(e) => updateField("password", e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" required minLength={mode === "register" ? 8 : 1} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-500/10 px-4 py-2.5 rounded-xl">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 disabled:opacity-50"
          >
            {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
