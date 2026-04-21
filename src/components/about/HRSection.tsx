"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, HeartHandshake, TrendingUp } from "lucide-react";

const hrValues = [
  {
    icon: GraduationCap,
    title: { fr: "Formation Continue", en: "Continuous Training" },
    desc: {
      fr: "Programmes de formation reguliers pour developper les competences de nos equipes.",
      en: "Regular training programs to develop our teams' skills.",
    },
  },
  {
    icon: TrendingUp,
    title: { fr: "Evolution de Carriere", en: "Career Growth" },
    desc: {
      fr: "Des parcours de progression clairs et des opportunites d'avancement interne.",
      en: "Clear progression paths and internal advancement opportunities.",
    },
  },
  {
    icon: HeartHandshake,
    title: { fr: "Environnement Collaboratif", en: "Collaborative Environment" },
    desc: {
      fr: "Une culture d'entreprise basee sur le respect, l'innovation et l'esprit d'equipe.",
      en: "A company culture based on respect, innovation and teamwork.",
    },
  },
  {
    icon: Briefcase,
    title: { fr: "Postes Ouverts", en: "Open Positions" },
    desc: {
      fr: "Nous recherchons des talents en ingenierie, production et gestion de projet.",
      en: "We are looking for talents in engineering, production and project management.",
    },
  },
];

export function HRSection() {
  const t = useTranslations("about.hr");
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-sand/30 border-y border-atlas-warm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-atlas-green" />
                <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
                  {t("title")}
                </span>
              </div>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy leading-tight mb-4">
                {t("subtitle")}
              </h2>
              <div className="w-16 h-[2px] bg-atlas-green mb-6" />
              <p className="text-[16px] text-atlas-slate leading-relaxed">
                {locale === "fr"
                  ? "Atlas Batiment Modulaire offre un environnement de travail stimulant entre nos sites en France et en Allemagne. Rejoignez une equipe internationale dediee a l'excellence dans la construction modulaire."
                  : "Atlas Batiment Modulaire offers a stimulating work environment between our sites in France and Germany. Join an international team dedicated to excellence in modular construction."}
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {hrValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="bg-white border border-atlas-warm/60 p-6 rounded-sm"
                >
                  <div className="w-10 h-10 bg-atlas-green/10 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-atlas-green" />
                  </div>
                  <h3 className="font-[var(--font-heading)] font-semibold text-[16px] text-atlas-navy mb-2">
                    {item.title[locale]}
                  </h3>
                  <p className="text-[14px] text-atlas-slate leading-relaxed">
                    {item.desc[locale]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
