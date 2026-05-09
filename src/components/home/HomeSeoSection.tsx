"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const keywordKeys = ["prefab", "camps", "steel", "guinea", "conakry", "kankan"] as const;
const cardKeys = ["prefab", "sectors", "steel"] as const;

export function HomeSeoSection() {
  const t = useTranslations("homeSeo");

  return (
    <section className="relative overflow-hidden bg-white py-20 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 xl:gap-14 items-start">
          <div className="max-w-[52rem]">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-atlas-red">
              {t("label")}
            </span>
            <h2 className="mt-4 font-[var(--font-heading)] text-[clamp(2rem,4.4vw,4.5rem)] font-black leading-[0.94] tracking-tight text-atlas-charcoal">
              {t("title")}
            </h2>
            <div className="mt-6 h-[3px] w-16 bg-atlas-red" />
            <p className="mt-8 max-w-[48rem] text-[17px] leading-[1.85] text-atlas-slate xl:text-[1.18rem]">
              {t("intro")}
            </p>
            <p className="mt-6 max-w-[47rem] text-[16px] leading-[1.85] text-atlas-slate/92 xl:text-[1.08rem]">
              {t("body")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {keywordKeys.map((key) => (
                <span
                  key={key}
                  className="rounded-full border border-atlas-charcoal/10 bg-atlas-sand px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-atlas-charcoal/80"
                >
                  {t(`keywords.${key}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {cardKeys.map((key) => (
              <article
                key={key}
                className="rounded-[28px] border border-atlas-charcoal/10 bg-atlas-sand px-6 py-6 shadow-[0_18px_40px_rgba(17,24,39,0.07)] lg:px-7 lg:py-7"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-atlas-red">
                  {t(`cards.${key}.eyebrow`)}
                </span>
                <h3 className="mt-3 font-[var(--font-heading)] text-[1.45rem] font-black leading-[1.05] tracking-tight text-atlas-charcoal xl:text-[1.7rem]">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-atlas-slate xl:text-[1rem]">
                  {t(`cards.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-center lg:mt-20">
          <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-atlas-red">
            {t("closingLabel")}
          </span>
          <h3 className="mt-3 max-w-[54rem] font-[var(--font-heading)] text-[1.7rem] font-black leading-[1.06] tracking-tight text-atlas-charcoal xl:text-[2.15rem]">
            {t("closingTitle")}
          </h3>
          <p className="mt-4 max-w-[62rem] text-[15px] leading-[1.9] text-atlas-slate xl:text-[1.04rem]">
            {t("closing")}
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center justify-center gap-3 rounded-[18px] bg-atlas-red px-7 py-4 text-center text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-atlas-red-dark lg:min-w-[25rem]"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
