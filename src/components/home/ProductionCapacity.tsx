"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { Building2, Container, Layers, Wrench } from "lucide-react";

const capacities = [
  { key: "prefab", value: 12000, unit: "m\u00B2/", period: "month", icon: Building2 },
  { key: "containers", value: 350, unit: "pcs/", period: "month", icon: Container },
  { key: "lightsteel", value: 10500, unit: "m\u00B2/", period: "month", icon: Layers },
  { key: "structural", value: 250, unit: "ton/", period: "month", icon: Wrench },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return <span>{formatNumber(val)}</span>;
}

export function ProductionCapacity() {
  const t = useTranslations("capacity");
  const container = useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={container} className="py-24 lg:py-32 bg-atlas-red">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="cap-heading text-center mb-16">
          <span className="text-[13px] tracking-[0.25em] uppercase text-white/70 font-bold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.75rem)] font-black text-white mt-3 tracking-tight">
            {t("facility")}
          </h2>
          <div className="w-16 h-[3px] bg-white mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {capacities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.key} className="cap-card bg-white/10 p-8 text-center">
                <Icon className="w-8 h-8 text-white mx-auto mb-4" />
                <div className="font-[var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-black text-white leading-none">
                  <CountUp target={cap.value} active={counting} />
                </div>
                <div className="text-[14px] text-white/60 mt-2">
                  {cap.unit}{cap.period}
                </div>
                <div className="text-[13px] text-white/80 font-bold uppercase tracking-wide mt-3">
                  {t(cap.key)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
