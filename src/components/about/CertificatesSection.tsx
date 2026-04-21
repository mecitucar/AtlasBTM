"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[13px] tracking-[0.2em] uppercase text-atlas-green font-semibold">
            {t("title")}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-atlas-navy mt-3 leading-tight">
            {t("subtitle")}
          </h2>
          <div className="w-16 h-[2px] bg-atlas-navy mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                className="bg-atlas-sand/40 border border-atlas-warm/60 p-6 rounded-sm flex items-start gap-4"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
