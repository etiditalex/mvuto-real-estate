import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      property_id,
      property_name,
      preferred_date,
      preferred_time,
      message,
      source,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const supabase = createServiceClient();
    if (!supabase) {
      return NextResponse.json({ success: true, offline: true });
    }

    const { error } = await supabase.from("property_leads").insert({
      name,
      email,
      phone,
      property_id: property_id || null,
      property_name: property_name || null,
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      message: message || null,
      source: source || "property_enquiry",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
