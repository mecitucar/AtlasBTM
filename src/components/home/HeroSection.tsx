"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { heroes } from "@/lib/images";

const slides = [
  {
    src: heroes.main,
    alt: "Construction modulaire Atlas - conteneurs préfabriqués",
    layout: "left" as const,
  },
  {
    src: heroes.slide2,
    alt: "Module Atlas déployable - conteneur prêt à l'emploi",
    layout: "left" as const,
  },
  {
    src: heroes.slide3,
    alt: "Bureau de chantier Atlas - conteneur modulaire pour sites",
    layout: "left" as const,
  },
];

const slideContent = {
  fr: [
    {
      title: "Conteneurs\nModulaires\nen Guinée",
      subtitle: "Production automatisée, matériaux supérieurs, normes internationales les plus élevées. Solutions clé en main pour tous vos projets.",
      cta: "Découvrir nos Conteneurs",
      ctaLink: "/products" as const,
    },
    {
      title: "Modules\nDéployables\nPartout",
      subtitle: "Conteneurs prêts à l'emploi, livrés et installés sur tous types de terrains. Mobilité, robustesse et finitions soignées.",
      cta: "Voir nos Solutions",
      ctaLink: "/products" as const,
    },
    {
      title: "Bureaux de\nChantier\nProfessionnels",
      subtitle: "Espaces de travail modulaires pour vos sites : isolation, éclairage et confort pensés pour la durée de vos projets.",
      cta: "Découvrir nos Produits",
      ctaLink: "/products" as const,
    },
  ],
  en: [
    {
      title: "Modular\nContainers\nin Guinea",
      subtitle: "Automated production, superior materials, highest international standards. Turnkey solutions for all your projects.",
      cta: "Discover our Containers",
      ctaLink: "/products" as const,
    },
    {
      title: "Modules\nDeployable\nAnywhere",
      subtitle: "Turnkey containers delivered and installed on any terrain. Mobility, durability and refined finishes.",
      cta: "View our Solutions",
      ctaLink: "/products" as const,
    },
    {
      title: "Professional\nSite\nOffices",
      subtitle: "Modular workspaces for your sites: insulation, lighting and comfort designed for the full life of your projects.",
      cta: "Explore our Products",
      ctaLink: "/products" as const,
    },
  ],
};

export function HeroSection() {
  const locale = useLocale() as "fr" | "en";
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const content = slideContent[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => setIsAnimating(false), 800);
    return () => window.clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const goTo = useCallback((idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setCurrent(idx);
  }, [isAnimating, current]);

  const currentContent = content[current];
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[1800ms] ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
            priority={i === 0}
          />
        </div>
      ))}


      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none">
        <span className="font-[var(--font-heading)] font-black text-[500px] text-white leading-none">A</span>
      </div>

      <div className="hero-content-wrap relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
          <div
            ref={contentRef}
            className={`max-w-[700px] transition-all duration-700 ${
              isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="slide-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white leading-[0.98] tracking-tighter mb-7 whitespace-pre-line" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
              {currentContent.title}
            </h1>

            <div className="slide-line w-20 h-[3px] bg-atlas-red mb-7" />

            <p className="slide-sub text-[16px] lg:text-[18px] text-white leading-relaxed mb-10 max-w-[520px] bg-atlas-charcoal/70 px-5 py-4 inline-block">
              {currentContent.subtitle}
            </p>

            <div className="slide-cta inline-flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-row gap-3 sm:gap-4">
                <a
                  href="tel:+224624241977"
                  className="group flex items-center gap-4 sm:gap-5 bg-atlas-red hover:bg-atlas-red-dark px-6 sm:px-10 py-4 sm:py-5 transition-colors"
                >
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0" />
                  <div>
                    <span className="block text-[10px] sm:text-[11px] text-white/70 uppercase tracking-widest font-medium leading-none mb-1.5">
                      {locale === "fr" ? "Téléphone" : "Phone"}
                    </span>
                    <span className="block text-[15px] sm:text-[18px] text-white font-bold leading-none">
                      {locale === "fr" ? "Appelez-nous" : "Call Us"}
                    </span>
                  </div>
                </a>
                <a
                  href="mailto:atlasbatimodulaire@gmail.com"
                  className="group flex items-center gap-4 sm:gap-5 bg-white hover:bg-white/90 px-6 sm:px-10 py-4 sm:py-5 transition-colors"
                >
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-atlas-red shrink-0" />
                  <div>
                    <span className="block text-[10px] sm:text-[11px] text-atlas-charcoal/50 uppercase tracking-widest font-medium leading-none mb-1.5">
                      Email
                    </span>
                    <span className="block text-[15px] sm:text-[18px] text-atlas-charcoal font-bold leading-none">
                      {locale === "fr" ? "Écrivez-nous" : "Write Us"}
                    </span>
                  </div>
                </a>
              </div>
              <Link
                href="/catalog"
                className="group flex items-center justify-between bg-atlas-charcoal/80 hover:bg-atlas-charcoal px-6 sm:px-8 py-3.5 sm:py-4 transition-colors"
              >
                <span className="text-[15px] sm:text-[17px] text-white font-bold">
                  {locale === "fr" ? "Consultez notre catalogue" : "Browse our catalog"}
                </span>
                <ArrowRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative w-8 h-[2px] bg-white/25 overflow-hidden"
            aria-label={`Slide ${i + 1}`}
          >
            {i === current && (
              <div
                className="absolute inset-0 bg-atlas-red"
                style={{ animation: "progress 13s linear" }}
              />
            )}
            {i < current && <div className="absolute inset-0 bg-white/60" />}
          </button>
        ))}
      </div>
    </section>
  );
}
