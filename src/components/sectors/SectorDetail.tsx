"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  ArrowRightLeft,
  Bath,
  BedDouble,
  Bolt,
  Briefcase,
  Building2,
  ClipboardList,
  ChevronRight,
  CloudSun,
  HardHat,
  HeartPulse,
  Hotel,
  House,
  KeyRound,
  MonitorSpeaker,
  Package,
  RadioTower,
  DraftingCompass,
  Factory,
  FileLock,
  FileSearch,
  GitBranch,
  GraduationCap,
  Leaf,
  Mail,
  Map,
  Phone,
  Radar,
  Route,
  SatelliteDish,
  Shield,
  ShieldCheck,
  ShieldCog,
  Stethoscope,
  Tent,
  Truck,
  type LucideIcon,
  Users,
  UtensilsCrossed,
  Warehouse,
  Workflow,
  Zap,
  BrickWallShield,
} from "lucide-react";
import { containers, prefab, mining as miningImages, defense as defenseImages, heroes, sectorImages } from "@/lib/images";

type StepIcon = LucideIcon;

interface SectorContent {
  heroImage: string;
  heroAlt: string;
  images: { src: string; alt: string }[];
  interiorImages?: { src: string; alt: string }[];
  applications: { fr: string; en: string; icon: StepIcon }[];
  approach: { fr: string; en: string; icon: StepIcon }[];
  introFr: string;
  introEn: string;
  challengeFr: string;
  challengeEn: string;
}

