"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";

export function HomeCTA() {
  const nav = useTranslations("nav");
  const t = useTranslations("cta");
  const ft = useTranslations("footer");
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hcta-content > *", {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" },
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative bg-atlas-charcoal"
      style={{ position: "relative", zIndex: 40 }}
    >
      <div className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 280px)" }}>
        <BlueprintGrid opacity={0.04} />
        <div className="absolute inset-0">
          <Image
            src="/images/cta-bg.webp"
            alt="Atlas Batiment Modulaire - conception projet modulaire"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-atlas-red/40" />
        </div>
        <div className="relative z-10 py-10 sm:py-14 lg:py-20 flex items-center" style={{ minHeight: "calc(100vh - 280px)" }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="hcta-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              <div>
                <span className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-white/70 font-bold">
                  {locale === "fr" ? "Votre Projet Conteneur" : "Your Container Project"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,5vw,3.25rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-[1.05]">
                  {locale === "fr"
                    ? "Besoin de conteneurs modulaires ?"
                    : "Need modular containers?"}
                </h2>
                <div className="w-12 sm:w-16 h-[3px] bg-white mt-4 sm:mt-6 mb-5 sm:mb-8" />
                <p className="text-[14px] sm:text-[17px] text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-[480px]">
                  {locale === "fr"
                    ? "Decrivez-nous votre besoin en conteneurs et recevez une proposition detaillee sous 48h. Nos experts vous accompagnent de la conception a la livraison."
                    : "Describe your container needs and receive a detailed proposal within 48h. Our experts support you from design to delivery."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 bg-white text-atlas-red hover:bg-white/90 px-6 sm:px-9 py-3.5 sm:py-5 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors"
                  >
                    {locale === "fr" ? "Devis Conteneur" : "Container Quote"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <Link
                    href="/products"
                    className="group inline-flex items-center justify-center gap-3 border-2 border-white/25 text-white hover:bg-white/10 px-6 sm:px-9 py-3.5 sm:py-5 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-all"
                  >
                    {locale === "fr" ? "Nos Conteneurs" : "Our Containers"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-atlas-red flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] sm:text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-0.5 sm:mb-1">
                      {locale === "fr" ? "Telephone" : "Phone"}
                    </span>
                    <span className="text-[15px] sm:text-[18px] text-white font-bold">+32 490 10 49 05</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-atlas-red flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] sm:text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-0.5 sm:mb-1">
                      Email
                    </span>
                    <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[13px] sm:text-[18px] text-white font-bold hover:text-white/80 transition-colors break-all">
                      atlasbatimodulaire@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
