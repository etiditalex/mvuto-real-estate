import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Locations",
  description:
    "MVUTO prime land developments on Kenya's Coast — verified titles and flexible payment plans.",
};

export default function PrimeLocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
