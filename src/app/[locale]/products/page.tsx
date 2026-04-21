import { setRequestLocale } from "next-intl/server";
import { ProductsPage as ProductsContent } from "@/components/products/ProductsPage";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsContent />;
}
