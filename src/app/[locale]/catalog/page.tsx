import { setRequestLocale } from "next-intl/server";
import { CatalogPage } from "@/components/catalog/CatalogPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CatalogPage />;
}
