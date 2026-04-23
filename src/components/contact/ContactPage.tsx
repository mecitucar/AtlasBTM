"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";

export function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale() as "fr" | "en";
  const heroRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".ch-label", { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(".ch-title", { y: 50, opacity: 0, duration: 0.9 }, 0.3);
    tl.from(".ch-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
    tl.from(".ch-desc", { y: 20, opacity: 0, duration: 0.6 }, 0.9);
  }, { scope: heroRef });

  useGSAP(() => {
    gsap.from(".cf-reveal", {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".cf-form", start: "top 80%" },
    });
    gsap.from(".ci-card", {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".ci-card", start: "top 85%" },
    });
    gsap.from(".ci-item", {
      x: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".ci-card", start: "top 80%" },
    });
  }, { scope: container });

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden border-b-[3px] border-atlas-red">
        <div className="absolute inset-0">
          <Image src="/images/contact-hero.jpg" alt="Vue aerienne camp modulaire Atlas" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="ch-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
              {t("title")}
            </span>
            <h1 className="ch-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]">
              {t("subtitle")}
            </h1>
            <div className="ch-line w-20 h-[3px] bg-atlas-red mt-8 mb-8" />
            <p className="ch-desc text-[19px] text-white/50 leading-relaxed max-w-[500px]">
              {locale === "fr"
                ? "Decrivez votre projet et nos experts vous repondront sous 24 heures."
                : "Describe your project and our experts will respond within 24 hours."}
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards - Kirmizi strip */}
      <section className="relative bg-atlas-red overflow-hidden">
        <BlueprintGrid opacity={0.08} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="flex items-center gap-5 py-8 md:pr-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.phone")}</span>
                <span className="text-[17px] text-white font-bold mt-1 block">+32 490 XX XX XX</span>
              </div>
            </div>
            <div className="flex items-center gap-5 py-8 md:px-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.email")}</span>
                <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[17px] text-white font-bold mt-1 block hover:text-white/80 transition-colors">
                  atlasbatimodulaire@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-5 py-8 md:pl-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.address")}</span>
                <span className="text-[17px] text-white font-bold mt-1 block">Europe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Side info */}
      <section ref={container} className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="cf-form">
                <span className="cf-reveal text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
                  {locale === "fr" ? "Formulaire" : "Form"}
                </span>
                <h2 className="cf-reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
                  {t("form.send")}
                </h2>
                <div className="cf-reveal w-16 h-[3px] bg-atlas-red mt-6 mb-10" />

                <form className="space-y-5">
                  <div className="cf-reveal grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                        {t("form.name")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                        {t("form.company")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="cf-reveal grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                        {t("form.email")}
                      </label>
                      <input
                        type="email"
                        className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                        {t("form.phone")}
                      </label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="cf-reveal">
                    <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                      {t("form.subject")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all"
                    />
                  </div>

                  <div className="cf-reveal">
                    <label className="block text-[12px] font-bold text-atlas-charcoal mb-2 tracking-wider uppercase">
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="cf-reveal group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {t("form.send")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Side card */}
            <div className="lg:col-span-5">
              <div className="ci-card bg-atlas-charcoal p-8 lg:p-10">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
                  {locale === "fr" ? "Pourquoi Atlas ?" : "Why Atlas?"}
                </span>
                <h3 className="font-[var(--font-heading)] text-[clamp(1.25rem,2vw,1.75rem)] font-black text-white mt-3 tracking-tight leading-tight">
                  {locale === "fr"
                    ? "Des solutions modulaires adaptees a chaque projet"
                    : "Modular solutions adapted to every project"}
                </h3>
                <div className="w-12 h-[3px] bg-atlas-red mt-5 mb-8" />

                <div className="space-y-6">
                  <div className="ci-item flex items-start gap-4">
                    <span className="text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">01</span>
                    <p className="text-[15px] text-white/60 leading-relaxed">
                      {locale === "fr"
                        ? "Offres detaillees sous 24 heures avec une communication transparente"
                        : "Detailed offers within 24 hours with transparent communication"}
                    </p>
                  </div>
                  <div className="ci-item flex items-start gap-4">
                    <span className="text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">02</span>
                    <p className="text-[15px] text-white/60 leading-relaxed">
                      {locale === "fr"
                        ? "Conception personnalisee selon vos specifications exactes"
                        : "Custom design according to your exact specifications"}
                    </p>
                  </div>
                  <div className="ci-item flex items-start gap-4">
                    <span className="text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">03</span>
                    <p className="text-[15px] text-white/60 leading-relaxed">
                      {locale === "fr"
                        ? "Production en usine avec controle qualite et livraison rapide"
                        : "Factory production with quality control and fast delivery"}
                    </p>
                  </div>
                  <div className="ci-item flex items-start gap-4">
                    <span className="text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">04</span>
                    <p className="text-[15px] text-white/60 leading-relaxed">
                      {locale === "fr"
                        ? "Service apres-vente et documentation complete inclus"
                        : "After-sales service and comprehensive documentation included"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
