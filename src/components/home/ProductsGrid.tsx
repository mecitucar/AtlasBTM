"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { containers } from "@/lib/images";

const products = [
  { key: "container", image: "/images/shared/placeholder.webp", alt: "Conteneurs modulaires en production" },
  { key: "prefab", image: containers.finished1, alt: "Bâtiments préfabriqués modulaires Atlas" },
  { key: "lightsteel", image: containers.assembly1, alt: "Construction acier leger galvanise" },
  { key: "structural", image: containers.factory1, alt: "Structures acier grande portee" },
];

// -1 = baslik, 0-3 = kartlar
const TOTAL_STEPS = 5;

export function ProductsGrid() {
  const t = useTranslations("products");
  const container = useRef<HTMLDivElement>(null);
  const step = useRef(-1);
  const [released, setReleased] = useState(false);
  const animating = useRef(false);
  const pinned = useRef(false);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function updateDots(s: number) {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.width = i === s ? "32px" : "12px";
      dot.style.backgroundColor = i === s ? "#fff" : "rgba(255,255,255,0.3)";
    });
  }

  const goTo = useCallback((newStep: number) => {
    if (animating.current) return;
    if (newStep < 0 || newStep > products.length) return;

    const prevStep = step.current;
    if (newStep === prevStep) return;
    animating.current = true;

    if (newStep === products.length) {
      pinned.current = false;
      animating.current = false;
      step.current = newStep;
      setReleased(true);
      requestAnimationFrame(() => {
        const next = container.current?.nextElementSibling as HTMLElement;
        if (next) {
          next.scrollIntoView({ behavior: "smooth" });
        }
      });
      return;
    }

    step.current = newStep;
    updateDots(newStep);

    if (newStep > prevStep) {
      const tl = gsap.timeline({ onComplete: () => { animating.current = false; } });
      if (prevStep >= 0) {
        tl.to(`.pcard-${prevStep}`, { xPercent: -100, duration: 0.5, ease: "power3.inOut" });
      }
      tl.fromTo(`.pcard-${newStep}`, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power3.inOut" }, "<");
      return;
    }

    if (newStep < prevStep) {
      const tl = gsap.timeline({ onComplete: () => { animating.current = false; } });
      if (prevStep >= 0 && prevStep < products.length) {
        tl.to(`.pcard-${prevStep}`, { xPercent: 100, duration: 0.5, ease: "power3.inOut" });
      }
      tl.fromTo(`.pcard-${newStep}`, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power3.inOut" }, "<");
      return;
    }

    animating.current = false;
  }, []);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pinned.current = entry.isIntersecting;
        if (entry.isIntersecting && step.current === -1) {
          setTimeout(() => goTo(0), 400);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    const onWheel = (e: WheelEvent) => {
      if (step.current >= products.length) return;

      const rect = el.getBoundingClientRect();
      const visible = rect.top > -10 && rect.top < window.innerHeight * 0.5;
      if (!visible && !pinned.current) return;
      if (visible) pinned.current = true;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = step.current + dir;

      if (next >= products.length) {
        e.preventDefault();
        goTo(next);
        return;
      }

      if (next < 0) {
        e.preventDefault();
        pinned.current = false;
        const prev = container.current?.previousElementSibling as HTMLElement;
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
        return;
      }

      e.preventDefault();
      goTo(next);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (step.current >= products.length) return;

      const rect = el.getBoundingClientRect();
      const visible = rect.top > -10 && rect.top < window.innerHeight * 0.5;
      if (!visible && !pinned.current) return;
      if (visible) pinned.current = true;

      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 30) return;

      const dir = diff > 0 ? 1 : -1;
      const next = step.current + dir;

      if (next >= products.length) {
        e.preventDefault();
        goTo(next);
        return;
      }
      if (next < 0) {
        e.preventDefault();
        pinned.current = false;
        const prev = container.current?.previousElementSibling as HTMLElement;
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
        return;
      }

      e.preventDefault();
      goTo(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  return (
    <section
      ref={container}
      className="relative h-screen bg-atlas-red overflow-hidden"
      style={{ position: released ? "relative" : "sticky", top: released ? "auto" : 0, zIndex: 30 }}
    >
      <BlueprintGrid opacity={0.55} />

      {/* Baslik */}
      <div className="products-heading absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
        <span className="text-[13px] tracking-[0.25em] uppercase text-white/70 font-bold">
          {t("title")}
        </span>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 tracking-tight text-center max-w-[700px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
          {t("subtitle")}
        </h2>
        <div className="w-16 h-[3px] bg-white mt-6" />
      </div>

      {/* Kartlar */}
      {products.map((product, i) => (
        <div
          key={product.key}
          className={`pcard-${i} absolute inset-0`}
          style={{ zIndex: 20 + i, transform: "translateX(100%)" }}
        >
          <Link href="/products" className="group block h-full relative">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-16">
              <span className="text-[13px] tracking-[0.25em] uppercase text-atlas-red font-bold bg-white px-4 py-1.5 inline-block mb-5">
                {t("title")}
              </span>
              <h3 className="font-[var(--font-heading)] font-black text-[clamp(2rem,5vw,4rem)] text-white tracking-tighter mb-4 leading-[0.95]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
                {t(`${product.key}.title`)}
              </h3>
              <p className="text-[17px] text-white/70 max-w-[550px] leading-relaxed mb-8">
                {t(`${product.key}.desc`).slice(0, 160)}...
              </p>
              <span className="inline-flex items-center gap-3 text-[15px] text-white font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                {t("title")} <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        </div>
      ))}

      {/* Step indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            ref={(el) => { dotsRef.current[i] = el; }}
            onClick={() => goTo(i)}
            className="h-[3px] transition-all duration-300 cursor-pointer"
            style={{ width: "12px", backgroundColor: "rgba(255,255,255,0.3)" }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
