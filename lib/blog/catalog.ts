export type BlogListItem = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  content_html?: string;
};

export const STATIC_BLOG_POSTS: BlogListItem[] = [
  {
    id: 1,
    title: "Why Kenya's Coast Remains a Strong Land Investment",
    excerpt:
      "Kilifi, Diani, and Mariakani continue to attract diaspora and local buyers who want titled land, flexible payment plans, and long-term coastal value.",
    author: "MVUTO Investment Team",
    date: "2026-03-12",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg",
    category: "Investment",
    slug: "kenya-coast-land-investment",
    content_html: `<p>Kenya's Coast remains one of the country's most consistent land markets — driven by tourism, infrastructure, and demand from both local families and the diaspora.</p><p>At MVUTO Real Estate, we focus on verified titles, clear payment plans, and sites with genuine long-term demand: Kilifi, Diani, Mariakani, Bofa, and emerging corridors such as Kibao Kiche.</p><h2>What buyers should look for</h2><ul><li>A verified title and clean due diligence</li><li>A payment plan you can complete without pressure</li><li>Access, services, and a location with real demand</li></ul><p>If you are comparing plots, start with our current listings and speak to the team before you pay a deposit.</p>`,
  },
  {
    id: 2,
    title: "From Enquiry to Title Deed: How MVUTO Guides Buyers",
    excerpt:
      "Secure ownership is a process — site visit, due diligence, payments, and handover. Here is how we keep clients informed at every step.",
    author: "MVUTO Investment Team",
    date: "2026-02-18",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1788437007/who_we_are_lys4wa.jpg",
    category: "Buying Guide",
    slug: "enquiry-to-title-deed",
    content_html: `<p>Buying land should not feel unclear. MVUTO walks clients from first enquiry to title deed with verified documentation and regular updates.</p><p>Typical steps include a site visit, due diligence, a written payment plan, and handover once the process is complete. You always know where your plot, paperwork, and payments stand.</p><p>Ready to start? Contact the team or browse current projects on the For Sale page.</p>`,
  },
  {
    id: 3,
    title: "Kilifi vs Diani: Choosing a Coastal Plot",
    excerpt:
      "Both markets offer beach-adjacent growth — but price, lifestyle, and payment plans differ. A practical comparison for first-time coastal buyers.",
    author: "MVUTO Investment Team",
    date: "2026-01-22",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    category: "Locations",
    slug: "kilifi-vs-diani-coastal-plots",
    content_html: `<p>Kilifi and Diani both sit on Kenya's Coast, yet they serve slightly different buyer goals.</p><p>Kilifi (including Chumani and Bofa) often suits buyers looking for accessible entry prices and growing residential demand. Diani typically commands a premium for its South Coast beach economy and tourism pull.</p><p>MVUTO lists both — with verified titles and flexible plans. Visit the sites, compare payment terms, and choose the location that matches your horizon.</p>`,
  },
];
