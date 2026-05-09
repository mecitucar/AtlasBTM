"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { showcase as allImages } from "@/lib/images";

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

function rotatePool(images: string[], offset: number): string[] {
  if (images.length <= 1) return images;
  const normalizedOffset = offset % images.length;
  return [...images.slice(normalizedOffset), ...images.slice(0, normalizedOffset)];
}

function MosaicTile({ images, index }: { images: string[]; index: number }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [pool] = useState(() => rotatePool(images, index));

  useEffect(() => {
    const stagger = index * 2000 + 3000;
    const cycle = TILE_COUNT * 2000;
    let timeout: ReturnType<typeof setTimeout>;

    const swap = () => {
      setShowNext(true);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % pool.length);
        setShowNext(false);
      }, 1500);
      timeout = setTimeout(swap, cycle);
    };

    const startTimeout = setTimeout(swap, stagger);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [index, pool.length]);

  const nextIdx = (currentIdx + 1) % pool.length;

  return (
    <div className="relative w-full h-full overflow-hidden bg-atlas-charcoal group">
      <Image
        src={pool[currentIdx]}
        alt=""
        fill
        className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw" quality={90}
      />
      <Image
        src={pool[nextIdx]}
        alt=""
        fill
        className={`object-cover transition-opacity duration-[2000ms] ease-in-out ${
          showNext ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 50vw, 33vw" quality={90}
      />
    </div>
  );
}

export function ImageMosaic() {
  const locale = useLocale() as "fr" | "en";
  const [pools] = useState<string[][]>(buildDeterministicPools);

  return (
    <section className="relative min-h-screen bg-atlas-charcoal px-0 pt-10 pb-20 lg:pt-14 lg:pb-24">
      <div className="text-center pb-6 lg:pb-9 shrink-0">
        <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,4vw,3.25rem)] font-black text-white tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
          {locale === "fr"
            ? "Production, Livraison, Installation"
            : "Production, Delivery, Installation"}
        </h2>
        <div className="w-16 h-[3px] bg-atlas-red mt-4 mb-3 mx-auto" />
        <p className="text-[12px] sm:text-[14px] text-white/40 max-w-[500px] mx-auto">
          {locale === "fr" ? "Notre Savoir-Faire" : "Our Expertise"}
        </p>
      </div>

      <div className="grid min-h-[56vh] grid-cols-6 gap-[2px]" style={{ gridAutoRows: "1fr" }}>
        {grid.map((span, i) => (
          <div key={i} className={`mosaic-tile ${span.col} ${span.row}`}>
            <MosaicTile images={pools[i]} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
