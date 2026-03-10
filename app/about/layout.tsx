import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MVUTO Real Estate Ltd. Your trusted partner for land and property in Kenya. Expertise in Coast region, land acquisition and investment.",
  openGraph: {
    title: "About Us | MVUTO Real Estate Ltd",
    description:
      "Your trusted partner for land and property in Kenya. Expertise in Coast region and investment facilitation.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
