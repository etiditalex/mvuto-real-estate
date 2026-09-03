import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getPublicSupabase();
  if (!supabase) {
    return NextResponse.json({ post: null });
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return NextResponse.json(
    { post: data },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
