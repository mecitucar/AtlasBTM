"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight, Phone, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { RedLineFill } from "@/components/ui/RedLineFill";

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
    heroImage: "/images/containers/finished-1.webp",
    heroAlt: "Container prefabrique modulaire Atlas Batiment Modulaire",
    images: [
      { src: "/images/showcase/07.webp", alt: "Conteneur prefabrique - vue exterieure" },
      { src: "/images/prefab/exterior-2.webp", alt: "Batiment modulaire prefabrique Atlas" },
      { src: "/images/prefab/exterior-3.webp", alt: "Conteneurs modulaires sur site" },
      { src: "/images/prefab/exterior-4.webp", alt: "Installation conteneurs prefabriques" },
      { src: "/images/prefab/exterior-5.webp", alt: "Conteneurs livres sur chantier" },
      { src: "/images/prefab/exterior-6.webp", alt: "Assemblage modulaire exterieur" },
      { src: "/images/prefab/exterior-7.webp", alt: "Conteneur prefabrique termine" },
      { src: "/images/prefab/exterior-8.webp", alt: "Vue exterieure camp modulaire" },
      { src: "/images/prefab/exterior-9.webp", alt: "Conteneurs prefabriques alignes" },
      { src: "/images/prefab/exterior-10.webp", alt: "Projet conteneur prefabrique Atlas" },
    ],
    interiorImages: [
      { src: "/images/prefab/interior-1.webp", alt: "Interieur conteneur prefabrique - amenagement" },
      { src: "/images/prefab/interior-2.webp", alt: "Interieur conteneur - espace de vie" },
      { src: "/images/prefab/interior-3.webp", alt: "Interieur conteneur - finitions qualite" },
      { src: "/images/prefab/interior-4.webp", alt: "Interieur conteneur - cuisine equipee" },
      { src: "/images/prefab/interior-5.webp", alt: "Interieur conteneur - chambre" },
      { src: "/images/prefab/interior-6.webp", alt: "Interieur conteneur - salle de bain" },
      { src: "/images/prefab/interior-7.webp", alt: "Interieur conteneur - details finition" },
    ],
    applications: [
      { fr: "Bureaux modulaires temporaires et permanents", en: "Temporary and permanent modular offices" },
      { fr: "Logements ouvriers et camps de vie", en: "Worker housing and living camps" },
      { fr: "Cliniques et centres medicaux mobiles", en: "Mobile clinics and medical centers" },
      { fr: "Salles de classe et batiments scolaires", en: "Classrooms and school buildings" },
      { fr: "Sanitaires et blocs vestiaires", en: "Sanitation blocks and changing rooms" },
      { fr: "Refectoires et cuisines industrielles", en: "Canteens and industrial kitchens" },
    ],
    approach: [
      { fr: "Analyse des besoins et conception sur mesure", en: "Needs analysis and custom design" },
      { fr: "Production automatisee en environnement controle", en: "Automated production in controlled environment" },
      { fr: "Tests qualite et conformite aux normes", en: "Quality testing and standards compliance" },
      { fr: "Logistique internationale et livraison sur site", en: "International logistics and on-site delivery" },
    ],
    introFr: "Nos conteneurs prefabriques sont concus et fabriques dans notre usine de production ultramoderne. Chaque unite est assemblee avec precision sur des lignes de rollformage entierement automatiques, garantissant une qualite constante et une durabilite exceptionnelle. Du bureau de chantier au logement complet, nous livrons des solutions cle en main adaptees aux exigences les plus strictes.",
    introEn: "Our prefabricated containers are designed and manufactured in our state-of-the-art production facility. Each unit is precision-assembled on fully automatic rollforming lines, ensuring consistent quality and exceptional durability. From site offices to complete housing, we deliver turnkey solutions tailored to the most demanding requirements.",
    challengeFr: "Les projets modernes exigent rapidite, flexibilite et qualite sans compromis. La construction traditionnelle ne peut pas toujours repondre a ces contraintes. Nos conteneurs prefabriques eliminent les aleas du chantier en transferant 90% du travail en usine.",
    challengeEn: "Modern projects demand speed, flexibility, and uncompromising quality. Traditional construction cannot always meet these constraints. Our prefabricated containers eliminate on-site uncertainties by transferring 90% of work to the factory.",
  },
  mining: {
    heroImage: "/images/mining/maden-hero.webp",
    heroAlt: "Camp minier modulaire deploiement rapide Atlas",
    images: [
      { src: "/images/mining/maden1.webp", alt: "Camp minier modulaire - vue generale" },
      { src: "/images/mining/maden2.webp", alt: "Installation camp minier sur site" },
      { src: "/images/mining/maden3.webp", alt: "Modules d'hebergement camp minier" },
      { src: "/images/mining/maden5.webp", alt: "Infrastructure camp minier" },
      { src: "/images/mining/maden6.webp", alt: "Batiments modulaires site minier" },
      { src: "/images/mining/maden7.webp", alt: "Camp minier operationnel" },
      { src: "/images/mining/maden8.webp", alt: "Hebergement equipes minieres" },
      { src: "/images/mining/maden9.webp", alt: "Installations camp minier" },
      { src: "/images/mining/maden10.webp", alt: "Vue aerienne camp minier" },
      { src: "/images/mining/maden11.webp", alt: "Camp minier Atlas complet" },
    ],
    applications: [
      { fr: "Camps d'hebergement 50 a 2000 personnes", en: "Accommodation camps for 50 to 2000 people" },
      { fr: "Refectoires et cuisines industrielles", en: "Canteens and industrial kitchens" },
      { fr: "Infirmeries et postes de premiers secours", en: "Infirmaries and first aid stations" },
      { fr: "Bureaux administratifs et salles de reunion", en: "Administrative offices and meeting rooms" },
      { fr: "Laveries et blocs sanitaires", en: "Laundry facilities and sanitation blocks" },
      { fr: "Zones de loisirs et espaces de detente", en: "Recreation areas and relaxation spaces" },
    ],
    approach: [
      { fr: "Etude topographique et plan d'implantation", en: "Topographic study and site plan" },
      { fr: "Conception adaptee aux conditions climatiques locales", en: "Design adapted to local climate conditions" },
      { fr: "Prefabrication complete en usine", en: "Complete factory prefabrication" },
      { fr: "Deploiement rapide et mise en service operationnelle", en: "Rapid deployment and operational commissioning" },
    ],
    introFr: "L'exploitation miniere exige des infrastructures fiables dans des environnements souvent isoles et hostiles. Atlas deploie des camps modulaires complets - de l'hebergement a la restauration, des bureaux aux installations medicales - capables de fonctionner de maniere autonome dans les conditions les plus extremes. Nos solutions sont concues pour etre demontees et redeployees au fil des phases d'exploitation.",
    introEn: "Mining operations demand reliable infrastructure in often isolated and hostile environments. Atlas deploys complete modular camps - from accommodation to catering, offices to medical facilities - capable of autonomous operation in the most extreme conditions. Our solutions are designed to be dismantled and redeployed as extraction phases evolve.",
    challengeFr: "Les sites miniers sont souvent situes dans des zones reculees, sans infrastructure existante. Les equipes doivent etre logees, nourries et soignees sur place, dans le respect des normes de securite les plus strictes, et ce en un minimum de temps.",
    challengeEn: "Mining sites are often located in remote areas with no existing infrastructure. Teams must be housed, fed, and cared for on-site, in compliance with the strictest safety standards, all within minimal timeframes.",
  },
  construction: {
    heroImage: "/images/containers/camp-1.webp",
    heroAlt: "Camp de construction modulaire pour grands chantiers",
    images: [
      { src: "/images/containers/assembly-2.webp", alt: "Montage rapide camp de chantier" },
      { src: "/images/containers/interior-1.webp", alt: "Interieur bureau de chantier" },
      { src: "/images/containers/finished-2.webp", alt: "Camp construction operationnel" },
      { src: "/images/containers/transport-1.webp", alt: "Livraison modules de chantier" },
    ],
    applications: [
      { fr: "Bureaux de direction et de supervision de chantier", en: "Site management and supervision offices" },
      { fr: "Vestiaires et sanitaires aux normes BTP", en: "Changing rooms and sanitation to construction standards" },
      { fr: "Refectoires et espaces de repos", en: "Canteens and rest areas" },
      { fr: "Postes de garde et controle d'acces", en: "Guard posts and access control" },
      { fr: "Ateliers et magasins de stockage", en: "Workshops and storage facilities" },
      { fr: "Salles de formation et de briefing securite", en: "Training and safety briefing rooms" },
    ],
    approach: [
      { fr: "Visite technique et evaluation du chantier", en: "Technical visit and site evaluation" },
      { fr: "Plan d'amenagement optimise selon les flux", en: "Layout plan optimized for workflow" },
      { fr: "Livraison et installation cle en main", en: "Turnkey delivery and installation" },
      { fr: "Demontage et transfert vers le prochain chantier", en: "Dismantling and transfer to next site" },
    ],
    introFr: "Les grands chantiers d'infrastructure - autoroutes, barrages, lignes ferroviaires - necessitent des bases de vie fonctionnelles des le premier jour. Atlas fournit des installations modulaires qui s'adaptent a la progression du chantier : elles se deploient rapidement, se reconfigurent selon les besoins et se demontent pour le prochain projet sans perte de valeur.",
    introEn: "Major infrastructure projects - highways, dams, railways - require functional living bases from day one. Atlas provides modular facilities that adapt to site progression: they deploy quickly, reconfigure as needed, and dismantle for the next project without loss of value.",
    challengeFr: "Un chantier de construction evolue constamment. Les effectifs varient, les besoins changent, et les installations doivent suivre le rythme. La flexibilite et la rapidite de deploiement sont essentielles pour maintenir la productivite.",
    challengeEn: "A construction site constantly evolves. Headcounts vary, needs change, and facilities must keep pace. Flexibility and speed of deployment are essential to maintaining productivity.",
  },
  defense: {
    heroImage: "/images/defense/defence-hero.webp",
    heroAlt: "Base militaire modulaire Atlas Batiment Modulaire",
    images: [
      { src: "/images/defense/defence-1.webp", alt: "Installation modulaire base militaire" },
      { src: "/images/defense/defence-2.webp", alt: "Structures defense deployees sur site" },
      { src: "/images/defense/defence-3.webp", alt: "Camp militaire modulaire operationnel" },
    ],
    applications: [
      { fr: "Postes de commandement et centres operationnels", en: "Command posts and operational centers" },
      { fr: "Casernements et quartiers d'hebergement", en: "Barracks and accommodation quarters" },
      { fr: "Hopitaux de campagne et infirmeries", en: "Field hospitals and infirmaries" },
      { fr: "Centres de communication et de renseignement", en: "Communication and intelligence centers" },
      { fr: "Depots logistiques et ateliers de maintenance", en: "Logistics depots and maintenance workshops" },
      { fr: "Postes de controle et tours d'observation", en: "Checkpoints and observation towers" },
    ],
    approach: [
      { fr: "Consultation confidentielle et cahier des charges", en: "Confidential consultation and specifications" },
      { fr: "Conception renforcee selon specifications militaires", en: "Reinforced design per military specifications" },
      { fr: "Production securisee et tests rigoureux", en: "Secure production and rigorous testing" },
      { fr: "Deploiement discret et mise en service rapide", en: "Discreet deployment and rapid commissioning" },
    ],
    introFr: "Le secteur de la defense impose des exigences sans equivalentes : resistance structurelle, deployabilite rapide, autonomie complete et confidentialite absolue. Atlas concoit des structures modulaires renforcees qui repondent aux specifications militaires les plus strictes, tout en maintenant la flexibilite necessaire aux operations de terrain. Chaque projet est traite avec la plus haute discretion.",
    introEn: "The defense sector imposes unmatched requirements: structural resistance, rapid deployability, complete autonomy, and absolute confidentiality. Atlas designs reinforced modular structures meeting the strictest military specifications while maintaining the flexibility needed for field operations. Every project is handled with the highest discretion.",
    challengeFr: "Les forces armees ont besoin d'infrastructures operationnelles en quelques heures, pas en quelques mois. Ces structures doivent resister aux conditions extremes, fonctionner de maniere autonome et pouvoir etre redeployees sans preavis.",
    challengeEn: "Armed forces need operational infrastructure in hours, not months. These structures must withstand extreme conditions, operate autonomously, and be redeployable without notice.",
  },
  energy: {
    heroImage: "/images/containers/port-containers.webp",
    heroAlt: "Installations modulaires pour projets energetiques internationaux",
    images: [
      { src: "/images/containers/site-aerial-1.webp", alt: "Vue aerienne installations energetiques" },
      { src: "/images/containers/factory-1.webp", alt: "Production modules techniques" },
      { src: "/images/containers/finished-1.webp", alt: "Modules energetiques termines" },
      { src: "/images/containers/transport-1.webp", alt: "Transport installations energetiques" },
    ],
    applications: [
      { fr: "Camps pour centrales solaires et parcs eoliens", en: "Camps for solar plants and wind farms" },
      { fr: "Bases vie pour pipeline et raffineries", en: "Living bases for pipeline and refineries" },
      { fr: "Laboratoires techniques et salles de controle", en: "Technical laboratories and control rooms" },
      { fr: "Hebergement pour equipes de forage", en: "Accommodation for drilling teams" },
      { fr: "Stations de traitement et de stockage", en: "Treatment and storage stations" },
      { fr: "Bureaux de projet et centres de formation", en: "Project offices and training centers" },
    ],
    approach: [
      { fr: "Analyse environnementale et contraintes du site", en: "Environmental analysis and site constraints" },
      { fr: "Ingenierie adaptee aux normes du secteur energetique", en: "Engineering adapted to energy sector standards" },
      { fr: "Fabrication et pre-assemblage en usine", en: "Factory manufacturing and pre-assembly" },
      { fr: "Installation et raccordement sur site isole", en: "Installation and connection on remote sites" },
    ],
    introFr: "Les projets energetiques - solaire, eolien, petrole, gaz - se deploient dans des zones souvent isolees et difficiles d'acces. Atlas fournit l'ensemble des infrastructures de vie et de travail necessaires au fonctionnement de ces sites : hebergement, bureaux, laboratoires, restauration. Nos modules sont concus pour resister aux environnements les plus exigeants tout en offrant un confort optimal aux equipes.",
    introEn: "Energy projects - solar, wind, oil, gas - deploy in often isolated and hard-to-access zones. Atlas provides all the living and working infrastructure needed for these sites: accommodation, offices, laboratories, catering. Our modules are designed to withstand the most demanding environments while offering optimal comfort to teams.",
    challengeFr: "Les sites energetiques operent souvent dans des regions ou il n'existe aucune infrastructure. Les equipes doivent disposer d'installations completes - hebergement, restauration, bureaux, soins medicaux - dans des delais tres courts et des conditions climatiques extremes.",
    challengeEn: "Energy sites often operate in regions with no existing infrastructure. Teams need complete facilities - accommodation, catering, offices, medical care - within very tight deadlines and extreme climate conditions.",
  },
};

