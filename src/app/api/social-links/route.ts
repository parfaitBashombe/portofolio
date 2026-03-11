import { NextResponse } from "next/server";
import { ISocialLink } from "@/types";
import { createServerClient } from "@/lib/supabase/create-server-client";

export const GET = async () => {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("label", { ascending: true });

    if (error) {
      console.error("Error fetching social links:", error);
      return NextResponse.json(
        { error: "Failed to fetch social links" },
        { status: 500 },
      );
    }

    const socialLinks: ISocialLink[] = (data || []).map((link) => {
      const normalized =
        link.label.charAt(0).toUpperCase() + link.label.slice(1);
      return {
        id: link.id,
        platform: normalized,
        url: link.href,
        icon: link.icon ?? undefined,
      };
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error("Unexpected error fetching social links:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
