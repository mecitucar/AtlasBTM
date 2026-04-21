"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppButton() {
  const t = useTranslations("cta");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const whatsappNumber = "33XXXXXXXXX";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="bg-white shadow-xl rounded-lg px-4 py-3 mr-1 max-w-[220px] border border-atlas-warm"
          >
            <button
              onClick={() => setTooltipVisible(false)}
              className="absolute top-1 right-1 p-0.5 text-atlas-slate/50 hover:text-atlas-slate"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-[13px] text-atlas-navy font-medium leading-snug pr-3">
              {t("whatsapp")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="group w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
