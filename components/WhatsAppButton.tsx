"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const url = "https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20ShipDocker";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
      {/* Tooltip - Desktop only */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden lg:block bg-card border border-border px-4 py-2 rounded-xl shadow-xl text-xs font-bold whitespace-nowrap"
          >
            Chat with us · Mon–Sat 10am–7pm IST
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-[56px] h-[56px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
