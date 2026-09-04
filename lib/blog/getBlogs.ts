import { getPublicSupabase } from "@/lib/supabase/public";
import { STATIC_BLOG_POSTS, type BlogListItem } from "@/lib/blog/catalog";
import type { BlogPost } from "@/lib/supabase/types";

export function mapBlogRow(row: {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  image: string;
  category: string;
  slug: string;
  content_html?: string | null;
  hero_title?: string | null;
  hero_image_alt?: string | null;
}): BlogListItem {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    author: row.author,
    date: row.published_at,
    image: row.image,
    category: row.category,
    slug: row.slug,
    content_html: row.content_html || undefined,
    hero_title: row.hero_title || undefined,
    hero_image_alt: row.hero_image_alt || undefined,
  };
}

export async function fetchPublishedBlogs(): Promise<BlogListItem[]> {
  const supabase = getPublicSupabase();
  if (!supabase) return STATIC_BLOG_POSTS;

  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, excerpt, author, published_at, image, category, slug, content_html")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (!data?.length) return STATIC_BLOG_POSTS;
  return (data as BlogPost[]).map(mapBlogRow);
}

export async function fetchPublishedBlogBySlug(slug: string): Promise<BlogListItem | null> {
  const supabase = getPublicSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (data) return mapBlogRow(data as BlogPost);
  }
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug) || null;
}
