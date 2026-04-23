"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function WhatsAppButton() {
  const t = useTranslations("cta");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "33XXXXXXXXX";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    if (!tooltipRef.current) return;
    if (tooltipVisible) {
      gsap.fromTo(tooltipRef.current,
        { opacity: 0, y: 8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(2)" }
      );
    } else {
      gsap.to(tooltipRef.current,
        { opacity: 0, y: 8, scale: 0.95, duration: 0.15, ease: "power2.in" }
      );
    }
  }, [tooltipVisible]);

  useGSAP(() => {
    const btn = containerRef.current?.querySelector(".wa-btn");
    if (!btn) return;
    gsap.fromTo(btn,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, delay: 1.5, ease: "back.out(2)" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div
        ref={tooltipRef}
        className={`bg-white shadow-xl rounded-lg px-4 py-3 mr-1 max-w-[220px] border border-atlas-warm ${
          tooltipVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
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
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="wa-btn group w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        style={{ transform: "scale(0)" }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
