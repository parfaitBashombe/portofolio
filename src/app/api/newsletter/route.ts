import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators/newsletter";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    
    // Create Supabase client
    const supabase = await createClient();
    
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", validatedData.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed!" },
        { status: 400 }
      );
    }

    // Insert into newsletter_subscribers table
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: validatedData.email,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!", data },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid email address", issues: error.errors },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
