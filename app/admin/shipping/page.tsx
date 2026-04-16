"use client";

import { MapPin, Plus, Globe } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

const ZONES = [
  {
    id: "z1", name: "India", countries: ["IN"],
    rates: [
      { name: "Standard Shipping", type: "Flat Rate", price: 79, freeAbove: 999 },
      { name: "Express Shipping", type: "Flat Rate", price: 199, freeAbove: null },
    ],
  },
  {
    id: "z2", name: "International", countries: ["US", "GB", "AE", "SG"],
    rates: [
      { name: "International Standard", type: "Flat Rate", price: 499, freeAbove: 2999 },
    ],
  },
];

export default function AdminShippingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shipping</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage shipping zones and rates</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
          <Plus size={16} />
          Add Zone
        </button>
      </div>

      <div className="space-y-4">
        {ZONES.map((zone) => (
          <div key={zone.id} className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{zone.name}</h3>
                  <p className="text-xs text-muted-foreground">{zone.countries.join(", ")}</p>
                </div>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">Edit Zone</button>
            </div>
            <div className="space-y-3">
              {zone.rates.map((rate, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl bg-accent/30">
                  <div>
                    <p className="text-sm font-medium">{rate.name}</p>
                    <p className="text-xs text-muted-foreground">{rate.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatCurrency(rate.price)}</p>
                    {rate.freeAbove && <p className="text-xs text-green-600">Free above {formatCurrency(rate.freeAbove)}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
