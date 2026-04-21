import { setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/AboutHero";
import { DifferenceSection } from "@/components/about/DifferenceSection";
import { ProcessesSection } from "@/components/about/ProcessesSection";
import { PlantSection } from "@/components/about/PlantSection";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <DifferenceSection />
      <ProcessesSection />
      <PlantSection />
    </>
  );
}
