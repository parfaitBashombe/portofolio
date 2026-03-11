import { NextRequest, NextResponse } from "next/server";
import { IPost } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/create-server-client";

function mapToIPost(post: Record<string, unknown>): IPost {
  return {
    id: post.id as string,
    title: post.title as string,
    excerpt: post.excerpt as string,
    content: post.content as string,
    date: post.date as string,
    readTime: post.read_time as string,
    category: post.category as string,
    slug: post.slug as string,
    tags: (post.tags as string[]) || [],
  };
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  const supabase = await createServerClient();

  try {
    let query = supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: 500 },
      );
    }

    const posts = (data || []).map(mapToIPost);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Unexpected error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
