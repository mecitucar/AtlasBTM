"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PrivacyPolicyPage() {
  const t = useTranslations("privacy");
  const locale = useLocale() as "fr" | "en";

  const sections = [
    { title: t("collect.title"), content: t("collect.content") },
    { title: t("how.title"), content: t("how.content") },
    { title: t("purpose.title"), content: t("purpose.content") },
    { title: t("legal.title"), content: t("legal.content") },
    { title: t("storage.title"), content: t("storage.content") },
    { title: t("rights.title"), content: t("rights.content") },
    { title: t("cookies.title"), content: t("cookies.content") },
    { title: t("thirdParty.title"), content: t("thirdParty.content") },
    { title: t("changes.title"), content: t("changes.content") },
    { title: t("contact.title"), content: t("contact.content") },
    { title: t("authority.title"), content: t("authority.content") },
  ];

  return (
    <>
      <section className="bg-atlas-charcoal pt-40 pb-16">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12">
          <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
            {locale === "fr" ? "Informations legales" : "Legal Information"}
          </span>
          <h1 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-black text-white mt-4 tracking-tight">
            {t("title")}
          </h1>
          <div className="w-16 h-[3px] bg-atlas-red mt-6" />
          <p className="text-[15px] text-white/50 mt-6">
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12">
          <p className="text-[16px] text-atlas-charcoal/70 leading-relaxed mb-12">
            {t("intro")}
          </p>

          {sections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-[var(--font-heading)] text-[20px] font-bold text-atlas-charcoal mb-3 flex items-start gap-3">
                <span className="text-atlas-red font-black text-[14px] mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="text-[15px] text-atlas-charcoal/65 leading-relaxed whitespace-pre-line pl-9">
                {section.content}
              </div>
            </div>
          ))}

          <div className="mt-16 pt-8 border-t border-atlas-charcoal/10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-atlas-red hover:text-atlas-red-dark text-[15px] font-bold transition-colors"
            >
              {locale === "fr" ? "Retour au Contact" : "Back to Contact"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
