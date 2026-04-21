"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Download,
  FileText,
  Container,
  Pickaxe,
  HardHat,
  Shield,
  Zap,
} from "lucide-react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

const catalogs = [
  { key: "prefab", icon: Container, pages: 24 },
  { key: "mining", icon: Pickaxe, pages: 18 },
  { key: "construction", icon: HardHat, pages: 16 },
  { key: "defense", icon: Shield, pages: 16 },
  { key: "energy", icon: Zap, pages: 20 },
];

export function CatalogPage() {
  const t = useTranslations("catalog");
  const st = useTranslations("solutions");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <>
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
        </div>
      </section>

      <section ref={ref} className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogs.map((catalog, i) => {
              const Icon = catalog.icon;
              return (
                <motion.div
                  key={catalog.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group bg-white border border-atlas-warm/60 rounded-sm overflow-hidden hover:shadow-lg hover:border-atlas-navy/10 transition-all"
                >
                  <div className="aspect-[4/3] bg-atlas-sand flex items-center justify-center border-b border-atlas-warm">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-atlas-navy/10 mx-auto mb-2" />
                      <span className="text-[12px] text-atlas-slate/40 uppercase tracking-wide">
                        PDF
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-atlas-navy" />
                      <h3 className="font-[var(--font-heading)] font-semibold text-[16px] text-atlas-navy">
                        {st(`${catalog.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-[14px] text-atlas-slate mb-5 leading-relaxed">
                      {st(`${catalog.key}.desc`)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-atlas-slate/60">
                        {catalog.pages} pages
                      </span>
                      <button className="inline-flex items-center gap-2 text-atlas-navy text-[14px] font-medium hover:text-atlas-blue transition-colors">
                        <Download className="w-4 h-4" />
                        {t("download")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
