"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function ProductionPlant() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".plant-text .reveal", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });

    gsap.from(".plant-image", {
      clipPath: "inset(0 0 0 100%)",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });

    gsap.from(".plant-image img", {
      scale: 1.3,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="plant-text">
            <span className="reveal text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold block">
              {locale === "fr" ? "Usine de Production" : "Production Plant"}
            </span>
            <h2 className="reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Technologie de pointe et grande capacite"
                : "Latest Technology and Large Capacity"}
            </h2>
            <div className="reveal w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="reveal text-[16px] text-atlas-slate leading-relaxed mb-6">
              {locale === "fr"
                ? "Atlas Batiment Modulaire fabrique des produits repondant aux normes internationales les plus elevees grace a une qualite de materiaux superieure. Notre centre de production utilise des lignes de rollformage et de formage d'acier entierement automatiques."
                : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic rollforming and steel forming production lines."}
            </p>
            <p className="reveal text-[16px] text-atlas-slate leading-relaxed mb-10">
              {locale === "fr"
                ? "Avec une capacite de production moderne et des equipements de derniere generation, nous developpons les designs les plus modernes et les productions les plus efficaces pour nos clients a travers le monde."
                : "With modern production capacity and state-of-the-art equipment, we develop the most modern designs and most efficient productions for our clients across the globe."}
            </p>
            <Link
              href="/about"
              className="reveal group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Usine de Production Atlas" : "Atlas Production Plant"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="plant-image overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
            <Image
              src="/images/showcase/49.webp"
              alt="Centre de production Atlas - lignes automatiques de fabrication modulaire"
              width={700}
              height={525}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
