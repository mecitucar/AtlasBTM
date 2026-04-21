"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";

const slides = [
  {
    altText: "Conteneurs prefabriques modulaires sur chantier - livraison rapide",
    placeholder: "bg-gradient-to-br from-[#333] to-[#555]",
  },
  {
    altText: "Camp modulaire pour site minier deploiement rapide",
    placeholder: "bg-gradient-to-br from-[#2B2B2B] to-[#4A4A4A]",
  },
  {
    altText: "Installation modulaire pour projet energetique",
    placeholder: "bg-gradient-to-br from-[#3A3A3A] to-[#555]",
  },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${slide.placeholder} ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          role="img"
          aria-label={slide.altText}
        />
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none">
        <span className="font-[var(--font-heading)] font-black text-[500px] text-white leading-none">A</span>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
          <div className="max-w-[700px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 bg-atlas-red px-5 py-2.5 mb-8"
            >
              <Zap className="w-4 h-4 text-white" />
              <span className="text-[14px] text-white tracking-[0.12em] uppercase font-bold">
                {t("fastDelivery")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white leading-[0.98] tracking-tighter mb-7"
            >
              {t("slogan")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 h-[3px] bg-atlas-red mb-7"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-[18px] lg:text-[20px] text-white/55 leading-relaxed max-w-[520px] mb-10"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/solutions"
                className="group inline-flex items-center justify-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {t("cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-3 border-2 border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-all"
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] transition-all ${
                i === current ? "w-8 bg-atlas-red" : "w-4 bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  );
}
