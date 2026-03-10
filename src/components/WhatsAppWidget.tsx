"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
    const whatsappNumber = "8801700000000";
    const defaultMessage = encodeURIComponent("Hi Cambry! I'm interested in studying abroad. Can you help me?");

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <a
                href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[60px] h-[60px] bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] hover:scale-110 transition-all duration-300 animate-whatsapp-pulse"
                aria-label="Chat on WhatsApp"
            >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-[#25D366]/30 animate-ping opacity-40" />
                <MessageCircle className="w-7 h-7 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </a>
        </div>
    );
}
