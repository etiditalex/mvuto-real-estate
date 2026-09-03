import { NextResponse } from "next/server";
import { requireAdminService } from "@/lib/admin/requireAdminService";
import { importCatalogNews } from "@/lib/news/importCatalog";
import { STATIC_NEWS_CATALOG } from "@/lib/news/catalog";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const auth = await requireAdminService();
    if (!auth.ok) return auth.error;

    const result = await importCatalogNews(auth.serviceClient);

    return NextResponse.json({
      ...result,
      total: STATIC_NEWS_CATALOG.length,
      message:
        result.failed === 0
          ? `Imported ${result.imported} news updates from the website.`
          : `Imported ${result.imported} news updates. ${result.failed} failed.`,
    });
  } catch (err) {
    console.error("[import-news]", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
