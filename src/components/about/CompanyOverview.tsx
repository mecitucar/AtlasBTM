"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { Building2, MapPin, Wrench, Globe } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const highlights = [
  {
    icon: Building2,
    title: { fr: "Siege Social", en: "Headquarters" },
    desc: { fr: "France - Coordination des projets europeens et internationaux", en: "France - Coordination of European and international projects" },
  },
  {
    icon: Wrench,
    title: { fr: "Atelier de Production", en: "Production Workshop" },
    desc: { fr: "Turquie - Fabrication et assemblage de conteneurs et modules prefabriques", en: "Turkey - Manufacturing and assembly of containers and prefabricated modules" },
  },
  {
    icon: Globe,
    title: { fr: "Presence Internationale", en: "International Presence" },
    desc: { fr: "Projets realises dans plus de 12 pays en Europe, Afrique et Moyen-Orient", en: "Projects completed in over 12 countries across Europe, Africa and Middle East" },
  },
  {
    icon: MapPin,
    title: { fr: "Reseau Logistique", en: "Logistics Network" },
    desc: { fr: "Infrastructure de transport et de livraison couvrant toute l'Europe", en: "Transport and delivery infrastructure covering all of Europe" },
  },
];

export function CompanyOverview() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = container.current!.querySelectorAll(".overview-card");
    if (cards) {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white border-b border-atlas-warm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="overview-card bg-atlas-sand/40 border border-atlas-warm/60 p-7 rounded-sm"
              >
                <div className="w-11 h-11 gradient-atlas rounded-sm flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-[var(--font-heading)] font-semibold text-[17px] text-atlas-navy mb-2">
                  {item.title[locale]}
                </h3>
                <p className="text-[15px] text-atlas-slate leading-relaxed">
                  {item.desc[locale]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
