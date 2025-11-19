import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Create Supabase client
    const supabase = await createClient();
    
    // Insert into contact_messages table
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject || null,
          message: validatedData.message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!", data },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", issues: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
