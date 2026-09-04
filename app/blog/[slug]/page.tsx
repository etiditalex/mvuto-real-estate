import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";
import { fetchPublishedBlogBySlug } from "@/lib/blog/getBlogs";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: `${post.date.slice(0, 10)}T08:00:00+03:00`,
    dateModified: `${post.date.slice(0, 10)}T08:00:00+03:00`,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <BlogArticleLayout
      currentSlug={post.slug}
      title={post.title}
      heroTitle={post.hero_title}
      heroImage={post.image}
      heroImageAlt={post.hero_image_alt || post.title}
      category={post.category}
      author={post.author}
      publishedIso={post.date}
      articleSchema={articleSchema}
    >
      <div
        className="space-y-4 text-base leading-relaxed text-primary/80 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_strong]:text-primary"
        dangerouslySetInnerHTML={{
          __html: post.content_html || `<p>${post.excerpt}</p>`,
        }}
      />
    </BlogArticleLayout>
  );
}
