"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";

const steps = [
  {
    fr: "L'entreprise soumet des offres dans les 24 heures, en mettant l'accent sur une communication ouverte et un service personnalisé.",
    en: "The company submits offers within 24 hours, emphasizing open communication and personalized service.",
  },
  {
    fr: "Atlas fonctionne comme partie intégrante de l'équipe du client tout au long de la phase de conception, identifiant les problèmes de manière proactive.",
    en: "Atlas functions as part of the client's team throughout the design phase, identifying potential issues proactively.",
  },
  {
    fr: "La fabrication combine des matières premières de qualité supérieure avec des lignes de production entièrement automatiques et des contrôles rigoureux.",
    en: "Manufacturing combines superior raw materials with fully automatic production lines and rigorous quality checks.",
  },
  {
    fr: "Chargement correct et expédition planifiée en utilisant des solutions économiques avec des listes de matériaux préparées.",
    en: "Correct loading and planned shipment using economical solutions with prepared material lists.",
  },
  {
    fr: "Des équipes formées et certifiées exécutent l'assemblage. Les opérations de démontage minimisent la perte de matériaux à environ 5%.",
    en: "Trained and certified teams execute assembly. Disassembly operations minimize material loss to approximately 5%.",
  },
  {
    fr: "Le service continue après la livraison avec une documentation complète, servant de guide pour les modifications futures.",
    en: "Service continues post-delivery with comprehensive documentation, serving as a guide for future modifications.",
  },
];

const stepTitles = {
  fr: ["Proposition", "Conception", "Production", "Logistique", "Assemblage", "Après-Vente"],
  en: ["Proposal", "Design", "Production", "Logistics", "Assembly", "After Sales"],
};

export function ProcessesSection() {
  const t = useTranslations("process");
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);


  return (
    <section ref={container} className="relative py-28 lg:py-36 bg-atlas-charcoal overflow-hidden">
      <BlueprintGrid opacity={0.06} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="proc-heading grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
            <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Processus" : "Process"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-4 tracking-tight leading-tight">
              {t("title")}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6" />
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-[17px] text-white/40 leading-relaxed max-w-[500px]">
              {locale === "fr"
                ? "Atlas respecte strictement le délai de livraison avec une planification rigoureuse, sans aucune perturbation. De la proposition à l'après-vente."
                : "Atlas strictly meets delivery deadlines with rigorous planning, without any disruption. From proposal to after-sales."}
            </p>
          </div>
        </div>

        <div className="proc-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {steps.map((step, i) => (
            <div key={i} className="proc-step">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-[var(--font-heading)] font-black text-[clamp(2rem,3vw,3rem)] text-white/10 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[var(--font-heading)] font-bold text-[17px] text-white tracking-tight">
                  {stepTitles[locale][i]}
                </h3>
              </div>
              <div className="w-full h-[1px] bg-white/10 mb-4" />
              <p className="text-[15px] text-white/45 leading-relaxed">
                {step[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
