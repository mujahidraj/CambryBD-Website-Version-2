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
                className="w-14 h-14 bg-[#25D366] rounded-md flex items-center justify-center shadow-xl hover:bg-[#20BD5A] transition-colors animate-whatsapp-pulse"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-7 h-7 text-white" />
            </a>
        </div>
    );
}
