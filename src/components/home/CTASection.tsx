"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function CTASection() {
  const t = useTranslations("cta");
  const nav = useTranslations("nav");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cta-bg-img", {
      y: "-15%",
    }, {
      y: "5%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from(".cta-content .reveal", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-[-20%] cta-bg-img">
        <Image
          src="/images/containers/site-aerial-1.webp"
          alt="Projet de construction modulaire Atlas Batiment Modulaire - vue aerienne du chantier"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-atlas-charcoal/75" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
          <div className="cta-content max-w-[640px]">
            <div className="reveal w-12 h-[3px] bg-atlas-red mb-8" />
            <h2 className="reveal font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-6">
              {t("quote")}
            </h2>
            <p className="reveal text-[17px] text-white/50 mb-10 leading-relaxed">
              Contactez nos experts pour discuter de votre projet et recevoir
              une proposition personnalisee.
            </p>
            <div className="reveal flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-10 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {nav("contact")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <a
                href="/catalog/atlas-catalog.pdf"
                download="Atlas-BTM-Catalogue.pdf"
                className="group inline-flex items-center gap-3 border-2 border-white/25 hover:bg-white/10 text-white px-8 py-5 text-[15px] font-bold tracking-wider uppercase transition-all"
              >
                <FileText className="w-5 h-5" />
                Catalogue PDF
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
