import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getPublicSupabase();
  if (!supabase) return NextResponse.json({ posts: [] });

  const { data } = await supabase
    .from("blog_posts")
    .select(
      "id, title, excerpt, author, published_at, image, category, slug, content_html, hero_title, hero_image_alt"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return NextResponse.json(
    { posts: data || [] },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