const sectors: Record<string, SectorContent> = {
  prefab: {
    heroImage: sectorImages.prefab,
    heroAlt: "Container préfabriqué modulaire Atlas Bâtiment Modulaire",
    images: [
      { src: "/images/home/showcase/07.webp", alt: "Conteneur préfabriqué - vue extérieure" },
      ...prefab.exterior.slice(1).map((src, i) => ({
        src,
        alt: [
          "Bâtiment modulaire préfabriqué Atlas",
          "Conteneurs modulaires sur site",
          "Installation conteneurs préfabriqués",
          "Conteneurs livrés sur chantier",
          "Assemblage modulaire extérieur",
          "Conteneur préfabriqué terminé",
          "Vue extérieure camp modulaire",
          "Conteneurs préfabriqués alignés",
          "Projet conteneur préfabriqué Atlas",
        ][i] || "Conteneur préfabriqué Atlas",
      })),
    ],
    interiorImages: prefab.interior.map((src, i) => ({
      src,
      alt: [
        "Intérieur conteneur préfabriqué - aménagement",
        "Intérieur conteneur - espace de vie",
        "Intérieur conteneur - finitions qualité",
        "Intérieur conteneur - cuisine équipée",
        "Intérieur conteneur - chambre",
        "Intérieur conteneur - salle de bain",
        "Intérieur conteneur - détails finition",
      ][i] || "Intérieur conteneur préfabriqué",
    })),
    applications: [
      { fr: "Bureaux modulaires temporaires et permanents", en: "Temporary and permanent modular offices", icon: Briefcase },
      { fr: "Logements ouvriers et camps de vie", en: "Worker housing and living camps", icon: House },
      { fr: "Cliniques et centres médicaux mobiles", en: "Mobile clinics and medical centers", icon: HeartPulse },
      { fr: "Salles de classe et bâtiments scolaires", en: "Classrooms and school buildings", icon: GraduationCap },
      { fr: "Sanitaires et blocs vestiaires", en: "Sanitation blocks and changing rooms", icon: Bath },
      { fr: "Réfectoires et cuisines industrielles", en: "Canteens and industrial kitchens", icon: UtensilsCrossed },
    ],
    approach: [
      { fr: "Analyse des besoins et conception sur mesure", en: "Needs analysis and custom design", icon: DraftingCompass },
      { fr: "Production automatisée en environnement contrôlé", en: "Automated production in controlled environment", icon: Factory },
      { fr: "Tests qualité et conformité aux normes", en: "Quality testing and standards compliance", icon: ShieldCheck },
      { fr: "Logistique internationale et livraison sur site", en: "International logistics and on-site delivery", icon: Truck },
    ],
    introFr: "Nos conteneurs préfabriqués sont conçus et fabriqués dans notre usine de production ultramoderne. Chaque unité est assemblée avec précision sur des lignes de rollformage entièrement automatiques, garantissant une qualité constante et une durabilité exceptionnelle. Du bureau de chantier au logement complet, nous livrons des solutions clé en main adaptées aux exigences les plus strictes.",
    introEn: "Our prefabricated containers are designed and manufactured in our state-of-the-art production facility. Each unit is precision-assembled on fully automatic rollforming lines, ensuring consistent quality and exceptional durability. From site offices to complete housing, we deliver turnkey solutions tailored to the most demanding requirements.",
    challengeFr: "Les projets modernes exigent rapidité, flexibilité et qualité sans compromis. La construction traditionnelle ne peut pas toujours répondre à ces contraintes. Nos conteneurs préfabriqués éliminent les aléas du chantier en transférant 90% du travail en usine.",
    challengeEn: "Modern projects demand speed, flexibility, and uncompromising quality. Traditional construction cannot always meet these constraints. Our prefabricated containers eliminate on-site uncertainties by transferring 90% of work to the factory.",
  },
  mining: {
    heroImage: sectorImages.mining,
    heroAlt: "Camp minier modulaire déploiement rapide Atlas",
    images: [
      { src: "/images/sectors/mining/mining-challenge.webp", alt: "Camp minier Atlas - vue aérienne avec hangar et modules en montage" },
      ...miningImages.gallery.map((src, i) => ({
      src,
      alt: [
        "Camp minier modulaire - vue générale",
        "Installation camp minier sur site",
        "Modules d'hébergement camp minier",
        "Infrastructure camp minier",
        "Bâtiments modulaires site minier",
        "Camp minier opérationnel",
        "Hébergement équipes minières",
        "Installations camp minier",
        "Vue aérienne camp minier",
        "Camp minier Atlas complet",
      ][i] || "Camp minier Atlas",
    }))],
    applications: [
      { fr: "Camps d'hébergement 50 à 2000 personnes", en: "Accommodation camps for 50 to 2000 people", icon: Tent },
      { fr: "Réfectoires et cuisines industrielles", en: "Canteens and industrial kitchens", icon: UtensilsCrossed },
      { fr: "Infirmeries et postes de premiers secours", en: "Infirmaries and first aid stations", icon: Stethoscope },
      { fr: "Bureaux administratifs et salles de réunion", en: "Administrative offices and meeting rooms", icon: Building2 },
      { fr: "Laveries et blocs sanitaires", en: "Laundry facilities and sanitation blocks", icon: Bath },
      { fr: "Zones de loisirs et espaces de détente", en: "Recreation areas and relaxation spaces", icon: Users },
    ],
    approach: [
      { fr: "Étude topographique et plan d'implantation", en: "Topographic study and site plan", icon: Map },
      { fr: "Conception adaptée aux conditions climatiques locales", en: "Design adapted to local climate conditions", icon: CloudSun },
      { fr: "Préfabrication complète en usine", en: "Complete factory prefabrication", icon: Factory },
      { fr: "Déploiement rapide et mise en service opérationnelle", en: "Rapid deployment and operational commissioning", icon: Route },
    ],
    introFr: "L'exploitation minière exige des infrastructures fiables dans des environnements souvent isolés et hostiles. Atlas déploie des camps modulaires complets - de l'hébergement à la restauration, des bureaux aux installations médicales - capables de fonctionner de manière autonome dans les conditions les plus extrêmes. Nos solutions sont conçues pour être démontées et redéployées au fil des phases d'exploitation.",
    introEn: "Mining operations demand reliable infrastructure in often isolated and hostile environments. Atlas deploys complete modular camps - from accommodation to catering, offices to medical facilities - capable of autonomous operation in the most extreme conditions. Our solutions are designed to be dismantled and redeployed as extraction phases evolve.",
    challengeFr: "Les sites miniers sont souvent situés dans des zones reculées, sans infrastructure existante. Les équipes doivent être logées, nourries et soignées sur place, dans le respect des normes de sécurité les plus strictes, et ce en un minimum de temps.",
    challengeEn: "Mining sites are often located in remote areas with no existing infrastructure. Teams must be housed, fed, and cared for on-site, in compliance with the strictest safety standards, all within minimal timeframes.",
  },
  construction: {
    heroImage: sectorImages.construction,
    heroAlt: "Camp de construction modulaire pour grands chantiers",
    images: [
      { src: containers.assembly2, alt: "Montage rapide camp de chantier" },
      { src: containers.interior1, alt: "Intérieur bureau de chantier" },
      { src: "/images/sectors/construction/9.webp", alt: "Base vie modulaire de chantier Atlas" },
    ],
    applications: [
      { fr: "Bureaux de direction et de supervision de chantier", en: "Site management and supervision offices", icon: HardHat },
      { fr: "Vestiaires et sanitaires aux normes BTP", en: "Changing rooms and sanitation to construction standards", icon: Bath },
      { fr: "Réfectoires et espaces de repos", en: "Canteens and rest areas", icon: UtensilsCrossed },
      { fr: "Postes de garde et contrôle d'accès", en: "Guard posts and access control", icon: KeyRound },
      { fr: "Ateliers et magasins de stockage", en: "Workshops and storage facilities", icon: Warehouse },
      { fr: "Salles de formation et de briefing sécurité", en: "Training and safety briefing rooms", icon: ClipboardList },
    ],
    approach: [
      { fr: "Visite technique et évaluation du chantier", en: "Technical visit and site evaluation", icon: FileSearch },
      { fr: "Plan d'aménagement optimisé selon les flux", en: "Layout plan optimized for workflow", icon: Workflow },
      { fr: "Livraison et installation clé en main", en: "Turnkey delivery and installation", icon: Truck },
      { fr: "Démontage et transfert vers le prochain chantier", en: "Dismantling and transfer to next site", icon: ArrowRightLeft },
    ],
    introFr: "Les grands chantiers d'infrastructure - autoroutes, barrages, lignes ferroviaires - nécessitent des bases de vie fonctionnelles dès le premier jour. Atlas fournit des installations modulaires qui s'adaptent à la progression du chantier : elles se déploient rapidement, se reconfigurent selon les besoins et se démontent pour le prochain projet sans perte de valeur.",
    introEn: "Major infrastructure projects - highways, dams, railways - require functional living bases from day one. Atlas provides modular facilities that adapt to site progression: they deploy quickly, reconfigure as needed, and dismantle for the next project without loss of value.",
    challengeFr: "Un chantier de construction évolue constamment. Les effectifs varient, les besoins changent, et les installations doivent suivre le rythme. La flexibilité et la rapidité de déploiement sont essentielles pour maintenir la productivité.",
    challengeEn: "A construction site constantly evolves. Headcounts vary, needs change, and facilities must keep pace. Flexibility and speed of deployment are essential to maintaining productivity.",
  },
  defense: {
    heroImage: defenseImages.hero,
    heroAlt: "Base militaire modulaire Atlas Bâtiment Modulaire",
    images: [
      { src: "/images/sectors/defense/defense-challenge.webp", alt: "Charpente acier modulaire pour base militaire en assemblage rapide" },
      ...defenseImages.gallery.map((src, i) => ({
        src,
        alt: [
          "Installation modulaire base militaire",
          "Structures défense déployées sur site",
          "Camp militaire modulaire opérationnel",
        ][i] || "Installation défense Atlas",
      })),
    ],
    applications: [
      { fr: "Postes de commandement et centres opérationnels", en: "Command posts and operational centers", icon: Shield },
      { fr: "Casernements et quartiers d'hébergement", en: "Barracks and accommodation quarters", icon: BedDouble },
      { fr: "Hôpitaux de campagne et infirmeries", en: "Field hospitals and infirmaries", icon: Stethoscope },
      { fr: "Centres de communication et de renseignement", en: "Communication and intelligence centers", icon: RadioTower },
      { fr: "Dépôts logistiques et ateliers de maintenance", en: "Logistics depots and maintenance workshops", icon: Package },
      { fr: "Postes de contrôle et tours d'observation", en: "Checkpoints and observation towers", icon: SatelliteDish },
    ],
    approach: [
      { fr: "Consultation confidentielle et cahier des charges", en: "Confidential consultation and specifications", icon: FileLock },
      { fr: "Conception renforcée selon spécifications militaires", en: "Reinforced design per military specifications", icon: BrickWallShield },
      { fr: "Production sécurisée et tests rigoureux", en: "Secure production and rigorous testing", icon: ShieldCog },
      { fr: "Déploiement discret et mise en service rapide", en: "Discreet deployment and rapid commissioning", icon: Radar },
    ],
    introFr: "Le secteur de la défense impose des exigences sans équivalentes : résistance structurelle, déployabilité rapide, autonomie complète et confidentialité absolue. Atlas conçoit des structures modulaires renforcées qui répondent aux spécifications militaires les plus strictes, tout en maintenant la flexibilité nécessaire aux opérations de terrain. Chaque projet est traité avec la plus haute discrétion.",
    introEn: "The defense sector imposes unmatched requirements: structural resistance, rapid deployability, complete autonomy, and absolute confidentiality. Atlas designs reinforced modular structures meeting the strictest military specifications while maintaining the flexibility needed for field operations. Every project is handled with the highest discretion.",
    challengeFr: "Les forces armées ont besoin d'infrastructures opérationnelles en quelques heures, pas en quelques mois. Ces structures doivent résister aux conditions extrêmes, fonctionner de manière autonome et pouvoir être redéployées sans préavis.",
    challengeEn: "Armed forces need operational infrastructure in hours, not months. These structures must withstand extreme conditions, operate autonomously, and be redeployable without notice.",
  },
  energy: {
    heroImage: containers.portContainers,
    heroAlt: "Installations modulaires pour projets énergétiques internationaux",
    images: [
      { src: "/images/sectors/energy/ener.webp", alt: "Base vie modulaire pour projet énergétique Atlas" },
      { src: "/images/sectors/energy/ener.webp", alt: "Base vie modulaire pour projet énergétique Atlas" },
      { src: containers.finished1, alt: "Modules énergétiques terminés" },
      { src: containers.transport1, alt: "Transport installations énergétiques" },
    ],
    applications: [
      { fr: "Camps modulaires pour sites miniers et énergétiques", en: "Modular camps for mining and energy sites", icon: Tent },
      { fr: "Bases vie pour projets industriels en zones isolées", en: "Living bases for industrial projects in remote areas", icon: Hotel },
      { fr: "Centres techniques et salles de formation", en: "Technical centers and training rooms", icon: MonitorSpeaker },
      { fr: "Hébergement modulaire pour équipes terrain", en: "Modular accommodation for field teams", icon: BedDouble },
      { fr: "Solutions modulaires pour logistique et stockage", en: "Modular solutions for logistics and storage", icon: Warehouse },
      { fr: "Bureaux modulaires et centres opérationnels", en: "Modular offices and operational centers", icon: Bolt },
    ],
    approach: [
      { fr: "Analyse environnementale et contraintes du site", en: "Environmental analysis and site constraints", icon: Leaf },
      { fr: "Ingénierie adaptée aux normes du secteur énergétique", en: "Engineering adapted to energy sector standards", icon: Zap },
      { fr: "Fabrication et pré-assemblage en usine", en: "Factory manufacturing and pre-assembly", icon: Factory },
      { fr: "Installation et raccordement sur site isolé", en: "Installation and connection on remote sites", icon: GitBranch },
    ],
    introFr: "Les projets énergétiques - solaire, éolien, pétrole, gaz - se déploient dans des zones souvent isolées et difficiles d'accès. Atlas fournit l'ensemble des infrastructures de vie et de travail nécessaires au fonctionnement de ces sites : hébergement, bureaux, laboratoires, restauration. Nos modules sont conçus pour résister aux environnements les plus exigeants tout en offrant un confort optimal aux équipes.",
    introEn: "Energy projects - solar, wind, oil, gas - deploy in often isolated and hard-to-access zones. Atlas provides all the living and working infrastructure needed for these sites: accommodation, offices, laboratories, catering. Our modules are designed to withstand the most demanding environments while offering optimal comfort to teams.",
    challengeFr: "En Guinée, les sites énergétiques et miniers sont souvent situés dans des zones isolées, sans infrastructure existante. Les équipes doivent disposer rapidement d'installations complètes – hébergement, restauration, bureaux et services médicaux – capables de résister aux conditions climatiques locales, notamment la chaleur, l'humidité et les fortes pluies.",
    challengeEn: "Energy sites often operate in regions with no existing infrastructure. Teams need complete facilities - accommodation, catering, offices, medical care - within very tight deadlines and extreme climate conditions.",
  },
};

