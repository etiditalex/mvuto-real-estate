"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, FolderOpen, MessageCircle } from "lucide-react";
import { formatBlogCardDate, estimateReadMinutes } from "@/lib/blog/dates";
import { useBlogPosts } from "@/lib/blog/useBlogPosts";
import { propertyImageProps } from "@/lib/images";

export default function BlogsArchiveMain() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const { posts } = useBlogPosts();

  const filtered = useMemo(() => {
    if (!q) return posts;
    return posts.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [q, posts]);

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold text-primary md:text-3xl">All articles</h2>
      <p className="mb-6 max-w-2xl text-sm text-primary/65 md:text-base">
        Buying guides, title explainers, and coastal investment analysis from MVUTO Real Estate
        across Kilifi, Diani, Mariakani, and the Kenya Coast.
      </p>

      {q ? (
        <p className="mb-6 text-sm text-primary/65">
          {filtered.length === 0
            ? `No posts matched “${searchParams.get("q")?.trim() ?? ""}”.`
            : `${filtered.length} post${filtered.length === 1 ? "" : "s"} matched your search.`}
        </p>
      ) : null}

      <div className="space-y-6">
        {filtered.map((blog) => {
          const href = `/blog/${blog.slug}`;
          const readMins = estimateReadMinutes(blog.title, blog.excerpt, blog.content_html || "");
          return (
            <article
              key={blog.id}
              className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-stretch sm:gap-6 sm:p-5 md:p-6">
                <Link
                  href={href}
                  className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#f5f2ed] sm:aspect-auto sm:h-44 sm:w-52 md:h-48 md:w-56"
                >
                  <Image
                    {...propertyImageProps(blog.image)}
                    alt={blog.title}
                    fill
                    className="object-cover transition duration-300 hover:opacity-95"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-sm font-medium text-accent md:text-[0.95rem]">
                    {formatBlogCardDate(blog.date)}
                  </p>
                  <Link href={href} className="group mt-1 block">
                    <h3 className="text-xl font-bold leading-snug text-primary transition group-hover:text-accent md:text-2xl">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-primary/65 md:text-base">
                    {blog.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary/10 pt-4 text-sm font-medium text-primary/80">
                    <span className="inline-flex items-center gap-1.5">
                      <FolderOpen className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {blog.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5" aria-label="Comments">
                      <MessageCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      0
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {readMins} min read
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
