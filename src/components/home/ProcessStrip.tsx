"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
  FileText,
  PenTool,
  Factory,
  Truck,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";

const steps = [
  { key: "proposal", icon: FileText },
  { key: "design", icon: PenTool },
  { key: "production", icon: Factory },
  { key: "logistics", icon: Truck },
  { key: "assembly", icon: Wrench },
  { key: "aftersales", icon: HeadphonesIcon },
];

export function ProcessStrip() {
  const t = useTranslations("process");
  const container = useRef<HTMLDivElement>(null);


  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-red-dark">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="process-heading text-center mb-16">
          <span className="text-[13px] tracking-[0.25em] uppercase text-white/70 font-bold">
            Processus
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-3 tracking-tight">
            {t("title")}
          </h2>
          <div className="w-16 h-[3px] bg-white mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="process-step relative text-center">
                <div className="w-16 h-16 bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-[11px] text-white/60 font-bold tracking-wider uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[var(--font-heading)] font-bold text-[14px] text-white mt-1 tracking-tight leading-snug">
                  {t(`steps.${step.key}`)}
                </h3>
                {i < steps.length - 1 && (
                  <div className="step-connector hidden lg:block absolute top-8 -right-2 w-4 h-[2px] bg-white/30" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
