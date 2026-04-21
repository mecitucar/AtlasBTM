"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ImageIcon } from "lucide-react";

export function ProductionPlant() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Usine de Production" : "Production Plant"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Technologie de pointe et grande capacite"
                : "Latest Technology and Large Capacity"}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />

            <p className="text-[16px] text-atlas-slate leading-relaxed mb-6">
              {locale === "fr"
                ? "Atlas Batiment Modulaire fabrique des produits repondant aux normes internationales les plus elevees grace a une qualite de materiaux superieure. Notre centre de production utilise des lignes de rollformage et de formage d'acier entierement automatiques."
                : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic rollforming and steel forming production lines."}
            </p>
            <p className="text-[16px] text-atlas-slate leading-relaxed mb-10">
              {locale === "fr"
                ? "Avec une capacite de production moderne et des equipements de derniere generation, nous developpons les designs les plus modernes et les productions les plus efficaces pour nos clients a travers le monde."
                : "With modern production capacity and state-of-the-art equipment, we develop the most modern designs and most efficient productions for our clients across the globe."}
            </p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Usine de Production Atlas" : "Atlas Production Plant"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="aspect-[4/3] bg-atlas-warm/20 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-atlas-charcoal/8" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
