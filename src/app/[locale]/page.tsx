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
import { SectionDivider } from "@/components/ui/SectionDivider";

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
      <SectionDivider variant="dots" toColor="#1A1A1A" />
      <AboutSection />
      <SectionDivider variant="red-strip" />
      <SolutionsPreview />
      <LatestProjects />
      <SectionDivider variant="dots" toColor="#bf0a28" />
      <ProductionCapacity />
      <SectionDivider variant="dots" toColor="#FFFFFF" />
      <ProductionPlant />
      <SectionDivider variant="red-strip" />
      <ProcessStrip />
      <SustainabilityStrip />
      <CTASection />
    </>
  );
}
