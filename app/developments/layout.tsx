import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developments",
  description:
    "Explore MVUTO Real Estate developments. Prime and emerging locations in Kenya. Land and property projects in Coast region.",
  openGraph: {
    title: "Developments | MVUTO Real Estate Ltd",
    description:
      "Explore our developments. Prime and emerging locations in Kenya.",
  },
};

export default function DevelopmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
