"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { heroes, containers } from "@/lib/images";

const projects = [
  {
    title: { fr: "Bâtiments de Mobilisation", en: "Mobilization Buildings" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: containers.finished1,
    altText: { fr: "Bâtiments de mobilisation modulaires sur chantier", en: "Modular mobilization buildings on construction site" },
  },
  {
    title: { fr: "Camp Minier - Site d'Extraction", en: "Mining Camp - Extraction Site" },
    sector: "mining",
    location: { fr: "Afrique", en: "Africa" },
    image: containers.siteAerial2,
    altText: { fr: "Camp minier modulaire sur site d'extraction", en: "Modular mining camp on extraction site" },
  },
  {
    title: { fr: "Bâtiments de Chantier", en: "Construction Site Buildings" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: containers.camp1,
    altText: { fr: "Bâtiments modulaires de chantier de construction", en: "Modular construction site buildings" },
  },
  {
    title: { fr: "Bâtiments Polyvalents", en: "Multi-Purpose Buildings" },
    sector: "multipurpose",
    location: { fr: "Europe", en: "Europe" },
    image: containers.finished2,
    altText: { fr: "Bâtiments polyvalents modulaires", en: "Multi-purpose modular buildings" },
  },
  {
    title: { fr: "Camp Installation Énergétique", en: "Energy Facility Camp" },
    sector: "energy",
    location: { fr: "Moyen-Orient", en: "Middle East" },
    image: containers.portContainers,
    altText: { fr: "Camp modulaire pour installation énergétique", en: "Modular camp for energy facility" },
  },
  {
    title: { fr: "Installation Camp de Chantier", en: "Worksite Camp Installation" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: containers.assembly1,
    altText: { fr: "Installation de camp de chantier modulaire", en: "Modular worksite camp installation" },
  },
  {
    title: { fr: "Conteneurs Bureau", en: "Office Containers" },
    sector: "multipurpose",
    location: { fr: "Europe", en: "Europe" },
    image: containers.factory1,
    altText: { fr: "Conteneurs bureau modulaires pour industrie", en: "Modular office containers for industry" },
  },
  {
    title: { fr: "Camp Logistique", en: "Logistics Camp" },
    sector: "worksite",
    location: { fr: "Afrique", en: "Africa" },
    image: containers.transport1,
    altText: { fr: "Camp logistique modulaire", en: "Modular logistics camp" },
  },
];

const categories = [
  { key: "all" },
  { key: "worksite" },
  { key: "multipurpose" },
  { key: "mining" },
  { key: "energy" },
];

export function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.sector === activeCategory);

  return (
    <>
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden border-b-[3px] border-atlas-red">
        <div className="absolute inset-0">
          <Image src={heroes.projects} alt="Wireframe structure modulaire Atlas" fill className="object-cover" sizes="100vw" quality={90} priority />
        </div>
        <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="hero-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
              {t("title")}
            </span>
            <h1 className="hero-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]">
              {t("subtitle")}
            </h1>
            <div className="hero-line w-20 h-[3px] bg-atlas-red mt-8" />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-[13px] font-bold tracking-wide uppercase transition-all ${
                  activeCategory === cat.key
                    ? "bg-atlas-red text-white"
                    : "bg-white border border-atlas-warm text-atlas-slate hover:border-atlas-charcoal/20"
                }`}
              >
                {t(`categories.${cat.key}`)}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={`${activeCategory}-${i}`}
                className="project-card group bg-white border border-atlas-warm/60 overflow-hidden hover:shadow-lg hover:border-atlas-charcoal/10 transition-all"
              >
                <div className="aspect-[16/10] bg-atlas-sand relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.altText[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-[var(--font-heading)] font-bold text-[17px] text-atlas-charcoal mb-3 leading-snug">
                    {project.title[locale]}
                  </h3>
                  <div className="flex items-center gap-2 text-[13px] text-atlas-slate">
                    <MapPin className="w-4 h-4 text-atlas-red shrink-0" />
                    {project.location[locale]}
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
