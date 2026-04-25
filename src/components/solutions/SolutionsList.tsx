"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Container,
  Pickaxe,
  HardHat,
  Shield,
  Zap,
  ChevronRight,
  Download,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { containers } from "@/lib/images";

const solutions = [
  {
    key: "prefab",
    icon: Container,
    gradient: "from-atlas-charcoal to-atlas-navy",
    mainImage: containers.finished1,
    altText: "Container prefabrique modulaire - livraison rapide garantie",
    gallery: [containers.finished2, containers.assembly1, "/images/shared/placeholder.webp"],
    galleryAlts: ["Conteneurs prefabriques assembles sur site", "Assemblage de conteneur modulaire", "Production de conteneurs en usine"],
  },
  {
    key: "mining",
    icon: Pickaxe,
    gradient: "from-atlas-red-dark to-atlas-red",
    mainImage: containers.siteAerial2,
    altText: "Camps modulaires pour sites miniers - deploiement rapide",
    gallery: [containers.siteAerial1, containers.camp1, containers.assembly2],
    galleryAlts: ["Vue aerienne camp minier modulaire", "Installation camp minier", "Montage structures pour mines"],
  },
  {
    key: "construction",
    icon: HardHat,
    gradient: "from-atlas-charcoal to-atlas-slate",
    mainImage: containers.camp1,
    altText: "Camps construction modulaires pour chantiers",
    gallery: [containers.interior1, containers.assembly1, containers.transport1],
    galleryAlts: ["Interieur camp de chantier", "Assemblage camp construction", "Transport modules construction"],
  },
  {
    key: "defense",
    icon: Shield,
    gradient: "from-atlas-navy to-atlas-slate",
    mainImage: containers.finished2,
    altText: "Structures modulaires pour industrie de la defense",
    gallery: [containers.portContainers, containers.factory1, "/images/shared/placeholder.webp"],
    galleryAlts: ["Conteneurs defense au port", "Production en usine pour la defense", "Fabrication structures defense"],
  },
  {
    key: "energy",
    icon: Zap,
    gradient: "from-atlas-red-dark to-atlas-red-light",
    mainImage: containers.portContainers,
    altText: "Installations modulaires pour projets energetiques",
    gallery: [containers.finished1, containers.transport1, containers.factory1],
    galleryAlts: ["Modules pour industrie energetique", "Transport de modules energetiques", "Production installations energetiques"],
  },
];

export function SolutionsList() {
  const t = useTranslations("solutions");
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const sidebar = container.current!.querySelectorAll(".sidebar-btn");
    if (sidebar) {
      gsap.from(sidebar, {
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebar[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: container });

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [activeIndex]);

  return (
    <section ref={container} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-1">
              {solutions.map((sol, i) => {
                const Icon = sol.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={sol.key}
                    onClick={() => setActiveIndex(i)}
                    className={`sidebar-btn w-full flex items-center gap-4 p-4 rounded-sm text-left transition-all ${
                      isActive
                        ? "bg-white border border-atlas-navy/10 shadow-sm"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                        isActive
                          ? `bg-gradient-to-br ${sol.gradient}`
                          : "bg-atlas-sand"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-atlas-slate"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[15px] font-medium ${
                        isActive ? "text-atlas-navy" : "text-atlas-slate"
                      }`}
                    >
                      {t(`${sol.key}.title`)}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-atlas-navy ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div ref={contentRef} key={activeIndex}>
              <div className="aspect-[16/9] bg-atlas-sand rounded-sm mb-8 border border-atlas-warm overflow-hidden relative">
                <Image
                  src={solutions[activeIndex].mainImage}
                  alt={solutions[activeIndex].altText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  quality={90}
                />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-sm bg-gradient-to-br ${solutions[activeIndex].gradient} flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = solutions[activeIndex].icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-atlas-navy">
                  {t(`${solutions[activeIndex].key}.title`)}
                </h2>
              </div>

              <p className="text-[16px] text-atlas-slate leading-relaxed mb-8 max-w-[600px]">
                {t(`${solutions[activeIndex].key}.desc`)}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 bg-atlas-red hover:bg-atlas-red-dark text-white px-6 py-3 text-[15px] font-bold tracking-wide uppercase transition-colors">
                  <Download className="w-4 h-4" />
                  Catalogue PDF
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                {solutions[activeIndex].gallery.map((src, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-atlas-sand rounded-sm border border-atlas-warm overflow-hidden relative"
                  >
                    <Image
                      src={src}
                      alt={solutions[activeIndex].galleryAlts[idx]}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 33vw, 22vw"
                      quality={90}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
