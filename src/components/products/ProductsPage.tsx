"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Container,
  Building2,
  Layers,
  Wrench,
  Check,
  ArrowRight,
} from "lucide-react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

const products = [
  {
    key: "prefab",
    icon: Building2,
    image: "/images/containers/finished-1.webp",
    altText: "Batiments prefabriques modulaires - production en usine livraison rapide",
  },
  {
    key: "container",
    icon: Container,
    image: "/images/containers/production-1.webp",
    altText: "Living containers modulaires prets a l'emploi",
  },
  {
    key: "lightsteel",
    icon: Layers,
    image: "/images/containers/assembly-1.webp",
    altText: "Construction acier leger galvanise durable",
  },
  {
    key: "structural",
    icon: Wrench,
    image: "/images/containers/factory-1.webp",
    altText: "Structures acier grande portee assemblage precis",
  },
];

export function ProductsPage() {
  const t = useTranslations("products");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-atlas" />
        <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {t("title")}
            </span>
            <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 leading-tight max-w-[600px]">
              {t("subtitle")}
            </h1>
            <div className="w-16 h-[3px] bg-atlas-red mt-8" />
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="space-y-20">
            {products.map((product, i) => {
              const Icon = product.icon;
              const isReversed = i % 2 !== 0;
              return (
                <motion.div
                  key={product.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    isReversed ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  <div className={isReversed ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-atlas-red/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-atlas-red" />
                      </div>
                      <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2rem)] font-black text-atlas-charcoal tracking-tight">
                        {t(`${product.key}.title`)}
                      </h2>
                    </div>

                    <p className="text-[16px] text-atlas-slate leading-relaxed mb-6">
                      {t(`${product.key}.desc`)}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {(t.raw(`${product.key}.features`) as string[]).map((feature: string, fi: number) => (
                        <li key={fi} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-atlas-red mt-0.5 shrink-0" />
                          <span className="text-[15px] text-atlas-charcoal">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 bg-atlas-red hover:bg-atlas-red-dark text-white px-6 py-3 text-[14px] font-bold tracking-wide uppercase transition-colors"
                    >
                      {t("title")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
