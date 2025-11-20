import dynamic from "next/dynamic";
import { getProjects, getProjectCategories } from "@/lib/api/projects";
import { Metadata } from "next";
import { LoadingSkeleton } from "@/components/loading-skeleton";

const ProjectsClient = dynamic(() => import("@/components/projects-client").then(mod => ({ default: mod.ProjectsClient })), {
  loading: () => <LoadingSkeleton />,
});

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web applications and projects built with React, Next.js, TypeScript, Tailwind CSS, and modern web technologies. Explore my work.",
  openGraph: {
    title: "Projects - Parfait Bashombe",
    description:
      "Portfolio of web development projects and applications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Parfait Bashombe",
    description:
      "Portfolio of web development projects and applications",
  },
};

export default async function Projects() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  const allCategories = ["All", ...categories];

  return <ProjectsClient initialProjects={projects} categories={allCategories} />;
}
