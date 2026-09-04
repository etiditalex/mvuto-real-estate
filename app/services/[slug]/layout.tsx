import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, SERVICE_PAGES, webPageSchema } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES[slug];
  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: true } };
  }
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const service = SERVICE_PAGES[slug];

  return (
    <>
      {service ? (
        <JsonLd
          data={[
            webPageSchema({
              path: `/services/${service.slug}`,
              title: service.title,
              description: service.description,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ]}
        />
      ) : null}
      {children}
    </>
  );
}
