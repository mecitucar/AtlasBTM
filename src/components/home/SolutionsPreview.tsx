"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ImageIcon } from "lucide-react";

const solutions = [
  {
    key: "worksite",
    image: null,
  },
  {
    key: "multipurpose",
    image: null,
  },
];

export function SolutionsPreview() {
  const t = useTranslations("solutions");
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
          className="text-center mb-16"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            Solutions
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {locale === "fr"
              ? "Atlas vous propose des solutions de haute qualite"
              : "Atlas offers you high quality solutions"}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.key}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link
                href="/solutions"
                className="group block bg-white border border-atlas-warm/60 overflow-hidden hover:shadow-xl hover:border-atlas-red/20 transition-all"
              >
                <div className="aspect-[16/9] bg-atlas-warm/20 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-atlas-charcoal/8" />
                </div>
                <div className="p-8">
                  <h3 className="font-[var(--font-heading)] font-black text-[22px] text-atlas-charcoal mb-3 tracking-tight">
                    {t(`${sol.key}.title`)}
                  </h3>
                  <p className="text-[15px] text-atlas-slate leading-relaxed mb-6">
                    {t(`${sol.key}.desc`)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[14px] text-atlas-red font-bold uppercase tracking-wide group-hover:gap-3 transition-all">
                    {locale === "fr" ? "Details" : "Details"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
