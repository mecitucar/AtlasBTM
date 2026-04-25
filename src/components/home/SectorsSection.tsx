"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { containers, mining, defense } from "@/lib/images";

const sectors = [
  { key: "prefab", image: containers.finished1, href: "/sectors/prefab" },
  { key: "mining", image: mining.hero, href: "/sectors/mining" },
  { key: "construction", image: containers.camp1, href: "/sectors/construction" },
  { key: "defense", image: defense.hero, href: "/sectors/defense" },
  { key: "energy", image: containers.portContainers, href: "/sectors/energy" },
];

export function SectorsSection() {
  const t = useTranslations("solutions");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".sectors-label", {
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%" },
    });
    gsap.from(".sectors-title", {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%" },
    });
    gsap.from(".sector-card", {
      y: 60, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.1,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".sector-card", start: "top 90%" },
    });
  }, { scope: container });

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let locked = false;

    const onWheel = (e: WheelEvent) => {
      if (locked) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < -10 || rect.top > 10) return;

      e.preventDefault();
      locked = true;
      const target = e.deltaY > 0
        ? el.nextElementSibling as HTMLElement
        : el.previousElementSibling as HTMLElement;
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, 800);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < -10 || rect.top > 10) return;

      locked = true;
      const target = diff > 0
        ? el.nextElementSibling as HTMLElement
        : el.previousElementSibling as HTMLElement;
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section ref={container} className="relative h-screen bg-atlas-charcoal flex flex-col overflow-hidden">
      <div className="text-center pt-8 lg:pt-12 pb-5 lg:pb-8 shrink-0 px-5">
        <h2 className="sectors-title font-[var(--font-heading)] text-[clamp(1.75rem,4vw,3.25rem)] font-black text-white tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
          {t("title")}
        </h2>
        <div className="w-16 h-[3px] bg-atlas-red mt-4 mb-3 mx-auto" />
        <p className="sectors-label text-[12px] sm:text-[14px] text-white/40 max-w-[500px] mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-[2px] px-0">
        {sectors.map((sector) => (
          <Link
            key={sector.key}
            href={sector.href as any}
            className="sector-card group relative overflow-hidden"
          >
            <Image
              src={sector.image}
              alt={t(`${sector.key}.title`)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
              <div className="bg-white p-3 sm:p-4">
                <h3 className="font-[var(--font-heading)] font-black text-[13px] sm:text-[16px] lg:text-[19px] text-atlas-charcoal tracking-tight leading-snug mb-1">
                  {t(`${sector.key}.title`)}
                </h3>
                <p className="text-[9px] sm:text-[11px] text-atlas-slate/70 leading-relaxed mb-2 hidden sm:block">
                  {t(`${sector.key}.desc`).slice(0, 55)}...
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-atlas-red font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                  {t("title") === "Nos Secteurs" ? "Découvrir" : "Discover"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
