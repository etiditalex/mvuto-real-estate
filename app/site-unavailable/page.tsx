import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EXPIRED_BANNER, EXPIRED_HEADING } from "@/lib/site/availability";
import { fetchSiteAvailability } from "@/lib/site/fetchSiteAvailability";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { mode } = await fetchSiteAvailability();
  if (mode === "not-found") {
    return {
      title: { absolute: "Page not found" },
      description: "This page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: EXPIRED_HEADING },
    description: EXPIRED_BANNER,
    robots: { index: false, follow: false },
  };
}

export default async function SiteUnavailablePage() {
  const headerStore = await headers();
  if (headerStore.get("x-mvuto-site-expired") === "1") return null;

  const { publicDisabled } = await fetchSiteAvailability();
  if (!publicDisabled) redirect("/");
  return null;
}
