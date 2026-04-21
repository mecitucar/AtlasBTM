"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function SolutionsHero() {
  const t = useTranslations("solutions");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const label = container.current!.querySelector(".hero-label");
    const title = container.current!.querySelector(".hero-title");
    const line = container.current!.querySelector(".hero-line");

    tl.from(label, { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(title, { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)", duration: 0.8 }, 0.35);
    tl.from(line, { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 gradient-atlas" />
      <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div>
          <span className="hero-label text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium block">
            {t("title")}
          </span>
          <h1 className="hero-title font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4 leading-tight max-w-[600px]">
            {t("subtitle")}
          </h1>
          <div className="hero-line w-16 h-[2px] bg-white/30 mt-8" />
        </div>
      </div>
    </section>
  );
}
