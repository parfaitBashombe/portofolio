import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/create-server-client";
import { IProject } from "@/types";

const mapToIProject = (project: Record<string, unknown>): IProject => {
  return {
    id: project.id as string,
    title: project.title as string,
    description: project.description as string,
    longDescription: project.longdescription as string,
    longdescription: project.longdescription as string,
    image: (project.main_image as string) || "",
    main_image: (project.main_image as string) || "",
    additional_images: (project.images as string[]) || [],
    technologies: (project.technologies as string[]) || [],
    github: (project.github as string) || "",
    live: (project.live as string) || "",
    date: (project.date as string) || "",
    category: (project.category as string) || "",
    user_id: project.user_id as string,
  };
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  const supabase = await createServerClient();

  try {
    let query = supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 },
      );
    }

    return NextResponse.json((data || []).map(mapToIProject));
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
