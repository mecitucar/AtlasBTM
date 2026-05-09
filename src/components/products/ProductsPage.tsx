"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Check,
  ArrowRight,
  Download,
  FileText,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { heroes } from "@/lib/images";

const products = [
  {
    key: "prefab",
    image: heroes.livingContainer,
    altText: "Bâtiments préfabriqués modulaires deux étages - livraison clé en main",
  },
  {
    key: "container",
    image: heroes.livingContainerCamp,
    altText: "Living containers modulaires prêts à l'emploi",
  },
  {
    key: "lightsteel",
    image: heroes.lightsteelProduct,
    altText: "Construction acier leger galvanise durable",
  },
  {
    key: "structural",
    image: heroes.structuralSteel,
    altText: "Charpente acier grande portée - assemblage en usine",
  },
];

export function ProductsPage() {
  const t = useTranslations("products");
  const scrollRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function onScroll() {
      const scrollTop = container!.scrollTop;
      const vh = window.innerHeight;
      const activeIdx = Math.round(scrollTop / vh) - 1;

      const atFooter = activeIdx >= products.length;
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.opacity = atFooter ? "0" : "1";
        dot.style.height = i === activeIdx ? "32px" : "12px";
        dot.style.backgroundColor = i === activeIdx ? "#bf0a28" : "rgba(255,255,255,0.3)";
      });

      // Navbar'i koyu yap scroll edilince
      const header = document.querySelector("header");
      if (header) {
        if (scrollTop > 50) {
          (header as HTMLElement).style.backgroundColor = "rgba(26,26,26,0.95)";
          (header as HTMLElement).style.backdropFilter = "blur(12px)";
        } else {
          (header as HTMLElement).style.backgroundColor = "";
          (header as HTMLElement).style.backdropFilter = "";
        }
      }
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="fixed inset-0 z-40 overflow-y-auto"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Hero */}
      <section
        className="snap-section relative h-screen flex items-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroes.main}
            alt="Atlas Bâtiment Modulaire - conteneurs modulaires"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <h1 className="font-[var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-[0.95] tracking-tight max-w-[700px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
              {t("subtitle")}
            </h1>
            <div className="w-20 h-[3px] bg-atlas-red mt-7 mb-6" />
            <p className="text-[16px] lg:text-[18px] text-white leading-relaxed max-w-[480px] bg-atlas-charcoal/70 px-5 py-4">
              {t("prefab.desc")}
            </p>
            <a
              href="/catalog/atlas-catalog.pdf"
              download="Atlas-BTM-Catalogue.pdf"
              className="group mt-6 inline-flex items-center gap-4 bg-atlas-red hover:bg-atlas-red-dark text-white pl-5 pr-7 py-3.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(191,10,40,0.4)]"
            >
              <div className="w-10 h-10 bg-white/15 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold tracking-wide uppercase">{t("catalogCta")}</span>
                <span className="text-[12px] text-white/60 font-medium">PDF</span>
              </div>
              <Download className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Urun panelleri */}
      {products.map((product) => {
        return (
          <section
            key={product.key}
            className="snap-section relative h-screen"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="absolute inset-0">
              <Image src={product.image} alt={product.altText} fill className="object-cover" sizes="100vw" quality={90} />
            </div>
            <div className="relative z-10 h-full flex items-end pb-4 sm:pb-10 lg:pb-14">
              <div className="w-full px-3 sm:px-8 lg:px-16 xl:px-24">
                <div className="spinning-border bg-white/95 backdrop-blur-sm px-5 py-5 sm:px-10 sm:py-9 lg:px-14 lg:py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 sm:gap-8 lg:gap-16 items-center">
                    <div>
                      <h2 className="font-[var(--font-heading)] text-[clamp(1.25rem,3.5vw,2.75rem)] font-black text-atlas-charcoal tracking-tight mb-2 sm:mb-4">
                        {t(`${product.key}.title`)}
                      </h2>
                      <p className="text-[13px] sm:text-[16px] text-atlas-slate leading-relaxed mb-4 sm:mb-6 max-w-[520px]">
                        {t(`${product.key}.desc`)}
                      </p>
                      <Link href="/contact" className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-5 py-3 sm:px-8 sm:py-4 text-[12px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors">
                        {t("title")}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <ul className="space-y-2 sm:space-y-4">
                      {(t.raw(`${product.key}.features`) as string[]).map((feature: string, fi: number) => (
                        <li key={fi} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-atlas-red flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                          </div>
                          <span className="text-[13px] sm:text-[16px] text-atlas-charcoal leading-snug sm:leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Footer */}
      <div style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>

      {/* Step indicator */}
      <div className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 pointer-events-none">
        {products.map((_, i) => (
          <div
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            className="w-[3px]"
            style={{ height: "12px", backgroundColor: "rgba(255,255,255,0.3)", transition: "all 0.3s" }}
          />
        ))}
      </div>
    </div>
  );
}
