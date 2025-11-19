import { getProjectById } from "@/lib/api/projects";
import { ProjectDetailClient } from "@/components/project-detail-client";
import { notFound } from "next/navigation";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailClient project={project} />;
}
