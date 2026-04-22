"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function ContactPage() {
  const t = useTranslations("contact");
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const label = heroRef.current!.querySelector(".hero-label");
    const title = heroRef.current!.querySelector(".hero-title");
    const line = heroRef.current!.querySelector(".hero-line");

    tl.from(label, { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(title, { y: 40, opacity: 0, clipPath: "inset(100% 0% 0% 0%)", duration: 0.8 }, 0.35);
    tl.from(line, { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
  }, { scope: heroRef });

  useGSAP(() => {
    if (formRef.current) {
      const items = formRef.current.querySelectorAll(".form-reveal");
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    if (infoRef.current) {
      gsap.from(infoRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const infoItems = infoRef.current.querySelectorAll(".info-item");
      gsap.from(infoItems, {
        x: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: formRef });

  return (
    <>
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/contact-hero.jpg" alt="Vue aerienne camp modulaire Atlas" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="hero-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
              {t("title")}
            </span>
            <h1 className="hero-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]">
              {t("subtitle")}
            </h1>
            <div className="hero-line w-20 h-[3px] bg-atlas-red mt-8" />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div ref={formRef} className="lg:col-span-7">
              <h2 className="form-reveal font-[var(--font-heading)] text-[24px] font-bold text-atlas-navy mb-8">
                {t("form.send")}
              </h2>

              <form className="space-y-6">
                <div className="form-reveal grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                      {t("form.company")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                    />
                  </div>
                </div>

                <div className="form-reveal grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                    />
                  </div>
                </div>

                <div className="form-reveal">
                  <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                    {t("form.subject")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                  />
                </div>

                <div className="form-reveal">
                  <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                    {t("form.message")}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="form-reveal inline-flex items-center gap-2 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wide uppercase transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {t("form.send")}
                </button>
              </form>
            </div>

            <div ref={infoRef} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white border border-atlas-warm/60 rounded-sm p-8">
                  <h3 className="font-[var(--font-heading)] font-semibold text-[18px] text-atlas-navy mb-6">
                    {t("info.phone")} & {t("info.email")}
                  </h3>
                  <div className="space-y-5">
                    <div className="info-item flex items-start gap-4">
                      <div className="w-10 h-10 bg-atlas-sand rounded-sm flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-atlas-navy" />
                      </div>
                      <div>
                        <p className="text-[13px] text-atlas-slate uppercase tracking-wide mb-1">
                          {t("info.phone")}
                        </p>
                        <p className="text-[16px] text-atlas-navy font-medium">
                          +32 490 XX XX XX
                        </p>
                      </div>
                    </div>

                    <div className="info-item flex items-start gap-4">
                      <div className="w-10 h-10 bg-atlas-sand rounded-sm flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-atlas-navy" />
                      </div>
                      <div>
                        <p className="text-[13px] text-atlas-slate uppercase tracking-wide mb-1">
                          {t("info.email")}
                        </p>
                        <a
                          href="mailto:atlasbatimodulaire@gmail.com"
                          className="block text-[16px] text-atlas-navy font-medium hover:text-atlas-blue transition-colors"
                        >
                          atlasbatimodulaire@gmail.com
                        </a>
                        <a
                          href="mailto:atlasbatimodulaire@gmail.com"
                          className="block text-[15px] text-atlas-slate hover:text-atlas-blue transition-colors mt-1"
                        >
                          atlasbatimodulaire@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="info-item flex items-start gap-4">
                      <div className="w-10 h-10 bg-atlas-sand rounded-sm flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-atlas-navy" />
                      </div>
                      <div>
                        <p className="text-[13px] text-atlas-slate uppercase tracking-wide mb-1">
                          {t("info.address")}
                        </p>
                        <p className="text-[16px] text-atlas-navy font-medium">
                          France
                        </p>
                      </div>
                    </div>

                    <div className="info-item flex items-start gap-4">
                      <div className="w-10 h-10 bg-atlas-sand rounded-sm flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-atlas-navy" />
                      </div>
                      <div>
                        <p className="text-[13px] text-atlas-slate uppercase tracking-wide mb-1">
                          Horaires
                        </p>
                        <p className="text-[16px] text-atlas-navy font-medium">
                          Lun - Ven: 08:00 - 18:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="aspect-[4/3] bg-atlas-sand rounded-sm border border-atlas-warm flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-atlas-navy/15 mx-auto mb-2" />
                    <p className="text-[13px] text-atlas-slate/50">Google Maps</p>
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
