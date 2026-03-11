import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/create-server-client";
import { IProject } from "@/types";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 },
        );
      }
      console.error("Error fetching project:", error);
      return NextResponse.json(
        { error: "Failed to fetch project" },
        { status: 500 },
      );
    }

    const project: IProject = {
      id: data.id,
      title: data.title,
      description: data.description,
      longDescription: data.longdescription,
      longdescription: data.longdescription,
      image: data.main_image || "",
      main_image: data.main_image || "",
      additional_images: data.images || [],
      technologies: data.technologies || [],
      github: data.github || "",
      live: data.live || "",
      date: data.date || "",
      category: data.category || "",
      user_id: data.user_id,
    };

    return NextResponse.json(project);
  } catch (error) {
    console.error("Unexpected error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
