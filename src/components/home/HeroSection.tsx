"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const slides = [
  {
    src: "/images/containers/site-aerial-1.webp",
    alt: "Vue aerienne chantier modulaire Atlas Batiment Modulaire",
    layout: "left" as const,
  },
  {
    src: "/images/containers/finished-1.webp",
    alt: "Conteneurs prefabriques modulaires livres sur site",
    layout: "center" as const,
  },
  {
    src: "/images/containers/port-containers.webp",
    alt: "Conteneurs modulaires au port - expedition internationale",
    layout: "right" as const,
  },
];

const slideContent = {
  fr: [
    {
      title: "Maitre Locale,\nExcellence Garantie",
      subtitle: "Solutions modulaires de haute qualite pour vos projets les plus ambitieux en Europe et dans le monde.",
      cta: "Nos Solutions",
      ctaLink: "/solutions" as const,
    },
    {
      title: "Conteneurs &\nPrefabriques",
      subtitle: "Production automatisee, materiaux superieurs, normes internationales les plus elevees.",
      cta: "Nos Produits",
      ctaLink: "/products" as const,
    },
    {
      title: "Du Projet a\nla Livraison",
      subtitle: "De la conception a l'installation, nous gerons chaque etape avec precision et engagement qualite.",
      cta: "Nos Projets",
      ctaLink: "/projects" as const,
    },
  ],
  en: [
    {
      title: "Local Master,\nGuaranteed Excellence",
      subtitle: "High-quality modular solutions for your most ambitious projects in Europe and worldwide.",
      cta: "Our Solutions",
      ctaLink: "/solutions" as const,
    },
    {
      title: "Containers &\nPrefabricated",
      subtitle: "Automated production, superior materials, highest international standards.",
      cta: "Our Products",
      ctaLink: "/products" as const,
    },
    {
      title: "From Project\nto Delivery",
      subtitle: "From design to installation, we manage every step with precision and quality commitment.",
      cta: "Our Projects",
      ctaLink: "/projects" as const,
    },
  ],
};

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as "fr" | "en";
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const content = slideContent[locale];

  const animateSlideContent = useCallback((idx: number) => {
    if (!contentRef.current) return;
    const els = contentRef.current;
    const title = els.querySelector(".slide-title");
    const line = els.querySelector(".slide-line");
    const sub = els.querySelector(".slide-sub");
    const cta = els.querySelector(".slide-cta");

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => setIsAnimating(false),
    });

    tl.fromTo([title, line, sub, cta],
      { opacity: 0 },
      { opacity: 0, duration: 0 }
    );

    tl.fromTo(title,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      0.3
    );

    tl.fromTo(line,
      { scaleX: 0, opacity: 1 },
      { scaleX: 1, transformOrigin: "left", duration: 0.5 },
      0.8
    );

    tl.fromTo(sub,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.9
    );

    tl.fromTo(cta,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.1
    );
  }, []);

  useEffect(() => {
    animateSlideContent(current);
  }, [current, animateSlideContent]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  useEffect(() => {
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (locked) return;
      const rect = container.current?.getBoundingClientRect();
      if (!rect || rect.top < -10) return;
      if (e.deltaY <= 0) return;

      e.preventDefault();
      locked = true;
      const target = container.current!.nextElementSibling as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => { locked = false; }, 800);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (diff < 40) return;
      const rect = container.current?.getBoundingClientRect();
      if (!rect || rect.top < -10) return;

      locked = true;
      const target = container.current!.nextElementSibling as HTMLElement;
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setCurrent(idx);
  }, [isAnimating, current]);

  const slide = slides[current];
  const currentContent = content[current];
  const layout = slide.layout;

  return (
    <section ref={container} className="relative h-screen overflow-hidden bg-black">
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
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none">
        <span className="font-[var(--font-heading)] font-black text-[500px] text-white leading-none">A</span>
      </div>

      <div className="hero-content-wrap relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
          <div
            ref={contentRef}
            className={`${
              layout === "center" ? "max-w-[800px] mx-auto text-center" :
              layout === "right" ? "max-w-[650px] ml-auto text-right" :
              "max-w-[700px]"
            }`}
          >
            <h1 className="slide-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white leading-[0.98] tracking-tighter mb-7 whitespace-pre-line">
              {currentContent.title}
            </h1>

            <div className={`slide-line w-20 h-[3px] bg-atlas-red mb-7 ${layout === "center" ? "mx-auto" : layout === "right" ? "ml-auto" : ""}`} />

            <p className={`slide-sub text-[18px] lg:text-[20px] text-white/60 leading-relaxed mb-10 ${layout === "center" ? "max-w-[560px] mx-auto" : "max-w-[520px]"} ${layout === "right" ? "ml-auto" : ""}`}>
              {currentContent.subtitle}
            </p>

            <div className={`slide-cta flex gap-4 ${layout === "center" ? "justify-center" : layout === "right" ? "justify-end" : ""}`}>
              <Link
                href={currentContent.ctaLink}
                className="group inline-flex items-center justify-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {currentContent.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 border-2 border-white/25 text-white hover:bg-white/10 px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-all"
              >
                {locale === "fr" ? "Contact" : "Contact"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="w-11 h-11 bg-white/10 hover:bg-atlas-red flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative w-10 h-[3px] bg-white/20 overflow-hidden"
              aria-label={`Slide ${i + 1}`}
            >
              {i === current && (
                <div
                  className="absolute inset-0 bg-atlas-red"
                  style={{
                    animation: "progress 7s linear",
                  }}
                />
              )}
              {i < current && <div className="absolute inset-0 bg-atlas-red" />}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="w-11 h-11 bg-white/10 hover:bg-atlas-red flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        <div className="hidden sm:flex items-center gap-2 ml-4 text-white/40">
          <span className="font-[var(--font-heading)] font-bold text-white text-[18px]">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-[14px]">/</span>
          <span className="text-[14px]">{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
