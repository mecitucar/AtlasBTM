"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, CheckCircle, FileCheck } from "lucide-react";

const certificates = [
  { icon: ShieldCheck, name: "CE", desc: "Conformite Europeenne" },
  { icon: Award, name: "ISO 9001", desc: "Gestion de la Qualite" },
  { icon: FileCheck, name: "EN 1090", desc: "Structures en Acier" },
  { icon: CheckCircle, name: "ISO 14001", desc: "Management Environnemental" },
];

export function CertificatesBand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-atlas-sand/50 border-y border-atlas-warm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {certificates.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4"
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
