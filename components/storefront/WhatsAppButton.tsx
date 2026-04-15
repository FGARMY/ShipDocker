"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_NUMBER = "919XXXXXXXXX"; // Replace with actual WhatsApp Business number
const PRE_FILLED_MESSAGE = encodeURIComponent(
  "Hi SMDrop! I'm interested in your products. Can you help me with:"
);

const QUICK_QUESTIONS = [
  "📦 What is the delivery time?",
  "🔄 How do returns work?",
  "✅ Is this product genuine?",
  "💵 Do you offer COD?",
  "🧾 Can I get a GST invoice?",
];

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    // Show nudge after 8 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasBeenSeen) setHasBeenSeen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [hasBeenSeen]);

  const openChat = (message?: string) => {
    const msg = message
      ? encodeURIComponent(message)
      : PRE_FILLED_MESSAGE;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[320px] sm:w-[340px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">SMDrop Support</p>
                  <p className="text-white/70 text-xs">Typically replies within 30 min</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-[#ECE5DD] dark:bg-accent/30">
              <div className="bg-white dark:bg-card rounded-lg p-3 shadow-sm max-w-[85%]">
                <p className="text-sm">
                  👋 Hi there! Got a question before you buy? We&apos;re here to help.
                </p>
                <p className="text-[10px] text-muted-foreground text-right mt-1">
                  Online · 10am–8pm IST
                </p>
              </div>
            </div>

            {/* Quick questions */}
            <div className="p-3 space-y-2">
              <p className="text-xs text-muted-foreground font-medium px-1">Quick questions:</p>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => openChat(`Hi! ${q.replace(/^.{2} /, "")}`)}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors truncate"
                >
                  {q}
                </button>
              ))}
              <button
                onClick={() => openChat()}
                className="w-full py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2 mt-1"
              >
                <MessageCircle size={16} />
                Start a Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </motion.button>

      {/* Nudge tooltip */}
      <AnimatePresence>
        {hasBeenSeen && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="fixed bottom-7 right-20 z-50 bg-card border border-border rounded-xl px-4 py-2 shadow-lg"
          >
            <p className="text-xs font-medium whitespace-nowrap">Need help? Chat with us! 💬</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
