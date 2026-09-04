import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "Kenya Coast Land Market Research";
const description =
  "Kenya Coast land market insights, buyer guides and reports from MVUTO — Kilifi, Diani and Mariakani trends for investors and home buyers.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/market-research",
  keywords: [
    "Kenya Coast land market",
    "Kilifi land prices",
    "Kenya real estate research",
    "Coast property trends",
  ],
});

export default function MarketResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/market-research", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: "Market Research", path: "/market-research" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
