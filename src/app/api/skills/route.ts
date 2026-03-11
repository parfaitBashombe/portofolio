import { NextResponse } from "next/server";
import { ISkill } from "@/types";
import { createServerClient } from "@/lib/supabase/create-server-client";

export const GET = async () => {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching skills:", error);
      return NextResponse.json(
        { error: "Failed to fetch skills" },
        { status: 500 },
      );
    }

    const skills: ISkill[] = (data || []).map((skill) => ({
      id: skill.id,
      name: skill.name,
      proficiency: skill.level,
      icon: skill.icon ?? undefined,
    }));

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Unexpected error fetching skills:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
