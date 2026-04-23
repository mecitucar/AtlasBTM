"use client";

import { useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function SloganStrip() {
  const container = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "fr" | "en";

  useGSAP(() => {
    gsap.from(".slogan-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
    gsap.from(".slogan-sub", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.3,
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
    gsap.from(".slogan-line", {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
    gsap.from(".guinea-map", {
      scale: 0.7,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
  }, { scope: container });

  useEffect(() => {
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (locked) return;
      const rect = container.current?.getBoundingClientRect();
      if (!rect || rect.top < -10 || rect.top > 10) return;

      e.preventDefault();
      locked = true;
      if (e.deltaY > 0) {
        const target = container.current!.nextElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        const target = container.current!.previousElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => { locked = false; }, 800);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      const rect = container.current?.getBoundingClientRect();
      if (!rect || rect.top < -10 || rect.top > 10) return;

      locked = true;
      if (diff > 0) {
        const target = container.current!.nextElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        const target = container.current!.previousElementSibling as HTMLElement;
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
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
    <section ref={container} className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="guinea-map absolute inset-0 opacity-[0.25] pointer-events-none flex items-center justify-center">
        <Image
          src="/images/guinea-map.png"
          alt="Guinea - Republique de Guinee"
          width={1400}
          height={1054}
          className="object-contain max-h-[90vh] w-auto"
        />
      </div>
      <div className="relative z-10 text-center px-6 max-w-[900px]">
        <div className="slogan-line w-20 h-[3px] bg-atlas-red mx-auto mb-12" />
        <h2
          className="slogan-text font-[var(--font-heading)] text-[clamp(2.75rem,6vw,5.5rem)] font-black text-atlas-charcoal tracking-tighter leading-[1.02]"
          style={{ textShadow: "0 2px 20px rgba(255,255,255,0.8)" }}
        >
          {locale === "fr" ? "Maitrise Locale," : "Local Mastery,"}
          <br />
          <span className="text-atlas-red" style={{ textShadow: "0 2px 20px rgba(255,255,255,0.9)" }}>
            {locale === "fr" ? "Excellence Garantie" : "Guaranteed Excellence"}
          </span>
        </h2>
        <div className="slogan-line w-20 h-[3px] bg-atlas-red mx-auto mt-12 mb-12" />
        <p className="slogan-sub text-[19px] lg:text-[22px] text-atlas-charcoal/70 leading-relaxed max-w-[680px] mx-auto font-medium">
          {locale === "fr"
            ? "Conception, fabrication et livraison de batiments modulaires et conteneurs prefabriques aux normes internationales. Solutions cle en main pour les secteurs minier, construction, defense et energie a travers le monde."
            : "Design, manufacturing and delivery of modular buildings and prefabricated containers to international standards. Turnkey solutions for mining, construction, defense and energy sectors worldwide."}
        </p>
      </div>
    </section>
  );
}
