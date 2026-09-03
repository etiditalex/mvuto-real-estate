import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Updates",
  description: "Project releases and company news from MVUTO Real Estate Ltd.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
