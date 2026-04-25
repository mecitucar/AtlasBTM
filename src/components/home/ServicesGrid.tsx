"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import {
  Container,
  Pickaxe,
  HardHat,
  Shield,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { containers } from "@/lib/images";

const services = [
  {
    key: "prefab",
    icon: Container,
    image: containers.finished1,
    altText: "Conteneurs préfabriqués modulaires - livraison rapide",
    featured: true,
  },
  {
    key: "mining",
    icon: Pickaxe,
    image: containers.siteAerial2,
    altText: "Camps modulaires pour sites miniers",
    featured: true,
  },
  {
    key: "construction",
    icon: HardHat,
    image: containers.camp1,
    altText: "Camps construction modulaires pour chantiers",
    featured: false,
  },
  {
    key: "defense",
    icon: Shield,
    image: containers.finished2,
    altText: "Structures modulaires pour industrie de la défense",
    featured: false,
  },
  {
    key: "energy",
    icon: Zap,
    image: containers.portContainers,
    altText: "Installations modulaires pour projets énergétiques",
    featured: false,
  },
] as const;

export function ServicesGrid() {
  const t = useTranslations("solutions");
  const container = useRef<HTMLDivElement>(null);

  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  useGSAP(() => {
    const heading = container.current?.querySelector(".services-heading");
    if (heading) {
      gsap.from(heading, {
        x: -50, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const featuredCards = container.current?.querySelectorAll(".featured-card");
    if (featuredCards?.length) {
      gsap.from(featuredCards, {
        y: 60, opacity: 0, clipPath: "inset(8% 0% 8% 0%)", duration: 0.8, stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: featuredCards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const restCards = container.current?.querySelectorAll(".rest-card");
    if (restCards?.length) {
      gsap.from(restCards, {
        y: 30, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.07,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: restCards[0], start: "top 90%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-28 lg:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start mb-20">
          <div className="services-heading lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold">
                {t("title")}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(2rem,3.5vw,3.2rem)] font-black text-atlas-charcoal mt-4 leading-[1.05] tracking-tight">
                {t("subtitle")}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-8" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {featured.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.key} className="featured-card">
                  <Link
                    href="/sectors"
                    className="group block relative overflow-hidden"
                  >
                    <div className="aspect-[21/9] relative overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        quality={90}
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-5 h-5 text-atlas-red" />
                            <h3 className="font-[var(--font-heading)] font-bold text-[20px] lg:text-[24px] text-white tracking-tight">
                              {t(`${service.key}.title`)}
                            </h3>
                          </div>
                          <p className="text-[14px] text-white/55 max-w-[400px] hidden sm:block">
                            {t(`${service.key}.desc`)}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-atlas-red flex items-center justify-center shrink-0 group-hover:bg-atlas-red-dark transition-colors">
                          <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-atlas-warm/60">
          {rest.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.key} className="rest-card">
                <Link
                  href="/sectors"
                  className="group block bg-white p-6 lg:p-7 hover:bg-atlas-charcoal transition-colors duration-300 h-full"
                >
                  <Icon className="w-6 h-6 text-atlas-red mb-5 group-hover:text-atlas-red-light transition-colors" />
                  <h3 className="font-[var(--font-heading)] font-bold text-[16px] text-atlas-charcoal group-hover:text-white mb-2 transition-colors tracking-tight">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-[13px] text-atlas-slate group-hover:text-white/50 leading-relaxed transition-colors">
                    {t(`${service.key}.desc`)}
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-atlas-slate/30 group-hover:text-atlas-red mt-4 transition-colors" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
