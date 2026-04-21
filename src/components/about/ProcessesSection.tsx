"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  PenTool,
  Factory,
  Truck,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";

const steps = [
  {
    key: "proposal",
    icon: FileText,
    fr: "L'entreprise soumet des offres dans les 24 heures, en mettant l'accent sur une communication ouverte et un service personnalise. Nous completons la conception detaillee du projet avant la contractualisation.",
    en: "The company submits offers within 24 hours, emphasizing open communication and personalized service. We complete detailed project design before contracting.",
  },
  {
    key: "design",
    icon: PenTool,
    fr: "Atlas fonctionne comme partie integrante de l'equipe du client tout au long de la phase de projet, identifiant les problemes potentiels de maniere proactive. Nous mettons l'accent sur la vitesse de production et la transparence.",
    en: "Atlas functions as part of the client's team throughout the project phase, identifying potential issues proactively. We emphasize production speed and transparency.",
  },
  {
    key: "production",
    icon: Factory,
    fr: "Une infrastructure technique solide et une etape de production forment le pilier le plus important de la solution. La fabrication combine des matieres premieres de qualite avec des controles qualite rigoureux.",
    en: "A strong technical infrastructure and production stage forms the most important pillar of the solution. Manufacturing combines quality raw materials with rigorous quality checks.",
  },
  {
    key: "logistics",
    icon: Truck,
    fr: "Nous assurons le chargement correct et l'expedition planifiee des materiaux en utilisant des solutions economiques avec des listes de materiaux bien preparees et des methodes de chargement appropriees.",
    en: "We ensure correct loading and planned shipment of materials using economical solutions with well-prepared material lists and appropriate loading methods.",
  },
  {
    key: "assembly",
    icon: Wrench,
    fr: "Des equipes formees et certifiees executent les travaux d'assemblage en supposant que la structure sera delocalises. Les operations de demontage minimisent la perte de materiaux a environ 5%.",
    en: "Trained, certified teams execute assembly work with the assumption the structure will be relocated. Disassembly operations minimize material loss to approximately 5%.",
  },
  {
    key: "aftersales",
    icon: HeadphonesIcon,
    fr: "Le service continue apres la livraison avec une documentation complete fournie, servant de guide pour les modifications futures et empechant les alterations non controlees.",
    en: "Service continues post-delivery with comprehensive documentation provided, serving as a guide for future modifications and preventing uncontrolled alterations.",
  },
];

export function ProcessesSection() {
  const t = useTranslations("process");
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {locale === "fr" ? "Processus" : "Processes"}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {t("title")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
          <p className="text-[16px] text-atlas-slate leading-relaxed mt-6 max-w-[600px] mx-auto">
            {locale === "fr"
              ? "Atlas respecte strictement le delai de livraison determine avec une tres bonne planification, sans aucune perturbation."
              : "Atlas strictly complies with the delivery time determined with very good planning, without any disruption."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="bg-white border border-atlas-warm/40 p-8 hover:border-atlas-red/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-atlas-red/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-atlas-red" />
                  </div>
                  <div>
                    <span className="text-[12px] text-atlas-red font-bold tracking-wider uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-heading)] font-bold text-[17px] text-atlas-charcoal tracking-tight">
                      {t(`steps.${step.key}`)}
                    </h3>
                  </div>
                </div>
                <p className="text-[14px] text-atlas-slate leading-relaxed">
                  {step[locale]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
