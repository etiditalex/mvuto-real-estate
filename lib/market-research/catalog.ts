import type { BlogListItem } from "@/lib/blog/catalog";

export const MARKET_RESEARCH_CATEGORY = "Market Research";

export function isMarketResearchPost(category: string | null | undefined): boolean {
  return (category || "").trim().toLowerCase() === MARKET_RESEARCH_CATEGORY.toLowerCase();
}

export type WebsiteMarketReport = {
  id: number;
  title: string;
  description: string;
  report_date: string;
  report_type: string;
  sort_order: number;
  file_url?: string | null;
};

export type WebsiteMarketInsight = {
  id: number;
  icon: string;
  title: string;
  value: string;
  description: string;
  sort_order: number;
};

export const STATIC_MARKET_INSIGHTS: WebsiteMarketInsight[] = [
  {
    id: 1,
    icon: "TrendingUp",
    title: "Coast Demand",
    value: "Strong",
    description: "Kilifi and South Coast continue to attract titled-land buyers and diaspora capital.",
    sort_order: 0,
  },
  {
    id: 2,
    icon: "MapPin",
    title: "Active Corridors",
    value: "6+",
    description: "Chumani, Diani, Bofa, Mariakani, Kaloleni, and Kibao Kiche in the current MVUTO portfolio.",
    sort_order: 1,
  },
  {
    id: 3,
    icon: "BarChart3",
    title: "Payment Plans",
    value: "12 mo",
    description: "Structured deposits and monthly instalments keep ownership accessible without rushing buyers.",
    sort_order: 2,
  },
];

export const STATIC_MARKET_REPORTS: WebsiteMarketReport[] = [
  {
    id: 1,
    title: "Kenya Coast Land Outlook 2026",
    description:
      "A practical overview of titled-land demand along Kilifi and the South Coast — corridors, buyer profiles, and what due diligence should cover.",
    report_date: "2026-01-15",
    report_type: "Market Report",
    sort_order: 0,
  },
  {
    id: 2,
    title: "First-Time Buyer Guide: Coastal Plots",
    description:
      "How to compare locations, read a payment plan, and move from site visit to title with MVUTO advisory support.",
    report_date: "2025-11-20",
    report_type: "Investment Guide",
    sort_order: 1,
  },
];

export const STATIC_MARKET_ARTICLES: BlogListItem[] = [
  {
    id: 9001,
    title: "Kenya Coast Land Outlook 2026",
    excerpt:
      "A practical overview of titled-land demand along Kilifi and the South Coast — corridors, buyer profiles, and what due diligence should cover.",
    author: "MVUTO Investment Team",
    date: "2026-01-15",
    image: "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg",
    category: MARKET_RESEARCH_CATEGORY,
    slug: "kenya-coast-land-outlook-2026",
    content_html: `<p>Kenya's Coast continues to draw titled-land buyers who want a clear location story, flexible payment plans, and documentation they can verify before they pay a deposit.</p><p>Demand is concentrated along corridors MVUTO already works in: Kilifi (including Chumani and Bofa), Diani, Mariakani, Kaloleni, and Kibao Kiche. Diaspora buyers and local families are both active, and they tend to compare access, services, and title status before price.</p><h2>What this outlook covers</h2><ul><li>Which corridors are seeing the most enquiry</li><li>How buyer profiles differ between Kilifi and the South Coast</li><li>The due diligence a serious buyer should complete before committing</li></ul><p>Speak to the MVUTO team if you want this outlook applied to a specific plot or payment plan.</p>`,
  },
  {
    id: 9002,
    title: "First-Time Buyer Guide: Coastal Plots",
    excerpt:
      "How to compare locations, read a payment plan, and move from site visit to title with MVUTO advisory support.",
    author: "MVUTO Investment Team",
    date: "2025-11-20",
    image: "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    category: MARKET_RESEARCH_CATEGORY,
    slug: "first-time-buyer-guide-coastal-plots",
    content_html: `<p>A first coastal plot purchase is easier when the steps are visible: compare locations, read the payment plan, visit the site, and confirm the title before you pay.</p><p>MVUTO structures deposits and monthly instalments so ownership stays accessible without rushing the paperwork. Typical timelines run about twelve months, depending on the project.</p><h2>Before you reserve a plot</h2><ul><li>Match the location to how you will use the land</li><li>Confirm the title and what due diligence is already on file</li><li>Read the instalment schedule against your own cash flow</li></ul><p>Start with the current listings, then contact the team to walk through a specific site.</p>`,
  },
];
