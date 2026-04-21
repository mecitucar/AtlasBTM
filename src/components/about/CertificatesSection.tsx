"use client";

import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ShieldCheck, Award, CheckCircle, FileCheck, BadgeCheck, Scale } from "lucide-react";

const certificates = [
  { icon: ShieldCheck, name: "CE Marking", desc: "Conformite Europeenne pour tous nos conteneurs et structures" },
  { icon: Award, name: "ISO 9001:2015", desc: "Systeme de gestion de la qualite certifie" },
  { icon: FileCheck, name: "EN 1090", desc: "Execution de structures en acier et en aluminium" },
  { icon: CheckCircle, name: "ISO 14001", desc: "Systeme de management environnemental" },
  { icon: BadgeCheck, name: "ISO 45001", desc: "Sante et securite au travail" },
  { icon: Scale, name: "NF EN 12079", desc: "Conteneurs offshore et conteneurs associes" },
];

export function CertificatesSection() {
  const t = useTranslations("about.certificates");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = container.current?.querySelector(".certs-heading");
    if (heading) {
      gsap.from(heading, {
        y: 30, opacity: 0, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const cards = container.current?.querySelectorAll(".cert-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 40, opacity: 0, scale: 0.88, rotateY: -8, duration: 0.6, stagger: 0.06,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="certs-heading mb-16">
          <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy mt-3 leading-tight">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[2px] bg-atlas-navy mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="cert-card bg-atlas-sand/40 border border-atlas-warm/60 p-6 rounded-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-white border border-atlas-warm rounded-sm flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-atlas-navy" />
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] font-semibold text-[15px] text-atlas-navy">
                    {cert.name}
                  </h3>
                  <p className="text-[13px] text-atlas-slate mt-1 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
