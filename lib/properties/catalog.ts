export type PropertyType = "all" | "residential" | "commercial" | "beach" | "farm" | "affordable";

export interface CatalogProperty {
  id: number;
  slug: string;
  title: string;
  location: string;
  type: PropertyType | string;
  price: string;
  size: string;
  bedrooms?: number;
  image: string | null;
  featured?: boolean;
  status?: "available" | "ongoing" | "sold";
  features?: string[];
  paymentPlan?: Record<string, string>;
  created_at?: string;
}

export const STATIC_PROPERTY_CATALOG: CatalogProperty[] = [
  {
    id: 1,
    slug: "chumani",
    title: "Chumani Project",
    location: "Kilifi County",
    type: "residential",
    price: "550,000",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Chumani_project_xbvsj7.jpg",
    status: "available",
    featured: true,
    features: [
      "Prime land in Kilifi County",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "200,000",
      Installments: "12 monthly installments",
    },
  },
  {
    id: 2,
    slug: "mariakani-kaloleni",
    title: "Mariakani–Kaloleni",
    location: "Mariakani, Coast Region",
    type: "residential",
    price: "585,000",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_-Kaloleni_dadglm.jpg",
    status: "available",
    featured: true,
    features: [
      "Mariakani–Kaloleni corridor",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "200,000",
      Installments: "12 monthly installments",
    },
  },
  {
    id: 3,
    slug: "mariakani-bypass",
    title: "Mariakani Bypass",
    location: "Mariakani, Coast Region",
    type: "residential",
    price: "350,000",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_Bypass_qqjx8n.jpg",
    status: "available",
    featured: true,
    features: [
      "Mariakani Bypass location",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "150,000",
      Installments: "12 monthly installments",
    },
  },
  {
    id: 4,
    slug: "diani",
    title: "Diani Project",
    location: "Diani, South Coast",
    type: "beach",
    price: "1.95M",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    status: "available",
    featured: true,
    features: [
      "Diani, South Coast",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "700,000",
      Installments: "12 monthly installments",
    },
  },
  {
    id: 5,
    slug: "bofa",
    title: "Bofa Project",
    location: "Kilifi County",
    type: "beach",
    price: "1.85M",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Bofa_Project_slgq2b.jpg",
    status: "available",
    featured: false,
    features: [
      "Bofa, Kilifi County",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "700,000",
      Installments: "12 monthly installments",
    },
  },
  {
    id: 6,
    slug: "kibao-kiche",
    title: "Kibao Kiche",
    location: "Coast Region",
    type: "residential",
    price: "550,000",
    size: "Plot",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Kibao_Kiche_eryng5.jpg",
    status: "available",
    featured: false,
    features: [
      "Kibao Kiche, Coast Region",
      "Flexible payment plan",
      "Verified, legally compliant offering",
    ],
    paymentPlan: {
      Deposit: "200,000",
      Installments: "12 monthly installments",
    },
  },
];

export function propertyPublicPath(property: { slug?: string | null; id: number | string }): string {
  return `/for-sale/${property.slug || property.id}`;
}

export function getPaymentField(
  plan: Record<string, string> | undefined,
  keys: string[]
): string {
  if (!plan) return "";
  for (const key of keys) {
    const match = Object.entries(plan).find(([k]) => k.toLowerCase() === key.toLowerCase());
    if (match?.[1]) return match[1];
  }
  return "";
}
