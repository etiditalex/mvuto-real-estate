import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "MVUTO insights on Kenya Coast land, titles, payment plans, and buying with confidence.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
