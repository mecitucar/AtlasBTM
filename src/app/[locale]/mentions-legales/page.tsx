import { setRequestLocale } from "next-intl/server";
import { MentionsLegalesPage } from "@/components/legal/MentionsLegalesPage";

export default async function MentionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MentionsLegalesPage />;
}
