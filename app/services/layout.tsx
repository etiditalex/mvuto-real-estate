import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Real Estate Services Kenya",
  description:
    "MVUTO real estate services in Kenya: land sales, acquisition consulting, investment guidance, due diligence and after-sales support on the Coast.",
  path: "/services",
  keywords: [
    "land sales Kenya",
    "land acquisition consulting Kenya",
    "real estate investment guidance Kenya",
    "land due diligence Kenya",
    "MVUTO services",
  ],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
