import type { SupabaseClient } from "@supabase/supabase-js";
import { STATIC_PROPERTY_CATALOG } from "@/lib/properties/catalog";
import { mapDetailToDbRow } from "@/lib/properties/mapProperty";
import { parsePriceAmount } from "@/lib/admin/utils";

export type ImportCatalogResult = {
  imported: number;
  failed: number;
  errors: string[];
  titles: string[];
};

export async function importCatalogProperties(
  supabase: SupabaseClient
): Promise<ImportCatalogResult> {
  const result: ImportCatalogResult = {
    imported: 0,
    failed: 0,
    errors: [],
    titles: [],
  };

  for (const catalog of STATIC_PROPERTY_CATALOG) {
    const row = {
      ...mapDetailToDbRow({
        id: catalog.id,
        slug: catalog.slug,
        title: catalog.title,
        location: catalog.location,
        type: catalog.type,
        price: catalog.price,
        size: catalog.size,
        image: catalog.image,
        gallery: catalog.image ? [catalog.image] : [],
        features: catalog.features ?? [],
        paymentPlan: catalog.paymentPlan,
        description:
          "Prime land in a high-growth location. This offering is part of our verified, legally compliant portfolio with flexible payment plans to suit your investment goals.",
        status: catalog.status,
      }),
      featured: catalog.featured ?? false,
      price_amount: parsePriceAmount(catalog.price),
    };

    const { error } = await supabase.from("properties").upsert(row, { onConflict: "slug" });
    if (error) {
      result.failed += 1;
      result.errors.push(`${catalog.title}: ${error.message}`);
    } else {
      result.imported += 1;
      result.titles.push(catalog.title);
    }
  }

  return result;
}
