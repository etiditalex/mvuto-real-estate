import type { Metadata } from "next";
import {
  COMPANY_EMAIL,
  COMPANY_LOCATION,
  COMPANY_NAME,
  COMPANY_PHONE_E164,
  DEFAULT_OG_IMAGE,
  LOGO_URL,
  SITE_URL,
} from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
};

export const DEFAULT_KEYWORDS = [
  "MVUTO Real Estate",
  "land for sale Kenya",
  "plots for sale Kenya Coast",
  "land for sale Kilifi",
  "land for sale Diani",
  "Mariakani plots for sale",
  "Bofa land for sale",
  "titled land Kenya",
  "buy land Kenya payment plan",
  "Kenya Coast real estate",
  "Kilifi property investment",
  "Mombasa real estate",
  "Chumani plots",
];

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "land-sales": {
    slug: "land-sales",
    title: "Land Sales & Marketing",
    description:
      "Buy verified, legally compliant land in prime high-growth locations across Kenya's Coast. MVUTO lists titled plots for homes, development and investment.",
    keywords: [
      "land for sale Kenya",
      "plots for sale Kenya Coast",
      "titled land Kenya",
      "MVUTO land sales",
    ],
  },
  acquisition: {
    slug: "acquisition",
    title: "Land Acquisition Consulting",
    description:
      "End-to-end land acquisition support in Kenya — from choosing a Coast plot to ownership transfer, titles and a secure buying process with MVUTO.",
    keywords: [
      "land acquisition Kenya",
      "buy land Kenya",
      "land buying process Kenya",
      "Coast land consultant",
    ],
  },
  investment: {
    slug: "investment",
    title: "Real Estate Investment Guidance",
    description:
      "Investment guidance for Kenya Coast land — Kilifi, Diani and Mariakani plots chosen for growth, access and long-term value.",
    keywords: [
      "Kenya land investment",
      "invest in Kilifi land",
      "Coast real estate investment",
      "plots for investment Kenya",
    ],
  },
  "due-diligence": {
    slug: "due-diligence",
    title: "Due Diligence & Verification",
    description:
      "Title search, ownership verification and legal compliance for land purchases in Kenya. MVUTO checks documents so your Coast plot is safe to buy.",
    keywords: [
      "land due diligence Kenya",
      "title deed verification Kenya",
      "land search Kenya",
      "verified plots Coast",
    ],
  },
  support: {
    slug: "support",
    title: "Client Support & After-Sales",
    description:
      "Post-purchase support from MVUTO — site visits, paperwork follow-up and guidance after you buy titled land on Kenya's Coast.",
    keywords: [
      "land after sales Kenya",
      "MVUTO client support",
      "title deed handover Kenya",
    ],
  },
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is MVUTO Real Estate?",
    answer:
      "MVUTO Real Estate Ltd is a Kenyan real estate firm that sells verified, titled land on Kenya's Coast. We help buyers and investors acquire plots in locations such as Kilifi, Diani, Mariakani and Bofa, with flexible payment plans and guidance from first enquiry to title deed.",
  },
  {
    question: "Where does MVUTO sell land in Kenya?",
    answer:
      "MVUTO focuses on Kenya's Coast Region. Current and featured projects include Chumani and Bofa in Kilifi County, Diani on the South Coast, Mariakani–Kaloleni, Mariakani Bypass and Kibao Kiche.",
  },
  {
    question: "Can I buy a plot from MVUTO on a payment plan?",
    answer:
      "Yes. Most MVUTO projects accept a deposit plus monthly instalments, typically over 12 months. Deposit amounts and balances vary by project — for example Chumani and Mariakani plans start from a KSh 150,000–200,000 deposit.",
  },
  {
    question: "Are MVUTO plots titled and legally verified?",
    answer:
      "Yes. MVUTO lists verified, legally compliant land. Due diligence covers ownership, title documentation and compliance so buyers can proceed with clearer risk.",
  },
  {
    question: "How do I start buying land with MVUTO?",
    answer:
      "Browse plots on the For Sale page, open a project for price and payment details, then enquire via the contact form, phone +254 798 359 389, or WhatsApp. The team can arrange a site visit and walk you through documentation.",
  },
];

export const SALE_FAQS: FaqItem[] = [
  {
    question: "What land is currently for sale with MVUTO?",
    answer:
      "MVUTO lists titled Coast plots including Chumani and Bofa in Kilifi, Diani on the South Coast, Mariakani–Kaloleni, Mariakani Bypass and Kibao Kiche. Prices, deposits and instalment terms are shown on each property page.",
  },
  {
    question: "How much does a plot cost on the Kenya Coast?",
    answer:
      "Prices depend on location and size. MVUTO listings have included plots from about KSh 350,000 at Mariakani Bypass to around KSh 1.95 million in Diani. Check the live For Sale catalogue for current asking prices.",
  },
  {
    question: "Do I need to pay the full amount upfront?",
    answer:
      "No. Flexible payment plans are a core part of MVUTO offerings. You typically pay a deposit and clear the balance in monthly instalments. Exact terms are listed on each project.",
  },
];

