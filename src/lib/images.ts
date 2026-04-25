// ============================================================
// MERKEZI RESIM KAYDI
// Tum site bu dosyadan resim cekinir.
// Resim eklemek/cikarmak icin SADECE bu dosyayi duzenle.
//
// KLASOR YAPISI:
//   public/images/
//     shared/                  → Birden fazla sayfada kullanilan resimler
//     home/hero/               → Anasayfa hero slider
//     home/showcase/           → Anasayfa mozaik bolumu
//     home/                    → Anasayfa diger (CTA, harita)
//     about/                   → Hakkimizda sayfasi
//     contact/                 → Iletisim sayfasi
//     projects/                → Projeler sayfasi
//     catalog/                 → Katalog sayfasi
//     sectors/prefab/exterior/ → Prefabrik dis cephe galeri
//     sectors/prefab/interior/ → Prefabrik ic mekan galeri
//     sectors/mining/          → Maden sektoru
//     sectors/defense/         → Savunma sektoru
//     site/                    → Logo, genel site varliklari
// ============================================================

// --- SHARED (Birden fazla sayfada kullanilan resimler) ---
export const containers = {
  assembly1:      "/images/shared/assembly-1.webp",
  assembly2:      "/images/shared/assembly-2.webp",
  camp1:          "/images/shared/placeholder.webp",
  factory1:       "/images/shared/placeholder.webp",
  finished1:      "/images/shared/finished-1.webp",
  finished2:      "/images/shared/finished-2.webp",
  interior1:      "/images/shared/interior-1.webp",
  portContainers: "/images/shared/port-containers.webp",
  prefabNew:      "/images/shared/prefab-new.webp",
  siteAerial1:    "/images/shared/placeholder.webp",
  siteAerial2:    "/images/shared/placeholder.webp",
  transport1:     "/images/shared/placeholder.webp",
};

// --- HOME/SHOWCASE (Anasayfa mozaik bolumu) ---
export const showcase = [
  "02","03","05","06","07","08",
  "13","16","17","18","19","20","21",
  "22","23","24","25","26","27","28","29","30","31",
  "32","33","34","39","40","41",
  "42","44","46","54","55","56",
].map(n => `/images/home/showcase/${n}.webp`);

// --- SECTORS/PREFAB (Sektor sayfasi: /sectors/prefab) ---
export const prefab = {
  exterior: [
    "/images/sectors/prefab/exterior/exterior-1.webp",
    "/images/sectors/prefab/exterior/exterior-3.webp",
    "/images/sectors/prefab/exterior/exterior-4.webp",
    "/images/sectors/prefab/exterior/exterior-5.webp",
    "/images/sectors/prefab/exterior/exterior-6.webp",
    "/images/sectors/prefab/exterior/exterior-7.webp",
    "/images/sectors/prefab/exterior/exterior-8.webp",
    "/images/sectors/prefab/exterior/exterior-9.webp",
    "/images/sectors/prefab/exterior/exterior-10.webp",
  ],
  interior: [
    "/images/sectors/prefab/interior/interior-1.webp",
    "/images/sectors/prefab/interior/interior-2.webp",
    "/images/sectors/prefab/interior/interior-3.webp",
    "/images/sectors/prefab/interior/interior-4.webp",
    "/images/sectors/prefab/interior/interior-5.webp",
    "/images/sectors/prefab/interior/interior-6.webp",
    "/images/sectors/prefab/interior/interior-7.webp",
  ],
};

// --- SECTORS/MINING (Sektor sayfasi: /sectors/mining) ---
export const mining = {
  hero: "/images/sectors/mining/maden-hero.webp",
  gallery: [
    "/images/sectors/mining/maden1.webp",
    "/images/sectors/mining/maden2.webp",
    "/images/sectors/mining/maden3.webp",
    "/images/sectors/mining/maden5.webp",
    "/images/sectors/mining/maden6.webp",
    "/images/sectors/mining/maden11.webp",
  ],
};

// --- SECTORS/DEFENSE (Sektor sayfasi: /sectors/defense) ---
export const defense = {
  hero: "/images/sectors/defense/defence-hero.webp",
  gallery: [
    "/images/sectors/defense/defence-1.webp",
    "/images/sectors/defense/defence-2.webp",
    "/images/sectors/defense/defence-3.webp",
  ],
};

// --- SAYFA HERO RESIMLERI ---
export const heroes = {
  main:       "/images/home/hero/hero-container.webp",
  about:      "/images/about/about-hero.webp",
  contact:    "/images/contact/contact-hero.jpg",
  projects:   "/images/projects/projects-hero.jpg",
  cta:        "/images/home/cta-bg.webp",
  guineaMap:  "/images/home/guinea-map.png",
};

// --- SITE (Logo, genel) ---
export const logo = {
  transparent: "/images/site/logo-transparent.png",
};
