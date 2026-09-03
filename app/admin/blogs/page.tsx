"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import AdminButton from "@/components/admin/AdminButton";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/lib/supabase/types";
import { formatIsoDate } from "@/lib/admin/utils";
import { adminPath } from "@/lib/admin/path";
import { useWebsiteImport } from "@/lib/admin/useWebsiteImport";
import { propertyImageProps } from "@/lib/images";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const { importing, importMessage, runImport } = useWebsiteImport(
    "/api/admin/import-blogs",
    "Import all blog posts from the public website? Existing posts with the same ID will be updated."
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  return (
    <AdminShell title="Blogs" subtitle="Manage MVUTO articles shown on /blog">
      <div className="mb-6 flex flex-wrap justify-end gap-2">
        <AdminButton variant="secondary" loading={importing} onClick={() => runImport(load)}>
          <Download size={16} /> Import from website
        </AdminButton>
        <Link href={adminPath("blogs/new")}>
          <AdminButton>
            <Plus size={16} /> New Blog Post
          </AdminButton>
        </Link>
      </div>

      {importMessage && (
        <div
          className={`mb-6 rounded-xl px-4 py-3 text-sm ${
            importMessage.toLowerCase().includes("fail")
              ? "bg-red-50 text-red-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {importMessage}
        </div>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/40 border-t-accent" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/20 bg-white py-16 text-center">
          <p className="text-primary/60">No blog posts yet</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <AdminButton size="sm" variant="secondary" loading={importing} onClick={() => runImport(load)}>
              <Download size={14} /> Import from website
            </AdminButton>
            <Link href={adminPath("blogs/new")}>
              <AdminButton size="sm">Create first post</AdminButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm"
            >
              <div className="relative h-40">
                {post.image ? (
                  <Image
                    {...propertyImageProps(post.image)}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-primary/5" />
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    post.status === "published"
                      ? "bg-emerald-600 text-white"
                      : "bg-primary/70 text-white"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-accent">{post.category}</span>
                <h3 className="mt-1 line-clamp-2 font-bold text-primary">{post.title}</h3>
                <p className="mt-1 text-xs text-primary/50">
                  {formatIsoDate(post.published_at)} · {post.author}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link href={adminPath(`blogs/${post.id}`)} className="flex-1">
                    <AdminButton variant="outline" size="sm" className="w-full">
                      <Pencil size={14} /> Edit
                    </AdminButton>
                  </Link>
                  <AdminButton variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 size={14} className="text-red-500" />
                  </AdminButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