export const ABOUT_FAQS: FaqItem[] = [
  {
    question: "Who is behind MVUTO Real Estate?",
    answer:
      "MVUTO Real Estate Ltd is a Kenya-based firm focused on coastal land sales, acquisition advice and investment facilitation. The company works with families and global investors who want secure ownership on the Coast.",
  },
  {
    question: "What does MVUTO stand for as a land partner?",
    answer:
      "MVUTO's values are client-first service, integrity, transparency, accountability and professionalism — with verified titles, clear pricing and support through handover.",
  },
];

export const CONTACT_FAQS: FaqItem[] = [
  {
    question: "How can I contact MVUTO Real Estate?",
    answer:
      "Call +254 798 359 389, email info@mvuto.co.ke, use the website contact form, or chat on WhatsApp. The team is based on Kenya's Coast and handles enquiries about plots, site visits and payment plans.",
  },
  {
    question: "Can I book a site visit?",
    answer:
      "Yes. Send a message with the project you want to see — for example Chumani, Diani or Mariakani — and the team will schedule a viewing.",
  },
];

export const PRIME_FAQS: FaqItem[] = [
  {
    question: "What are MVUTO prime locations?",
    answer:
      "Prime locations are high-demand Coast corridors chosen for access, growth and long-term value. They include Kilifi (Chumani, Bofa), Diani on the South Coast, and Mariakani.",
  },
  {
    question: "Why invest in Kenya Coast land?",
    answer:
      "Coast land near growing towns and tourism corridors can offer accessible entry prices, titled ownership and demand from home builders and investors. MVUTO focuses on verified plots with structured payment plans.",
  },
];

export const EMERGING_FAQS: FaqItem[] = [
  {
    question: "What are MVUTO emerging locations?",
    answer:
      "Emerging locations are Coast growth corridors with accessible entry prices and rising demand — including areas such as Kibao Kiche and Bofa in Kilifi — still with verified titles and payment plans.",
  },
  {
    question: "Is emerging Coast land a good first investment?",
    answer:
      "It can be. Lower entry prices and structured deposits make emerging plots a common first purchase. MVUTO still verifies titles so you are not trading security for affordability.",
  },
];

export const SERVICES_FAQS: FaqItem[] = [
  {
    question: "What services does MVUTO offer?",
    answer:
      "MVUTO provides land sales and marketing, land acquisition consulting, investment guidance, due diligence and title verification, plus after-sales client support across Kenya's Coast.",
  },
  {
    question: "Does MVUTO help with title searches?",
    answer:
      "Yes. The due diligence service covers ownership checks, title deeds, land searches and legal compliance before you complete a purchase.",
  },
];

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

function absoluteUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const ogTitle = `${title} | ${COMPANY_NAME}`;

  return {
    title: {
      default: title,
      template: `%s | ${COMPANY_NAME}`,
    },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: "en_KE",
      url,
      siteName: COMPANY_NAME,
      title: ogTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    legalName: COMPANY_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: DEFAULT_OG_IMAGE,
    description:
      "Kenyan real estate firm specialising in titled land for sale on the Coast — Kilifi, Diani, Mariakani and Bofa — with flexible payment plans and verified documentation.",
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_E164,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Kenya Coast" },
      { "@type": "AdministrativeArea", name: "Kilifi County" },
      { "@type": "City", name: "Diani" },
      { "@type": "City", name: "Mariakani" },
      { "@type": "Country", name: "Kenya" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Coast Region",
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_PHONE_E164,
        email: COMPANY_EMAIL,
        contactType: "sales",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    knowsAbout: [
      "Land for sale Kenya Coast",
      "Titled plots Kilifi",
      "Diani real estate",
      "Land payment plans Kenya",
    ],
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
      "https://www.tiktok.com/",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-KE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-KE",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-aeo-answer]"],
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function propertyOfferSchema(property: {
  title: string;
  description?: string;
  location: string;
  price: string;
  image?: string | null;
  slug: string;
}) {
  const url = `${SITE_URL}/for-sale/${property.slug}`;
  const numericPrice = property.price.replace(/[^\d.]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description:
      property.description ||
      `${property.title} — titled land in ${property.location} listed by ${COMPANY_NAME}.`,
    url,
    image: property.image || DEFAULT_OG_IMAGE,
    areaServed: { "@type": "Place", name: property.location },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: numericPrice || undefined,
      availability: "https://schema.org/InStock",
      url,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function howToBuyLandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to buy titled land on Kenya's Coast with MVUTO",
    description:
      "Steps to buy a verified plot in Kilifi, Diani, Mariakani or Bofa with MVUTO Real Estate.",
    totalTime: "P30D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Browse plots for sale",
        text: "Review MVUTO listings on the For Sale page. Compare location, size, price and payment plan for projects such as Chumani, Diani and Mariakani.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enquire or book a site visit",
        text: "Contact MVUTO by phone, WhatsApp or the website form. Share the project you want and request a viewing.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Complete due diligence",
        text: "MVUTO verifies ownership and title documents so you can proceed with a legally compliant purchase.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Pay the deposit and instalments",
        text: "Secure the plot with the listed deposit, then complete the balance on the project's monthly payment plan.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Receive your title",
        text: "MVUTO supports paperwork through to title deed handover so ownership is clear.",
      },
    ],
  };
}

export function articleSchemaExtra(input: {
  title: string;
  description: string;
  image?: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.date,
    dateModified: input.date,
    author: {
      "@type": "Organization",
      name: input.author,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${input.slug}`,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export { COMPANY_LOCATION, LOGO_URL, SITE_URL };
