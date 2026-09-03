import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getPublicSupabase();
  if (!supabase) return NextResponse.json({ reports: [], insights: [] });

  const [{ data: reports }, { data: insights }] = await Promise.all([
    supabase
      .from("market_research_reports")
      .select("*")
      .eq("published", true)
      .order("sort_order"),
    supabase
      .from("market_research_insights")
      .select("*")
      .eq("published", true)
      .order("sort_order"),
  ]);

  return NextResponse.json(
    { reports: reports || [], insights: insights || [] },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
