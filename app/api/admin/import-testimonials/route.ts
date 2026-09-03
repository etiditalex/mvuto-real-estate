import { NextResponse } from "next/server";
import { requireAdminService } from "@/lib/admin/requireAdminService";
import { importCatalogTestimonials } from "@/lib/testimonials/importCatalog";
import { STATIC_TESTIMONIALS } from "@/lib/testimonials/catalog";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const auth = await requireAdminService();
    if (!auth.ok) return auth.error;

    const result = await importCatalogTestimonials(auth.serviceClient);

    return NextResponse.json({
      ...result,
      total: STATIC_TESTIMONIALS.length,
      message:
        result.failed === 0
          ? `Imported ${result.imported} testimonials from the website.`
          : `Imported ${result.imported} testimonials. ${result.failed} failed.`,
    });
  } catch (err) {
    console.error("[import-testimonials]", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
