"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const stats = [
  { value: "500+", label: "Projets" },
  { value: "15+", label: "Ans" },
  { value: "12", label: "Pays" },
  { value: "98%", label: "Satisfaction" },
];

export function StatsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = container.current?.querySelectorAll(".stat-item");
    if (items?.length) {
      gsap.from(items, {
        y: 30, opacity: 0, scale: 0.85, duration: 0.6, stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: { trigger: items[0], start: "top 90%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="bg-atlas-red">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item py-10 lg:py-14 px-6 lg:px-10 text-center border-r border-white/10 last:border-r-0 even:border-r-0 lg:even:border-r"
            >
              <div className="font-[var(--font-heading)] text-[clamp(2.5rem,4vw,3.5rem)] font-black text-white leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-[13px] text-white/60 tracking-[0.2em] uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
