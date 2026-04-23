"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Footer } from "@/components/layout/Footer";

const values = [
  { fr: "Expérience client unique et service personnalisé", en: "Unique customer experience and personalized service" },
  { fr: "Designs modernes avec des équipes hautement compétentes", en: "Modern designs with highly competent teams" },
  { fr: "Garantie qualité et satisfaction client assurée", en: "Quality guarantee and ensured customer satisfaction" },
  { fr: "Livraison à temps avec une planification rigoureuse", en: "On-time delivery with rigorous planning" },
  { fr: "Priorité à la durabilité et au respect de l'environnement", en: "Priority on sustainability and environmental respect" },
  { fr: "Solutions déployables à l'échelle mondiale", en: "Globally deployable solutions" },
];

const steps = [
  { fr: "L'entreprise soumet des offres dans les 24 heures, en mettant l'accent sur une communication ouverte et un service personnalisé.", en: "The company submits offers within 24 hours, emphasizing open communication and personalized service." },
  { fr: "Atlas fonctionne comme partie intégrante de l'équipe du client tout au long de la phase de conception, identifiant les problèmes de manière proactive.", en: "Atlas functions as part of the client's team throughout the design phase, identifying potential issues proactively." },
  { fr: "La fabrication combine des matières premières de qualité supérieure avec des lignes de production entièrement automatiques et des contrôles rigoureux.", en: "Manufacturing combines superior raw materials with fully automatic production lines and rigorous quality checks." },
  { fr: "Chargement correct et expédition planifiée en utilisant des solutions économiques avec des listes de matériaux préparées.", en: "Correct loading and planned shipment using economical solutions with prepared material lists." },
  { fr: "Des équipes formées et certifiées exécutent l'assemblage. Les opérations de démontage minimisent la perte de matériaux à environ 5%.", en: "Trained and certified teams execute assembly. Disassembly operations minimize material loss to approximately 5%." },
  { fr: "Le service continue après la livraison avec une documentation complète, servant de guide pour les modifications futures.", en: "Service continues post-delivery with comprehensive documentation, serving as a guide for future modifications." },
];

const stepTitles = {
  fr: ["Proposition", "Conception", "Production", "Logistique", "Assemblage", "Après-Vente"],
  en: ["Proposal", "Design", "Production", "Logistics", "Assembly", "After Sales"],
};

const snapStyle = { scrollSnapAlign: "start" as const };

