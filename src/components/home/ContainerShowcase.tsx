"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Layers, RefreshCw, Shield, Truck } from "lucide-react";
import { heroes } from "@/lib/images";

const highlights = {
  fr: [
    { icon: Layers, title: "Empilable 4 Étages", desc: "Structures modulaires empilables jusqu'à 4 niveaux" },
    { icon: RefreshCw, title: "Service Local", desc: "Équipe locale en Guinée pour un accompagnement de proximité" },
    { icon: Shield, title: "Normes Internationales", desc: "Production certifiée aux plus hautes normes" },
    { icon: Truck, title: "Livraison Rapide", desc: "Prêt à l'emploi, expédition et installation rapides" },
  ],
  en: [
    { icon: Layers, title: "Stackable 4 Stories", desc: "Modular structures stackable up to 4 levels" },
    { icon: RefreshCw, title: "Local Service", desc: "Local team in Guinea for close support and assistance" },
    { icon: Shield, title: "International Standards", desc: "Production certified to highest standards" },
    { icon: Truck, title: "Fast Delivery", desc: "Ready to use, rapid shipping and installation" },
  ],
};

export function ContainerShowcase() {
  const locale = useLocale() as "fr" | "en";
  const items = highlights[locale];

  return (
    <section
      className="relative min-h-screen lg:h-screen bg-atlas-charcoal overflow-hidden"
      style={{ position: "relative", zIndex: 25 }}
    >
      {/* Desktop: side-by-side grid */}
      <div className="hidden lg:grid grid-cols-2 h-full">
        <div className="relative cs-image">
          <Image
            src={heroes.livingContainer}
            alt="Atlas Bâtiment Modulaire - bâtiment modulaire empilé deux étages"
            fill
            className="object-cover"
            sizes="50vw"
            quality={90}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center py-24 px-16">
          <div className="cs-heading">
            <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Produit Phare" : "Featured Product"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 tracking-tight leading-[1.05]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
              Living Container
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="text-[17px] text-white/60 leading-relaxed max-w-[480px] mb-12">
              {locale === "fr"
                ? "Bâtiments modulaires en conteneur prêts à l'emploi, idéals pour une occupation à court terme sur les chantiers et les camps temporaires. Solution économique, rapide et fiable."
                : "Ready-to-use modular container buildings ideal for short-term occupancy in construction sites and temporary camps. Economical, fast and reliable solution."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="cs-card group relative min-w-0">
                  <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 rounded-[44px] bg-[radial-gradient(circle_at_50%_50%,rgba(196,30,58,0.16),rgba(196,30,58,0.07)_30%,transparent_72%)] opacity-0 blur-[34px] transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative overflow-hidden rounded-[24px] border border-white/7 bg-[#262626] px-5 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.16)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-atlas-red/14 min-h-[114px]">
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-atlas-red shadow-[0_12px_24px_rgba(196,30,58,0.22)]">
                        <div className="absolute inset-[6px] rounded-full border border-white/15" />
                        <Icon className="relative z-10 h-4.5 w-4.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[15px] font-bold text-white block mb-1.5 tracking-[-0.01em]">{item.title}</span>
                        <span className="text-[13px] text-white leading-[1.75] block">{item.desc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cs-heading">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Voir les Conteneurs" : "View Containers"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: background image + overlay content */}
      <div className="lg:hidden relative min-h-screen flex flex-col">
        <div className="absolute inset-0 cs-image">
          <Image
            src={heroes.livingContainer}
            alt="Atlas Bâtiment Modulaire - bâtiment modulaire empilé deux étages"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-1 py-6 px-5 sm:px-8">
          <div className="cs-heading">
            <span className="text-[11px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Produit Phare" : "Featured Product"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,7vw,2.5rem)] font-black text-white mt-2 tracking-tight leading-[1.05]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
              Living Container
            </h2>
            <div className="w-12 h-[3px] bg-atlas-red mt-3 mb-4" />
            <p className="text-[14px] text-white/60 leading-relaxed mb-5">
              {locale === "fr"
                ? "Bâtiments modulaires en conteneur prêts à l'emploi, idéals pour une occupation à court terme sur les chantiers et les camps temporaires."
                : "Ready-to-use modular container buildings ideal for short-term occupancy in construction sites and temporary camps."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="cs-card flex items-center gap-3 p-3 rounded-[20px] bg-atlas-charcoal/92 border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-full bg-atlas-red flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">{item.title}</span>
                </div>
              );
            })}
          </div>

          <div className="cs-heading">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Voir les Conteneurs" : "View Containers"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
