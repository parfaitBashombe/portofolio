import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/create-server-client";
import { IPost } from "@/types";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      console.error("Error fetching post:", error);
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: 500 },
      );
    }

    const post: IPost = {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date,
      readTime: data.read_time,
      category: data.category,
      slug: data.slug,
      tags: data.tags || [],
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error("Unexpected error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
