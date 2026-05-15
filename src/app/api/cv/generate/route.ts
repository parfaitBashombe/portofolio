import { NextResponse } from "next/server";
import { createElement } from "react";
import { readFileSync } from "fs";
import { join } from "path";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/cv-document";
import { createServerClient } from "@/lib/supabase/create-server-client";
import { ISkill, IProject, IContactInfo, ISocialLink } from "@/types";

const normalizeSkills = (rawSkills: Record<string, unknown>[]): ISkill[] =>
  rawSkills.map((skill) => ({
    id: skill.id as string,
    name: skill.name as string,
    proficiency: skill.level as number,
    icon: (skill.icon as string) ?? undefined,
  }));

const normalizeProjects = (rawProjects: Record<string, unknown>[]): IProject[] =>
  rawProjects.map((project) => ({
    id: project.id as string,
    user_id: project.user_id as string,
    title: project.title as string,
    description: project.description as string,
    longDescription: (project.long_description as string) ?? "",
    longdescription: (project.long_description as string) ?? "",
    image: (project.main_image as string) ?? "",
    main_image: (project.main_image as string) ?? "",
    additional_images: (project.images as string[]) ?? [],
    technologies: (project.technologies as string[]) ?? [],
    github: (project.github as string) ?? "",
    live: (project.live as string) ?? "",
    date: ((project.date as string) ?? (project.created_at as string)) ?? "",
    category: (project.category as string) ?? "",
  }));

const buildContactInfo = (rawContactRows: Record<string, unknown>[]): IContactInfo | null => {
  if (rawContactRows.length === 0) return null;

  const contactInfo: IContactInfo = {
    id: rawContactRows[0].id as string,
    email: "",
    phone: undefined,
    address: undefined,
    resume_url: undefined,
  };

  for (const row of rawContactRows) {
    const fieldLabel = (row.label as string)?.toLowerCase() ?? "";
    if (fieldLabel === "email") contactInfo.email = row.value as string;
    else if (fieldLabel === "phone") contactInfo.phone = row.value as string;
    else if (fieldLabel === "location" || fieldLabel === "address")
      contactInfo.address = row.value as string;
  }

  return contactInfo;
};

const capitalizeFirstLetter = (value: string): string => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const normalizeSocialLinks = (rawSocialLinks: Record<string, unknown>[]): ISocialLink[] =>
  rawSocialLinks.map((link) => ({
    id: link.id as string,
    platform: capitalizeFirstLetter(link.label as string),
    url: link.href as string,
    icon: (link.icon as string) ?? undefined,
  }));

const loadAvatarDataUrl = (): string | null => {
  try {
    const avatarPath = join(process.cwd(), "public", "avatar.jpeg");
    const buffer = readFileSync(avatarPath);
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
};

const buildPdfResponse = (pdfBuffer: Buffer): NextResponse =>
  new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cv-parfait-bashombe.pdf"',
      "Cache-Control": "no-cache",
    },
  });

const buildErrorResponse = (message: string): NextResponse =>
  NextResponse.json({ error: message }, { status: 500 });

export const GET = async () => {
  try {
    const supabase = createServerClient();

    const [skillsResult, projectsResult, contactResult, socialLinksResult] =
      await Promise.all([
        supabase
          .from("skills")
          .select("*")
          .order("position", { ascending: true }),
        supabase
          .from("projects")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase.from("contacts").select("*"),
        supabase
          .from("social_links")
          .select("*")
          .order("label", { ascending: true }),
      ]);

    const skills = normalizeSkills(skillsResult.data ?? []);
    const projects = normalizeProjects(projectsResult.data ?? []);
    const contactInfo = buildContactInfo(contactResult.data ?? []);
    const socialLinks = normalizeSocialLinks(socialLinksResult.data ?? []);
    const avatarDataUrl = loadAvatarDataUrl();

    const cvDocument = createElement(CVDocument, {
      skills,
      projects,
      contactInfo,
      socialLinks,
      avatarDataUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    const pdfBuffer = await renderToBuffer(cvDocument);

    return buildPdfResponse(pdfBuffer);
  } catch (error) {
    console.error("[CV Generate] Failed to generate PDF:", error);
    return buildErrorResponse("Failed to generate CV. Please try again.");
  }
};