export function AboutPageClient() {
  const t = useTranslations("about");
  const pt = useTranslations("process");
  const locale = useLocale() as "fr" | "en";
  const scrollRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sc = scrollRef.current;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".ah-label", { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(".ah-title", { y: 50, opacity: 0, duration: 0.9 }, 0.3);
    tl.from(".ah-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
    tl.from(".ah-intro", { y: 20, opacity: 0, duration: 0.7 }, 0.9);

    gsap.from(".diff-text > *", {
      y: 35, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-text", start: "top 75%", scroller: sc },
    });
    gsap.from(".diff-img", {
      clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: ".diff-img", start: "top 75%", scroller: sc },
    });
    gsap.from(".diff-img img", {
      scale: 1.3, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-img", start: "top 75%", scroller: sc },
    });
    gsap.from(".diff-val", {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".diff-vals", start: "top 80%", scroller: sc },
    });

    gsap.from(".proc-heading > *", {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".proc-heading", start: "top 85%", scroller: sc },
    });
    gsap.from(".proc-step", {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".proc-steps", start: "top 80%", scroller: sc },
    });

    gsap.from(".plant-reveal", {
      y: 35, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".plant-content", start: "top 75%", scroller: sc },
    });
    gsap.from(".plant-img", {
      clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power3.inOut",
      scrollTrigger: { trigger: ".plant-img", start: "top 80%", scroller: sc },
    });
  }, { scope: container });

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="fixed inset-0 z-40 overflow-y-auto"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div ref={container}>
        {/* ── Hero ── */}
        <section className="relative h-screen flex items-end overflow-hidden" style={snapStyle}>
          <div className="absolute inset-0">
            <Image src="/images/about-hero.webp" alt="Atlas Bâtiment Modulaire" fill className="object-cover" sizes="100vw" quality={90} priority />
          </div>
          <div className="relative z-10 pb-16 sm:pb-20 lg:pb-28 pt-32 w-full">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
              <span className="ah-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
                {t("title")}
              </span>
              <h1 className="ah-title font-[var(--font-heading)] text-[clamp(2rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]">
                {t("subtitle")}
              </h1>
              <div className="ah-line w-20 h-[3px] bg-atlas-red mt-6 sm:mt-8 mb-6 sm:mb-8" />
              <p className="ah-intro text-[15px] sm:text-[19px] text-white/50 leading-relaxed max-w-[550px]">
                {t("intro")}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-atlas-red" />
        </section>

        {/* ── Difference ── */}
        <section className="relative h-screen bg-white overflow-hidden flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              <div className="hidden lg:block lg:col-span-5">
                <div className="diff-img relative aspect-[3/4] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
                  <Image src="/images/showcase/49.webp" alt="Production de conteneurs modulaires Atlas" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={90} />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-12">
                <div className="diff-text">
                  <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                    {locale === "fr" ? "Notre Différence" : "Our Difference"}
                  </span>
                  <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.75rem)] font-black text-atlas-charcoal mt-3 sm:mt-4 tracking-tight leading-tight max-w-[540px]">
                    {locale === "fr"
                      ? "Une gestion de processus qui élimine les problèmes dès le départ"
                      : "Process management that eliminates problems from the start"}
                  </h2>
                  <div className="w-16 h-[3px] bg-atlas-red mt-5 sm:mt-7 mb-6 sm:mb-10" />
                </div>
                <div className="diff-vals grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 sm:gap-y-5">
                  {values.map((val, i) => (
                    <div key={i} className="diff-val flex items-start gap-3 sm:gap-4 py-2 sm:py-3 border-b border-atlas-charcoal/8">
                      <span className="text-[13px] sm:text-[14px] font-[var(--font-heading)] font-bold text-atlas-red shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] sm:text-[15px] text-atlas-slate leading-relaxed">
                        {val[locale]}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors mt-6 sm:mt-10"
                >
                  {locale === "fr" ? "Contactez-nous" : "Contact us"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Processes ── */}
        <section className="relative h-screen bg-atlas-charcoal overflow-hidden flex items-center" style={snapStyle}>
          <BlueprintGrid opacity={0.06} />
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="proc-heading grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-10 sm:mb-20">
              <div className="lg:col-span-5">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Processus" : "Process"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.75rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-tight">
                  {pt("title")}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-4 sm:mt-6" />
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-[14px] sm:text-[17px] text-white/40 leading-relaxed max-w-[500px]">
                  {locale === "fr"
                    ? "Atlas respecte strictement le délai de livraison avec une planification rigoureuse, sans aucune perturbation. De la proposition à l'après-vente."
                    : "Atlas strictly meets delivery deadlines with rigorous planning, without any disruption. From proposal to after-sales."}
                </p>
              </div>
            </div>

            <div className="proc-steps grid grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-12 gap-y-5 sm:gap-y-10">
              {steps.map((step, i) => (
                <div key={i} className="proc-step">
                  <div className="flex items-baseline gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <span className="font-[var(--font-heading)] font-black text-[clamp(1.5rem,3vw,3rem)] text-white/10 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-heading)] font-bold text-[13px] sm:text-[17px] text-white tracking-tight">
                      {stepTitles[locale][i]}
                    </h3>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 mb-2 sm:mb-4" />
                  <p className="text-[11px] sm:text-[15px] text-white/45 leading-relaxed">
                    {step[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Plant ── */}
        <section className="relative h-screen bg-white overflow-hidden flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              <div className="hidden lg:block lg:col-span-7">
                <div className="plant-img relative aspect-[16/10] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
                  <Image src="/images/containers/factory-1.webp" alt="Usine de production Atlas Bâtiment Modulaire" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" quality={90} />
                </div>
              </div>
              <div className="lg:col-span-5 lg:pl-8">
                <div className="plant-content">
                  <span className="plant-reveal text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
                    {locale === "fr" ? "Usine de Production" : "Production Plant"}
                  </span>
                  <h2 className="plant-reveal font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 sm:mt-4 tracking-tight leading-tight">
                    {locale === "fr"
                      ? "Technologie de pointe et grande capacité"
                      : "Latest Technology and Large Capacity"}
                  </h2>
                  <div className="plant-reveal w-16 h-[3px] bg-atlas-red mt-5 sm:mt-7 mb-5 sm:mb-8" />
                  <p className="plant-reveal text-[14px] sm:text-[16px] text-atlas-slate leading-[1.7] mb-4 sm:mb-6">
                    {locale === "fr"
                      ? "Atlas Bâtiment Modulaire fabrique des produits répondant aux normes internationales les plus élevées avec une qualité de matériaux supérieure. Notre centre de production utilise des lignes de rollformage et de formage d'acier entièrement automatiques."
                      : "Atlas Batiment Modulaire manufactures products meeting the highest international standards with superior material quality. Our production center uses fully automatic rollforming and steel forming production lines."}
                  </p>
                  <p className="plant-reveal text-[14px] sm:text-[16px] text-atlas-slate leading-[1.7] mb-5 sm:mb-8">
                    {locale === "fr"
                      ? "Avec une capacité de production moderne et des équipements de dernière génération, nous développons les designs les plus modernes et les productions les plus efficaces pour nos clients à travers le monde."
                      : "With modern production capacity and state-of-the-art equipment, we develop the most modern designs and efficient productions for our clients worldwide."}
                  </p>
                  <div className="plant-reveal flex items-center gap-3 text-atlas-slate/50 mb-6 sm:mb-10">
                    <MapPin className="w-4 h-4 text-atlas-red" />
                    <span className="text-[13px] sm:text-[14px]">
                      {locale === "fr" ? "Turquie - Usine de production moderne" : "Turkey - Modern production facility"}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="plant-reveal group inline-flex items-center gap-3 bg-atlas-charcoal hover:bg-atlas-red text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors"
                  >
                    {locale === "fr" ? "Visiter l'usine" : "Visit the plant"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={snapStyle}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
