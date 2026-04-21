"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Leaf, Recycle, Zap } from "lucide-react";

export function SustainabilityStrip() {
  const locale = useLocale() as "fr" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-atlas-charcoal relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.02] pointer-events-none select-none">
        <Leaf className="w-[400px] h-[400px] text-white" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Sante, Securite et Environnement" : "Health, Safety and Environment"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
              {locale === "fr" ? "Objectifs de Durabilite" : "Sustainability Goals"}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="text-[16px] text-white/50 leading-relaxed mb-10 max-w-[540px]">
              {locale === "fr"
                ? "Nos batiments sont reutilisables, reconfigurables et recyclables. Pour un avenir durable, nous voulons prendre des mesures qui ameliorent le monde en trouvant des solutions pour soutenir notre feuille de route Net Zero."
                : "Our buildings are reusable, reconfigurable and recyclable. For a sustainable future, we want to take steps that improve the world by finding solutions to support our Net Zero Roadmap."}
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border-2 border-atlas-red text-atlas-red hover:bg-atlas-red hover:text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-all"
            >
              {locale === "fr" ? "Atlas et la Durabilite" : "Atlas and Sustainability"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-3 gap-4"
          >
            {[
              { icon: Leaf, label: locale === "fr" ? "Reutilisable" : "Reusable" },
              { icon: Recycle, label: locale === "fr" ? "Recyclable" : "Recyclable" },
              { icon: Zap, label: locale === "fr" ? "Efficient" : "Efficient" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-atlas-red/15 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-atlas-red" />
                  </div>
                  <span className="text-[13px] text-white/60 font-medium uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
