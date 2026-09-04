import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const title = "News & Project Updates";
const description =
  "Latest MVUTO Real Estate news — new Coast projects, site visits and company updates from Kilifi, Diani, Mariakani and across Kenya.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/news",
  keywords: [
    "MVUTO news",
    "Kenya Coast land news",
    "Kilifi project updates",
    "Diani land news",
  ],
});

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/news", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: "News", path: "/news" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
