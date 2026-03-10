import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Land sales, acquisition consulting, investment guidance, due diligence and client support. Full real estate services across Kenya from MVUTO Real Estate Ltd.",
  openGraph: {
    title: "Our Services | MVUTO Real Estate Ltd",
    description:
      "Land sales, acquisition, investment guidance and due diligence. Full real estate services in Kenya.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
