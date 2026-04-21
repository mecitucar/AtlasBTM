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

const differentiators = [
  { icon: Sparkles, fr: "Experience client unique", en: "Unique customer experience" },
  { icon: Award, fr: "Constructions esthetiques a usage maximal", en: "Aesthetically designed constructions with maximum usage" },
  { icon: Users, fr: "Equipes competentes et designs modernes", en: "Knowledgeable teams and modern designs" },
  { icon: Shield, fr: "Satisfaction client avec assurance qualite", en: "Customer satisfaction with quality assurance" },
  { icon: Clock, fr: "Livraison ponctuelle avec qualite et confort", en: "On-time delivery with quality and comfort" },
  { icon: Leaf, fr: "Priorite a la nature et la durabilite", en: "Priority to nature and sustainability" },
  { icon: Globe, fr: "Solutions alternatives a l'echelle mondiale", en: "Alternative solutions globally" },
  { icon: Truck, fr: "Expedition rapide avec coordination efficace", en: "Quick dispatch with fast coordination" },
  { icon: Zap, fr: "Production rapide avec equipes experimentees", en: "Fast production with experienced teams" },
];

export function WhyAtlas() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {locale === "fr" ? "Pourquoi Atlas" : "Why Atlas"}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-3 tracking-tight max-w-[500px]">
            {locale === "fr"
              ? "Notre difference, votre avantage"
              : "Our difference, your advantage"}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="flex items-start gap-4 bg-white/5 p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 bg-atlas-red/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-atlas-red" />
                </div>
                <p className="text-[15px] text-white/70 leading-relaxed">
                  {item[locale]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
