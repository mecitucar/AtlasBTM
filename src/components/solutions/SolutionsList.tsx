"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

const solutions = [
  {
    key: "prefab",
    icon: Container,
    gradient: "from-atlas-charcoal to-atlas-navy",
    mainImage: "/images/containers/finished-1.webp",
    altText: "Container prefabrique modulaire - livraison rapide garantie",
    gallery: ["/images/containers/finished-2.webp", "/images/containers/assembly-1.webp", "/images/containers/production-1.webp"],
    galleryAlts: ["Conteneurs prefabriques assembles sur site", "Assemblage de conteneur modulaire", "Production de conteneurs en usine"],
  },
  {
    key: "mining",
    icon: Pickaxe,
    gradient: "from-atlas-red-dark to-atlas-red",
    mainImage: "/images/containers/site-aerial-2.webp",
    altText: "Camps modulaires pour sites miniers - deploiement rapide",
    gallery: ["/images/containers/site-aerial-1.webp", "/images/containers/camp-1.webp", "/images/containers/assembly-2.webp"],
    galleryAlts: ["Vue aerienne camp minier modulaire", "Installation camp minier", "Montage structures pour mines"],
  },
  {
    key: "construction",
    icon: HardHat,
    gradient: "from-atlas-charcoal to-atlas-slate",
    mainImage: "/images/containers/camp-1.webp",
    altText: "Camps construction modulaires pour chantiers",
    gallery: ["/images/containers/interior-1.webp", "/images/containers/assembly-1.webp", "/images/containers/transport-1.webp"],
    galleryAlts: ["Interieur camp de chantier", "Assemblage camp construction", "Transport modules construction"],
  },
  {
    key: "defense",
    icon: Shield,
    gradient: "from-atlas-navy to-atlas-slate",
    mainImage: "/images/containers/finished-2.webp",
    altText: "Structures modulaires pour industrie de la defense",
    gallery: ["/images/containers/port-containers.webp", "/images/containers/factory-1.webp", "/images/containers/production-1.webp"],
    galleryAlts: ["Conteneurs defense au port", "Production en usine pour la defense", "Fabrication structures defense"],
  },
  {
    key: "energy",
    icon: Zap,
    gradient: "from-atlas-red-dark to-atlas-red-light",
    mainImage: "/images/containers/port-containers.webp",
    altText: "Installations modulaires pour projets energetiques",
    gallery: ["/images/containers/finished-1.webp", "/images/containers/transport-1.webp", "/images/containers/factory-1.webp"],
    galleryAlts: ["Modules pour industrie energetique", "Transport de modules energetiques", "Production installations energetiques"],
  },
];

export function SolutionsList() {
  const t = useTranslations("solutions");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-1">
              {solutions.map((sol, i) => {
                const Icon = sol.icon;
                const isActive = activeIndex === i;
                return (
                  <motion.button
                    key={sol.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    onClick={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-sm text-left transition-all ${
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
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-[16/9] bg-atlas-sand rounded-sm mb-8 border border-atlas-warm overflow-hidden relative">
                <Image
                  src={solutions[activeIndex].mainImage}
                  alt={solutions[activeIndex].altText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
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
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
