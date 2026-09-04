"use client";

import { Suspense, useMemo } from "react";
import BlogsHeroCarousel from "@/components/blog/BlogsHeroCarousel";
import BlogsArchiveMain from "@/components/blog/BlogsArchiveMain";
import BlogsArchiveSidebar from "@/components/blog/BlogsArchiveSidebar";
import { useBlogPosts } from "@/lib/blog/useBlogPosts";

function BlogsArchiveMainFallback() {
  return (
    <div className="space-y-6">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-primary/10" />
      <div className="mb-10 h-4 max-w-xl animate-pulse rounded bg-primary/10" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col gap-5 rounded-lg border border-primary/10 bg-white p-5 sm:flex-row"
        >
          <div className="h-44 w-full shrink-0 rounded bg-primary/10 sm:w-52" />
          <div className="flex-1 space-y-3 pt-1">
            <div className="h-4 w-32 rounded bg-primary/10" />
            <div className="h-6 w-full max-w-md rounded bg-primary/10" />
            <div className="h-4 w-full rounded bg-primary/10" />
            <div className="h-4 w-full max-w-lg rounded bg-primary/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogIndexPage() {
  const { posts: carouselPosts } = useBlogPosts();
  const sortedPosts = useMemo(
    () => [...carouselPosts].sort((a, b) => b.date.localeCompare(a.date)),
    [carouselPosts]
  );

  return (
    <div className="pb-20">
      <h1 className="sr-only">Blogs — expert property insights from MVUTO Real Estate</h1>
      <BlogsHeroCarousel posts={sortedPosts} />

      <section className="bg-[#f5f2ed] py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <Suspense fallback={<BlogsArchiveMainFallback />}>
              <BlogsArchiveMain />
            </Suspense>
            <BlogsArchiveSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}
