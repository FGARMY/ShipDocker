"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Wifi, WifiOff, RefreshCw, Settings, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SUPPLIER_TYPES } from "@/lib/utils/constants";

const SUPPLIERS = [
  { id: "s1", name: "AliExpress Global", type: "ALIEXPRESS", isActive: true, products: 8, lastSync: "2 hours ago", status: "connected" },
  { id: "s2", name: "CJ Dropshipping", type: "CJ_DROPSHIPPING", isActive: true, products: 4, lastSync: "30 min ago", status: "connected" },
  { id: "s3", name: "Printful", type: "PRINTFUL", isActive: false, products: 0, lastSync: "Never", status: "disconnected" },
];

export default function AdminSuppliersPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{SUPPLIERS.length} connected suppliers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
        >
          <Plus size={16} />
          Add Supplier
        </button>
      </div>

      {/* Supplier Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUPPLIERS.map((supplier, i) => {
          const typeInfo = SUPPLIER_TYPES[supplier.type as keyof typeof SUPPLIER_TYPES];
          return (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-5 rounded-2xl border bg-card transition-all",
                supplier.isActive ? "border-border" : "border-border/50 opacity-60"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-lg">
                    {typeInfo?.icon || "⚙️"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{supplier.name}</h3>
                    <p className="text-xs text-muted-foreground">{typeInfo?.label || supplier.type}</p>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
                  supplier.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-500"
                )}>
                  {supplier.isActive ? <Wifi size={10} /> : <WifiOff size={10} />}
                  {supplier.isActive ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">{supplier.products}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Sync</span>
                  <span className="font-medium">{supplier.lastSync}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                  <RefreshCw size={12} />
                  Sync
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                  <Settings size={12} />
                  Settings
                </button>
                <button className="py-2 px-3 text-xs bg-accent hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Add new supplier card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="p-5 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-accent/20 hover:bg-accent/40 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Plus size={20} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Add New Supplier</p>
            <p className="text-xs text-muted-foreground mt-0.5">Connect AliExpress, CJ, Printful & more</p>
          </div>
        </button>
      </div>

      {/* Supported suppliers info */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-bold mb-4">Supported Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(SUPPLIER_TYPES).map(([key, info]) => (
            <div key={key} className="flex items-center gap-2 p-3 rounded-xl bg-accent/50">
              <span className="text-lg">{info.icon}</span>
              <span className="text-xs font-medium">{info.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
