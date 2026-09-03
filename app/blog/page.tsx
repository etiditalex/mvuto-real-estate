"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { STATIC_BLOG_POSTS, type BlogListItem } from "@/lib/blog/catalog";
import { formatIsoDate } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogListItem[]>(STATIC_BLOG_POSTS);

  useEffect(() => {
    fetch("/api/content/blogs", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.posts?.length) return;
        const mapped: BlogListItem[] = data.posts.map(
          (p: {
            id: number;
            title: string;
            excerpt: string;
            author: string;
            published_at: string;
            image: string;
            category: string;
            slug: string;
          }) => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt,
            author: p.author,
            date: p.published_at,
            image: p.image,
            category: p.category,
            slug: p.slug,
          })
        );
        setPosts(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHero title="MVUTO Blog" />
      <section className="bg-[#f5f2ed] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      {...propertyImageProps(post.image)}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {post.category}
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-primary">{post.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-primary/70">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-primary/50">
                      {formatIsoDate(post.date)} · {post.author}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
