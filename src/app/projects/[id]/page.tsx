import { ProjectDetailClient } from "@/components/projects/project-detail-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";
import { IProject } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function getProjectById(id: string): Promise<IProject | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: "Project Not Found" };
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

  if (!project) return notFound();

  return <ProjectDetailClient project={project} />;
}
