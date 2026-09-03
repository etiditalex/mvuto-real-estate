import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getPublicSupabase();
  if (!supabase) return NextResponse.json({ items: [] });

  const { data } = await supabase
    .from("client_testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return NextResponse.json(
    { items: data || [] },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
