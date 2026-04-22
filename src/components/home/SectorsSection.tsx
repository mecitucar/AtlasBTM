"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Container, Pickaxe, HardHat, Shield, Zap, ArrowUpRight } from "lucide-react";

const sectors = [
  { key: "prefab", icon: Container },
  { key: "mining", icon: Pickaxe },
  { key: "construction", icon: HardHat },
  { key: "defense", icon: Shield },
  { key: "energy", icon: Zap },
];

export function SectorsSection() {
  const t = useTranslations("solutions");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = container.current!.querySelector(".sectors-heading");
    if (heading) {
      gsap.from(heading, {
        y: 30, opacity: 0, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const cards = container.current!.querySelectorAll(".sector-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 40, opacity: 0, scale: 0.92, duration: 0.55, stagger: 0.07,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="sectors-heading text-center mb-16">
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div key={sector.key} className="sector-card">
                <Link
                  href="/sectors"
                  className="group block bg-white border border-atlas-warm/60 p-7 hover:border-atlas-red/30 hover:shadow-lg transition-all h-full"
                >
                  <Icon className="w-7 h-7 text-atlas-red mb-5" />
                  <h3 className="font-[var(--font-heading)] font-bold text-[16px] text-atlas-charcoal mb-2 tracking-tight leading-snug">
                    {t(`${sector.key}.title`)}
                  </h3>
                  <p className="text-[13px] text-atlas-slate leading-relaxed mb-4">
                    {t(`${sector.key}.desc`).slice(0, 80)}...
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-atlas-slate/30 group-hover:text-atlas-red transition-colors" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
