"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { containers } from "@/lib/images";

const solutions = [
  {
    key: "worksite",
    image: containers.camp1,
    alt: "Camp de chantier modulaire Atlas - deploiement rapide",
  },
  {
    key: "multipurpose",
    image: containers.finished2,
    alt: "Batiments polyvalents modulaires Atlas",
  },
];

export function SolutionsPreview() {
  const t = useTranslations("solutions");
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".sol-heading", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".sol-heading", start: "top 85%" },
    });

    const cards = container.current!.querySelectorAll(".sol-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });

      const img = card.querySelector(".sol-img");
      if (img) {
        gsap.from(img, {
          scale: 1.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="sol-heading text-center mb-16">
          <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
            Solutions
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {locale === "fr"
              ? "Atlas vous propose des solutions de haute qualite"
              : "Atlas offers you high quality solutions"}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol) => (
            <div key={sol.key} className="sol-card">
              <Link
                href="/sectors"
                className="group block bg-white border border-atlas-warm/60 overflow-hidden hover:shadow-xl hover:border-atlas-red/20 transition-all duration-500"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <Image
                    src={sol.image}
                    alt={sol.alt}
                    fill
                    className="sol-img object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-[var(--font-heading)] font-black text-[22px] text-atlas-charcoal mb-3 tracking-tight">
                    {t(`${sol.key}.title`)}
                  </h3>
                  <p className="text-[15px] text-atlas-slate leading-relaxed mb-6">
                    {t(`${sol.key}.desc`)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[14px] text-atlas-red font-bold uppercase tracking-wide group-hover:gap-3 transition-all">
                    {locale === "fr" ? "Details" : "Details"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
