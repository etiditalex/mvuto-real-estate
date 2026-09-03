import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getPublicSupabase();
  if (!supabase) return NextResponse.json({ items: [] });

  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[content/news]", error.message);
    return NextResponse.json({ items: [] }, { status: 500 });
  }

  return NextResponse.json(
    { items: data || [] },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
