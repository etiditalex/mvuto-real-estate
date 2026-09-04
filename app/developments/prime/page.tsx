import PrimeLocationsPage from "@/components/PrimeLocationsPage";
import { fetchFeaturedProperties } from "@/lib/properties/getProperties";

export const dynamic = "force-dynamic";

export default async function DevelopmentsPrimePage() {
  const projects = await fetchFeaturedProperties(3);
  return <PrimeLocationsPage projects={projects} />;
}
