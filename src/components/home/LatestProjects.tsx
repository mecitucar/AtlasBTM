"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  { title: { fr: "Batiments de Mobilisation", en: "Mobilization Buildings" }, location: { fr: "Europe", en: "Europe" }, image: "/images/containers/finished-1.webp", alt: "Batiments de mobilisation modulaires" },
  { title: { fr: "Camp Minier", en: "Mining Camp" }, location: { fr: "Afrique", en: "Africa" }, image: "/images/containers/site-aerial-2.webp", alt: "Camp minier modulaire vue aerienne" },
  { title: { fr: "Batiments de Chantier", en: "Construction Site Buildings" }, location: { fr: "Europe", en: "Europe" }, image: "/images/containers/camp-1.webp", alt: "Camp de chantier construction modulaire" },
  { title: { fr: "Camp Installation Energetique", en: "Energy Facility Camp" }, location: { fr: "Moyen-Orient", en: "Middle East" }, image: "/images/containers/port-containers.webp", alt: "Conteneurs pour projet energetique" },
  { title: { fr: "Batiments Polyvalents", en: "Multi-Purpose Buildings" }, location: { fr: "Europe", en: "Europe" }, image: "/images/containers/finished-2.webp", alt: "Batiments polyvalents modulaires" },
  { title: { fr: "Conteneurs Bureau", en: "Office Containers" }, location: { fr: "Europe", en: "Europe" }, image: "/images/containers/interior-1.webp", alt: "Interieur conteneur bureau modulaire" },
];

export function LatestProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".projects-heading", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
    });

    gsap.from(".proj-card", {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".proj-card", start: "top 90%" },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <div className="projects-heading">
            <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
              {t("title")}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
              {t("subtitle")}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6" />
          </div>
          <Link href="/projects" className="hidden lg:inline-flex items-center gap-2 text-[14px] font-bold text-atlas-red uppercase tracking-wide hover:text-atlas-red-dark transition-colors">
            {t("allProjects")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="proj-card group bg-background border border-atlas-warm/60 overflow-hidden hover:shadow-lg transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-[var(--font-heading)] font-bold text-[17px] text-atlas-charcoal mb-2 leading-snug">
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

        <div className="lg:hidden mt-8 text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] font-bold text-atlas-red uppercase tracking-wide">
            {t("allProjects")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
