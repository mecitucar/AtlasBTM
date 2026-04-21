import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsGrid } from "@/components/home/ProductsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { LatestProjects } from "@/components/home/LatestProjects";
import { ProductionCapacity } from "@/components/home/ProductionCapacity";
import { ProductionPlant } from "@/components/home/ProductionPlant";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { SustainabilityStrip } from "@/components/home/SustainabilityStrip";
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
      <AboutSection />
      <SolutionsPreview />
      <LatestProjects />
      <ProductionCapacity />
      <ProductionPlant />
      <ProcessStrip />
      <SustainabilityStrip />
      <CTASection />
    </>
  );
}
