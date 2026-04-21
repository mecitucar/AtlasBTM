"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const products = [
  { key: "prefab", image: "/images/containers/finished-1.webp", alt: "Batiments prefabriques modulaires Atlas" },
  { key: "container", image: "/images/containers/production-1.webp", alt: "Conteneurs modulaires en production" },
  { key: "lightsteel", image: "/images/containers/assembly-1.webp", alt: "Construction acier leger galvanise" },
  { key: "structural", image: "/images/containers/factory-1.webp", alt: "Structures acier grande portee" },
];

// -1 = baslik, 0-3 = kartlar
const TOTAL_STEPS = 5;

export function ProductsGrid() {
  const t = useTranslations("products");
  const container = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const animating = useRef(false);
  const pinned = useRef(false);

  const goTo = useCallback((newStep: number) => {
    if (animating.current) return;
    if (newStep < -1 || newStep > products.length) return;

    animating.current = true;
    const prevStep = step;

    if (newStep === products.length) {
      // Son karttan sonra - pinned birak
      pinned.current = false;
      animating.current = false;
      setStep(newStep);
      return;
    }

    if (newStep === -1) {
      // Basliga geri don
      pinned.current = true;
      if (prevStep >= 0 && prevStep < products.length) {
        gsap.to(`.pcard-${prevStep}`, {
          xPercent: 100,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(".products-heading", { opacity: 1, scale: 1, duration: 0.3 });
            animating.current = false;
          },
        });
      } else {
        animating.current = false;
      }
      setStep(newStep);
      return;
    }

    // Basliktan ilk karta
    if (prevStep === -1 && newStep === 0) {
      gsap.to(".products-heading", {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          gsap.fromTo(`.pcard-0`, { xPercent: 100 }, {
            xPercent: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => { animating.current = false; },
          });
        },
      });
      setStep(newStep);
      return;
    }

    // Ileri: onceki sola, yeni sagdan
    if (newStep > prevStep) {
      const tl = gsap.timeline({ onComplete: () => { animating.current = false; } });
      if (prevStep >= 0) {
        tl.to(`.pcard-${prevStep}`, { xPercent: -100, duration: 0.5, ease: "power3.inOut" });
      }
      tl.fromTo(`.pcard-${newStep}`, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power3.inOut" }, "<");
      setStep(newStep);
      return;
    }

    // Geri: onceki saga, yeni soldan
    if (newStep < prevStep) {
      const tl = gsap.timeline({ onComplete: () => { animating.current = false; } });
      if (prevStep >= 0 && prevStep < products.length) {
        tl.to(`.pcard-${prevStep}`, { xPercent: 100, duration: 0.5, ease: "power3.inOut" });
      }
      tl.fromTo(`.pcard-${newStep}`, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: "power3.inOut" }, "<");
      setStep(newStep);
      return;
    }

    animating.current = false;
  }, [step]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pinned.current = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    const onWheel = (e: WheelEvent) => {
      if (!pinned.current) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const currentStep = step;
      const next = currentStep + dir;

      // Son karttayken asagi scroll -> birak devam etsin
      if (next >= products.length) {
        pinned.current = false;
        return;
      }

      // Basliktayken yukari scroll -> Hero'ya geri don
      if (next < -1) {
        pinned.current = false;
        const hero = container.current?.previousElementSibling as HTMLElement;
        if (hero) hero.scrollIntoView({ behavior: "smooth" });
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
      if (!pinned.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 30) return;

      const dir = diff > 0 ? 1 : -1;
      const next = step + dir;

      if (next >= products.length) {
        pinned.current = false;
        return;
      }
      if (next < -1) {
        pinned.current = false;
        const hero = container.current?.previousElementSibling as HTMLElement;
        if (hero) hero.scrollIntoView({ behavior: "smooth" });
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
  }, [step, goTo]);

  return (
    <section
      ref={container}
      className="relative h-screen bg-atlas-red overflow-hidden"
      style={{ position: "sticky", top: 0, zIndex: 30 }}
    >
      {/* Baslik */}
      <div className="products-heading absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
        <span className="text-[13px] tracking-[0.25em] uppercase text-white/70 font-bold">
          {t("title")}
        </span>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 tracking-tight text-center max-w-[700px]">
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-14">
              <span className="text-[12px] tracking-[0.2em] uppercase text-atlas-red font-bold bg-white px-3 py-1 inline-block mb-4">
                {t("title")}
              </span>
              <h3 className="font-[var(--font-heading)] font-black text-[clamp(1.5rem,3.5vw,3rem)] text-white tracking-tight mb-3">
                {t(`${product.key}.title`)}
              </h3>
              <p className="text-[15px] text-white/60 max-w-[500px] leading-relaxed mb-6">
                {t(`${product.key}.desc`).slice(0, 140)}...
              </p>
              <span className="inline-flex items-center gap-2 text-[14px] text-white font-bold uppercase tracking-wide group-hover:gap-3 transition-all">
                {t("title")} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      ))}

      {/* Step indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {products.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] transition-all duration-300 ${
              step === i ? "w-8 bg-white" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
