import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "Prime Land Locations Kenya Coast";
const description =
  "MVUTO prime plots on Kenya's Coast — Kilifi, Diani, Mariakani and Bofa. Verified titles, strategic locations and flexible payment plans.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/developments/prime",
  keywords: [
    "prime plots Kenya Coast",
    "Kilifi prime land",
    "Diani land for sale",
    "Mariakani prime plots",
    "Bofa plots Kilifi",
  ],
});

export default function PrimeLocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/developments/prime", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Developments", path: "/developments" },
            { name: "Prime Locations", path: "/developments/prime" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
