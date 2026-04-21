"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function CTASection() {
  const t = useTranslations("cta");
  const nav = useTranslations("nav");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <Image
        src="/images/containers/site-aerial-1.webp"
        alt="Projet de construction modulaire Atlas Batiment Modulaire - vue aerienne du chantier"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-atlas-charcoal/75" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-[640px]"
          >
            <div className="w-12 h-[3px] bg-atlas-red mb-8" />
            <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-6">
              {t("quote")}
            </h2>
            <p className="text-[17px] text-white/50 mb-10 leading-relaxed">
              Contactez nos experts pour discuter de votre projet et recevoir
              une proposition personnalisee.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-10 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {nav("contact")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
