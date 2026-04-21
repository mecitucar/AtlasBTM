"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function AboutSection() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".about-image", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
    });

    gsap.from(".about-image img", {
      scale: 1.3,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
    });

    gsap.from(".about-text .reveal", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 65%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-charcoal overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-image overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
            <Image
              src="/images/containers/factory-1.webp"
              alt="Usine de production Atlas Batiment Modulaire - fabrication de conteneurs modulaires"
              width={700}
              height={525}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="about-text">
            <span className="reveal text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold block">
              ATLAS BATIMENT MODULAIRE
            </span>
            <h2 className="reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
              {locale === "fr"
                ? "Conteneurs, Prefabrique, Acier Leger, Acier Structurel"
                : "Containers, Prefabricated, Light Steel, Structural Steel"}
            </h2>
            <div className="reveal w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="reveal text-[16px] lg:text-[17px] text-white/55 leading-relaxed mb-6">
              {locale === "fr"
                ? "Fondee par des professionnels ayant plus de 20 ans d'experience dans le marketing, la production et l'application de constructions modulaires, Atlas Batiment Modulaire propose des solutions de haute qualite avec une approche centree sur le client."
                : "Founded by professionals with over 20 years of experience in marketing, production and application of modular constructions, Atlas Batiment Modulaire offers high-quality solutions with a customer-focused approach."}
            </p>
            <p className="reveal text-[16px] lg:text-[17px] text-white/55 leading-relaxed mb-10">
              {locale === "fr"
                ? "Nous offrons une infrastructure de production a haute capacite, une qualite de materiaux superieure et des possibilites techniques avancees directement sur vos sites de projet."
                : "We offer high capacity production infrastructure, superior material quality and advanced technical possibilities directly on your project sites."}
            </p>
            <Link
              href="/about"
              className="reveal group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "A propos d'Atlas" : "About Atlas"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
