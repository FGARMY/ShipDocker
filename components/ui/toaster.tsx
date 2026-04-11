"use client";

import { useState, useCallback } from "react";
import { createContext, useContext, type ReactNode } from "react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
}

interface ToastContext {
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContext | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Return a fallback for SSR
    return {
      toasts: [] as Toast[],
      toast: (_t: Omit<Toast, "id">) => {},
      dismiss: (_id: string) => {},
    };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function Toaster() {
  return (
    <ToastProvider>
      <ToasterUI />
    </ToastProvider>
  );
}

function ToasterUI() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            animate-slide-in-right rounded-lg px-4 py-3 shadow-2xl border backdrop-blur-xl
            ${t.variant === "destructive"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : t.variant === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "glass text-foreground"
            }
          `}
          role="alert"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && (
                <p className="text-xs opacity-80 mt-0.5">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-foreground/50 hover:text-foreground transition-colors text-lg leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
