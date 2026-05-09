import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { SloganStrip } from "@/components/home/SloganStrip";
import { ContainerShowcase } from "@/components/home/ContainerShowcase";
import { ImageMosaic } from "@/components/home/ImageMosaic";
import { ProductsGrid } from "@/components/home/ProductsGrid";
import { SectorsSection } from "@/components/home/SectorsSection";
import { HomeSeoSection } from "@/components/home/HomeSeoSection";
import { HomeCTA } from "@/components/home/HomeCTA";

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
      <SloganStrip />
      <ContainerShowcase />
      <SectorsSection />
      <ImageMosaic />
      <ProductsGrid />
      <HomeSeoSection />
      <HomeCTA />
    </>
  );
}
