import HomePage from "@/components/HomePage";
import { fetchFeaturedProperties } from "@/lib/properties/getProperties";

export const dynamic = "force-dynamic";

export default async function Page() {
  const featuredProperties = await fetchFeaturedProperties(4);
  return <HomePage featuredProperties={featuredProperties} />;
}
