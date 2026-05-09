"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { containers, defense, sectorImages } from "@/lib/images";

const sectors = [
  { key: "prefab", image: sectorImages.prefab, href: "/sectors/prefab" },
  { key: "mining", image: sectorImages.mining, href: "/sectors/mining" },
  { key: "construction", image: sectorImages.construction, href: "/sectors/construction" },
  { key: "defense", image: defense.hero, href: "/sectors/defense" },
  { key: "energy", image: containers.portContainers, href: "/sectors/energy" },
] as const;

export function SectorsSection() {
  const t = useTranslations("solutions");

  return (
    <section className="relative min-h-screen bg-atlas-charcoal px-0 pt-20 pb-20 overflow-hidden lg:pt-28 lg:pb-24">
      <div className="text-center pb-8 lg:pb-12 shrink-0 px-5">
        <h2 className="sectors-title font-[var(--font-heading)] text-[clamp(1.75rem,4vw,3.25rem)] font-black text-white tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
          {t("title")}
        </h2>
        <div className="w-16 h-[3px] bg-atlas-red mt-4 mb-3 mx-auto" />
        <p className="sectors-label text-[12px] sm:text-[14px] text-white/40 max-w-[500px] mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid min-h-[52vh] grid-cols-2 gap-[2px] px-0 lg:grid-cols-5">
        {sectors.map((sector) => (
          <Link
            key={sector.key}
            href={sector.href}
            className="sector-card group relative overflow-hidden"
          >
            <Image
              src={sector.image}
              alt={t(`${sector.key}.title`)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
              <div className="bg-white p-3 sm:p-4">
                <h3 className="font-[var(--font-heading)] font-black text-[13px] sm:text-[16px] lg:text-[19px] text-atlas-charcoal tracking-tight leading-snug mb-1">
                  {t(`${sector.key}.title`)}
                </h3>
                <p className="text-[9px] sm:text-[11px] text-atlas-slate/70 leading-relaxed mb-2 hidden sm:block">
                  {t(`${sector.key}.desc`).slice(0, 55)}...
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-atlas-red font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                  {t("title") === "Nos Secteurs" ? "Découvrir" : "Discover"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
