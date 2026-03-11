import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const GET = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("category")
      .eq("published", true)
      .order("category");

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 },
      );
    }

    const categories = [
      ...new Set((data || []).map((item) => item.category).filter(Boolean)),
    ];

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Unexpected error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
