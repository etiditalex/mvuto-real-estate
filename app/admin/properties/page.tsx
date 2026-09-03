"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Download } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import AdminButton from "@/components/admin/AdminButton";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/lib/supabase/types";
import { cn } from "@/lib/admin/utils";
import { adminPath } from "@/lib/admin/path";
import { sortPropertiesNewestFirst } from "@/lib/properties/sortProperties";

const statusColors = {
  available: "bg-emerald-100 text-emerald-800",
  ongoing: "bg-accent-blend text-primary",
  sold: "bg-red-100 text-red-800",
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });
    setProperties(sortPropertiesNewestFirst((data as Property[]) || []));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this property?")) return;
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", id);
    load();
  };

  const handleImportFromWebsite = async () => {
    if (
      !confirm(
        "Import all land listings from the public website into the dashboard? Existing listings with the same slug will be updated."
      )
    ) {
      return;
    }

    setImporting(true);
    setImportMessage("");

    try {
      const res = await fetch("/api/admin/import-properties", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setImportMessage(data.error || "Import failed");
        return;
      }

      setImportMessage(data.message || `Imported ${data.imported} listings.`);
      await load();
    } catch {
      setImportMessage("Import failed. Please try again.");
    } finally {
      setImporting(false);
    }
  };

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      (p.slug || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell title="Land Listings" subtitle="Manage properties for sale">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
          <input
            type="search"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-primary/20 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-blend"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminButton variant="secondary" onClick={handleImportFromWebsite} loading={importing}>
            <Download size={16} /> Import from website
          </AdminButton>
          <Link href={adminPath("properties/new")}>
            <AdminButton>
              <Plus size={16} /> Add Property
            </AdminButton>
          </Link>
        </div>
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
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/20 bg-white py-16 text-center">
          <p className="text-primary/60">No properties found</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <AdminButton size="sm" variant="secondary" onClick={handleImportFromWebsite} loading={importing}>
              <Download size={14} /> Import from website
            </AdminButton>
            <Link href={adminPath("properties/new")}>
              <AdminButton size="sm">Add your first property</AdminButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-primary/10 bg-primary/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-primary/70">Property</th>
                <th className="hidden px-4 py-3 font-semibold text-primary/70 md:table-cell">Location</th>
                <th className="px-4 py-3 font-semibold text-primary/70">Price</th>
                <th className="px-4 py-3 font-semibold text-primary/70">Status</th>
                <th className="px-4 py-3 font-semibold text-primary/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {filtered.map((p) => (
                <tr key={p.id} className="transition hover:bg-accent-blend/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-primary/5">
                        {p.image ? (
                          <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{p.title}</p>
                        <p className="text-xs text-primary/40">{p.slug || p.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-primary/70 md:table-cell">{p.location}</td>
                  <td className="px-4 py-3 font-medium text-amber-800">{p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                        statusColors[p.status]
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={adminPath(`properties/${p.id}`)}
                        className="rounded-lg p-1.5 text-primary/40 hover:bg-accent-blend hover:text-primary"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="rounded-lg p-1.5 text-primary/40 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
