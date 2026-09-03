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
