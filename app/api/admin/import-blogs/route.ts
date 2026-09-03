import { NextResponse } from "next/server";
import { requireAdminService } from "@/lib/admin/requireAdminService";
import { importCatalogBlogs } from "@/lib/blog/importCatalog";
import { STATIC_BLOG_POSTS } from "@/lib/blog/catalog";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const auth = await requireAdminService();
    if (!auth.ok) return auth.error;

    const result = await importCatalogBlogs(auth.serviceClient);

    return NextResponse.json({
      ...result,
      total: STATIC_BLOG_POSTS.length,
      message:
        result.failed === 0
          ? `Imported ${result.imported} blog posts from the website.`
          : `Imported ${result.imported} posts. ${result.failed} failed.`,
    });
  } catch (err) {
    console.error("[import-blogs]", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
