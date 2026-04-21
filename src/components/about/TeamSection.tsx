"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <Users className="w-5 h-5 text-atlas-green" />
          <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
            {t("title")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy leading-tight mb-16"
        >
          {t("subtitle")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
