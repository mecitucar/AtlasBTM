"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, Leaf, Recycle, Zap } from "lucide-react";
import Image from "next/image";
import { containers } from "@/lib/images";

export function SustainabilityStrip() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);


  return (
    <section ref={container} className="relative overflow-hidden">
      <div className="absolute inset-[-20%] sustain-bg-img">
        <Image
          src={containers.siteAerial1}
          alt="Vue aerienne projet durable Atlas Batiment Modulaire"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-atlas-charcoal/88" />

      <div className="relative z-10 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="sustain-text lg:col-span-7">
              <span className="reveal text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold block">
                {locale === "fr" ? "Sante, Securite et Environnement" : "Health, Safety and Environment"}
              </span>
              <h2 className="reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight leading-tight">
                {locale === "fr" ? "Objectifs de Durabilite" : "Sustainability Goals"}
              </h2>
              <div className="reveal w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
              <p className="reveal text-[16px] text-white/50 leading-relaxed mb-10 max-w-[540px]">
                {locale === "fr"
                  ? "Nos batiments sont reutilisables, reconfigurables et recyclables. Pour un avenir durable, nous voulons prendre des mesures qui ameliorent le monde en trouvant des solutions pour soutenir notre feuille de route Net Zero."
                  : "Our buildings are reusable, reconfigurable and recyclable. For a sustainable future, we want to take steps that improve the world by finding solutions to support our Net Zero Roadmap."}
              </p>
              <Link
                href="/about"
                className="reveal group inline-flex items-center gap-3 border-2 border-atlas-red text-atlas-red hover:bg-atlas-red hover:text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-all"
              >
                {locale === "fr" ? "Atlas et la Durabilite" : "Atlas and Sustainability"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-4">
              {[
                { icon: Leaf, label: locale === "fr" ? "Reutilisable" : "Reusable" },
                { icon: Recycle, label: locale === "fr" ? "Recyclable" : "Recyclable" },
                { icon: Zap, label: locale === "fr" ? "Efficient" : "Efficient" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="sustain-icon text-center">
                    <div className="w-16 h-16 bg-atlas-red/15 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-7 h-7 text-atlas-red" />
                    </div>
                    <span className="text-[13px] text-white/60 font-medium uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
