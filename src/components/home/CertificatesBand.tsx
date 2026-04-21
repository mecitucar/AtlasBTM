"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ShieldCheck, Award, CheckCircle, FileCheck } from "lucide-react";

const certificates = [
  { icon: ShieldCheck, name: "CE", desc: "Conformite Europeenne" },
  { icon: Award, name: "ISO 9001", desc: "Gestion de la Qualite" },
  { icon: FileCheck, name: "EN 1090", desc: "Structures en Acier" },
  { icon: CheckCircle, name: "ISO 14001", desc: "Management Environnemental" },
];

export function CertificatesBand() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = container.current?.querySelectorAll(".cert-band-item");
    if (items?.length) {
      gsap.from(items, {
        x: -30, opacity: 0, scale: 0.9, duration: 0.55, stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: items[0], start: "top 90%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="bg-atlas-sand/50 border-y border-atlas-warm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="cert-band-item flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white border border-atlas-warm rounded-sm flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-atlas-navy" />
                </div>
                <div>
                  <div className="font-[var(--font-heading)] font-semibold text-[15px] text-atlas-navy">
                    {cert.name}
                  </div>
                  <div className="text-[12px] text-atlas-slate mt-0.5">
                    {cert.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
