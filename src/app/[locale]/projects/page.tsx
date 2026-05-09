import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  notFound();
}
