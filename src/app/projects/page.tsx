import { getProjects, getProjectCategories } from "@/lib/api/projects";
import { ProjectsClient } from "@/components/projects-client";

export default async function Projects() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  const allCategories = ["All", ...categories];

  return <ProjectsClient initialProjects={projects} categories={allCategories} />;
}
