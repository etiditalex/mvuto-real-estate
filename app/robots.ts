import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { fetchSiteAvailability } from "@/lib/site/fetchSiteAvailability";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { publicDisabled } = await fetchSiteAvailability();
  if (publicDisabled) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/admin", "/admin-login"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
