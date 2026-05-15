import { NextResponse } from "next/server";
import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/cv-document";
import { createServerClient } from "@/lib/supabase/create-server-client";
import { ISkill, IProject, IContactInfo, ISocialLink } from "@/types";

export const GET = async () => {
  try {
    const supabase = await createServerClient();

    const [skillsRes, projectsRes, contactRes, socialRes] = await Promise.all([
      supabase
        .from("skills")
        .select("*")
        .order("position", { ascending: true }),
      supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(4),
      supabase.from("contacts").select("*"),
      supabase.from("social_links").select("*").order("label", { ascending: true }),
    ]);

    const skills: ISkill[] = (skillsRes.data || []).map((s) => ({
      id: s.id,
      name: s.name,
      proficiency: s.level,
      icon: s.icon ?? undefined,
    }));

    const projects: IProject[] = (projectsRes.data || []).map((p) => ({
      id: p.id,
      user_id: p.user_id,
      title: p.title,
      description: p.description,
      longDescription: p.long_description ?? "",
      longdescription: p.long_description ?? "",
      image: p.main_image ?? "",
      main_image: p.main_image ?? "",
      additional_images: p.images ?? [],
      technologies: p.technologies ?? [],
      github: p.github ?? "",
      live: p.live ?? "",
      date: p.date ?? p.created_at ?? "",
      category: p.category ?? "",
    }));

    const contactData = contactRes.data || [];
    const contactInfo: IContactInfo | null = contactData.length > 0
      ? {
          id: contactData[0].id,
          email: "",
          phone: undefined,
          address: undefined,
          resume_url: undefined,
        }
      : null;

    if (contactInfo) {
      contactData.forEach((item) => {
        const label = item.label?.toLowerCase() ?? "";
        if (label === "email") contactInfo.email = item.value;
        else if (label === "phone") contactInfo.phone = item.value;
        else if (label === "location" || label === "address")
          contactInfo.address = item.value;
      });
    }

    const socialLinks: ISocialLink[] = (socialRes.data || []).map((s) => ({
      id: s.id,
      platform:
        s.label.charAt(0).toUpperCase() + s.label.slice(1),
      url: s.href,
      icon: s.icon ?? undefined,
    }));

    const pdfBuffer = await renderToBuffer(
      createElement(CVDocument, { skills, projects, contactInfo, socialLinks }),
    );

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="cv-parfait-bashombe.pdf"',
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("CV generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CV" },
      { status: 500 },
    );
  }
};
