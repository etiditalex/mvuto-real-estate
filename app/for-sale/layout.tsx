import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Browse land and properties for sale in Kenya. Prime locations in Coast region with flexible payment plans. Chumani, Diani, Mariakani, Bofa and more.",
  openGraph: {
    title: "Properties for Sale | MVUTO Real Estate Ltd",
    description:
      "Browse land and properties for sale in Kenya. Prime Coast region locations with flexible payment plans.",
  },
};

export default function ForSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
