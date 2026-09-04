"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useBlogPosts } from "@/lib/blog/useBlogPosts";

export default function BlogsArchiveSidebar() {
  const router = useRouter();
  const [searchDraft, setSearchDraft] = useState("");
  const { posts } = useBlogPosts();

  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchDraft.trim();
    router.push(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
  };

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <form onSubmit={onSearch} className="flex gap-0">
          <input
            type="search"
            name="q"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Search …"
            className="min-w-0 flex-1 rounded-l border border-y border-l border-primary/20 px-3 py-2.5 text-sm text-primary placeholder:text-primary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Search blog posts"
          />
          <button
            type="submit"
            className="shrink-0 rounded-r bg-primary px-4 py-2.5 text-sm font-semibold text-accent hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </div>

      <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-primary">Latest posts</h2>
        <div className="mt-2 border-b-2 border-accent" aria-hidden />
        <ul className="mt-4 divide-y divide-primary/10">
          {latest.map((post) => (
            <li key={post.id} className="py-3 first:pt-0 last:pb-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-2 text-sm text-primary/70 hover:text-accent"
              >
                <ChevronRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary/30 group-hover:text-accent"
                  aria-hidden
                />
                <span className="leading-snug">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
