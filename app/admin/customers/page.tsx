"use client";

import { Search, Users, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CUSTOMERS = [
  { id: "c1", name: "Rahul Sharma", email: "rahul@example.com", orders: 5, spent: 8990, lastOrder: "2 days ago", joined: "Dec 2024" },
  { id: "c2", name: "Priya Patel", email: "priya@example.com", orders: 3, spent: 4497, lastOrder: "1 week ago", joined: "Nov 2024" },
  { id: "c3", name: "Amit Kumar", email: "amit@example.com", orders: 8, spent: 15650, lastOrder: "1 day ago", joined: "Oct 2024" },
  { id: "c4", name: "Sneha Reddy", email: "sneha@example.com", orders: 2, spent: 1198, lastOrder: "3 days ago", joined: "Jan 2025" },
  { id: "c5", name: "Vikram Singh", email: "vikram@example.com", orders: 1, spent: 1799, lastOrder: "5 days ago", joined: "Jan 2025" },
  { id: "c6", name: "Ananya Iyer", email: "ananya@example.com", orders: 4, spent: 6890, lastOrder: "2 weeks ago", joined: "Nov 2024" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{CUSTOMERS.length} registered customers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors">
          <Mail size={16} />
          Email All
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="Search customers..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Customer</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden sm:table-cell">Orders</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Total Spent</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden md:table-cell">Last Order</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-purple-500/50 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">{c.orders}</td>
                  <td className="py-3 px-4 text-right font-semibold">₹{c.spent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground text-xs hidden md:table-cell">{c.lastOrder}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground text-xs hidden lg:table-cell">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
