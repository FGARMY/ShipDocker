"use client";

import { Plus, FileText, Eye, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const PAGES = [
  { id: "p1", title: "About Us", slug: "about", status: "PUBLISHED", updatedAt: "2 days ago" },
  { id: "p2", title: "FAQ", slug: "faq", status: "PUBLISHED", updatedAt: "1 week ago" },
  { id: "p3", title: "Privacy Policy", slug: "privacy", status: "PUBLISHED", updatedAt: "1 month ago" },
  { id: "p4", title: "Terms of Service", slug: "terms", status: "PUBLISHED", updatedAt: "1 month ago" },
  { id: "p5", title: "Shipping Info", slug: "shipping", status: "PUBLISHED", updatedAt: "2 weeks ago" },
  { id: "p6", title: "Returns Policy", slug: "returns", status: "DRAFT", updatedAt: "3 days ago" },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Pages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{PAGES.length} pages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
          <Plus size={16} />
          New Page
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Title</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground hidden md:table-cell">Updated</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PAGES.map((page) => (
                <tr key={page.id} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="font-medium">{page.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground hidden sm:table-cell">/pages/{page.slug}</td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full", page.status === "PUBLISHED" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600")}>
                      {page.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-muted-foreground text-xs hidden md:table-cell">{page.updatedAt}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors"><Eye size={14} className="text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors"><Edit size={14} className="text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><Trash2 size={14} className="text-muted-foreground hover:text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
