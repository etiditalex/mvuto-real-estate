export type WebsiteNewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
  details?: string[];
};

export const STATIC_NEWS_CATALOG: WebsiteNewsItem[] = [
  {
    id: 1,
    title: "New Plots Released in Chumani, Kilifi",
    excerpt:
      "MVUTO has opened a fresh allocation at the Chumani Project — titled plots with a 12-month payment plan and guided site visits.",
    date: "2026-04-08",
    category: "Project Update",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Chumani_project_xbvsj7.jpg",
    featured: true,
    details: [
      "Verified titles and due diligence support",
      "Deposit from KES 200,000",
      "Book a weekend site visit with the MVUTO team",
    ],
  },
  {
    id: 2,
    title: "Diani Project: Flexible Plans for South Coast Buyers",
    excerpt:
      "Demand on the South Coast remains strong. The Diani Project continues with structured deposits and monthly instalments.",
    date: "2026-03-21",
    category: "Company News",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    featured: false,
    details: [
      "Beach-adjacent growth corridor",
      "Deposit from KES 700,000",
      "Speak to advisory for current availability",
    ],
  },
  {
    id: 3,
    title: "Mariakani Corridor Attracts First-Time Investors",
    excerpt:
      "Mariakani Bypass and Mariakani–Kaloleni remain accessible entry points for buyers who want Coast-region land without a beach premium.",
    date: "2026-02-05",
    category: "Market Update",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_Bypass_qqjx8n.jpg",
    featured: false,
    details: [
      "Bypass and Kaloleni corridor options",
      "Entry prices from KES 350,000",
      "Guided visits available on request",
    ],
  },
];
