"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import { TrustBar } from "@/components/TrustBar";
import { useCartStore, type CartItem } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export default function CartPage() {
  const { items, updateQuantity, removeItem, couponCode, discount, applyCoupon, removeCoupon, getSubtotal, getTotal } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 ? 0 : 79;
  const total = getTotal() + shipping;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput, subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon");
        return;
      }
      applyCoupon(data.code, data.discount);
    } catch {
      setCouponError("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/products" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItemRow key={item.variantId} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-4">
              {couponCode ? (
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{couponCode}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-500">FREE</span> : formatCurrency(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Free shipping on orders over ₹999</p>
              )}
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-primary/25"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Taxes calculated at checkout
            </p>

            <div className="mt-4 pt-4 border-t border-border -mx-6 px-6 sm:mx-0 sm:px-0">
              <TrustBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-accent/30 flex-shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.title} fill sizes="120px" quality={85} className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={24} className="text-muted-foreground" /></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm sm:text-base truncate">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
          </div>
          <button
            onClick={() => removeItem(item.variantId)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-end justify-between mt-3">
          {/* Quantity */}
          <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="px-2.5 py-1.5 hover:bg-accent transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-1.5 text-sm font-medium border-x border-border min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="px-2.5 py-1.5 hover:bg-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">{formatCurrency(item.price)} each</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
