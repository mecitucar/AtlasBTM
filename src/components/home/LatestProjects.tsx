"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, ImageIcon } from "lucide-react";

const projects = [
  { title: { fr: "Batiments de Mobilisation", en: "Mobilization Buildings" }, location: { fr: "Europe", en: "Europe" } },
  { title: { fr: "Camp Minier", en: "Mining Camp" }, location: { fr: "Afrique", en: "Africa" } },
  { title: { fr: "Batiments de Chantier", en: "Construction Site Buildings" }, location: { fr: "Europe", en: "Europe" } },
  { title: { fr: "Camp Installation Energetique", en: "Energy Facility Camp" }, location: { fr: "Moyen-Orient", en: "Middle East" } },
  { title: { fr: "Batiments Polyvalents", en: "Multi-Purpose Buildings" }, location: { fr: "Europe", en: "Europe" } },
  { title: { fr: "Conteneurs Bureau", en: "Office Containers" }, location: { fr: "Europe", en: "Europe" } },
];

export function LatestProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {t("title")}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
              {t("subtitle")}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6" />
          </motion.div>

          <Link
            href="/projects"
            className="hidden lg:inline-flex items-center gap-2 text-[14px] font-bold text-atlas-red uppercase tracking-wide hover:text-atlas-red-dark transition-colors"
          >
            {t("allProjects")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group bg-background border border-atlas-warm/60 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] bg-atlas-warm/30 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-atlas-charcoal/10" />
              </div>
              <div className="p-6">
                <h3 className="font-[var(--font-heading)] font-bold text-[17px] text-atlas-charcoal mb-2 leading-snug">
                  {project.title[locale]}
                </h3>
                <div className="flex items-center gap-2 text-[13px] text-atlas-slate">
                  <MapPin className="w-4 h-4 text-atlas-red shrink-0" />
                  {project.location[locale]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:hidden mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-atlas-red uppercase tracking-wide"
          >
            {t("allProjects")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
