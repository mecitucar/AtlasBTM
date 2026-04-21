"use client";

import { useLocale } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
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

const differentiators = [
  { icon: Sparkles, fr: "Experience client unique", en: "Unique customer experience" },
  { icon: Award, fr: "Constructions esthetiques a usage maximal", en: "Aesthetically designed constructions with maximum usage" },
  { icon: Users, fr: "Equipes competentes et designs modernes", en: "Knowledgeable teams and modern designs" },
  { icon: Shield, fr: "Satisfaction client avec assurance qualite", en: "Customer satisfaction with quality assurance" },
  { icon: Clock, fr: "Livraison ponctuelle avec qualite et confort", en: "On-time delivery with quality and comfort" },
  { icon: Leaf, fr: "Priorite a la nature et la durabilite", en: "Priority to nature and sustainability" },
  { icon: Globe, fr: "Solutions alternatives a l'echelle mondiale", en: "Alternative solutions globally" },
  { icon: Truck, fr: "Expedition rapide avec coordination efficace", en: "Quick dispatch with fast coordination" },
  { icon: Zap, fr: "Production rapide avec equipes experimentees", en: "Fast production with experienced teams" },
];

export function WhyAtlas() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = container.current!.querySelector(".why-heading");
    if (heading) {
      gsap.from(heading, {
        x: -40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const cards = container.current!.querySelectorAll(".why-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 30, opacity: 0, scale: 0.95, rotateX: 8, duration: 0.5, stagger: 0.05,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="why-heading mb-16">
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {locale === "fr" ? "Pourquoi Atlas" : "Why Atlas"}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-3 tracking-tight max-w-[500px]">
            {locale === "fr"
              ? "Notre difference, votre avantage"
              : "Our difference, your advantage"}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="why-card flex items-start gap-4 bg-white/5 p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 bg-atlas-red/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-atlas-red" />
                </div>
                <p className="text-[15px] text-white/70 leading-relaxed">
                  {item[locale]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
