"use client";

import { useEffect, useState } from "react";
import { STATIC_BLOG_POSTS, type BlogListItem } from "@/lib/blog/catalog";

function mapApiPost(p: {
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
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    author: p.author,
    date: p.published_at,
    image: p.image,
    category: p.category,
    slug: p.slug,
    content_html: p.content_html || undefined,
    hero_title: p.hero_title || undefined,
    hero_image_alt: p.hero_image_alt || undefined,
  };
}

export function useBlogPosts(): { posts: BlogListItem[]; loading: boolean } {
  const [posts, setPosts] = useState<BlogListItem[]>(STATIC_BLOG_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content/blogs", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.posts?.length) return;
        const fromDb: BlogListItem[] = data.posts.map(mapApiPost);
        const staticSlugs = new Set(STATIC_BLOG_POSTS.map((p) => p.slug));
        const merged = [
          ...fromDb.filter((p) => !staticSlugs.has(p.slug)),
          ...STATIC_BLOG_POSTS,
          ...fromDb.filter((p) => staticSlugs.has(p.slug)),
        ];
        const bySlug = new Map<string, BlogListItem>();
        for (const post of merged) {
          bySlug.set(post.slug, post);
        }
        setPosts(
          [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}
