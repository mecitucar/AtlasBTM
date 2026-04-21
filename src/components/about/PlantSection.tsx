"use client";

import { useLocale } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { Building2, Container, Layers, Wrench, MapPin } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const capacities = [
  { icon: Building2, value: 12000, unit: "m\u00B2", period: "/month", label: { fr: "Prefabrique", en: "Prefabricated" } },
  { icon: Container, value: 350, unit: "pcs", period: "/month", label: { fr: "Conteneurs", en: "Containers" } },
  { icon: Layers, value: 10500, unit: "m\u00B2", period: "/month", label: { fr: "Acier Leger", en: "Light Steel" } },
  { icon: Wrench, value: 250, unit: "ton", period: "/month", label: { fr: "Acier Structurel", en: "Structural Steel" } },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2.5, ease: "power2.out",
      onUpdate: () => setVal(Math.round(obj.val)),
    });
  }, [active, target]);
  return <span>{formatNumber(val)}</span>;
}

export function PlantSection() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useGSAP(() => {
    gsap.from(".plant-text .reveal", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });

    gsap.from(".plant-card", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".plant-card",
        start: "top 88%",
        onEnter: () => setCounting(true),
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-charcoal">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="plant-text">
            <span className="reveal text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold block">
              {locale === "fr" ? "Usine de Production" : "Production Plant"}
            </span>
            <h2 className="reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Technologie de pointe et grande capacite"
                : "Latest Technology and Large Capacity"}
            </h2>
            <div className="reveal w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="reveal text-[16px] text-white/55 leading-relaxed mb-6">
              {locale === "fr"
                ? "Atlas Batiment Modulaire fabrique des produits repondant aux normes internationales les plus elevees avec une qualite de materiaux superieure. Notre centre de production utilise des lignes de production entierement automatiques."
                : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic production lines."}
            </p>
            <div className="reveal flex items-center gap-3 text-white/40 mb-10">
              <MapPin className="w-4 h-4 text-atlas-red" />
              <span className="text-[14px]">
                {locale === "fr" ? "Turquie - Usine de production moderne" : "Turkey - Modern production facility"}
              </span>
            </div>
            <div className="reveal aspect-[16/9] overflow-hidden">
              <Image
                src="/images/containers/assembly-2.webp"
                alt="Assemblage de modules prefabriques dans l'usine Atlas"
                width={700}
                height={394}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {capacities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="plant-card bg-white/5 p-7 text-center">
                  <Icon className="w-8 h-8 text-atlas-red mx-auto mb-4" />
                  <div className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.5rem)] font-black text-white leading-none">
                    <CountUp target={cap.value} active={counting} />
                  </div>
                  <div className="text-[13px] text-white/40 mt-1">
                    {cap.unit}{cap.period}
                  </div>
                  <div className="text-[13px] text-atlas-red font-bold uppercase tracking-wide mt-3">
                    {cap.label[locale]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
