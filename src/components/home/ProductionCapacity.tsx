"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Container, Layers, Wrench } from "lucide-react";

const capacities = [
  { key: "prefab", value: "12,000", unit: "m\u00B2/", period: "month", icon: Building2 },
  { key: "containers", value: "350", unit: "pcs/", period: "month", icon: Container },
  { key: "lightsteel", value: "10,500", unit: "m\u00B2/", period: "month", icon: Layers },
  { key: "structural", value: "250", unit: "ton/", period: "month", icon: Wrench },
];

export function ProductionCapacity() {
  const t = useTranslations("capacity");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-3 tracking-tight">
            {t("facility")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {capacities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="bg-white/5 p-8 text-center"
              >
                <Icon className="w-8 h-8 text-atlas-red mx-auto mb-4" />
                <div className="font-[var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-black text-white leading-none">
                  {cap.value}
                </div>
                <div className="text-[14px] text-white/40 mt-2">
                  {cap.unit}{cap.period}
                </div>
                <div className="text-[13px] text-atlas-red font-bold uppercase tracking-wide mt-3">
                  {t(cap.key)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
