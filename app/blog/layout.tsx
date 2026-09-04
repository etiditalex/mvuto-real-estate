import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Property & Land Investment Blog",
  description:
    "Guides on buying titled land on Kenya's Coast — Kilifi, Diani and Mariakani plots, payment plans, titles and investing with MVUTO Real Estate.",
  path: "/blog",
  keywords: [
    "Kenya land buying guide",
    "Kilifi land blog",
    "how to buy land Kenya Coast",
    "title deed Kenya",
    "MVUTO blog",
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
