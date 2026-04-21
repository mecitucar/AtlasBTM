"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { LogoWatermark } from "@/components/ui/LogoWatermark";

export function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-atlas" />
        <LogoWatermark className="top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-white" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[13px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {t("title")}
            </span>
            <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4 leading-tight max-w-[600px]">
              {t("subtitle")}
            </h1>
            <div className="w-16 h-[2px] bg-white/30 mt-8" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-[var(--font-heading)] text-[24px] font-bold text-atlas-navy mb-8">
                {t("form.send")}
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                <div>
                  <label className="block text-[13px] font-medium text-atlas-navy mb-2 tracking-wide uppercase">
                    {t("form.subject")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3.5 bg-white border border-atlas-warm rounded-sm text-[15px] text-atlas-navy placeholder:text-atlas-slate/40 focus:outline-none focus:border-atlas-navy/30 focus:ring-1 focus:ring-atlas-navy/10 transition-all"
                  />
                </div>

                <div>
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
                  className="inline-flex items-center gap-2 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wide uppercase transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {t("form.send")}
                </button>
              </form>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white border border-atlas-warm/60 rounded-sm p-8">
                  <h3 className="font-[var(--font-heading)] font-semibold text-[18px] text-atlas-navy mb-6">
                    {t("info.phone")} & {t("info.email")}
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
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

                    <div className="flex items-start gap-4">
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

                    <div className="flex items-start gap-4">
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

                    <div className="flex items-start gap-4">
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
