"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 gradient-atlas" />
      <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium">
            {t("title")}
          </span>
          <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4 leading-tight max-w-[600px]">
            {t("subtitle")}
          </h1>
          <div className="w-16 h-[2px] bg-white/30 mt-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-[18px] text-white/60 leading-relaxed max-w-[640px]"
        >
          {t("intro")}
        </motion.p>
      </div>
    </section>
  );
}