const allSectorKeys = ["prefab", "mining", "construction", "defense", "energy"];

const sectorSeoContent = {
  prefab: {
    fr: [
      {
        label: "Conteneur Préfabriqué en Guinée",
        title: "Des bâtiments préfabriqués pensés pour Conakry, Kankan et les bases vie en Afrique de l'Ouest",
        body: "Atlas conçoit et fabrique des conteneurs préfabriqués destinés aux bureaux de chantier, logements ouvriers, salles de classe, cliniques mobiles et bases de vie temporaires ou permanentes. Depuis la Guinée, nos équipes accompagnent les projets à Maneah, Conakry, Kankan et sur les sites isolés qui ont besoin d'une solution rapide, durable et immédiatement exploitable.",
        bullets: [
          "Déploiement adapté aux chantiers, camps de vie et plateformes industrielles en Guinée",
          "Structures modulaires prêtes à l'emploi pour bureaux, hébergement, sanitaires et restauration",
          "Accompagnement local pour les projets opérés depuis Conakry, Kankan et l'Afrique de l'Ouest",
        ],
      },
      {
        label: "Bureaux, logements et bases vie modulaires",
        title: "Une solution modulaire complète pour bureaux préfabriqués, logements ouvriers et services essentiels",
        body: "Nos unités préfabriquées permettent de regrouper en un seul système les espaces de travail, d'hébergement et de services. Cette logique réduit les délais sur site, sécurise la qualité des finitions et répond aux besoins réels des entreprises de construction, des opérateurs miniers et des projets énergétiques installés en Guinée.",
        bullets: [
          "Bureaux modulaires temporaires et permanents pour le pilotage opérationnel sur site",
          "Logements ouvriers, vestiaires et blocs sanitaires conçus pour l'usage quotidien",
          "Cliniques, salles de classe et cuisines industrielles intégrables dans une même base modulaire",
        ],
      },
    ],
    en: [
      {
        label: "Prefabricated Containers in Guinea",
        title: "Prefabricated buildings designed for Conakry, Kankan, and West African project sites",
        body: "Atlas designs and manufactures prefabricated container buildings for site offices, worker accommodation, classrooms, mobile clinics, and temporary or permanent living bases. From Guinea, our teams support projects in Maneah, Conakry, Kankan, and remote operational zones that need a fast, durable, and ready-to-use modular solution.",
        bullets: [
          "Deployment adapted to construction sites, living camps, and industrial bases in Guinea",
          "Ready-to-use modular structures for offices, accommodation, sanitation, and catering",
          "Local support for projects operated from Conakry, Kankan, and across West Africa",
        ],
      },
      {
        label: "Modular offices and worker housing",
        title: "A complete modular system for prefabricated offices, worker housing, and essential on-site services",
        body: "Our prefabricated units bring workspaces, accommodation, and daily-use facilities into one coherent system. That approach shortens on-site schedules, secures finish quality, and answers the real needs of construction companies, mining operators, and energy projects working in Guinea.",
        bullets: [
          "Temporary and permanent modular offices for on-site management and supervision",
          "Worker housing, changing rooms, and sanitation blocks built for daily operational use",
          "Clinics, classrooms, and industrial kitchens integrated into the same modular base",
        ],
      },
    ],
  },
  mining: {
    fr: [
      {
        label: "Camp Minier Modulaire",
        title: "Des camps miniers déployés pour la Guinée, l'Afrique de l'Ouest et les sites d'extraction isolés",
        body: "Atlas développe des camps miniers modulaires conçus pour l'hébergement, la restauration, l'administration et les services médicaux des équipes terrain. Depuis la Guinée, nous accompagnons les opérateurs miniers qui doivent ouvrir rapidement des bases vie fiables dans des zones reculées, humides ou difficiles d'accès.",
        bullets: [
          "Camps d'hébergement modulaires pour équipes minières de courte ou longue durée",
          "Bureaux, réfectoires, infirmeries et sanitaires regroupés dans une base de vie cohérente",
          "Solutions redéployables pour les phases successives d'extraction et d'exploration",
        ],
      },
      {
        label: "Infrastructure de vie pour exploitation minière",
        title: "Une base vie complète pour loger, nourrir et sécuriser les équipes sur site minier",
        body: "Nos structures modulaires minières répondent aux contraintes d'autonomie, de sécurité et de rapidité d'exécution. Elles permettent de mettre en service un camp opérationnel sans dépendre d'une infrastructure lourde, tout en gardant une qualité de finition stable d'un site à l'autre.",
        bullets: [
          "Déploiement adapté aux mines d'or, de bauxite et aux zones d'exploitation éloignées",
          "Confort thermique, maintenance simple et circulation optimisée à l'échelle du camp",
          "Production en usine et logistique terrain pour réduire fortement les délais d'ouverture",
        ],
      },
    ],
    en: [
      {
        label: "Modular Mining Camps",
        title: "Mining camps deployed for Guinea, West Africa, and remote extraction sites",
        body: "Atlas develops modular mining camps designed for accommodation, catering, administration, and medical support for field teams. From Guinea, we support mining operators that need to open reliable living bases quickly in remote, humid, or hard-to-access locations.",
        bullets: [
          "Modular accommodation camps for short-term and long-term mining crews",
          "Offices, canteens, infirmaries, and sanitation blocks integrated into one living base",
          "Redeployable solutions for successive extraction and exploration phases",
        ],
      },
      {
        label: "Life support infrastructure for mining operations",
        title: "A complete living base to house, feed, and protect teams on mining sites",
        body: "Our modular mining structures answer autonomy, safety, and execution-speed constraints. They make it possible to commission an operational camp without relying on heavy site infrastructure while keeping finish quality consistent from one project site to another.",
        bullets: [
          "Deployment adapted to gold, bauxite, and remote extraction operations",
          "Thermal comfort, simple maintenance, and optimized camp circulation",
          "Factory production and field logistics to sharply reduce opening timelines",
        ],
      },
    ],
  },
  construction: {
    fr: [
      {
        label: "Camp Construction Modulaire",
        title: "Des camps de chantier conçus pour les grands travaux, bases vie et infrastructures temporaires",
        body: "Atlas fournit des camps de construction modulaires pour les entreprises qui doivent piloter des chantiers évolutifs avec des effectifs variables. Nos modules couvrent les bureaux de supervision, les vestiaires, la restauration, les ateliers et les zones de contrôle nécessaires au bon fonctionnement d'un grand projet.",
        bullets: [
          "Bureaux de chantier, espaces de repos et sanitaires conformes aux besoins du BTP",
          "Structures démontables et transférables d'un projet à l'autre sans perte d'usage",
          "Organisation modulaire adaptée aux autoroutes, barrages, ponts et grands travaux",
        ],
      },
      {
        label: "Bases vie pour chantiers et travaux publics",
        title: "Une implantation modulaire pensée pour suivre le rythme réel des chantiers",
        body: "Les besoins d'un chantier changent vite. C'est pourquoi nos bases vie de construction sont pensées pour être installées rapidement, reconfigurées facilement et maintenues en service sur toute la durée du projet. Cette logique permet de garder les équipes opérationnelles dans de bonnes conditions de travail.",
        bullets: [
          "Circulation optimisée entre zones de travail, d'hébergement, de stockage et de sécurité",
          "Déploiement rapide pour démarrage de chantier ou extension de base existante",
          "Solution adaptée aux projets civils, industriels et logistiques en Afrique de l'Ouest",
        ],
      },
    ],
    en: [
      {
        label: "Modular Construction Camps",
        title: "Construction camps designed for major works, living bases, and temporary site infrastructure",
        body: "Atlas supplies modular construction camps for contractors that need to manage evolving worksites with changing team sizes. Our modules cover supervision offices, changing rooms, catering, workshops, and control areas needed to keep a large project site running efficiently.",
        bullets: [
          "Site offices, rest areas, and sanitation blocks tailored to construction needs",
          "Structures that can be dismantled and transferred from one project to the next",
          "Modular organization adapted to highways, dams, bridges, and major works",
        ],
      },
      {
        label: "Living bases for construction and public works",
        title: "A modular layout designed to follow the real rhythm of construction sites",
        body: "Construction needs change quickly. That is why our modular living bases are built to be installed fast, reconfigured easily, and kept operational throughout the life of the project. This approach helps keep teams productive in strong working conditions.",
        bullets: [
          "Optimized flow between work areas, accommodation, storage, and safety zones",
          "Fast deployment for site launch or expansion of an existing base",
          "Suitable for civil, industrial, and logistics projects across West Africa",
        ],
      },
    ],
  },
  defense: {
    fr: [
      {
        label: "Infrastructure modulaire pour la défense",
        title: "Des structures modulaires renforcées pour bases militaires, centres opérationnels et déploiements rapides",
        body: "Atlas conçoit des bâtiments modulaires destinés au secteur de la défense, avec une attention portée à la résistance structurelle, à la confidentialité et à la rapidité de déploiement. Nos solutions couvrent les postes de commandement, l'hébergement, les centres de communication et les zones logistiques.",
        bullets: [
          "Conception renforcée pour besoins militaires, sécuritaires et gouvernementaux",
          "Déploiement rapide de postes de commandement, casernements et ateliers techniques",
          "Approche discrète pour bases temporaires, zones de contrôle et opérations sensibles",
        ],
      },
      {
        label: "Bases de défense et installations tactiques",
        title: "Une solution modulaire pensée pour la continuité opérationnelle et la mobilité terrain",
        body: "Dans les contextes de défense, la vitesse de mise en service et la capacité de redéploiement sont déterminantes. Nos modules permettent de créer une infrastructure autonome, robuste et adaptable, tout en gardant une logique de production maîtrisée et de maintenance simplifiée.",
        bullets: [
          "Bâtiments modulaires pour quartiers d'hébergement, infirmeries et dépôts logistiques",
          "Structure adaptée aux environnements contraints et aux interventions de courte échéance",
          "Production sécurisée avec configuration sur mesure selon le niveau d'exigence du site",
        ],
      },
    ],
    en: [
      {
        label: "Modular infrastructure for defense",
        title: "Reinforced modular structures for military bases, operational centers, and rapid deployment",
        body: "Atlas designs modular buildings for the defense sector with a strong focus on structural resistance, confidentiality, and deployment speed. Our solutions cover command posts, accommodation, communication centers, and logistics areas.",
        bullets: [
          "Reinforced design for military, security, and government requirements",
          "Fast deployment of command posts, barracks, and technical workshops",
          "Discreet approach for temporary bases, control areas, and sensitive operations",
        ],
      },
      {
        label: "Defense bases and tactical facilities",
        title: "A modular solution built for operational continuity and field mobility",
        body: "In defense contexts, commissioning speed and redeployment capacity are decisive. Our modules make it possible to create autonomous, durable, and adaptable infrastructure while keeping production controlled and maintenance straightforward.",
        bullets: [
          "Modular buildings for accommodation quarters, infirmaries, and logistics depots",
          "Structures suited to constrained environments and short-notice interventions",
          "Secure production with project-specific configuration based on site requirements",
        ],
      },
    ],
  },
  energy: {
    fr: [
      {
        label: "Installations modulaires pour projets énergétiques",
        title: "Des bases modulaires pour projets solaires, pétroliers, gaziers et sites énergétiques isolés",
        body: "Atlas accompagne les projets énergétiques qui doivent installer rapidement des équipes dans des zones sans infrastructure existante. Nos modules couvrent l'hébergement, les bureaux, les espaces techniques, les services de restauration et les zones de support nécessaires à la continuité de l'exploitation.",
        bullets: [
          "Bases vie modulaires pour projets énergétiques, miniers et industriels en zone isolée",
          "Logements, bureaux et services essentiels regroupés dans une infrastructure cohérente",
          "Structures adaptées à la chaleur, à l'humidité et aux conditions de terrain exigeantes",
        ],
      },
      {
        label: "Camps énergétiques et centres opérationnels",
        title: "Une solution modulaire complète pour maintenir les équipes opérationnelles sur site",
        body: "Qu'il s'agisse d'un projet solaire, d'une base logistique pétrolière ou d'un site technique éloigné, nos bâtiments modulaires énergétiques sont pensés pour être robustes, rapides à installer et simples à exploiter. Cette approche réduit les délais d'ouverture et améliore la qualité de vie des équipes terrain.",
        bullets: [
          "Déploiement rapide pour camps de techniciens, centres de formation et bureaux modulaires",
          "Production en usine et pré-assemblage pour limiter les aléas sur site",
          "Accompagnement adapté aux projets opérés en Guinée et dans le reste de l'Afrique de l'Ouest",
        ],
      },
    ],
    en: [
      {
        label: "Modular facilities for energy projects",
        title: "Modular living bases for solar, oil, gas, and remote energy project sites",
        body: "Atlas supports energy projects that need to install teams quickly in areas with no existing infrastructure. Our modules cover accommodation, offices, technical rooms, catering services, and support spaces required to keep operations running continuously.",
        bullets: [
          "Modular living bases for energy, mining, and industrial projects in remote zones",
          "Accommodation, offices, and essential services integrated into one coherent setup",
          "Structures adapted to heat, humidity, and demanding field conditions",
        ],
      },
      {
        label: "Energy camps and operational centers",
        title: "A complete modular solution to keep field teams operational on site",
        body: "Whether the project is solar, oil and gas, or a remote technical base, our modular energy buildings are designed to be durable, fast to install, and simple to operate. This approach reduces opening delays and improves day-to-day conditions for field teams.",
        bullets: [
          "Fast deployment for technician camps, training centers, and modular offices",
          "Factory production and pre-assembly to reduce on-site uncertainty",
          "Support adapted to projects operated in Guinea and across West Africa",
        ],
      },
    ],
  },
} as const;

