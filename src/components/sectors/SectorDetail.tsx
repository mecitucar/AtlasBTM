"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight, Phone, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Footer } from "@/components/layout/Footer";

interface SectorContent {
  heroImage: string;
  heroAlt: string;
  images: { src: string; alt: string }[];
  interiorImages?: { src: string; alt: string }[];
  applications: { fr: string; en: string }[];
  approach: { fr: string; en: string }[];
  introFr: string;
  introEn: string;
  challengeFr: string;
  challengeEn: string;
}

const sectors: Record<string, SectorContent> = {
  prefab: {
    heroImage: "/images/containers/prefab-new.webp",
    heroAlt: "Container préfabriqué modulaire Atlas Bâtiment Modulaire",
    images: [
      { src: "/images/showcase/07.webp", alt: "Conteneur préfabriqué - vue extérieure" },
      { src: "/images/prefab/exterior-2.webp", alt: "Bâtiment modulaire préfabriqué Atlas" },
      { src: "/images/prefab/exterior-3.webp", alt: "Conteneurs modulaires sur site" },
      { src: "/images/prefab/exterior-4.webp", alt: "Installation conteneurs préfabriqués" },
      { src: "/images/prefab/exterior-5.webp", alt: "Conteneurs livrés sur chantier" },
      { src: "/images/prefab/exterior-6.webp", alt: "Assemblage modulaire extérieur" },
      { src: "/images/prefab/exterior-7.webp", alt: "Conteneur préfabriqué terminé" },
      { src: "/images/prefab/exterior-8.webp", alt: "Vue extérieure camp modulaire" },
      { src: "/images/prefab/exterior-9.webp", alt: "Conteneurs préfabriqués alignés" },
      { src: "/images/prefab/exterior-10.webp", alt: "Projet conteneur préfabriqué Atlas" },
    ],
    interiorImages: [
      { src: "/images/prefab/interior-1.webp", alt: "Intérieur conteneur préfabriqué - aménagement" },
      { src: "/images/prefab/interior-2.webp", alt: "Intérieur conteneur - espace de vie" },
      { src: "/images/prefab/interior-3.webp", alt: "Intérieur conteneur - finitions qualité" },
      { src: "/images/prefab/interior-4.webp", alt: "Intérieur conteneur - cuisine équipée" },
      { src: "/images/prefab/interior-5.webp", alt: "Intérieur conteneur - chambre" },
      { src: "/images/prefab/interior-6.webp", alt: "Intérieur conteneur - salle de bain" },
      { src: "/images/prefab/interior-7.webp", alt: "Intérieur conteneur - détails finition" },
    ],
    applications: [
      { fr: "Bureaux modulaires temporaires et permanents", en: "Temporary and permanent modular offices" },
      { fr: "Logements ouvriers et camps de vie", en: "Worker housing and living camps" },
      { fr: "Cliniques et centres médicaux mobiles", en: "Mobile clinics and medical centers" },
      { fr: "Salles de classe et bâtiments scolaires", en: "Classrooms and school buildings" },
      { fr: "Sanitaires et blocs vestiaires", en: "Sanitation blocks and changing rooms" },
      { fr: "Réfectoires et cuisines industrielles", en: "Canteens and industrial kitchens" },
    ],
    approach: [
      { fr: "Analyse des besoins et conception sur mesure", en: "Needs analysis and custom design" },
      { fr: "Production automatisée en environnement contrôlé", en: "Automated production in controlled environment" },
      { fr: "Tests qualité et conformité aux normes", en: "Quality testing and standards compliance" },
      { fr: "Logistique internationale et livraison sur site", en: "International logistics and on-site delivery" },
    ],
    introFr: "Nos conteneurs préfabriqués sont conçus et fabriqués dans notre usine de production ultramoderne. Chaque unité est assemblée avec précision sur des lignes de rollformage entièrement automatiques, garantissant une qualité constante et une durabilité exceptionnelle. Du bureau de chantier au logement complet, nous livrons des solutions clé en main adaptées aux exigences les plus strictes.",
    introEn: "Our prefabricated containers are designed and manufactured in our state-of-the-art production facility. Each unit is precision-assembled on fully automatic rollforming lines, ensuring consistent quality and exceptional durability. From site offices to complete housing, we deliver turnkey solutions tailored to the most demanding requirements.",
    challengeFr: "Les projets modernes exigent rapidité, flexibilité et qualité sans compromis. La construction traditionnelle ne peut pas toujours répondre à ces contraintes. Nos conteneurs préfabriqués éliminent les aléas du chantier en transférant 90% du travail en usine.",
    challengeEn: "Modern projects demand speed, flexibility, and uncompromising quality. Traditional construction cannot always meet these constraints. Our prefabricated containers eliminate on-site uncertainties by transferring 90% of work to the factory.",
  },
  mining: {
    heroImage: "/images/mining/maden-hero.webp",
    heroAlt: "Camp minier modulaire déploiement rapide Atlas",
    images: [
      { src: "/images/mining/maden1.webp", alt: "Camp minier modulaire - vue générale" },
      { src: "/images/mining/maden2.webp", alt: "Installation camp minier sur site" },
      { src: "/images/mining/maden3.webp", alt: "Modules d'hébergement camp minier" },
      { src: "/images/mining/maden5.webp", alt: "Infrastructure camp minier" },
      { src: "/images/mining/maden6.webp", alt: "Bâtiments modulaires site minier" },
      { src: "/images/mining/maden7.webp", alt: "Camp minier opérationnel" },
      { src: "/images/mining/maden8.webp", alt: "Hébergement équipes minières" },
      { src: "/images/mining/maden9.webp", alt: "Installations camp minier" },
      { src: "/images/mining/maden10.webp", alt: "Vue aérienne camp minier" },
      { src: "/images/mining/maden11.webp", alt: "Camp minier Atlas complet" },
    ],
    applications: [
      { fr: "Camps d'hébergement 50 à 2000 personnes", en: "Accommodation camps for 50 to 2000 people" },
      { fr: "Réfectoires et cuisines industrielles", en: "Canteens and industrial kitchens" },
      { fr: "Infirmeries et postes de premiers secours", en: "Infirmaries and first aid stations" },
      { fr: "Bureaux administratifs et salles de réunion", en: "Administrative offices and meeting rooms" },
      { fr: "Laveries et blocs sanitaires", en: "Laundry facilities and sanitation blocks" },
      { fr: "Zones de loisirs et espaces de détente", en: "Recreation areas and relaxation spaces" },
    ],
    approach: [
      { fr: "Étude topographique et plan d'implantation", en: "Topographic study and site plan" },
      { fr: "Conception adaptée aux conditions climatiques locales", en: "Design adapted to local climate conditions" },
      { fr: "Préfabrication complète en usine", en: "Complete factory prefabrication" },
      { fr: "Déploiement rapide et mise en service opérationnelle", en: "Rapid deployment and operational commissioning" },
    ],
    introFr: "L'exploitation minière exige des infrastructures fiables dans des environnements souvent isolés et hostiles. Atlas déploie des camps modulaires complets - de l'hébergement à la restauration, des bureaux aux installations médicales - capables de fonctionner de manière autonome dans les conditions les plus extrêmes. Nos solutions sont conçues pour être démontées et redéployées au fil des phases d'exploitation.",
    introEn: "Mining operations demand reliable infrastructure in often isolated and hostile environments. Atlas deploys complete modular camps - from accommodation to catering, offices to medical facilities - capable of autonomous operation in the most extreme conditions. Our solutions are designed to be dismantled and redeployed as extraction phases evolve.",
    challengeFr: "Les sites miniers sont souvent situés dans des zones reculées, sans infrastructure existante. Les équipes doivent être logées, nourries et soignées sur place, dans le respect des normes de sécurité les plus strictes, et ce en un minimum de temps.",
    challengeEn: "Mining sites are often located in remote areas with no existing infrastructure. Teams must be housed, fed, and cared for on-site, in compliance with the strictest safety standards, all within minimal timeframes.",
  },
  construction: {
    heroImage: "/images/containers/camp-1.webp",
    heroAlt: "Camp de construction modulaire pour grands chantiers",
    images: [
      { src: "/images/containers/assembly-2.webp", alt: "Montage rapide camp de chantier" },
      { src: "/images/containers/interior-1.webp", alt: "Intérieur bureau de chantier" },
      { src: "/images/containers/finished-2.webp", alt: "Camp construction opérationnel" },
    ],
    applications: [
      { fr: "Bureaux de direction et de supervision de chantier", en: "Site management and supervision offices" },
      { fr: "Vestiaires et sanitaires aux normes BTP", en: "Changing rooms and sanitation to construction standards" },
      { fr: "Réfectoires et espaces de repos", en: "Canteens and rest areas" },
      { fr: "Postes de garde et contrôle d'accès", en: "Guard posts and access control" },
      { fr: "Ateliers et magasins de stockage", en: "Workshops and storage facilities" },
      { fr: "Salles de formation et de briefing sécurité", en: "Training and safety briefing rooms" },
    ],
    approach: [
      { fr: "Visite technique et évaluation du chantier", en: "Technical visit and site evaluation" },
      { fr: "Plan d'aménagement optimisé selon les flux", en: "Layout plan optimized for workflow" },
      { fr: "Livraison et installation clé en main", en: "Turnkey delivery and installation" },
      { fr: "Démontage et transfert vers le prochain chantier", en: "Dismantling and transfer to next site" },
    ],
    introFr: "Les grands chantiers d'infrastructure - autoroutes, barrages, lignes ferroviaires - nécessitent des bases de vie fonctionnelles dès le premier jour. Atlas fournit des installations modulaires qui s'adaptent à la progression du chantier : elles se déploient rapidement, se reconfigurent selon les besoins et se démontent pour le prochain projet sans perte de valeur.",
    introEn: "Major infrastructure projects - highways, dams, railways - require functional living bases from day one. Atlas provides modular facilities that adapt to site progression: they deploy quickly, reconfigure as needed, and dismantle for the next project without loss of value.",
    challengeFr: "Un chantier de construction évolue constamment. Les effectifs varient, les besoins changent, et les installations doivent suivre le rythme. La flexibilité et la rapidité de déploiement sont essentielles pour maintenir la productivité.",
    challengeEn: "A construction site constantly evolves. Headcounts vary, needs change, and facilities must keep pace. Flexibility and speed of deployment are essential to maintaining productivity.",
  },
  defense: {
    heroImage: "/images/defense/defence-hero.webp",
    heroAlt: "Base militaire modulaire Atlas Bâtiment Modulaire",
    images: [
      { src: "/images/defense/defence-1.webp", alt: "Installation modulaire base militaire" },
      { src: "/images/defense/defence-2.webp", alt: "Structures défense déployées sur site" },
      { src: "/images/defense/defence-3.webp", alt: "Camp militaire modulaire opérationnel" },
    ],
    applications: [
      { fr: "Postes de commandement et centres opérationnels", en: "Command posts and operational centers" },
      { fr: "Casernements et quartiers d'hébergement", en: "Barracks and accommodation quarters" },
      { fr: "Hôpitaux de campagne et infirmeries", en: "Field hospitals and infirmaries" },
      { fr: "Centres de communication et de renseignement", en: "Communication and intelligence centers" },
      { fr: "Dépôts logistiques et ateliers de maintenance", en: "Logistics depots and maintenance workshops" },
      { fr: "Postes de contrôle et tours d'observation", en: "Checkpoints and observation towers" },
    ],
    approach: [
      { fr: "Consultation confidentielle et cahier des charges", en: "Confidential consultation and specifications" },
      { fr: "Conception renforcée selon spécifications militaires", en: "Reinforced design per military specifications" },
      { fr: "Production sécurisée et tests rigoureux", en: "Secure production and rigorous testing" },
      { fr: "Déploiement discret et mise en service rapide", en: "Discreet deployment and rapid commissioning" },
    ],
    introFr: "Le secteur de la défense impose des exigences sans équivalentes : résistance structurelle, déployabilité rapide, autonomie complète et confidentialité absolue. Atlas conçoit des structures modulaires renforcées qui répondent aux spécifications militaires les plus strictes, tout en maintenant la flexibilité nécessaire aux opérations de terrain. Chaque projet est traité avec la plus haute discrétion.",
    introEn: "The defense sector imposes unmatched requirements: structural resistance, rapid deployability, complete autonomy, and absolute confidentiality. Atlas designs reinforced modular structures meeting the strictest military specifications while maintaining the flexibility needed for field operations. Every project is handled with the highest discretion.",
    challengeFr: "Les forces armées ont besoin d'infrastructures opérationnelles en quelques heures, pas en quelques mois. Ces structures doivent résister aux conditions extrêmes, fonctionner de manière autonome et pouvoir être redéployées sans préavis.",
    challengeEn: "Armed forces need operational infrastructure in hours, not months. These structures must withstand extreme conditions, operate autonomously, and be redeployable without notice.",
  },
  energy: {
    heroImage: "/images/containers/port-containers.webp",
    heroAlt: "Installations modulaires pour projets énergétiques internationaux",
    images: [
      { src: "/images/containers/site-aerial-1.webp", alt: "Vue aérienne installations énergétiques" },
      { src: "/images/containers/factory-1.webp", alt: "Production modules techniques" },
      { src: "/images/containers/finished-1.webp", alt: "Modules énergétiques terminés" },
      { src: "/images/containers/transport-1.webp", alt: "Transport installations énergétiques" },
    ],
    applications: [
      { fr: "Camps pour centrales solaires et parcs éoliens", en: "Camps for solar plants and wind farms" },
      { fr: "Bases vie pour pipeline et raffineries", en: "Living bases for pipeline and refineries" },
      { fr: "Laboratoires techniques et salles de contrôle", en: "Technical laboratories and control rooms" },
      { fr: "Hébergement pour équipes de forage", en: "Accommodation for drilling teams" },
      { fr: "Stations de traitement et de stockage", en: "Treatment and storage stations" },
      { fr: "Bureaux de projet et centres de formation", en: "Project offices and training centers" },
    ],
    approach: [
      { fr: "Analyse environnementale et contraintes du site", en: "Environmental analysis and site constraints" },
      { fr: "Ingénierie adaptée aux normes du secteur énergétique", en: "Engineering adapted to energy sector standards" },
      { fr: "Fabrication et pré-assemblage en usine", en: "Factory manufacturing and pre-assembly" },
      { fr: "Installation et raccordement sur site isolé", en: "Installation and connection on remote sites" },
    ],
    introFr: "Les projets énergétiques - solaire, éolien, pétrole, gaz - se déploient dans des zones souvent isolées et difficiles d'accès. Atlas fournit l'ensemble des infrastructures de vie et de travail nécessaires au fonctionnement de ces sites : hébergement, bureaux, laboratoires, restauration. Nos modules sont conçus pour résister aux environnements les plus exigeants tout en offrant un confort optimal aux équipes.",
    introEn: "Energy projects - solar, wind, oil, gas - deploy in often isolated and hard-to-access zones. Atlas provides all the living and working infrastructure needed for these sites: accommodation, offices, laboratories, catering. Our modules are designed to withstand the most demanding environments while offering optimal comfort to teams.",
    challengeFr: "Les sites énergétiques opèrent souvent dans des régions où il n'existe aucune infrastructure. Les équipes doivent disposer d'installations complètes - hébergement, restauration, bureaux, soins médicaux - dans des délais très courts et des conditions climatiques extrêmes.",
    challengeEn: "Energy sites often operate in regions with no existing infrastructure. Teams need complete facilities - accommodation, catering, offices, medical care - within very tight deadlines and extreme climate conditions.",
  },
};

