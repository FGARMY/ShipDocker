"use client";

import { Plus, DollarSign, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const RULES = [
  { id: "r1", name: "Default 2x Markup", type: "MULTIPLIER", value: 2, appliedTo: "All Products", isActive: true, roundTo: 0.99 },
  { id: "r2", name: "Electronics Premium", type: "MULTIPLIER", value: 2.5, appliedTo: "Tag: electronics", isActive: true, roundTo: 0.99 },
  { id: "r3", name: "Accessories Markup", type: "PERCENTAGE", value: 120, appliedTo: "Tag: accessories", isActive: false, roundTo: null },
];

export default function AdminPricingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pricing Rules</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Auto-calculate sell prices from supplier cost</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
          <Plus size={16} />
          Add Rule
        </button>
      </div>

      <div className="space-y-3">
        {RULES.map((rule) => (
          <div key={rule.id} className={cn("p-5 rounded-2xl border bg-card", rule.isActive ? "border-border" : "border-border/50 opacity-60")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{rule.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rule.type === "MULTIPLIER" ? `Cost × ${rule.value}` : `Cost + ${rule.value}%`}
                    {rule.roundTo ? ` → round to .${(rule.roundTo * 100).toFixed(0)}` : ""}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full", rule.isActive ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-500")}>
                  {rule.isActive ? "Active" : "Inactive"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{rule.appliedTo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-bold mb-3">How Pricing Rules Work</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="px-3 py-1.5 bg-accent rounded-lg font-medium">Supplier Cost</span>
          <ArrowRight size={14} />
          <span className="px-3 py-1.5 bg-accent rounded-lg font-medium">× Markup Rule</span>
          <ArrowRight size={14} />
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-medium">Sell Price</span>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Rules are applied in priority order. Specific product/tag rules override the default rule.
        </p>
      </div>
    </div>
  );
}
