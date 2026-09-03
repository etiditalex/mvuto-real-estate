import type { Property } from "@/lib/supabase/types";
import { parseGalleryUrls } from "@/lib/images";
import { parsePriceAmount, slugify } from "@/lib/admin/utils";

export type PropertyDetail = {
  id: number;
  slug: string;
  title: string;
  h1?: string;
  location: string;
  type: string;
  price: string;
  size: string;
  bedrooms?: number;
  image: string | null;
  mapLink?: string;
  gallery?: string[];
  description?: string;
  features?: string[];
  pricing?: Record<string, string>;
  paymentPlan?: Record<string, string>;
  quickInfo?: Record<string, string>;
  status?: string;
};

function asRecord(value: unknown): Record<string, string> {
  if (!value) return {};
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, string>;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Record<string, string>;
    } catch {
      return {};
    }
  }
  return {};
}

export function mapDbPropertyToDetail(db: Property): PropertyDetail {
  const gallery = parseGalleryUrls(db.gallery, db.image);
  const image = gallery[0] ?? db.image ?? null;
  const slug = db.slug || slugify(db.title) || String(db.id);

  return {
    id: db.id,
    slug,
    title: db.title,
    h1: db.h1 ?? undefined,
    location: db.location,
    type: db.type,
    price: db.price,
    size: db.size,
    bedrooms: db.bedrooms ?? undefined,
    image,
    mapLink: db.map_link ?? undefined,
    gallery,
    description: db.description ?? undefined,
    features: db.features ?? [],
    pricing: db.pricing ?? {},
    paymentPlan: asRecord(db.payment_plan),
    quickInfo: db.quick_info ?? {},
    status: db.status,
  };
}

export function mapDetailToDbRow(detail: PropertyDetail) {
  const priceAmount = parsePriceAmount(detail.price);
  return {
    slug: detail.slug,
    title: detail.title,
    location: detail.location,
    type: detail.type,
    price: detail.price,
    price_amount: priceAmount,
    size: detail.size,
    image: detail.image || "",
    gallery: detail.gallery ?? (detail.image ? [detail.image] : []),
    status: detail.status ?? "available",
    features: detail.features ?? [],
    description: detail.description ?? null,
    h1: detail.h1 ?? null,
    map_link: detail.mapLink ?? null,
    pricing: detail.pricing ?? {},
    payment_plan: detail.paymentPlan ?? {},
    quick_info: detail.quickInfo ?? {},
    published: true,
  };
}
