import { getProjects, getProjectCategories } from "@/lib/api/projects";
import { ProjectsClient } from "@/components/projects-client";
import { Metadata } from "next";

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
