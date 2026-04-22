"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

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
      {/* CTA area */}
      <div className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 280px)" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/containers/site-aerial-1.webp"
            alt="Atlas Batiment Modulaire - projet modulaire"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 py-14 lg:py-20 flex items-center" style={{ minHeight: "calc(100vh - 280px)" }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <div className="hcta-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Votre Projet" : "Your Project"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-black text-white mt-4 tracking-tight leading-[1.05]">
                  {t("quote")}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
                <p className="text-[17px] text-white/50 leading-relaxed mb-10 max-w-[480px]">
                  {locale === "fr"
                    ? "Decrivez-nous votre besoin et recevez une proposition detaillee sous 48h. Nos experts vous accompagnent de la conception a la livraison."
                    : "Describe your needs and receive a detailed proposal within 48h. Our experts support you from design to delivery."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
                  >
                    {locale === "fr" ? "Demander un Devis" : "Request a Quote"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10">
                  <Phone className="w-5 h-5 text-atlas-red mt-1 shrink-0" />
                  <div>
                    <span className="text-[13px] text-white/40 uppercase tracking-wider font-medium block mb-1">
                      {locale === "fr" ? "Telephone" : "Phone"}
                    </span>
                    <span className="text-[17px] text-white font-medium">+32 490 XX XX XX</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10">
                  <Mail className="w-5 h-5 text-atlas-red mt-1 shrink-0" />
                  <div>
                    <span className="text-[13px] text-white/40 uppercase tracking-wider font-medium block mb-1">
                      Email
                    </span>
                    <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[17px] text-white font-medium hover:text-atlas-red transition-colors">
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
