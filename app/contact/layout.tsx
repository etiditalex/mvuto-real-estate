import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MVUTO Real Estate Ltd. Phone, email and location. We're here to help with land sales, property advisory and investment in Kenya.",
  openGraph: {
    title: "Contact Us | MVUTO Real Estate Ltd",
    description:
      "Get in touch with MVUTO Real Estate. We're here to help with land and property in Kenya.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
