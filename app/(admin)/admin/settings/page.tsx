"use client";

import { useState } from "react";
import { Save, Store, CreditCard, Mail, Globe, Shield, Bell } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "general", label: "General", icon: Store },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "email", label: "Email", icon: Mail },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            saved
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
          )}
        >
          <Save size={16} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab navigation */}
        <div className="hidden lg:block w-48 space-y-1 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden w-full overflow-x-auto flex gap-1.5 mb-4 pb-2">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap", activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground")}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h3 className="font-bold">Store Information</h3>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Store Name</label>
                  <input defaultValue="ShipDocker Store" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Store Domain</label>
                  <input defaultValue="store.shipdocker.com" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Currency</label>
                    <select defaultValue="INR" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Timezone</label>
                    <select defaultValue="Asia/Kolkata" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h3 className="font-bold">Tax Settings</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Enable GST</p>
                    <p className="text-xs text-muted-foreground">Apply 18% GST on all orders</p>
                  </div>
                  <button className="w-11 h-6 bg-primary rounded-full relative">
                    <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">GST Rate (%)</label>
                  <input defaultValue="18" type="number" className="w-32 px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <CreditCard size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Razorpay</h3>
                    <p className="text-xs text-green-600">Connected</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Key ID</label>
                  <input defaultValue="rzp_test_xxxxxxxxxxxxx" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Key Secret</label>
                  <input type="password" defaultValue="secretvalue" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Webhook Secret</label>
                  <input type="password" defaultValue="webhooksecret" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <h3 className="font-bold">Email Configuration</h3>
              <div>
                <label className="block text-sm font-medium mb-1.5">From Address</label>
                <input defaultValue="orders@shipdocker.com" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Resend API Key</label>
                <input type="password" defaultValue="re_xxxxx" className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 font-mono text-xs" />
              </div>
              <h4 className="font-semibold text-sm pt-2">Email Templates</h4>
              {["Order Confirmation", "Shipping Update", "Password Reset", "Abandoned Cart"].map((t) => (
                <div key={t} className="flex items-center justify-between py-2.5 border-b border-border/50">
                  <span className="text-sm">{t}</span>
                  <button className="text-xs text-primary font-medium hover:underline">Edit Template</button>
                </div>
              ))}
            </div>
          )}

          {(activeTab === "seo" || activeTab === "security" || activeTab === "notifications") && (
            <div className="p-6 rounded-2xl border border-border bg-card text-center py-16">
              <p className="text-muted-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
