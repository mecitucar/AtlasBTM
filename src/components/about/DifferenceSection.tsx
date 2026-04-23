"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const values = [
  {
    fr: "Expérience client unique et service personnalisé",
    en: "Unique customer experience and personalized service",
  },
  {
    fr: "Designs modernes avec des équipes hautement compétentes",
    en: "Modern designs with highly competent teams",
  },
  {
    fr: "Garantie qualité et satisfaction client assurée",
    en: "Quality guarantee and ensured customer satisfaction",
  },
  {
    fr: "Livraison à temps avec une planification rigoureuse",
    en: "On-time delivery with rigorous planning",
  },
  {
    fr: "Priorité à la durabilité et au respect de l'environnement",
    en: "Priority on sustainability and environmental respect",
  },
  {
    fr: "Solutions déployables à l'échelle mondiale",
    en: "Globally deployable solutions",
  },
];

export function DifferenceSection() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".diff-text > *", {
      y: 35, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-text", start: "top 75%" },
    });
    gsap.from(".diff-img", {
      clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: ".diff-img", start: "top 75%" },
    });
    gsap.from(".diff-img img", {
      scale: 1.3, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-img", start: "top 75%" },
    });
    gsap.from(".diff-val", {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-vals", start: "top 80%" },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="diff-img relative aspect-[3/4] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
              <Image
                src="/images/showcase/49.webp"
                alt="Production de conteneurs modulaires Atlas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-12">
            <div className="diff-text">
              <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                {locale === "fr" ? "Notre Différence" : "Our Difference"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-4 tracking-tight leading-tight max-w-[540px]">
                {locale === "fr"
                  ? "Une gestion de processus qui élimine les problèmes dès le départ"
                  : "Process management that eliminates problems from the start"}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-7 mb-10" />
            </div>
            <div className="diff-vals grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
              {values.map((val, i) => (
                <div key={i} className="diff-val flex items-start gap-4 py-3 border-b border-atlas-charcoal/8">
                  <span className="text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-atlas-slate leading-relaxed">
                    {val[locale]}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors mt-10"
            >
              {locale === "fr" ? "Contactez-nous" : "Contact us"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