const allSectorKeys = ["prefab", "mining", "construction", "defense", "energy"];

export function SectorDetail({ sectorKey }: { sectorKey: string }) {
  const t = useTranslations("solutions");
  const nav = useTranslations("nav");
  const scrollRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const data = sectors[sectorKey];
  const locale = useLocale() as "fr" | "en";
  const hasInterior = data.interiorImages && data.interiorImages.length > 0;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".s-hero-label", { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(".s-hero-title", { y: 50, opacity: 0, duration: 0.9 }, 0.3);
    tl.from(".s-hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);

    gsap.from(".s-intro-img", {
      clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: ".s-intro", start: "top 70%", scroller: scrollRef.current },
    });
    gsap.from(".s-intro-img img", {
      scale: 1.3, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ".s-intro", start: "top 70%", scroller: scrollRef.current },
    });
    gsap.from(".s-intro-text > *", {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-intro-text", start: "top 75%", scroller: scrollRef.current },
    });

    gsap.from(".s-app", {
      y: 25, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".s-apps", start: "top 80%", scroller: scrollRef.current },
    });

    gsap.from(".s-ext-item", {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-exterior", start: "top 80%", scroller: scrollRef.current },
    });

    gsap.from(".s-step", {
      x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".s-approach", start: "top 80%", scroller: scrollRef.current },
    });

    gsap.from(".s-other", {
      y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-others", start: "top 85%", scroller: scrollRef.current },
    });

    if (container.current?.querySelector(".s-door-section")) {
      const doorTl = gsap.timeline({
        scrollTrigger: { trigger: ".s-door-section", start: "top 85%", scroller: scrollRef.current },
      });
      doorTl.from(".s-door-line", { scaleX: 0, transformOrigin: "center", duration: 0.5 });
      doorTl.from(".s-door-title", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.2);
      doorTl.from(".s-door-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.5);
      doorTl.to(".s-door-left", { xPercent: -100, duration: 1.2, ease: "power3.inOut" }, 1.2);
      doorTl.to(".s-door-right", { xPercent: 100, duration: 1.2, ease: "power3.inOut" }, 1.2);

      gsap.from(".s-int-item", {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".s-interior", start: "top 80%", scroller: scrollRef.current },
      });
    }
  }, { scope: container });


  const otherSectors = allSectorKeys.filter((k) => k !== sectorKey);

  const snapStyle = { scrollSnapAlign: "start" as const };

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
            <Image src={data.heroImage} alt={data.heroAlt} fill className="object-cover" sizes="100vw" quality={90} priority />
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none">
            <span className="font-[var(--font-heading)] font-black text-[400px] text-white leading-none">A</span>
          </div>
          <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
              <span className="s-hero-label text-[12px] tracking-[0.3em] uppercase text-white font-bold block" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                {t("title")}
              </span>
              <h1 className="s-hero-title font-[var(--font-heading)] text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white mt-5 leading-[0.92] tracking-tighter max-w-[450px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 4px 30px rgba(0,0,0,0.3)" }}>
                {t(`${sectorKey}.title`)}
              </h1>
              <div className="s-hero-line w-24 h-[3px] bg-atlas-red mt-8" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-atlas-red" />
        </section>

        {/* ── Intro ── */}
        <section className="s-intro relative h-screen bg-white overflow-hidden flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              <div className="lg:col-span-7 lg:pr-16 s-intro-text">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Le Défi" : "The Challenge"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.25rem,2.5vw,2.25rem)] font-black text-atlas-charcoal mt-3 sm:mt-4 tracking-tight leading-tight">
                  {locale === "fr" ? data.challengeFr : data.challengeEn}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-5 sm:mt-8 mb-5 sm:mb-8" />
                <p className="text-[14px] sm:text-[17px] text-atlas-slate leading-[1.7] mb-6 sm:mb-8">
                  {locale === "fr" ? data.introFr : data.introEn}
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors"
                >
                  {locale === "fr" ? "Demander un devis" : "Request a quote"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden lg:block lg:col-span-5">
                <div className="s-intro-img relative aspect-[3/4] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
                  <Image src={data.images[0].src} alt={data.images[0].alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={90} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Applications ── */}
        <section className="s-apps relative h-screen bg-atlas-charcoal overflow-hidden flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
              <div className="lg:col-span-4">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Applications" : "Applications"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-tight">
                  {locale === "fr" ? "Ce que nous déployons" : "What we deploy"}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-4 sm:mt-6" />
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {data.applications.map((app, i) => (
                    <div key={i} className="s-app flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white/[0.06] border border-white/[0.08]">
                      <span className="text-[12px] sm:text-[13px] font-[var(--font-heading)] font-bold text-atlas-red mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] sm:text-[15px] text-white leading-relaxed">
                        {app[locale]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Exterior Gallery ── */}
        <section className="s-exterior relative h-screen bg-white flex flex-col" style={snapStyle}>
          <div className="text-center pt-10 lg:pt-16 pb-6 lg:pb-10 shrink-0">
            <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
              {t(`${sectorKey}.title`)}
            </span>
            <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-2 sm:mt-3 tracking-tight">
              {locale === "fr" ? "Galerie" : "Gallery"}
            </h2>
            <div className="w-16 h-[3px] bg-atlas-red mt-4 mx-auto" />
          </div>
          <div className={`flex-1 grid grid-cols-1 ${data.images.length <= 3 ? "sm:grid-cols-3" : data.images.length <= 4 ? "sm:grid-cols-4" : "sm:grid-cols-5"}`} style={{ gap: "2px" }}>
            {data.images.map((img, i) => (
              <div key={i} className="s-ext-item relative overflow-hidden group">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 33vw" quality={90} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Interior Experience ── */}
        {hasInterior && (
          <>
            <section className="s-door-section relative h-screen bg-black overflow-hidden flex items-center justify-center" style={snapStyle}>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
                <div className="s-door-line w-20 h-[3px] bg-atlas-red mx-auto mb-6 sm:mb-8" />
                <h2 className="s-door-title font-[var(--font-heading)] text-[clamp(1.75rem,5vw,4rem)] font-black text-white tracking-tighter text-center">
                  {locale === "fr" ? "Entrez à l'intérieur" : "Step inside"}
                </h2>
                <p className="s-door-sub text-[15px] sm:text-[18px] text-white/40 mt-4 sm:mt-5 max-w-[420px] mx-auto text-center">
                  {locale === "fr"
                    ? "Découvrez la qualité de nos finitions intérieures"
                    : "Discover the quality of our interior finishes"}
                </p>
              </div>
              <div className="s-door-left absolute top-0 left-0 w-1/2 h-full z-10 overflow-hidden">
                <Image src={data.interiorImages![0].src} alt={data.interiorImages![0].alt} fill className="object-cover" sizes="50vw" quality={90} />
                <div className="absolute inset-0 bg-black/60" />
              </div>
              <div className="s-door-right absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden">
                <Image src={data.interiorImages![1].src} alt={data.interiorImages![1].alt} fill className="object-cover" sizes="50vw" quality={90} />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            </section>

            <section className="s-interior relative h-screen bg-atlas-charcoal flex flex-col" style={snapStyle}>
              <div className="text-center pt-10 lg:pt-16 pb-6 lg:pb-10 shrink-0">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Intérieur" : "Interior"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white mt-2 sm:mt-3 tracking-tight">
                  {locale === "fr" ? "Nos Finitions" : "Our Finishes"}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-4 mx-auto" />
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-5" style={{ gap: "2px" }}>
                {data.interiorImages!.slice(2).map((img, i) => {
                  const remaining = data.interiorImages!.length - 2;
                  const isLast = i === remaining - 1;
                  const isOdd = remaining % 2 !== 0;
                  return (
                    <div key={i} className={`s-int-item relative overflow-hidden group ${isLast && isOdd ? "col-span-2 lg:col-span-1" : ""}`}>
                      <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 640px) 50vw, 33vw" quality={90} />
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* ── Approach ── */}
        <section className="s-approach relative h-screen bg-atlas-sand flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Notre Approche" : "Our Approach"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 sm:mt-4 tracking-tight leading-tight">
                  {locale === "fr" ? "Du premier contact à la livraison" : "From first contact to delivery"}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-4 sm:mt-6 mb-5 sm:mb-8" />
                <p className="text-[14px] sm:text-[16px] text-atlas-slate leading-relaxed">
                  {locale === "fr"
                    ? "Chaque projet est unique. Notre processus s'adapte à vos contraintes spécifiques pour garantir une livraison dans les délais et conforme à vos exigences."
                    : "Every project is unique. Our process adapts to your specific constraints to guarantee on-time delivery that meets your requirements."}
                </p>
              </div>
              <div className="lg:col-span-7 lg:pl-8">
                <div className="space-y-0">
                  {data.approach.map((step, i) => (
                    <div
                      key={i}
                      className={`s-step flex items-start gap-4 sm:gap-6 py-5 sm:py-7 ${
                        i < data.approach.length - 1 ? "border-b border-atlas-charcoal/10" : ""
                      }`}
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-atlas-red flex items-center justify-center shrink-0">
                        <span className="font-[var(--font-heading)] font-black text-[16px] sm:text-[20px] text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="pt-1 sm:pt-2">
                        <span className="text-[14px] sm:text-[17px] text-atlas-charcoal font-medium leading-relaxed">
                          {step[locale]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative h-screen overflow-hidden flex items-center" style={snapStyle}>
          <div className="absolute inset-0">
            <Image src="/images/cta-bg.webp" alt="Atlas Bâtiment Modulaire - conception projet" fill className="object-cover" sizes="100vw" quality={90} />
            <div className="absolute inset-0 bg-atlas-red/40" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              <div>
                <span className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-white/70 font-bold block">
                  {locale === "fr" ? "Votre Projet" : "Your Project"}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,4vw,3.5rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-[1.05]">
                  {locale === "fr" ? "Parlons de votre projet" : "Let's talk about your project"}
                </h2>
                <div className="w-12 sm:w-16 h-[3px] bg-white mt-5 sm:mt-8 mb-5 sm:mb-8" />
                <p className="text-[14px] sm:text-[17px] text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-[480px]">
                  {locale === "fr"
                    ? "Nos experts sont à votre disposition pour étudier vos besoins et vous proposer une solution sur mesure."
                    : "Our experts are available to study your needs and propose a tailored solution."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 bg-white text-atlas-red hover:bg-white/90 px-6 sm:px-9 py-3.5 sm:py-5 text-[13px] sm:text-[15px] font-bold tracking-wider uppercase transition-colors"
                  >
                    {locale === "fr" ? "Demander un Devis" : "Request a Quote"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-atlas-red flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] sm:text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-0.5">
                      {locale === "fr" ? "Téléphone" : "Phone"}
                    </span>
                    <span className="text-[15px] sm:text-[18px] text-white font-bold">+224 624 24 19 77</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-atlas-red flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] sm:text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-0.5">
                      Email
                    </span>
                    <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[13px] sm:text-[18px] text-white font-bold hover:text-white/80 transition-colors break-all">
                      atlasbatimodulaire@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other Sectors ── */}
        <section className="s-others relative h-screen bg-atlas-charcoal flex items-center" style={snapStyle}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 w-full">
            <div className="flex items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {t("title")}
                </span>
                <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight">
                  {locale === "fr" ? "Autres Secteurs" : "Other Sectors"}
                </h2>
              </div>
              <div className="hidden sm:block w-16 h-[3px] bg-atlas-red mb-2" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {otherSectors.map((sk) => (
                <Link
                  key={sk}
                  href={`/sectors/${sk}` as any}
                  className="s-other group relative aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={sectors[sk].heroImage}
                    alt={sectors[sk].heroAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={90}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-[var(--font-heading)] font-bold text-[14px] sm:text-[18px] text-white tracking-tight leading-snug">
                      {t(`${sk}.title`)}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] text-white/50 mt-2 sm:mt-3 group-hover:text-atlas-red transition-colors font-medium uppercase tracking-wider">
                      {locale === "fr" ? "Découvrir" : "Discover"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
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
