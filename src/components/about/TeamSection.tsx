"use client";

import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Users } from "lucide-react";

const teamMembers = [
  { name: "Directeur General", role: "CEO", initials: "DG" },
  { name: "Directeur Technique", role: "CTO", initials: "DT" },
  { name: "Directeur Commercial", role: "Sales Director", initials: "DC" },
  { name: "Responsable Production", role: "Production Manager", initials: "RP" },
];

export function TeamSection() {
  const t = useTranslations("about.team");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const headingParts = container.current?.querySelectorAll(".team-heading-part");
    if (headingParts?.length) {
      gsap.from(headingParts, {
        y: 25, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: headingParts[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const cards = container.current?.querySelectorAll(".team-card");
    if (cards?.length) {
      gsap.from(cards, {
        y: 50, opacity: 0, scale: 0.88, rotateY: 10, duration: 0.65, stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="team-heading-part flex items-center gap-4 mb-4">
          <Users className="w-5 h-5 text-atlas-green" />
          <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
            {t("title")}
          </span>
        </div>

        <h2 className="team-heading-part font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy leading-tight mb-16">
          {t("subtitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="team-card group"
            >
              <div className="aspect-[3/4] bg-atlas-sand rounded-sm mb-5 flex items-center justify-center overflow-hidden border border-atlas-warm">
                <span className="font-[var(--font-heading)] text-[48px] font-bold text-atlas-navy/10">
                  {member.initials}
                </span>
              </div>
              <h3 className="font-[var(--font-heading)] font-semibold text-[16px] text-atlas-navy">
                {member.name}
              </h3>
              <p className="text-[14px] text-atlas-slate mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
