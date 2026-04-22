"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function RedLineFill() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, {
      scaleX: 0,
    }, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  return (
    <div className="w-full h-[3px] bg-atlas-charcoal/10 relative overflow-hidden">
      <div ref={ref} className="absolute inset-0 bg-atlas-red" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
