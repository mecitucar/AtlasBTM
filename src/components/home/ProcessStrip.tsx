"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  PenTool,
  Factory,
  Truck,
  Wrench,
  HeadphonesIcon,
  ArrowRight,
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            Processus
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {t("title")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 bg-atlas-red/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-atlas-red" />
                </div>
                <span className="text-[11px] text-atlas-red font-bold tracking-wider uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[var(--font-heading)] font-bold text-[14px] text-atlas-charcoal mt-1 tracking-tight leading-snug">
                  {t(`steps.${step.key}`)}
                </h3>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-2 w-4 h-4 text-atlas-warm" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
