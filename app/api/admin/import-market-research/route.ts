import { NextResponse } from "next/server";
import { requireAdminService } from "@/lib/admin/requireAdminService";
import { importCatalogMarketResearch } from "@/lib/market-research/importCatalog";
import {
  STATIC_MARKET_INSIGHTS,
  STATIC_MARKET_REPORTS,
} from "@/lib/market-research/catalog";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const auth = await requireAdminService();
    if (!auth.ok) return auth.error;

    const result = await importCatalogMarketResearch(auth.serviceClient);
    const imported = result.reports.imported + result.insights.imported;
    const failed = result.reports.failed + result.insights.failed;

    return NextResponse.json({
      ...result,
      total: STATIC_MARKET_REPORTS.length + STATIC_MARKET_INSIGHTS.length,
      message:
        failed === 0
          ? `Imported ${imported} market research items from the website.`
          : `Imported ${imported} items. ${failed} failed.`,
    });
  } catch (err) {
    console.error("[import-market-research]", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
