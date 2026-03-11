import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact";
import { createServerClient } from "@/lib/supabase/create-server-client";

export const GET = async () => {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase.from("contacts").select("*");

    if (error) {
      console.error("Error fetching contact info:", error);
      return NextResponse.json(
        { error: "Failed to fetch contact info" },
        { status: 500 },
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ data: null });
    }

    const contactInfo = {
      id: data[0].id,
      email: "",
      phone: undefined as string | undefined,
      address: undefined as string | undefined,
      resume_url: undefined as string | undefined,
    };

    data.forEach((contact) => {
      const label = contact.label.toLowerCase();
      if (label === "email") {
        contactInfo.email = contact.value;
      } else if (label === "phone") {
        contactInfo.phone = contact.value;
      } else if (label === "location" || label === "address") {
        contactInfo.address = contact.value;
      } else if (label === "resume" || label === "cv") {
        contactInfo.resume_url = contact.href || contact.value;
      }
    });

    return NextResponse.json({ data: contactInfo });
  } catch (error) {
    console.error("Failed to fetch contact info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const validatedData = contactSchema.parse(body);

    const supabase = await createServerClient();

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
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!", data },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", issues: error.errors },
        { status: 400 },
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
};
