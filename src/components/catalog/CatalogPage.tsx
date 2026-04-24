"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Download,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

const TOTAL_PAGES = 16;
const PDF_PATH = "/catalog/atlas-catalog.pdf";

const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  num: i + 1,
  src: `/catalog/pages/page-${String(i + 1).padStart(2, "0")}.webp`,
}));

export function CatalogPage() {
  const t = useTranslations("catalog");
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPage(null);
      if (e.key === "ArrowLeft" && selectedPage > 1)
        setSelectedPage(selectedPage - 1);
      if (e.key === "ArrowRight" && selectedPage < TOTAL_PAGES)
        setSelectedPage(selectedPage + 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPage]);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const el = heroRef.current.querySelector(".catalog-hero");
      if (el) {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".page-card");
      if (cards.length) {
        gsap.from(cards, {
          y: 30,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: gridRef }
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <Image
          src="/images/hero-container.webp"
          alt=""
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-atlas-charcoal/75" />
        <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="catalog-hero">
            <span className="text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {t("label")}
            </span>
            <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4 leading-tight max-w-[700px]">
              {t("title")}
            </h1>
            <p className="text-[16px] text-white/60 mt-4 max-w-[500px] leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href={PDF_PATH}
                download="Atlas-BTM-Catalogue.pdf"
                className="inline-flex items-center gap-2.5 bg-atlas-red hover:bg-atlas-red-dark text-white text-[14px] font-bold tracking-wide uppercase px-7 py-3.5 transition-colors"
              >
                <Download className="w-5 h-5" />
                {t("download")}
              </a>
              <span className="text-[14px] text-white/40">
                {TOTAL_PAGES} {t("pages")}
              </span>
            </div>
            <div className="w-16 h-[2px] bg-white/30 mt-8" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          >
            {pages.map((page) => (
              <div
                key={page.num}
                className="page-card group relative bg-white border border-atlas-warm/60 overflow-hidden cursor-pointer hover:shadow-xl hover:border-atlas-red/20 transition-all duration-300"
                onClick={() => setSelectedPage(page.num)}
              >
                <div className="relative aspect-[1195/847]">
                  <Image
                    src={page.src}
                    alt={`${t("page")} ${page.num}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-atlas-charcoal/70 flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-atlas-charcoal/75 pointer-events-none">
                  <span className="text-[12px] font-medium text-white">
                    {t("page")} {page.num} / {TOTAL_PAGES}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <a
              href={PDF_PATH}
              download="Atlas-BTM-Catalogue.pdf"
              className="inline-flex items-center gap-2.5 bg-atlas-red hover:bg-atlas-red-dark text-white text-[14px] font-bold tracking-wide uppercase px-8 py-4 transition-colors"
            >
              <Download className="w-5 h-5" />
              {t("download")}
            </a>
          </div>
        </div>
      </section>

      {selectedPage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-atlas-charcoal/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedPage(null)}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-[14px] font-medium text-white/60">
              {t("page")} {selectedPage} / {TOTAL_PAGES}
            </span>
            <button
              onClick={() => setSelectedPage(null)}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/40 hover:text-white transition-colors disabled:opacity-20 z-10"
            disabled={selectedPage <= 1}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPage((prev) => Math.max(1, (prev || 1) - 1));
            }}
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          <div
            className="relative w-[92vw] max-w-[1400px] aspect-[1195/847]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={pages[selectedPage - 1].src}
              alt={`${t("page")} ${selectedPage}`}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/40 hover:text-white transition-colors disabled:opacity-20 z-10"
            disabled={selectedPage >= TOTAL_PAGES}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPage((prev) =>
                Math.min(TOTAL_PAGES, (prev || 1) + 1)
              );
            }}
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          <a
            href={PDF_PATH}
            download="Atlas-BTM-Catalogue.pdf"
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-atlas-red hover:bg-atlas-red-dark text-white text-[13px] font-bold tracking-wide px-5 py-2.5 transition-colors z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-4 h-4" />
            {t("download")}
          </a>
        </div>
      )}
    </>
  );
}
