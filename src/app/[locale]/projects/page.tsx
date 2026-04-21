import { setRequestLocale } from "next-intl/server";
import { ProjectsPage as ProjectsContent } from "@/components/projects/ProjectsPage";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsContent />;
}
