import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SectorDetail } from "@/components/sectors/SectorDetail";

const validSectors = ["prefab", "mining", "construction", "defense", "energy"];

export function generateStaticParams() {
  return validSectors.map((sector) => ({ sector }));
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector } = await params;
  setRequestLocale(locale);

  if (!validSectors.includes(sector)) {
    notFound();
  }

  return <SectorDetail sectorKey={sector} />;
}
