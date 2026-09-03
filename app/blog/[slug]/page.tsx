import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { fetchPublishedBlogBySlug } from "@/lib/blog/getBlogs";
import { formatIsoDate } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-white">
      <section className="relative min-h-[280px] overflow-hidden lg:min-h-[380px]">
        <Image
          {...propertyImageProps(post.image)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col justify-end px-4 py-12 lg:min-h-[380px] lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-white lg:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-white/80">
            {formatIsoDate(post.date)} · {post.author}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <p className="mb-8 text-lg leading-relaxed text-primary/80">{post.excerpt}</p>
        {post.content_html ? (
          <div
            className="space-y-4 text-base leading-relaxed text-primary/80 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        ) : null}
        <div className="mt-12 rounded-xl bg-[#f5f2ed] p-6 text-center">
          <p className="mb-4 font-medium text-primary">Ready to view coastal plots?</p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-accent px-6 py-2.5 font-medium text-primary hover:bg-accent-blend"
          >
            Contact MVUTO
          </Link>
        </div>
      </div>
    </article>
  );
}
