"use client";

import { useTranslations, useLocale } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import Image from "next/image";

const projects = [
  {
    title: { fr: "Container Prefabrique - Europe", en: "Prefabricated Container - Europe" },
    sector: { fr: "Container Prefabrique", en: "Prefabricated Container" },
    location: { fr: "Europe", en: "Europe" },
    year: "2025",
    category: "prefab",
    image: "/images/containers/finished-1.webp",
    altText: { fr: "Container prefabrique modulaire installe en Europe", en: "Modular prefabricated container installed in Europe" },
  },
  {
    title: { fr: "Camp Minier - Site d'Extraction", en: "Mining Camp - Extraction Site" },
    sector: { fr: "Camps Miniere", en: "Mining Camps" },
    location: { fr: "Afrique", en: "Africa" },
    year: "2024",
    category: "mining",
    image: "/images/containers/site-aerial-2.webp",
    altText: { fr: "Camp minier modulaire sur site d'extraction", en: "Modular mining camp on extraction site" },
  },
  {
    title: { fr: "Camp Construction - Grand Chantier", en: "Construction Camp - Large Site" },
    sector: { fr: "Camps Construction", en: "Construction Camps" },
    location: { fr: "Moyen Orient", en: "Middle East" },
    year: "2024",
    category: "construction",
    image: "/images/containers/camp-1.webp",
    altText: { fr: "Camp de construction modulaire sur grand chantier", en: "Modular construction camp on large site" },
  },
  {
    title: { fr: "Installation Defense - Site Securise", en: "Defense Installation - Secure Site" },
    sector: { fr: "L'industrie De La Defence", en: "Defense Industry" },
    location: { fr: "Europe", en: "Europe" },
    year: "2024",
    category: "defense",
    image: "/images/containers/finished-2.webp",
    altText: { fr: "Installation modulaire pour industrie de la defense", en: "Modular installation for defense industry" },
  },
  {
    title: { fr: "Project Energetique - Infrastructure", en: "Energy Project - Infrastructure" },
    sector: { fr: "Project l'Energetique", en: "Energy Projects" },
    location: { fr: "Europe", en: "Europe" },
    year: "2023",
    category: "energy",
    image: "/images/containers/port-containers.webp",
    altText: { fr: "Installation modulaire pour projet energetique", en: "Modular installation for energy project" },
  },
  {
    title: { fr: "Conteneurs Modulaires - Logistique", en: "Modular Containers - Logistics" },
    sector: { fr: "Container Prefabrique", en: "Prefabricated Container" },
    location: { fr: "Europe", en: "Europe" },
    year: "2023",
    category: "prefab",
    image: "/images/containers/factory-1.webp",
    altText: { fr: "Conteneurs modulaires pour logistique et stockage", en: "Modular containers for logistics and storage" },
  },
];

const categories = [
  { key: "all", label: { fr: "Tous", en: "All" } },
  { key: "prefab", label: { fr: "Container Prefabrique", en: "Prefabricated Container" } },
  { key: "mining", label: { fr: "Camps Miniere", en: "Mining Camps" } },
  { key: "construction", label: { fr: "Camps Construction", en: "Construction Camps" } },
  { key: "defense", label: { fr: "Defence", en: "Defense" } },
  { key: "energy", label: { fr: "Energetique", en: "Energy" } },
];

export function ReferencesPage() {
  const t = useTranslations("references");
  const locale = useLocale() as "fr" | "en";
  const heroRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    const hero = heroRef.current?.querySelector(".ref-hero");
    if (hero) {
      gsap.from(hero, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      });
    }
  }, { scope: heroRef });

  useGSAP(() => {
    const cards = container.current?.querySelectorAll(".ref-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 50, opacity: 0, scale: 0.92, duration: 0.6, stagger: 0.07,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container, dependencies: [activeCategory], revertOnUpdate: true });

  return (
    <>
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-atlas" />
        <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="ref-hero">
            <span className="text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {t("title")}
            </span>
            <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4 leading-tight max-w-[600px]">
              {t("subtitle")}
            </h1>
            <div className="w-16 h-[2px] bg-white/30 mt-8" />
          </div>
        </div>
      </section>

      <section ref={container} className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-[13px] font-medium tracking-wide uppercase rounded-sm transition-all ${
                  activeCategory === cat.key
                    ? "bg-atlas-red text-white"
                    : "bg-white border border-atlas-warm text-atlas-slate hover:border-atlas-navy/20"
                }`}
              >
                {cat.label[locale]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={`${project.category}-${i}`}
                className="ref-card group bg-white border border-atlas-warm/60 rounded-sm overflow-hidden hover:shadow-lg hover:border-atlas-navy/10 transition-all"
              >
                <div className="aspect-[16/10] bg-atlas-sand border-b border-atlas-warm relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.altText[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-[var(--font-heading)] font-semibold text-[16px] text-atlas-navy mb-3 leading-snug">
                    {project.title[locale]}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[13px] text-atlas-slate">
                      <MapPin className="w-4 h-4 text-atlas-sky shrink-0" />
                      {project.location[locale]}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-atlas-slate">
                      <Calendar className="w-4 h-4 text-atlas-sky shrink-0" />
                      {project.year}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-atlas-warm">
                    <span className="text-[12px] tracking-[0.1em] uppercase text-atlas-green font-medium">
                      {project.sector[locale]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
