import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What MVUTO clients say about buying titled coastal land in Kenya.",
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
