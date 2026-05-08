"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { containers } from "@/lib/images";

export function PlantSection() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".plant-reveal", {
      y: 35, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".plant-content", start: "top 75%" },
    });
    gsap.from(".plant-img", {
      clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power3.inOut",
      scrollTrigger: { trigger: ".plant-img", start: "top 80%" },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="plant-img relative aspect-[16/10] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
              <Image
                src="/images/about/about-plant.webp"
                alt="Usine de production Atlas Bâtiment Modulaire - lignes de fabrication automatiques"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={90}
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <div className="plant-content">
              <span className="plant-reveal text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
                {locale === "fr" ? "Usine de Production" : "Production Plant"}
              </span>
              <h2 className="plant-reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-4 tracking-tight leading-tight">
                {locale === "fr"
                  ? "Technologie de pointe et grande capacité"
                  : "Latest Technology and Large Capacity"}
              </h2>
              <div className="plant-reveal w-16 h-[3px] bg-atlas-red mt-7 mb-8" />
              <p className="plant-reveal text-[16px] text-atlas-slate leading-[1.8] mb-6">
                {locale === "fr"
                  ? "Atlas Bâtiment Modulaire fabrique des produits répondant aux normes internationales les plus élevées avec une qualité de matériaux supérieure. Notre centre de production utilise des lignes de rollformage et de formage d'acier entièrement automatiques."
                  : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic rollforming and steel forming production lines."}
              </p>
              <p className="plant-reveal text-[16px] text-atlas-slate leading-[1.8] mb-8">
                {locale === "fr"
                  ? "Avec une capacité de production moderne et des équipements de dernière génération, nous développons les designs les plus modernes et les productions les plus efficaces pour nos clients à travers le monde."
                  : "With modern production capacity and state-of-the-art equipment, we develop the most modern designs and efficient productions for our clients worldwide."}
              </p>
              <div className="plant-reveal flex items-center gap-3 text-atlas-slate/50 mb-10">
                <MapPin className="w-4 h-4 text-atlas-red" />
                <span className="text-[14px]">
                  {locale === "fr" ? "Turquie - Usine de production moderne" : "Turkey - Modern production facility"}
                </span>
              </div>
              <Link
                href="/contact"
                className="plant-reveal group inline-flex items-center gap-3 bg-atlas-charcoal hover:bg-atlas-red text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {locale === "fr" ? "Visiter l'usine" : "Visit the plant"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
