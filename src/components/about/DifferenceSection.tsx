"use client";

import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  Clock,
  Leaf,
  Globe,
  Sparkles,
  Shield,
  Truck,
  Users,
  Zap,
} from "lucide-react";

const items = [
  { icon: Sparkles, fr: "Offre une experience client unique", en: "Offers unique customer experience" },
  { icon: Award, fr: "Fournit un usage maximal avec des constructions esthetiques", en: "Provides maximum usage with aesthetically designed constructions" },
  { icon: Users, fr: "Developpe des designs modernes avec des equipes competentes", en: "Develops modern designs with knowledgeable teams" },
  { icon: Shield, fr: "Assure la satisfaction client avec une garantie qualite", en: "Ensures customer satisfaction with quality assurance" },
  { icon: Clock, fr: "Livre a temps avec qualite et confort", en: "Delivers on-time with quality and comfort" },
  { icon: Leaf, fr: "Donne la priorite a la nature et a la durabilite", en: "Prioritizes nature and sustainability" },
  { icon: Globe, fr: "Fournit des solutions alternatives a l'echelle mondiale", en: "Provides alternative solutions globally" },
  { icon: Truck, fr: "Expedie rapidement avec une coordination efficace", en: "Dispatches quickly with fast coordination" },
  { icon: Zap, fr: "Produit des solutions avec des equipes experimentees", en: "Produces solutions with experienced teams" },
];

export function DifferenceSection() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-28">
              <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
                {locale === "fr" ? "Notre Difference" : "Our Difference"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight leading-tight">
                {locale === "fr"
                  ? "Atlas offre des solutions de haute qualite avec une gestion de processus qui elimine les problemes potentiels des le depart"
                  : "Atlas offers high-quality solutions with process management that eliminates potential problems from the very beginning"}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-6" />
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="flex items-start gap-5 bg-background p-6 border border-atlas-warm/40 hover:border-atlas-red/20 transition-colors"
                >
                  <div className="w-11 h-11 bg-atlas-red/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-atlas-red" />
                  </div>
                  <p className="text-[16px] text-atlas-charcoal leading-relaxed pt-2">
                    {item[locale]}
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
