"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import {
  Award,
  Clock,
  Leaf,
  Globe,
  Sparkles,
  Shield,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const items = [
  { icon: Sparkles, fr: "Offre une experience client unique", en: "Offers unique customer experience" },
  { icon: Award, fr: "Fournit un usage maximal avec des constructions esthetiques", en: "Provides maximum usage with aesthetically designed constructions" },
  { icon: Users, fr: "Developpe des designs modernes avec des equipes competentes", en: "Develops modern designs with knowledgeable teams" },
  { icon: Shield, fr: "Assure la satisfaction client avec une garantie qualite", en: "Ensures customer satisfaction with quality assurance" },
  { icon: Clock, fr: "Livre a temps avec qualite et confort", en: "Delivers on-time with quality and comfort" },
  { icon: Leaf, fr: "Donne la priorite a la nature et a la durabilite", en: "Prioritizes nature and sustainability" },
  { icon: Globe, fr: "Fournit des solutions alternatives a l'echelle mondiale", en: "Provides alternative solutions globally" },
  { icon: Truck, fr: "Expedie rapidement avec une coordination efficace", en: "Dispatches quickly with fast coordination" },
  { icon: Zap, fr: "Produit des solutions avec des equipes experimentees", en: "Produces solutions with experienced teams" },
];

export function DifferenceSection() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stickyCol = container.current!.querySelector(".diff-sticky");
    if (stickyCol) {
      const items = stickyCol.querySelectorAll(".diff-sticky-reveal");
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    const cards = container.current!.querySelectorAll(".diff-item");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: 80,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        const icon = card.querySelector(".diff-icon");
        if (icon) {
          gsap.from(icon, {
            scale: 0,
            rotation: -90,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="diff-sticky lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="diff-sticky-reveal text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold block">
                {locale === "fr" ? "Notre Difference" : "Our Difference"}
              </span>
              <h2 className="diff-sticky-reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight leading-tight">
                {locale === "fr"
                  ? "Atlas offre des solutions de haute qualite avec une gestion de processus qui elimine les problemes potentiels des le depart"
                  : "Atlas offers high-quality solutions with process management that eliminates potential problems from the very beginning"}
              </h2>
              <div className="diff-sticky-reveal w-16 h-[3px] bg-atlas-red mt-6" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="diff-item flex items-start gap-5 bg-background p-6 border border-atlas-warm/40 hover:border-atlas-red/20 hover:shadow-lg transition-all"
                >
                  <div className="diff-icon w-11 h-11 bg-atlas-red/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-atlas-red" />
                  </div>
                  <p className="text-[16px] text-atlas-charcoal leading-relaxed pt-2">
                    {item[locale]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
