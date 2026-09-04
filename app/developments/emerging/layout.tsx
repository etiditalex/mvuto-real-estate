import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "Emerging Land Locations Kenya Coast";
const description =
  "Emerging Coast plots from MVUTO — Kibao Kiche, Bofa and other growth corridors with verified titles and flexible payment plans.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/developments/emerging",
  keywords: [
    "emerging land Kenya Coast",
    "Kibao Kiche plots",
    "Bofa land for sale",
    "affordable plots Kilifi",
    "growth corridor land Kenya",
  ],
});

export default function EmergingLocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/developments/emerging", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Developments", path: "/developments" },
            { name: "Emerging Locations", path: "/developments/emerging" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
