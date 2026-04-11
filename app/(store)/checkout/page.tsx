"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, Truck, User, ShieldCheck, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const STEPS = [
  { id: 1, title: "Contact", icon: User },
  { id: 2, title: "Shipping", icon: Truck },
  { id: 3, title: "Payment", icon: CreditCard },
  { id: 4, title: "Confirm", icon: Check },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { items, getSubtotal, discount, couponCode, clearCart } = useCartStore();

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "IN",
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 ? 0 : 79;
  const tax = Math.round((subtotal - discount) * 0.18 * 100) / 100;
  const total = subtotal - discount + shipping + tax;

  const updateField = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create checkout order
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          customerEmail: form.email,
          customerName: form.name,
          shippingAddress: {
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            country: form.country,
            zip: form.zip,
            phone: form.phone,
          },
          couponCode,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay
      const options = {
        key: data.key,
        amount: Math.round(data.amount * 100),
        currency: data.currency,
        name: "ShipDocker",
        description: "Order Payment",
        order_id: data.razorpayOrderId,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          // 3. Confirm payment
          const confirmRes = await fetch("/api/checkout/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const confirmData = await confirmRes.json();
          if (confirmRes.ok) {
            setOrderId(confirmData.orderId);
            setStep(4);
            clearCart();
          } else {
            alert(confirmData.error || "Payment verification failed");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#6366f1",
        },
      };

      // Load Razorpay dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/products" className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all",
                step >= s.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-accent text-muted-foreground"
              )}
            >
              {step > s.id ? <Check size={16} /> : s.id}
            </div>
            <span className={cn("text-xs sm:text-sm font-medium hidden sm:block", step >= s.id ? "text-foreground" : "text-muted-foreground")}>
              {s.title}
            </span>
            {i < STEPS.length - 1 && (
              <div className={cn("w-8 sm:w-16 h-0.5 rounded-full", step > s.id ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            {/* Step 1: Contact */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input value={form.email} onChange={(e) => updateField("email", e.target.value)} type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.name || !form.email}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Continue to Shipping <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <input value={form.line1} onChange={(e) => updateField("line1", e.target.value)} placeholder="Address Line 1" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input value={form.line2} onChange={(e) => updateField("line2", e.target.value)} placeholder="Address Line 2 (optional)" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="City" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                  <input value={form.state} onChange={(e) => updateField("state", e.target.value)} placeholder="State" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input value={form.zip} onChange={(e) => updateField("zip", e.target.value)} placeholder="PIN Code" className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                  <select value={form.country} onChange={(e) => updateField("country", e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">UAE</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3.5 border border-border rounded-xl font-medium hover:bg-accent transition-colors text-sm">
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!form.line1 || !form.city || !form.zip}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Payment</h2>
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={20} className="text-primary" />
                    <span className="text-sm font-medium">Secure payment via Razorpay</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll be redirected to Razorpay&apos;s secure payment gateway to complete your purchase.
                    We accept UPI, Net Banking, Credit/Debit Cards, and Wallets.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-3.5 border border-border rounded-xl font-medium hover:bg-accent transition-colors text-sm">
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                    Pay {formatCurrency(total)}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <Check size={32} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                <p className="text-muted-foreground mt-2">Thank you for your purchase.</p>
                <p className="text-sm text-muted-foreground mt-1">Order ID: <span className="font-mono font-semibold text-foreground">{orderId}</span></p>
                <div className="flex gap-3 justify-center mt-8">
                  <Link href={`/order/${orderId}`} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all">
                    Track Order
                  </Link>
                  <Link href="/products" className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-accent transition-all">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-5 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">{item.title} × {item.quantity}</span>
                    <span className="font-medium whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-3 border-t border-border text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-500"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (GST 18%)</span><span>{formatCurrency(tax)}</span></div>
                <div className="flex justify-between pt-2 border-t border-border font-bold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