const allSectorKeys = ["prefab", "mining", "construction", "defense", "energy"];

export function SectorDetail({ sectorKey }: { sectorKey: string }) {
  const t = useTranslations("solutions");
  const nav = useTranslations("nav");
  const container = useRef<HTMLDivElement>(null);
  const data = sectors[sectorKey];
  const locale = useLocale() as "fr" | "en";

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".s-hero-label", { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(".s-hero-title", { y: 50, opacity: 0, duration: 0.9 }, 0.3);
    tl.from(".s-hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);

    gsap.from(".s-intro-img", {
      clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: ".s-intro", start: "top 70%" },
    });
    gsap.from(".s-intro-img img", {
      scale: 1.3, duration: 1.4, ease: "power3.out",
      scrollTrigger: { trigger: ".s-intro", start: "top 70%" },
    });
    gsap.from(".s-intro-text > *", {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-intro-text", start: "top 75%" },
    });

    gsap.from(".s-app", {
      y: 25, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".s-apps", start: "top 80%" },
    });

    gsap.from(".s-step", {
      x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".s-approach", start: "top 80%" },
    });

    gsap.from(".s-other", {
      y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-others", start: "top 85%" },
    });

    gsap.from(".s-ext-item", {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".s-exterior", start: "top 80%" },
    });

    // Kapi acilma animasyonu
    if (container.current?.querySelector(".s-door-section")) {
      const doorTl = gsap.timeline({
        scrollTrigger: { trigger: ".s-door-section", start: "top 60%" },
      });
      doorTl.from(".s-door-line", { scaleX: 0, transformOrigin: "center", duration: 0.5 });
      doorTl.from(".s-door-title", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.2);
      doorTl.from(".s-door-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.5);
      doorTl.to(".s-door-left", { xPercent: -100, duration: 1.2, ease: "power3.inOut" }, 1.2);
      doorTl.to(".s-door-right", { xPercent: 100, duration: 1.2, ease: "power3.inOut" }, 1.2);

      gsap.from(".s-int-item", {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".s-interior", start: "top 80%" },
      });
    }
  }, { scope: container });

  const otherSectors = allSectorKeys.filter((k) => k !== sectorKey);

  return (
    <div ref={container}>
      {/* ── Hero ── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={data.heroImage} alt={data.heroAlt} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none">
          <span className="font-[var(--font-heading)] font-black text-[400px] text-white leading-none">A</span>
        </div>
        <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="s-hero-label text-[12px] tracking-[0.3em] uppercase text-white/50 font-bold block">
              {t("title")}
            </span>
            <h1 className="s-hero-title font-[var(--font-heading)] text-[clamp(3rem,6vw,5.5rem)] font-black text-white mt-5 leading-[0.92] tracking-tighter max-w-[800px]">
              {t(`${sectorKey}.title`)}
            </h1>
            <div className="s-hero-line w-24 h-[3px] bg-atlas-red mt-8" />
          </div>
        </div>
      </section>
      <RedLineFill />

      {/* ── Intro - Asymmetric ── */}
      <section className="s-intro py-24 lg:py-36 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <div className="lg:col-span-7 lg:pr-16 s-intro-text">
              <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                {locale === "fr" ? "Le Defi" : "The Challenge"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2.25rem)] font-black text-atlas-charcoal mt-4 tracking-tight leading-tight">
                {locale === "fr" ? data.challengeFr : data.challengeEn}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-8 mb-8" />
              <p className="text-[17px] text-atlas-slate leading-[1.8] mb-8">
                {locale === "fr" ? data.introFr : data.introEn}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark text-white px-8 py-4 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {locale === "fr" ? "Demander un devis" : "Request a quote"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="s-intro-img relative aspect-[3/4] overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
                <Image
                  src={data.images[0].src}
                  alt={data.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RedLineFill />
      {/* ── Applications ── */}
      <section className="s-apps relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={data.images[1].src} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-atlas-charcoal/92" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                {locale === "fr" ? "Applications" : "Applications"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-4 tracking-tight leading-tight">
                {locale === "fr" ? "Ce que nous deployons" : "What we deploy"}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-6" />
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {data.applications.map((app, i) => (
                  <div key={i} className="s-app flex items-start gap-4 py-4 border-b border-white/10">
                    <span className="text-[13px] font-[var(--font-heading)] font-bold text-atlas-red mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[16px] text-white/80 leading-relaxed">
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
      <section className="s-exterior bg-white">
        <RedLineFill />
        <div className="text-center py-20 lg:py-24">
          <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
            {t(`${sectorKey}.title`)}
          </span>
          <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-3 tracking-tight">
            {locale === "fr" ? "Galerie" : "Gallery"}
          </h2>
          <div className="w-16 h-[3px] bg-atlas-red mt-6 mx-auto" />
        </div>
        <div className={`grid ${data.images.length <= 3 ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`} style={{ gap: 0 }}>
          {data.images.slice(0, Math.min(data.images.length, 4)).map((img, i) => (
            <div key={i} className="s-ext-item relative aspect-square overflow-hidden group">
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes={data.images.length <= 3 ? "33vw" : "25vw"} />
            </div>
          ))}
        </div>
        {data.images.length > 4 && (
          <div className="grid grid-cols-3 lg:grid-cols-6" style={{ gap: 0 }}>
            {data.images.slice(4).map((img, i) => (
              <div key={i} className="s-ext-item relative aspect-square overflow-hidden group">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="16vw" />
              </div>
            ))}
          </div>
        )}
      </section>
      <RedLineFill />

      {/* ── Interior Experience ── */}
      {data.interiorImages && data.interiorImages.length > 0 && (
        <>
          {/* Kapi gecisi - tam ekran */}
          <section className="s-door-section relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
            {/* Mesaj */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
              <div className="s-door-line w-20 h-[3px] bg-atlas-red mx-auto mb-8" />
              <h2 className="s-door-title font-[var(--font-heading)] text-[clamp(2rem,5vw,4rem)] font-black text-white tracking-tighter text-center">
                {locale === "fr" ? "Entrez a l'interieur" : "Step inside"}
              </h2>
              <p className="s-door-sub text-[18px] text-white/40 mt-5 max-w-[420px] mx-auto text-center">
                {locale === "fr"
                  ? "Decouvrez la qualite de nos finitions interieures"
                  : "Discover the quality of our interior finishes"}
              </p>
            </div>
            {/* Sol kapi */}
            <div className="s-door-left absolute top-0 left-0 w-1/2 h-full z-10 overflow-hidden">
              <Image
                src={data.interiorImages[0].src}
                alt={data.interiorImages[0].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            {/* Sag kapi */}
            <div className="s-door-right absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden">
              <Image
                src={data.interiorImages[1].src}
                alt={data.interiorImages[1].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          </section>

          {/* Ic mekan galeri */}
          <section className="s-interior bg-atlas-charcoal">
            <div className="grid grid-cols-2 lg:grid-cols-5" style={{ gap: 0 }}>
              {data.interiorImages.slice(2).map((img, i) => (
                <div key={i} className="s-int-item relative aspect-square overflow-hidden group">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="20vw" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Approach ── */}
      <section className="s-approach py-24 lg:py-32 bg-atlas-sand">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                {locale === "fr" ? "Notre Approche" : "Our Approach"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal mt-4 tracking-tight leading-tight">
                {locale === "fr" ? "Du premier contact a la livraison" : "From first contact to delivery"}
              </h2>
              <div className="w-16 h-[3px] bg-atlas-red mt-6 mb-8" />
              <p className="text-[16px] text-atlas-slate leading-relaxed">
                {locale === "fr"
                  ? "Chaque projet est unique. Notre processus s'adapte a vos contraintes specifiques pour garantir une livraison dans les delais et conforme a vos exigences."
                  : "Every project is unique. Our process adapts to your specific constraints to guarantee on-time delivery that meets your requirements."}
              </p>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <div className="space-y-0">
                {data.approach.map((step, i) => (
                  <div
                    key={i}
                    className={`s-step flex items-start gap-6 py-7 ${
                      i < data.approach.length - 1 ? "border-b border-atlas-charcoal/10" : ""
                    }`}
                  >
                    <div className="w-14 h-14 bg-atlas-red flex items-center justify-center shrink-0">
                      <span className="font-[var(--font-heading)] font-black text-[20px] text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="pt-2">
                      <span className="text-[17px] text-atlas-charcoal font-medium leading-relaxed">
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
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/cta-bg.webp" alt="Atlas Batiment Modulaire - conception projet" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-atlas-red/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[12px] tracking-[0.3em] uppercase text-white/70 font-bold block">
                {locale === "fr" ? "Votre Projet" : "Your Project"}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-black text-white mt-4 tracking-tight leading-[1.05]">
                {locale === "fr" ? "Parlons de votre projet" : "Let's talk about your project"}
              </h2>
              <div className="w-16 h-[3px] bg-white mt-8 mb-8" />
              <p className="text-[17px] text-white/70 leading-relaxed mb-10 max-w-[480px]">
                {locale === "fr"
                  ? "Nos experts sont a votre disposition pour etudier vos besoins et vous proposer une solution sur mesure."
                  : "Our experts are available to study your needs and propose a tailored solution."}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-atlas-red hover:bg-white/90 px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
              >
                {locale === "fr" ? "Demander un Devis" : "Request a Quote"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-5 p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-atlas-red flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-1">
                    {locale === "fr" ? "Telephone" : "Phone"}
                  </span>
                  <span className="text-[18px] text-white font-bold">+32 490 XX XX XX</span>
                </div>
              </div>
              <div className="flex items-center gap-5 p-6 bg-atlas-charcoal/80 backdrop-blur-sm">
                <div className="w-12 h-12 bg-atlas-red flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[12px] text-white/40 uppercase tracking-wider font-medium block mb-1">
                    Email
                  </span>
                  <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[18px] text-white font-bold hover:text-white/80 transition-colors">
                    atlasbatimodulaire@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Sectors ── */}
      <section className="s-others py-24 lg:py-32 bg-atlas-charcoal">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                {t("title")}
              </span>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-white mt-3 tracking-tight">
                {locale === "fr" ? "Autres Secteurs" : "Other Sectors"}
              </h2>
            </div>
            <div className="hidden sm:block w-16 h-[3px] bg-atlas-red mb-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[var(--font-heading)] font-bold text-[18px] text-white tracking-tight leading-snug">
                    {t(`${sk}.title`)}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-white/50 mt-3 group-hover:text-atlas-red transition-colors font-medium uppercase tracking-wider">
                    {locale === "fr" ? "Decouvrir" : "Discover"}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
