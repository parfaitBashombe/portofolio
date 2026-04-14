import { ProjectsClient } from "@/components/projects/projects-client";
import { IProject } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web applications and projects built with React, Next.js, TypeScript, Tailwind CSS, and modern web technologies. Explore my work.",
  openGraph: {
    title: "Projects - Parfait Bashombe",
    description: "Portfolio of web development projects and applications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Parfait Bashombe",
    description: "Portfolio of web development projects and applications",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function Projects() {
  let projects: IProject[] = [];
  let categories: string[] = [];

  try {
    const [projectsRes, categoriesRes] = await Promise.all([
      fetch(`${BASE_URL}/api/projects`, { cache: "no-store" }),
      fetch(`${BASE_URL}/api/projects/categories`, {
        cache: "no-store",
      }),
    ]);

    if (projectsRes.ok) projects = await projectsRes.json();
    if (categoriesRes.ok) categories = await categoriesRes.json();
  } catch (err) {
    console.error(err);
  }

  return (
    <ProjectsClient
      initialProjects={projects}
      categories={["All", ...categories]}
    />
  );
}
