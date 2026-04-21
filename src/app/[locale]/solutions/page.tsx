import { setRequestLocale } from "next-intl/server";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsList } from "@/components/solutions/SolutionsList";

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SolutionsHero />
      <SolutionsList />
    </>
  );
}
