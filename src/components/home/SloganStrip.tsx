"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function SloganStrip() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".slogan-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
    gsap.from(".slogan-line", {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.6,
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
      if (e.deltaY <= 0) return;

      e.preventDefault();
      locked = true;
      const target = container.current!.nextElementSibling as HTMLElement;
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, 800);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (diff < 40) return;
      const rect = container.current?.getBoundingClientRect();
      if (!rect || rect.top < -10 || rect.top > 10) return;

      locked = true;
      const target = container.current!.nextElementSibling as HTMLElement;
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
    <section ref={container} className="relative h-screen flex items-center justify-center bg-atlas-charcoal overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="font-[var(--font-heading)] font-black text-[300px] text-white leading-none whitespace-nowrap">ATLAS</span>
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="slogan-line w-12 h-[3px] bg-atlas-red mx-auto mb-8" />
        <h2 className="slogan-text font-[var(--font-heading)] text-[clamp(1.75rem,4vw,3.5rem)] font-black text-white tracking-tight leading-[1.1]">
          Maitrise Locale,<br />Excellence Garantie
        </h2>
        <div className="slogan-line w-12 h-[3px] bg-atlas-red mx-auto mt-8" />
      </div>
    </section>
  );
}
