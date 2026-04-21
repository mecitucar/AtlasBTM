"use client";

import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Container, Layers, Wrench, ImageIcon, MapPin } from "lucide-react";

const capacities = [
  { icon: Building2, value: "12,000", unit: "m\u00B2", period: "/month", label: { fr: "Prefabrique", en: "Prefabricated" } },
  { icon: Container, value: "350", unit: "pcs", period: "/month", label: { fr: "Conteneurs", en: "Containers" } },
  { icon: Layers, value: "10,500", unit: "m\u00B2", period: "/month", label: { fr: "Acier Leger", en: "Light Steel" } },
  { icon: Wrench, value: "250", unit: "ton", period: "/month", label: { fr: "Acier Structurel", en: "Structural Steel" } },
];

export function PlantSection() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Usine de Production" : "Production Plant"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Technologie de pointe et grande capacite"
                : "Latest Technology and Large Capacity"}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />

            <p className="text-[16px] text-white/55 leading-relaxed mb-6">
              {locale === "fr"
                ? "Atlas Batiment Modulaire fabrique des produits repondant aux normes internationales les plus elevees avec une qualite de materiaux superieure. Notre centre de production utilise des lignes de production entierement automatiques."
                : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic production lines."}
            </p>

            <div className="flex items-center gap-3 text-white/40 mb-10">
              <MapPin className="w-4 h-4 text-atlas-red" />
              <span className="text-[14px]">
                {locale === "fr" ? "Turquie - Usine de production moderne" : "Turkey - Modern production facility"}
              </span>
            </div>

            <div className="aspect-[16/9] bg-white/5 flex items-center justify-center mb-6">
              <ImageIcon className="w-12 h-12 text-white/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {capacities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-white/5 p-7 text-center"
                >
                  <Icon className="w-8 h-8 text-atlas-red mx-auto mb-4" />
                  <div className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.5rem)] font-black text-white leading-none">
                    {cap.value}
                  </div>
                  <div className="text-[13px] text-white/40 mt-1">
                    {cap.unit}{cap.period}
                  </div>
                  <div className="text-[13px] text-atlas-red font-bold uppercase tracking-wide mt-3">
                    {cap.label[locale]}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
