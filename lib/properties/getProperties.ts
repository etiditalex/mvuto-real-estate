import { createClient } from "@supabase/supabase-js";
import type { Property } from "@/lib/supabase/types";
import { STATIC_PROPERTY_CATALOG, type CatalogProperty } from "./catalog";
import { mapDbPropertyToDetail, type PropertyDetail } from "./mapProperty";
import { parseGalleryUrls } from "@/lib/images";
import {
  getAvailableProperties,
  getHomepageProperties,
  sortPropertiesNewestFirst,
} from "./sortProperties";

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function parsePaymentPlan(value: unknown): Record<string, string> | undefined {
  if (!value) return undefined;
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, string>;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Record<string, string>;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export function getStaticCatalog(): CatalogProperty[] {
  return sortPropertiesNewestFirst(STATIC_PROPERTY_CATALOG);
}

export function getStaticPropertyDetail(idOrSlug: string): PropertyDetail | null {
  const match = STATIC_PROPERTY_CATALOG.find(
    (p) => p.slug === idOrSlug || String(p.id) === idOrSlug
  );
  if (!match) return null;
  return {
    id: match.id,
    slug: match.slug,
    title: match.title,
    location: match.location,
    type: match.type,
    price: match.price,
    size: match.size,
    image: match.image,
    gallery: match.image ? [match.image] : [],
    features: match.features ?? [],
    paymentPlan: match.paymentPlan,
    description:
      "Prime land in a high-growth location. This offering is part of our verified, legally compliant portfolio with flexible payment plans to suit your investment goals.",
    status: match.status,
  };
}

export async function fetchPublishedProperties(): Promise<CatalogProperty[]> {
  const supabase = getPublicClient();
  if (!supabase) return getStaticCatalog();

  const { data } = await supabase
    .from("properties")
    .select(
      "id, slug, title, location, type, price, size, bedrooms, image, gallery, featured, status, features, payment_plan, created_at"
    )
    .eq("published", true)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (!data?.length) return getStaticCatalog();

  const mapped = data.map((p) => {
    const image = parseGalleryUrls(p.gallery, p.image)[0] ?? p.image;
    return {
      id: p.id,
      slug: p.slug || String(p.id),
      title: p.title,
      location: p.location,
      type: p.type,
      price: p.price,
      size: p.size,
      bedrooms: p.bedrooms ?? undefined,
      image,
      featured: p.featured,
      status: p.status as CatalogProperty["status"],
      features: (p.features as string[]) ?? [],
      paymentPlan: parsePaymentPlan(p.payment_plan),
      created_at: p.created_at ?? undefined,
    };
  });

  return sortPropertiesNewestFirst(mapped);
}

export async function fetchPropertyDetail(idOrSlug: string): Promise<PropertyDetail | null> {
  const supabase = getPublicClient();
  if (supabase) {
    const numeric = Number(idOrSlug);
    const byId = Number.isInteger(numeric) && String(numeric) === idOrSlug;

    const query = supabase.from("properties").select("*").eq("published", true);
    const { data } = byId
      ? await query.eq("id", numeric).maybeSingle()
      : await query.eq("slug", idOrSlug).maybeSingle();

    if (data) return mapDbPropertyToDetail(data as Property);
  }
  return getStaticPropertyDetail(idOrSlug);
}

export async function fetchFeaturedProperties(limit = 4): Promise<CatalogProperty[]> {
  return getHomepageProperties(await fetchPublishedProperties(), limit);
}

export async function fetchEmergingProperties(limit = 6): Promise<CatalogProperty[]> {
  const all = await fetchPublishedProperties();
  const emerging = all.filter((p) => !p.featured && p.status !== "sold");
  const source = emerging.length ? emerging : getAvailableProperties(all).slice(-limit);
  return sortPropertiesNewestFirst(source).slice(0, limit);
}
