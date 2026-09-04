import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Land Developments Kenya Coast",
  description:
    "Explore MVUTO land developments on Kenya's Coast — prime and emerging locations with verified titles and flexible payment plans in Kilifi, Diani and Mariakani.",
  path: "/developments",
  keywords: [
    "Kenya Coast land developments",
    "Kilifi land projects",
    "Diani plots development",
    "MVUTO developments",
  ],
});

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
