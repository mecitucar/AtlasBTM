import { setRequestLocale } from "next-intl/server";
import { PrivacyPolicyPage } from "@/components/legal/PrivacyPolicyPage";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPolicyPage />;
}
