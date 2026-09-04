import HomePage from "@/components/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { fetchFeaturedProperties } from "@/lib/properties/getProperties";
import { breadcrumbSchema, howToBuyLandSchema, webPageSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const title = "Land for Sale Kenya Coast | Kilifi, Diani & Mariakani Plots";
const description =
  "Buy titled land on Kenya's Coast with MVUTO Real Estate. Plots for sale in Kilifi, Diani, Mariakani and Bofa — verified titles and flexible payment plans.";

export default async function Page() {
  const featuredProperties = await fetchFeaturedProperties(4);
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/", title, description }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          howToBuyLandSchema(),
        ]}
      />
      <HomePage featuredProperties={featuredProperties} />
    </>
  );
}
