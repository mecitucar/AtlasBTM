"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const allImages = [
  "01","02","03","04","05","06","07","08","10","11",
  "12","13","14","15","16","17","18","19","20","21",
  "22","23","24","25","26","27","28","29","30","31",
  "32","33","34","35","36","37","38","39","40","41",
  "42","43","44","46","48","49","50","51","52","53",
  "54","55","56","57",
].map(n => `/images/showcase/${n}.webp`);

// 6 sütun, 3 satır = 18 tile, boşluk yok
// Bazıları geniş (col-span-2) veya uzun (row-span-2) ama toplam hücre sayısı tam oturuyor
const grid: Array<{ col: string; row: string }> = [
  // Satır 1-2
  { col: "col-span-2", row: "row-span-2" },  // sol üst büyük kare
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-2", row: "row-span-1" },  // sağ üst geniş
  // Satır 2 devam
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  // Satır 3-4
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-2", row: "row-span-2" },  // orta büyük kare
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  // Satır 4 devam
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
];

const TILE_COUNT = grid.length;

function buildDeterministicPools(): string[][] {
  const pools: string[][] = [];
  const perTile = Math.ceil(allImages.length / TILE_COUNT);
  for (let i = 0; i < TILE_COUNT; i++) {
    const start = i * perTile;
    let pool = allImages.slice(start, start + perTile);
    if (pool.length < 2) pool = [...pool, ...allImages.slice(0, 2 - pool.length)];
    pools.push(pool);
  }
  return pools;
}

function MosaicTile({ images }: { images: string[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const pool = useRef(images);

  useEffect(() => {
    pool.current = [...images].sort(() => Math.random() - 0.5);
  }, [images]);

  useEffect(() => {
    const delay = 5000 + Math.random() * 8000;

    const swap = () => {
      setShowNext(true);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % pool.current.length);
        setShowNext(false);
      }, 2000);
    };

    const startTimeout = setTimeout(() => {
      swap();
      intervalRef.current = setInterval(swap, 8000 + Math.random() * 7000);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const nextIdx = (currentIdx + 1) % pool.current.length;

  return (
    <div className="relative w-full h-full overflow-hidden bg-atlas-charcoal group">
      <Image
        src={pool.current[currentIdx]}
        alt=""
        fill
        className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 20vw"
      />
      <Image
        src={pool.current[nextIdx]}
        alt=""
        fill
        className={`object-cover transition-opacity duration-[2000ms] ease-in-out ${
          showNext ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 50vw, 20vw"
      />
    </div>
  );
}

export function ImageMosaic() {
  const locale = useLocale() as "fr" | "en";
  const container = useRef<HTMLDivElement>(null);
  const [pools] = useState<string[][]>(buildDeterministicPools);

  useGSAP(() => {
    const tiles = container.current?.querySelectorAll(".mosaic-tile");
    if (!tiles?.length) return;

    gsap.set(tiles, { opacity: 0, scale: 0.9, y: 30 });

    gsap.to(tiles, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: { amount: 1.5, from: "random" },
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
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
    <section ref={container} className="relative h-screen bg-atlas-charcoal flex flex-col">
      <div className="text-center pt-8 lg:pt-12 pb-5 lg:pb-8 shrink-0">
        <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,4vw,3.25rem)] font-black text-white tracking-tight">
          {locale === "fr"
            ? "Production, Livraison, Installation"
            : "Production, Delivery, Installation"}
        </h2>
        <div className="w-16 h-[3px] bg-atlas-red mt-4 mb-3 mx-auto" />
        <p className="text-[12px] sm:text-[14px] text-white/40 max-w-[500px] mx-auto">
          {locale === "fr" ? "Notre Savoir-Faire" : "Our Expertise"}
        </p>
      </div>

      <div className="grid grid-cols-6 gap-[2px] flex-1" style={{ gridAutoRows: "1fr" }}>
        {grid.map((span, i) => (
          <div key={i} className={`mosaic-tile ${span.col} ${span.row}`}>
            <MosaicTile images={pools[i]} />
          </div>
        ))}
      </div>
    </section>
  );
}
