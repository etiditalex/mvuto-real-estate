"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminInput, AdminTextarea, AdminSelect } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import AdminButton from "@/components/admin/AdminButton";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost, ContentStatus } from "@/lib/supabase/types";
import { slugify } from "@/lib/admin/utils";
import { adminPath } from "@/lib/admin/path";

const empty: Partial<BlogPost> = {
  title: "",
  excerpt: "",
  author: "MVUTO Investment Team",
  published_at: new Date().toISOString().split("T")[0],
  image: "",
  category: "Investment",
  slug: "",
  content_html: "",
  status: "draft",
};

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

type BlogFormProps = { postId?: number };

export default function BlogFormPage({ postId }: BlogFormProps) {
  const router = useRouter();
  const isEdit = Boolean(postId);
  const [form, setForm] = useState<Partial<BlogPost>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) return;
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("blog_posts").select("*").eq("id", postId).single();
      if (data) setForm(data as BlogPost);
    }
    load();
  }, [postId]);

  const update = (key: keyof BlogPost, value: unknown) =>
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !isEdit) {
        next.slug = slugify(value as string);
      }
      return next;
    });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const supabase = createClient();
    const payload = {
      title: form.title?.trim() || "",
      excerpt: form.excerpt?.trim() || "",
      author: form.author?.trim() || "MVUTO Investment Team",
      published_at: (form.published_at || "").slice(0, 10),
      image: form.image || "",
      category: form.category?.trim() || "Investment",
      slug: form.slug?.trim() || slugify(form.title || ""),
      content_html: form.content_html || "",
      hero_title: form.hero_title || form.title,
      hero_image_alt: form.hero_image_alt || form.title,
      status: form.status || "draft",
    };
    if (!payload.title || !payload.excerpt || !payload.slug || !payload.image) {
      setSaving(false);
      setError("Title, excerpt, slug, and image are required.");
      return;
    }
    const { error: saveError } = isEdit
      ? await supabase.from("blog_posts").update(payload).eq("id", postId!)
      : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    router.push(adminPath("blogs"));
  };

  return (
    <AdminShell
      title={isEdit ? "Edit Blog" : "New Blog"}
      subtitle="Published posts appear on /blog"
    >
      <div className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <AdminInput
          label="Title"
          value={form.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
        <AdminInput
          label="Slug"
          value={form.slug || ""}
          onChange={(e) => update("slug", e.target.value)}
          hint="URL: /blog/[slug]"
        />
        <AdminInput
          label="Category"
          value={form.category || ""}
          onChange={(e) => update("category", e.target.value)}
        />
        <AdminInput
          label="Author"
          value={form.author || ""}
          onChange={(e) => update("author", e.target.value)}
        />
        <AdminInput
          label="Published Date"
          type="date"
          value={(form.published_at || "").slice(0, 10)}
          onChange={(e) => update("published_at", e.target.value)}
        />
        <ImageUpload
          label="Hero image"
          value={form.image || ""}
          onChange={(url) => update("image", url)}
          folder="blogs"
        />
        <AdminTextarea
          label="Excerpt"
          value={form.excerpt || ""}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={3}
        />
        <AdminTextarea
          label="Article Content (HTML)"
          value={form.content_html || ""}
          onChange={(e) => update("content_html", e.target.value)}
          rows={12}
          hint="Use HTML tags: <p>, <h2>, <ul>, <li>, <strong>"
        />
        <AdminSelect
          label="Status"
          options={statusOptions}
          value={form.status || "draft"}
          onChange={(e) => update("status", e.target.value as ContentStatus)}
        />
        {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div className="flex gap-3">
          <AdminButton onClick={handleSave} loading={saving}>
            <Save size={16} /> Save Blog
          </AdminButton>
          <AdminButton variant="outline" onClick={() => router.back()}>
            Cancel
          </AdminButton>
        </div>
      </div>
    </AdminShell>
  );
}
