"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ImageIcon } from "lucide-react";

export function AboutSection() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[4/3] bg-white/5 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-white/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              ATLAS BATIMENT MODULAIRE
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Conteneurs, Prefabrique, Acier Leger, Acier Structurel"
                : "Containers, Prefabricated, Light Steel, Structural Steel"}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="text-[16px] lg:text-[17px] text-white/55 leading-relaxed mb-6">
              {locale === "fr"
                ? "Fondee par des professionnels ayant plus de 20 ans d'experience dans le marketing, la production et l'application de constructions modulaires, Atlas Batiment Modulaire propose des solutions de haute qualite avec une approche centree sur le client."
                : "Founded by professionals with over 20 years of experience in marketing, production and application of modular constructions, Atlas Batiment Modulaire offers high-quality solutions with a customer-focused approach."}
            </p>
            <p className="text-[16px] lg:text-[17px] text-white/55 leading-relaxed mb-10">
              {locale === "fr"
                ? "Nous offrons une infrastructure de production a haute capacite, une qualite de materiaux superieure et des possibilites techniques avancees directement sur vos sites de projet."
                : "We offer high capacity production infrastructure, superior material quality and advanced technical possibilities directly on your project sites."}
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "A propos d'Atlas" : "About Atlas"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
