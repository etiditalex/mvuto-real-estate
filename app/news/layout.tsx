import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates | Kenya Coast",
  description:
    "Latest project releases and company news from MVUTO Real Estate — Kilifi, Diani, Mariakani, and the Coast.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
