import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsGrid } from "@/components/home/ProductsGrid";
import { WhyAtlas } from "@/components/home/WhyAtlas";
import { SectorsSection } from "@/components/home/SectorsSection";
import { LatestProjects } from "@/components/home/LatestProjects";
import { ProductionCapacity } from "@/components/home/ProductionCapacity";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { CTASection } from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProductsGrid />
      <WhyAtlas />
      <SectorsSection />
      <LatestProjects />
      <ProductionCapacity />
      <ProcessStrip />
      <CTASection />
    </>
  );
}
