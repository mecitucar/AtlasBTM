"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Leaf, Recycle, Sun, Droplets } from "lucide-react";

const goals = [
  {
    icon: Leaf,
    title: { fr: "Materiaux Durables", en: "Sustainable Materials" },
    desc: {
      fr: "Utilisation de materiaux recycles et eco-responsables dans nos constructions modulaires.",
      en: "Use of recycled and eco-responsible materials in our modular constructions.",
    },
  },
  {
    icon: Recycle,
    title: { fr: "Economie Circulaire", en: "Circular Economy" },
    desc: {
      fr: "Conception pour le demontage et la reutilisation de nos structures modulaires.",
      en: "Design for disassembly and reuse of our modular structures.",
    },
  },
  {
    icon: Sun,
    title: { fr: "Efficacite Energetique", en: "Energy Efficiency" },
    desc: {
      fr: "Integration de solutions d'isolation et d'energie renouvelable dans nos batiments.",
      en: "Integration of insulation and renewable energy solutions in our buildings.",
    },
  },
  {
    icon: Droplets,
    title: { fr: "Gestion de l'Eau", en: "Water Management" },
    desc: {
      fr: "Systemes de recuperation et de traitement des eaux pour nos installations.",
      en: "Water recovery and treatment systems for our installations.",
    },
  },
];

export function SustainabilityGoals() {
  const t = useTranslations("about.sustainability");
  const container = useRef<HTMLDivElement>(null);


  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-sand/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="sustain-heading mb-16">
          <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy mt-3 leading-tight max-w-[500px]">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[2px] bg-atlas-green mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, i) => {
            const Icon = goal.icon;
            return (
              <div
                key={i}
                className="sustain-card bg-white border border-atlas-warm/60 p-8 rounded-sm flex gap-6"
              >
                <div className="w-12 h-12 bg-atlas-green/10 rounded-sm flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-atlas-green" />
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] font-semibold text-[17px] text-atlas-navy mb-2">
                    {goal.title.fr}
                  </h3>
                  <p className="text-[15px] text-atlas-slate leading-relaxed">
                    {goal.desc.fr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
