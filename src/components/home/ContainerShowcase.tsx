"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Layers, RefreshCw, Shield, Truck } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const highlights = {
  fr: [
    { icon: Layers, title: "Empilable 4 Etages", desc: "Structures modulaires empilables jusqu'a 4 niveaux" },
    { icon: RefreshCw, title: "Garantie Rachat 60%", desc: "Rachat garanti a 60% dans la premiere annee" },
    { icon: Shield, title: "Normes Internationales", desc: "Production certifiee aux plus hautes normes" },
    { icon: Truck, title: "Livraison Rapide", desc: "Pret a l'emploi, expedition et installation rapides" },
  ],
  en: [
    { icon: Layers, title: "Stackable 4 Stories", desc: "Modular structures stackable up to 4 levels" },
    { icon: RefreshCw, title: "60% Buyback Guarantee", desc: "Guaranteed buyback at 60% within first year" },
    { icon: Shield, title: "International Standards", desc: "Production certified to highest standards" },
    { icon: Truck, title: "Fast Delivery", desc: "Ready to use, rapid shipping and installation" },
  ],
};

export function ContainerShowcase() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);
  const [released, setReleased] = useState(false);
  const items = highlights[locale];

  useGSAP(() => {
    gsap.from(".cs-heading > *", {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%" },
    });
    gsap.from(".cs-card", {
      y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".cs-card", start: "top 88%" },
    });
    gsap.from(".cs-image", {
      scale: 1.1, opacity: 0, duration: 1.2, ease: "power2.out",
      scrollTrigger: { trigger: container.current, start: "top 75%" },
    });
  }, { scope: container });

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    let pinned = false;
    let locked = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !released) {
          pinned = true;
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    const onWheel = (e: WheelEvent) => {
      if (released || locked) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top > -10 && rect.top < window.innerHeight * 0.5;
      if (!visible && !pinned) return;
      if (visible) pinned = true;

      if (!pinned) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        locked = true;
        pinned = false;
        setReleased(true);
        const target = el.nextElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { locked = false; }, 800);
      } else if (e.deltaY < 0) {
        e.preventDefault();
        locked = true;
        pinned = false;
        const prev = el.previousElementSibling as HTMLElement;
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { locked = false; }, 800);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (released || locked) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top > -10 && rect.top < window.innerHeight * 0.5;
      if (!visible && !pinned) return;
      if (visible) pinned = true;
      if (!pinned) return;

      if (diff > 0) {
        locked = true;
        pinned = false;
        setReleased(true);
        const target = el.nextElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { locked = false; }, 800);
      } else {
        locked = true;
        pinned = false;
        const prev = el.previousElementSibling as HTMLElement;
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { locked = false; }, 800);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [released]);

  return (
    <section
      ref={container}
      className="relative min-h-screen lg:h-screen bg-atlas-charcoal overflow-hidden"
      style={{ position: released ? "relative" : "sticky", top: released ? "auto" : 0, zIndex: 25 }}
    >
      {/* Desktop: side-by-side grid */}
      <div className="hidden lg:grid grid-cols-2 h-full">
        <div className="relative cs-image">
          <Image
            src="/images/containers/finished-1.webp"
            alt="Atlas Batiment Modulaire - conteneurs modulaires"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center py-24 px-16">
          <div className="cs-heading">
            <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Produit Phare" : "Featured Product"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 tracking-tight leading-[1.05]">
              Living Container
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
            <p className="text-[17px] text-white/60 leading-relaxed max-w-[480px] mb-12">
              {locale === "fr"
                ? "Batiments modulaires en conteneur prets a l'emploi, ideals pour une occupation a court terme sur les chantiers et les camps temporaires. Solution economique, rapide et fiable."
                : "Ready-to-use modular container buildings ideal for short-term occupancy in construction sites and temporary camps. Economical, fast and reliable solution."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="cs-card flex items-start gap-4 p-5 bg-white/[0.04] border border-white/[0.06]">
                  <div className="w-10 h-10 bg-atlas-red/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-atlas-red" />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-white block mb-1">{item.title}</span>
                    <span className="text-[12px] text-white/40 leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cs-heading">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Voir les Conteneurs" : "View Containers"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: background image + overlay content */}
      <div className="lg:hidden relative min-h-screen flex flex-col">
        <div className="absolute inset-0 cs-image">
          <Image
            src="/images/containers/finished-1.webp"
            alt="Atlas Batiment Modulaire - conteneurs modulaires"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-1 py-6 px-5 sm:px-8">
          <div className="cs-heading">
            <span className="text-[11px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {locale === "fr" ? "Produit Phare" : "Featured Product"}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,7vw,2.5rem)] font-black text-white mt-2 tracking-tight leading-[1.05]">
              Living Container
            </h2>
            <div className="w-12 h-[3px] bg-atlas-red mt-3 mb-4" />
            <p className="text-[14px] text-white/60 leading-relaxed mb-5">
              {locale === "fr"
                ? "Batiments modulaires en conteneur prets a l'emploi, ideals pour une occupation a court terme sur les chantiers et les camps temporaires."
                : "Ready-to-use modular container buildings ideal for short-term occupancy in construction sites and temporary camps."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="cs-card flex items-center gap-2.5 p-2.5 bg-atlas-charcoal border border-white/[0.08]">
                  <div className="w-7 h-7 bg-atlas-red/20 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-atlas-red" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">{item.title}</span>
                </div>
              );
            })}
          </div>

          <div className="cs-heading">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-7 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-colors"
            >
              {locale === "fr" ? "Voir les Conteneurs" : "View Containers"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
