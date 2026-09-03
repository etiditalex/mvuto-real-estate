import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Research",
  description: "Kenya Coast land market insights, reports, and buyer guides from MVUTO.",
};

export default function MarketResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
