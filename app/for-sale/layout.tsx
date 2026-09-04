import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Land & Plots for Sale in Kenya",
  description:
    "Browse titled land and plots for sale on Kenya's Coast. Chumani, Diani, Mariakani, Bofa and more — prices, deposits and flexible payment plans from MVUTO.",
  path: "/for-sale",
  keywords: [
    "land for sale Kenya",
    "plots for sale Kilifi",
    "land for sale Diani",
    "Mariakani plots",
    "Bofa land for sale",
    "Chumani plots for sale",
    "buy land Kenya payment plan",
  ],
});

export default function ForSaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
