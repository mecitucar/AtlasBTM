"use client";

import { useTranslations, useLocale } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
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
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = container.current?.querySelector(".hr-heading");
    if (heading) {
      gsap.from(heading, {
        x: -40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const cards = container.current?.querySelectorAll(".hr-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 40, opacity: 0, scale: 0.9, rotateX: 6, duration: 0.55, stagger: 0.08,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-sand/30 border-y border-atlas-warm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="hr-heading lg:col-span-5">
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
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {hrValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="hr-card bg-white border border-atlas-warm/60 p-6 rounded-sm"
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
