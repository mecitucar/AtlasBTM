"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import { heroes } from "@/lib/images";

export function AboutHero() {
  const t = useTranslations("about");
  const container = useRef<HTMLDivElement>(null);


  return (
    <section ref={container} className="relative min-h-screen lg:h-[85vh] lg:min-h-[600px] flex items-end overflow-hidden border-b-[3px] border-atlas-red">
      <div className="absolute inset-0">
        <Image
          src={heroes.about}
          alt="Atlas Batiment Modulaire - wireframe batiment modulaire"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
      </div>
      <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <span className="ah-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
            {t("title")}
          </span>
          <h1 className="ah-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]">
            {t("subtitle")}
          </h1>
          <div className="ah-line w-20 h-[3px] bg-atlas-red mt-8 mb-8" />
          <p className="ah-intro text-[19px] text-white/50 leading-relaxed max-w-[550px]">
            {t("intro")}
          </p>
        </div>
      </div>
    </section>
  );
}
