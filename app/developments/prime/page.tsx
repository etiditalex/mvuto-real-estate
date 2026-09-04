import type { Metadata } from "next";
import PrimeLocationsPage from "@/components/PrimeLocationsPage";
import { fetchFeaturedProperties } from "@/lib/properties/getProperties";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prime Locations",
  description:
    "Explore MVUTO's prime Coast plots — Kilifi, Diani, Mariakani and more. Verified titles, flexible payment plans, and strategic locations.",
};

export default async function DevelopmentsPrimePage() {
  const projects = await fetchFeaturedProperties(3);
  return <PrimeLocationsPage projects={projects} />;
}
