"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { heroes } from "@/lib/images";

const products = [
  { key: "container", image: heroes.livingContainerCamp, alt: "Conteneurs modulaires en production" },
  { key: "prefab", image: heroes.prefabProduct, alt: "Bâtiments préfabriqués modulaires Atlas" },
  { key: "lightsteel", image: heroes.lightsteelProduct, alt: "Construction acier leger galvanise" },
  { key: "structural", image: heroes.structuralSteel, alt: "Structures acier grande portee" },
];

export function ProductsGrid() {
  const t = useTranslations("products");

  return (
    <section className="relative overflow-hidden bg-atlas-red py-24 lg:py-32 pb-32 lg:pb-40">
      <BlueprintGrid opacity={0.55} showCorners={false} />

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.25em] text-white/70">
            {t("title")}
          </span>
          <h2
            className="mt-4 font-[var(--font-heading)] text-[clamp(2.25rem,3.9vw,4.5rem)] font-black tracking-tight text-white lg:whitespace-nowrap"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}
          >
            {t("subtitle")}
          </h2>
          <div className="mx-auto mt-6 h-[3px] w-16 bg-white" />
        </div>

        <div className="mt-16 grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <Link
              key={product.key}
              href="/products"
              className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/12 bg-white shadow-[0_22px_54px_rgba(0,0,0,0.18)]"
            >
              <div className="relative aspect-[1.42/1] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  quality={90}
                />
              </div>
              <div className="flex min-h-[240px] flex-1 flex-col bg-white px-6 py-6 lg:min-h-[270px] lg:px-7 lg:py-7">
                <h3 className="max-w-[12ch] text-balance break-normal hyphens-none font-[var(--font-heading)] text-[1.95rem] font-black leading-[0.98] tracking-tight text-atlas-charcoal lg:text-[2.15rem]">
                  {t(`${product.key}.title`)}
                </h3>
                <p className="mt-4 max-w-none break-normal hyphens-none text-[15px] leading-[1.7] text-atlas-slate lg:text-[16px]">
                  {t(`${product.key}.desc`).slice(0, 112)}...
                </p>
                <span className="mt-auto inline-flex items-center gap-3 pt-6 text-[14px] font-bold uppercase tracking-[0.16em] text-atlas-charcoal transition-all group-hover:gap-4">
                  {t("title")}
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
