import { getProjectById } from "@/lib/api/projects";
import { ProjectDetailClient } from "@/components/project-detail-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: project.technologies,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `${siteMetadata.url}/projects/${project.id}`,
      images: [
        {
          url: project.main_image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.main_image],
    },
    alternates: {
      canonical: `${siteMetadata.url}/projects/${project.id}`,
    },
  };
}

export default async function Project({ params }: ProjectProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailClient project={project} />;
}
