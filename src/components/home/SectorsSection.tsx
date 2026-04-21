"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container, Pickaxe, HardHat, Shield, Zap, ArrowUpRight } from "lucide-react";

const sectors = [
  { key: "prefab", icon: Container },
  { key: "mining", icon: Pickaxe },
  { key: "construction", icon: HardHat },
  { key: "defense", icon: Shield },
  { key: "energy", icon: Zap },
];

export function SectorsSection() {
  const t = useTranslations("solutions");
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
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href="/solutions"
                  className="group block bg-white border border-atlas-warm/60 p-7 hover:border-atlas-red/30 hover:shadow-lg transition-all h-full"
                >
                  <Icon className="w-7 h-7 text-atlas-red mb-5" />
                  <h3 className="font-[var(--font-heading)] font-bold text-[16px] text-atlas-charcoal mb-2 tracking-tight leading-snug">
                    {t(`${sector.key}.title`)}
                  </h3>
                  <p className="text-[13px] text-atlas-slate leading-relaxed mb-4">
                    {t(`${sector.key}.desc`).slice(0, 80)}...
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-atlas-slate/30 group-hover:text-atlas-red transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
