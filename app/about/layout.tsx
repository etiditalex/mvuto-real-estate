import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "About MVUTO Real Estate";
const description =
  "MVUTO Real Estate Ltd is your Kenya Coast land partner — verified titles, clear pricing, and support from enquiry to title deed in Kilifi, Diani, Mariakani and Bofa.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about MVUTO Real Estate",
    "Kenya Coast real estate company",
    "trusted land seller Kilifi",
    "titled land Kenya",
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/about", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
