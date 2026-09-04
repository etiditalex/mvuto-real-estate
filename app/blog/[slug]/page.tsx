import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";
import JsonLd from "@/components/seo/JsonLd";
import { fetchPublishedBlogBySlug } from "@/lib/blog/getBlogs";
import { articleSchemaExtra, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: true } };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.hero_image_alt || post.title,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    keywords: [post.category, "Kenya Coast land", "MVUTO Real Estate", post.title],
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    ...articleSchemaExtra({
      title: post.title,
      description: post.excerpt,
      image: post.image,
      date: `${post.date.slice(0, 10)}T08:00:00+03:00`,
      author: post.author,
      slug: post.slug,
    }),
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };

  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
    <JsonLd data={crumbs} />
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
    </>
  );
}