export function SectorDetail({ sectorKey }: { sectorKey: string }) {
  const t = useTranslations("solutions");
  const data = sectors[sectorKey];
  const locale = useLocale() as "fr" | "en";
  const hasInterior = data.interiorImages && data.interiorImages.length > 0;
  const seoSections = sectorSeoContent[sectorKey as keyof typeof sectorSeoContent][locale].map((section, index) => ({
    ...section,
    image: index === 0 ? data.images[Math.min(1, data.images.length - 1)] : hasInterior
      ? data.interiorImages![Math.min(3, data.interiorImages!.length - 1)]
      : data.images[Math.min(2, data.images.length - 1)],
  }));

  const otherSectors = allSectorKeys.filter((k) => k !== sectorKey);

  return (
    <div className="bg-white pt-20">
      <div>
        {/* ── Hero ── */}
        <section className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden">
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
        <section className="s-intro relative overflow-hidden bg-white py-20 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:py-28">
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
        <section className="s-apps relative overflow-hidden bg-atlas-charcoal py-20 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:py-28">
          <div className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,2.05fr)] gap-10 xl:gap-12 2xl:gap-16 items-start">
              <div className="max-w-[34rem] xl:pt-4">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Applications" : "Applications"}
                </span>
                <h2 className="max-w-[12ch] font-[var(--font-heading)] text-[clamp(2.2rem,4.5vw,4.6rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-[0.92]">
                  {locale === "fr" ? "Ce que nous déployons" : "What we deploy"}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-5 sm:mt-7 mb-6 sm:mb-9" />
                <p className="max-w-[29rem] text-[17px] xl:text-[1.24rem] text-white/62 leading-[1.8] text-pretty">
                  {locale === "fr"
                    ? "Des infrastructures modulaires pensées pour les usages réels du terrain, avec une logique de déploiement rapide, de confort opérationnel et de maintenance simplifiée."
                    : "Modular infrastructure designed around real on-site use, with rapid deployment, operational comfort, and simplified maintenance in mind."}
                </p>
              </div>
              <div className="xl:pl-4 2xl:pl-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
                  {data.applications.map((app, i) => {
                    const Icon = app.icon;

                    return (
                      <div key={i} className="s-app group relative min-w-0">
                        <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 rounded-[56px] bg-[radial-gradient(circle_at_50%_50%,rgba(196,30,58,0.22),rgba(196,30,58,0.1)_32%,transparent_72%)] opacity-0 blur-[34px] transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[#2b2b2b] px-5 py-5 sm:px-6 sm:py-6 shadow-[0_18px_36px_rgba(0,0,0,0.16)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-atlas-red/18 xl:min-h-[220px]">
                          <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-6 flex items-start gap-4">
                              <div className="relative flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center rounded-full bg-atlas-red shadow-[0_14px_28px_rgba(196,30,58,0.24)]">
                                <div className="absolute inset-[8px] rounded-full border border-white/18" />
                                <Icon strokeWidth={1.9} className="relative z-10 h-8 w-8 text-white" />
                              </div>
                            </div>
                            <p className="max-w-[22ch] text-[1rem] xl:text-[1.08rem] font-bold leading-[1.65] tracking-[-0.01em] text-white text-pretty">
                              {app[locale]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO Content ── */}
        <>
          {seoSections.map((section, index) => (
            <section
              key={section.title}
              className={`s-prefab-seo relative ${index % 2 === 0 ? "bg-white" : "bg-atlas-sand"} py-16 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] sm:py-20 xl:py-24`}
            >
              <div className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16">
                <div className={`grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-12 2xl:gap-14 items-center ${index % 2 === 1 ? "xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1" : ""}`}>
                  <div className="s-seo-copy max-w-[42rem]">
                    <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                      {section.label}
                    </span>
                    <h2 className="font-[var(--font-heading)] text-[clamp(1.65rem,2.75vw,2.8rem)] font-black text-atlas-charcoal mt-4 tracking-tight leading-[1.04]">
                      {section.title}
                    </h2>
                    <div className="w-16 h-[3px] bg-atlas-red mt-5 mb-7" />
                    <p className="text-[15px] xl:text-[1rem] text-atlas-slate leading-[1.8] max-w-[34rem] text-pretty">
                      {section.body}
                    </p>
                    <div className="mt-7 grid grid-cols-1 gap-3 max-w-[38rem]">
                      {section.bullets.map((bullet) => (
                        <div key={bullet} className="s-seo-card flex items-start gap-4 rounded-[22px] border border-atlas-charcoal/10 bg-white/72 px-5 py-4 shadow-[0_16px_32px_rgba(17,24,39,0.06)]">
                          <span className="mt-[0.45rem] h-2.5 w-2.5 shrink-0 rounded-full bg-atlas-red" />
                          <span className="text-[14px] xl:text-[0.95rem] font-semibold leading-[1.7] text-atlas-charcoal">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="s-seo-media relative overflow-hidden rounded-[32px] min-h-[320px] sm:min-h-[380px] xl:min-h-[460px] shadow-[0_24px_52px_rgba(17,24,39,0.12)]">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 50vw"
                      quality={92}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </>

        {/* ── Approach ── */}
        <section className="s-approach relative mt-8 bg-atlas-navy py-24 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:mt-12 lg:py-32">
          <div className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] gap-10 xl:gap-12 2xl:gap-16 items-start">
              <div className="max-w-[42rem] xl:pt-4">
                <span className="text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold">
                  {locale === "fr" ? "Notre Approche" : "Our Approach"}
                </span>
                <h2 className="max-w-[13ch] font-[var(--font-heading)] text-[clamp(2.4rem,4.8vw,5rem)] font-black text-white mt-3 sm:mt-4 tracking-tight leading-[0.9]">
                  {locale === "fr" ? "Du premier contact à la livraison" : "From first contact to delivery"}
                </h2>
                <div className="w-16 h-[3px] bg-atlas-red mt-5 sm:mt-7 mb-6 sm:mb-9" />
                <p className="max-w-[36rem] text-[18px] xl:text-[1.35rem] text-white/68 leading-[1.8] text-pretty">
                  {locale === "fr"
                    ? "Chaque projet en Afrique de l'Ouest est unique. Nous concevons des solutions modulaires adaptées aux conditions extrêmes (chaleur, humidité, terrains difficiles) pour assurer une installation rapide, durable et parfaitement conforme aux exigences des sites miniers et industriels."
                    : "Every project is unique. Our process adapts to your specific constraints to guarantee on-time delivery that meets your requirements."}
                </p>
              </div>
              <div className="xl:pl-4 2xl:pl-8">
                <div className="relative">
                  <div className="s-step-line hidden xl:block absolute left-[6.75rem] right-[6.75rem] top-[4.35rem] h-px bg-gradient-to-r from-atlas-red/15 via-atlas-red/55 to-atlas-red/15" />
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 2xl:gap-7">
                    {data.approach.map((step, i) => {
                      const Icon = step.icon;

                      return (
                        <div
                          key={i}
                          className="s-step group relative min-w-0"
                        >
                          <div className="pointer-events-none absolute inset-x-[-18px] inset-y-[18px] -z-10 rounded-[48px] bg-[radial-gradient(circle_at_50%_50%,rgba(196,30,58,0.34),rgba(196,30,58,0.18)_34%,rgba(196,30,58,0.08)_54%,transparent_78%)] opacity-0 blur-[34px] transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="relative overflow-hidden rounded-[36px] border border-atlas-charcoal/10 bg-white px-6 py-7 sm:px-7 sm:py-8 shadow-[0_22px_58px_rgba(17,24,39,0.1)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-atlas-red/18 group-hover:shadow-[0_30px_72px_rgba(17,24,39,0.12)] xl:min-h-[330px] 2xl:min-h-[346px]">
                            <div className="relative z-10 mb-8 flex items-start gap-4">
                              <div className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full bg-atlas-red shadow-[0_16px_34px_rgba(196,30,58,0.24)]">
                                <div className="absolute inset-[9px] rounded-full border border-white/20" />
                                <Icon strokeWidth={1.9} className="relative z-10 h-10 w-10 text-white" />
                              </div>
                            </div>
                            <p className="relative z-10 max-w-none text-[1.06rem] xl:text-[1.18rem] 2xl:text-[1.24rem] font-bold leading-[1.65] tracking-[-0.01em] text-atlas-charcoal text-pretty">
                              {step[locale]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden py-20 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:py-28">
          <div className="absolute inset-0">
            <Image src={heroes.cta} alt="Atlas Bâtiment Modulaire - conception projet" fill className="object-cover" sizes="100vw" quality={90} />
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
        <section className="s-others relative bg-atlas-charcoal py-20 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-atlas-red before:content-[''] lg:py-28">
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
                  href={`/sectors/${sk}`}
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
      </div>
    </div>
  );
}
