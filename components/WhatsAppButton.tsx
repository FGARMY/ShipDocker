"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const url = "https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20ShipDocker";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-20 right-4 lg:bottom-8 lg:right-8 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 text-white text-xs font-medium py-1.5 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us · Mon–Sat 10am–7pm IST
      </span>
    </a>
  );
}
