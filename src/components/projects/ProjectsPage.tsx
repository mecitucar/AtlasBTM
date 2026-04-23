"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title: { fr: "Batiments de Mobilisation", en: "Mobilization Buildings" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: "/images/containers/finished-1.webp",
    altText: { fr: "Batiments de mobilisation modulaires sur chantier", en: "Modular mobilization buildings on construction site" },
  },
  {
    title: { fr: "Camp Minier - Site d'Extraction", en: "Mining Camp - Extraction Site" },
    sector: "mining",
    location: { fr: "Afrique", en: "Africa" },
    image: "/images/containers/site-aerial-2.webp",
    altText: { fr: "Camp minier modulaire sur site d'extraction", en: "Modular mining camp on extraction site" },
  },
  {
    title: { fr: "Batiments de Chantier", en: "Construction Site Buildings" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: "/images/containers/camp-1.webp",
    altText: { fr: "Batiments modulaires de chantier de construction", en: "Modular construction site buildings" },
  },
  {
    title: { fr: "Batiments Polyvalents", en: "Multi-Purpose Buildings" },
    sector: "multipurpose",
    location: { fr: "Europe", en: "Europe" },
    image: "/images/containers/finished-2.webp",
    altText: { fr: "Batiments polyvalents modulaires", en: "Multi-purpose modular buildings" },
  },
  {
    title: { fr: "Camp Installation Energetique", en: "Energy Facility Camp" },
    sector: "energy",
    location: { fr: "Moyen-Orient", en: "Middle East" },
    image: "/images/containers/port-containers.webp",
    altText: { fr: "Camp modulaire pour installation energetique", en: "Modular camp for energy facility" },
  },
  {
    title: { fr: "Installation Camp de Chantier", en: "Worksite Camp Installation" },
    sector: "worksite",
    location: { fr: "Europe", en: "Europe" },
    image: "/images/containers/assembly-1.webp",
    altText: { fr: "Installation de camp de chantier modulaire", en: "Modular worksite camp installation" },
  },
  {
    title: { fr: "Conteneurs Bureau", en: "Office Containers" },
    sector: "multipurpose",
    location: { fr: "Europe", en: "Europe" },
    image: "/images/containers/factory-1.webp",
    altText: { fr: "Conteneurs bureau modulaires pour industrie", en: "Modular office containers for industry" },
  },
  {
    title: { fr: "Camp Logistique", en: "Logistics Camp" },
    sector: "worksite",
    location: { fr: "Afrique", en: "Africa" },
    image: "/images/containers/transport-1.webp",
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

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const label = heroRef.current!.querySelector(".hero-label");
    const title = heroRef.current!.querySelector(".hero-title");
    const line = heroRef.current!.querySelector(".hero-line");

    tl.from(label, { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(title, { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)", duration: 0.8 }, 0.35);
    tl.from(line, { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
  }, { scope: heroRef });

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(cards,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <>
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden border-b-[3px] border-atlas-red">
        <div className="absolute inset-0">
          <Image src="/images/projects-hero.jpg" alt="Wireframe structure modulaire Atlas" fill className="object-cover" sizes="100vw" priority />
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
