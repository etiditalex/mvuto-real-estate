"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, ChevronRight, User } from "lucide-react";
import { formatIsoDate } from "@/lib/admin/utils";
import { formatLongDateFromIso } from "@/lib/blog/dates";
import { useBlogPosts } from "@/lib/blog/useBlogPosts";
import { propertyImageProps } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

export type BlogArticleLayoutProps = {
  currentSlug: string;
  title: string;
  heroTitle?: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  author: string;
  publishedIso: string;
  articleSchema: Record<string, unknown>;
  children: ReactNode;
};

export default function BlogArticleLayout({
  currentSlug,
  title,
  heroTitle,
  heroImage,
  heroImageAlt,
  category,
  author,
  publishedIso,
  articleSchema,
  children,
}: BlogArticleLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchDraft, setSearchDraft] = useState("");
  const { posts } = useBlogPosts();

  const pageUrl = `${SITE_URL}${pathname ?? ""}`;
  const encodedUrl = useMemo(() => encodeURIComponent(pageUrl), [pageUrl]);
  const displayTitle = heroTitle ?? title;
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  const shareLinks = useMemo(
    () => [
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        className: "bg-[#25D366] hover:opacity-90",
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        className: "bg-[#1877F2] hover:opacity-90",
      },
      {
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        className: "bg-primary hover:opacity-90",
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        className: "bg-[#0A66C2] hover:opacity-90",
      },
    ],
    [encodedTitle, encodedUrl]
  );

  const sidebarPosts = posts.filter((p) => p.slug !== currentSlug).slice(0, 8);
  const dateShort = formatIsoDate(publishedIso);
  const dateLong = formatLongDateFromIso(publishedIso);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchDraft.trim();
    router.push(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative min-h-[320px] w-full overflow-hidden md:min-h-[440px]">
        <Image
          {...propertyImageProps(heroImage)}
          alt={heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30" />
        <div className="relative z-10 flex min-h-[280px] flex-col justify-end px-4 pb-8 pt-14 sm:min-h-[320px] sm:pb-10 sm:pt-16 md:min-h-[440px] md:px-10 md:pb-14 lg:px-16">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="max-w-4xl break-words text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {displayTitle}
            </h1>
            <nav
              className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/90"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="text-white/50" aria-hidden>
                /
              </span>
              <Link href="/blog" className="hover:text-accent">
                Blogs
              </Link>
              <span className="text-white/50" aria-hidden>
                /
              </span>
              <span className="text-accent">{category}</span>
              <span className="text-white/50" aria-hidden>
                /
              </span>
              <span className="rounded bg-primary/60 px-2 py-0.5 text-accent-blend">
                {displayTitle.length > 48 ? `${displayTitle.slice(0, 48)}…` : displayTitle}
              </span>
            </nav>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <article className="min-w-0 rounded-lg border border-primary/10 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:p-10">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
            >
              <ArrowLeft size={18} />
              Back to blogs
            </Link>
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-accent">
              {category}
            </p>

            <p className="text-sm font-medium text-primary">{dateLong}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-primary/10 pb-6 text-sm text-primary/65">
              <span className="flex items-center gap-2">
                <Calendar size={16} aria-hidden />
                {dateShort}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} aria-hidden />
                {author}
              </span>
            </div>

            <div className="my-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Share this article
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {shareLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[2.25rem] min-w-[2.25rem] items-center justify-center rounded-full px-3 text-xs font-semibold text-white ${s.className}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 bg-[#f5f2ed]/80 p-5 md:p-8">{children}</div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
              <form onSubmit={onSearch} className="flex gap-2">
                <input
                  type="search"
                  name="q"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search…"
                  className="min-w-0 flex-1 rounded border border-primary/20 px-3 py-2 text-sm text-primary placeholder:text-primary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  aria-label="Search blog posts"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded bg-primary px-4 py-2 text-sm font-semibold text-accent hover:bg-primary/90"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-primary">Latest posts</h2>
              <div className="mt-2 border-b-2 border-accent" aria-hidden />
              <ul className="mt-4 divide-y divide-dotted divide-primary/15">
                {sidebarPosts.map((post) => (
                  <li key={post.slug} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex gap-2 text-sm text-primary/75 hover:text-accent"
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
        </div>
      </div>
    </div>
  );
}
