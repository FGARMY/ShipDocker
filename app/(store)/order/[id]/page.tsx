"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Clock, Truck, CheckCircle2, ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const DEMO_ORDER = {
  id: "SD-M1X2Y3-A4B5",
  status: "SHIPPED",
  paymentStatus: "PAID",
  customerName: "Rahul Sharma",
  customerEmail: "rahul@example.com",
  total: 2098,
  subtotal: 1798,
  shipping: 0,
  discount: 0,
  tax: 300,
  createdAt: "2024-12-20T10:30:00Z",
  items: [
    { title: "Smart Watch Ultra Fitness", variant: "Midnight Black", quantity: 1, price: 1799, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" },
  ],
  shippingAddress: { line1: "42 MG Road", city: "Pune", state: "Maharashtra", zip: "411001", country: "IN" },
  tracking: { number: "TRACKYN7X2K9", carrier: "YunExpress", url: "https://track.yunexpress.com" },
  timeline: [
    { status: "Order Placed", date: "Dec 20, 2024 10:30 AM", completed: true },
    { status: "Payment Confirmed", date: "Dec 20, 2024 10:31 AM", completed: true },
    { status: "Sent to Supplier", date: "Dec 20, 2024 11:00 AM", completed: true },
    { status: "Shipped", date: "Dec 22, 2024 3:15 PM", completed: true },
    { status: "In Transit", date: "Dec 24, 2024", completed: true },
    { status: "Out for Delivery", date: "Estimated Dec 28", completed: false },
    { status: "Delivered", date: "", completed: false },
  ],
};

const STATUS_ICONS: Record<string, typeof Package> = {
  "Order Placed": Clock,
  "Payment Confirmed": CheckCircle2,
  "Sent to Supplier": Package,
  "Shipped": Truck,
  "In Transit": Truck,
  "Out for Delivery": MapPin,
  "Delivered": CheckCircle2,
};

export default function OrderTrackingPage() {
  const order = DEMO_ORDER;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <p className="text-sm text-muted-foreground mt-1">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex gap-2">
            <span className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-full",
              order.status === "DELIVERED" ? "bg-green-500/10 text-green-600" :
              order.status === "SHIPPED" ? "bg-blue-500/10 text-blue-600" :
              "bg-amber-500/10 text-amber-600"
            )}>
              {order.status}
            </span>
            <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-500/10 text-green-600">
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="p-6 rounded-2xl border border-border bg-card mb-6">
          <h2 className="font-bold mb-6">Tracking Timeline</h2>
          <div className="relative">
            {order.timeline.map((step, i) => {
              const Icon = STATUS_ICONS[step.status] || Package;
              return (
                <div key={step.status} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-muted-foreground"
                    )}>
                      <Icon size={14} />
                    </div>
                    {i < order.timeline.length - 1 && (
                      <div className={cn(
                        "w-0.5 flex-1 mt-1.5",
                        step.completed ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={cn("text-sm font-medium", !step.completed && "text-muted-foreground")}>
                      {step.status}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {order.tracking.number && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Tracking Number</p>
                <p className="text-sm font-mono font-semibold">{order.tracking.number}</p>
              </div>
              <a
                href={order.tracking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors"
              >
                Track on {order.tracking.carrier} <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="p-6 rounded-2xl border border-border bg-card mb-6">
          <h2 className="font-bold mb-4">Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-accent/30 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.variant} · Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h2 className="font-bold mb-3">Shipping Address</h2>
            <p className="text-sm text-muted-foreground">
              {order.customerName}<br />
              {order.shippingAddress.line1}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h2 className="font-bold mb-3">Payment Summary</h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between pt-2 border-t border-border font-bold"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
