import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "Client Testimonials";
const description =
  "What MVUTO clients say about buying titled coastal land in Kenya — Kilifi, Diani and Mariakani plots with verified titles and payment plans.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/testimonials",
  keywords: [
    "MVUTO reviews",
    "Kenya land buyer testimonials",
    "Kilifi land reviews",
  ],
});

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/testimonials", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
