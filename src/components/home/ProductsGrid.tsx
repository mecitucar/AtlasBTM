"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Container, Layers, Wrench, ArrowRight } from "lucide-react";

const products = [
  { key: "prefab", icon: Building2 },
  { key: "container", icon: Container },
  { key: "lightsteel", icon: Layers },
  { key: "structural", icon: Wrench },
];

export function ProductsGrid() {
  const t = useTranslations("products");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-atlas-warm/50">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href="/products"
                  className="group block bg-white p-8 lg:p-10 hover:bg-atlas-charcoal transition-colors duration-300 text-center h-full"
                >
                  <div className="w-14 h-14 bg-atlas-red/10 group-hover:bg-atlas-red/20 flex items-center justify-center mx-auto mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-atlas-red" />
                  </div>
                  <h3 className="font-[var(--font-heading)] font-bold text-[18px] text-atlas-charcoal group-hover:text-white mb-3 transition-colors tracking-tight">
                    {t(`${product.key}.title`)}
                  </h3>
                  <p className="text-[14px] text-atlas-slate group-hover:text-white/50 leading-relaxed transition-colors mb-5">
                    {t(`${product.key}.desc`).slice(0, 100)}...
                  </p>
                  <span className="inline-flex items-center gap-1 text-[13px] text-atlas-red font-bold uppercase tracking-wide group-hover:text-atlas-red-light transition-colors">
                    {t("title")} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
