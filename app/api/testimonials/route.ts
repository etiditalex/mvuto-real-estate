import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { LOGO_URL } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }
    if (name.length > 80 || message.length > 800) {
      return NextResponse.json({ error: "That review is too long" }, { status: 400 });
    }

    const review = {
      name,
      location: "Client review",
      property: "MVUTO Real Estate",
      rating: 5,
      text: message,
      image: LOGO_URL,
      sort_order: 0,
      published: true,
    };

    const supabase = createServiceClient();
    if (!supabase) {
      return NextResponse.json({ success: true, offline: true, review });
    }

    const { data: latest } = await supabase
      .from("client_testimonials")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextId = (latest?.id ?? 0) + 1;
    let data = null;
    let error: { message: string; code?: string } | null = null;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const inserted = await supabase
        .from("client_testimonials")
        .insert({ ...review, id: nextId })
        .select("id, name, location, property, rating, text, image, sort_order")
        .single();
      data = inserted.data;
      error = inserted.error;
      if (!error || error.code !== "23505") break;
      nextId += 1;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, review: data });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
