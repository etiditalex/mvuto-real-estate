import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property & Land Investment Blog | Kenya Coast",
  description:
    "Expert articles on land for sale on Kenya's Coast — Kilifi, Diani, Mariakani — titles, payment plans, and buying with MVUTO.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
