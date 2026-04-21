"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
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
import { Footer } from "@/components/layout/Footer";

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
      className="fixed inset-0 z-40 overflow-y-auto"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Hero */}
      <section
        className="snap-section relative h-screen flex items-end"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="absolute inset-0">
          <Image
            src={products[0].image}
            alt={products[0].altText}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative z-10 pb-16 lg:pb-24 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {t("title")}
            </span>
            <h1 className="font-[var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white mt-3 leading-[0.95] tracking-tight max-w-[700px]">
              {t("subtitle")}
            </h1>
            <div className="w-20 h-[3px] bg-atlas-red mt-6" />
          </div>
        </div>
      </section>

      {/* Urun panelleri */}
      {products.map((product, i) => {
        const Icon = product.icon;
        const isEven = i % 2 === 0;
        return (
          <section
            key={product.key}
            className={`snap-section h-screen ${isEven ? "bg-white" : "bg-atlas-charcoal"}`}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative h-[50vh] overflow-hidden">
              <Image src={product.image} alt={product.altText} fill className="object-cover" sizes="100vw" />
              <div className={`absolute bottom-0 left-0 right-0 h-[30%] ${isEven ? "bg-gradient-to-t from-white to-transparent" : "bg-gradient-to-t from-atlas-charcoal to-transparent"}`} />
            </div>
            <div className="h-[50vh] flex items-center">
              <div className="w-full px-8 sm:px-12 lg:px-20 xl:px-28">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-24 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 ${isEven ? "bg-atlas-red/10" : "bg-white/10"} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-atlas-red" />
                      </div>
                      <h2 className={`font-[var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-black ${isEven ? "text-atlas-charcoal" : "text-white"} tracking-tight`}>
                        {t(`${product.key}.title`)}
                      </h2>
                    </div>
                    <p className={`text-[17px] ${isEven ? "text-atlas-slate" : "text-white/60"} leading-relaxed mb-8`}>
                      {t(`${product.key}.desc`)}
                    </p>
                    <Link href="/contact" className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors">
                      {t("title")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <ul className="space-y-4 lg:pt-2">
                    {(t.raw(`${product.key}.features`) as string[]).map((feature: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-atlas-red flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className={`text-[16px] ${isEven ? "text-atlas-charcoal" : "text-white/90"} leading-relaxed`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
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
