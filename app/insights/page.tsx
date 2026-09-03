import Link from "next/link";
import type { Metadata } from "next";
import { Newspaper, Megaphone, BarChart3, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Insights",
  description: "MVUTO blog, news updates, and Kenya Coast market research.",
};

const cards = [
  {
    href: "/blog",
    title: "Blog",
    description: "Guides on coastal land, titles, and investing with MVUTO.",
    icon: Newspaper,
  },
  {
    href: "/news",
    title: "News Updates",
    description: "Project releases, site visits, and company announcements.",
    icon: Megaphone,
  },
  {
    href: "/market-research",
    title: "Market Research",
    description: "Coast-region insights, reports, and buyer guides.",
    icon: BarChart3,
  },
];

export default function InsightsPage() {
  return (
    <div>
      <PageHero title="Insights" />
      <section className="bg-[#f5f2ed] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 lg:px-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-primary/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <card.icon className="mb-4 h-10 w-10 text-accent" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold text-primary">{card.title}</h2>
              <p className="mt-2 text-sm text-primary/70">{card.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:text-accent">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
