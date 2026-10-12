"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import AdminButton from "@/components/admin/AdminButton";
import SiteExpiredScreen from "@/components/SiteExpiredScreen";
import SiteNotFoundScreen from "@/components/SiteNotFoundScreen";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  parseSiteAvailability,
  SITE_AVAILABILITY_KEY,
  type SiteOfflineMode,
} from "@/lib/site/availability";
import { cn } from "@/lib/admin/utils";

const OPTIONS: { id: SiteOfflineMode; label: string; description: string }[] = [
  {
    id: "online",
    label: "Website online",
    description: "Visitors can browse the public website as usual.",
  },
  {
    id: "expired",
    label: "Option 1 — Renewal notice",
    description:
      "The public website switches off. Visitors see that the domain and hosting have expired, and a message to contact the administrator.",
  },
  {
    id: "not-found",
    label: "Option 2 — 404 error",
    description:
      "The public website switches off automatically. Every public page shows a 404 error. The admin dashboard stays available.",
  },
];

export default function AdminSettingsPage() {
  const [mode, setMode] = useState<SiteOfflineMode>("online");
  const [savedMode, setSavedMode] = useState<SiteOfflineMode>("online");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        setError("Supabase is not configured, so this switch cannot be saved yet.");
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error: loadError } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", SITE_AVAILABILITY_KEY)
        .maybeSingle();

      if (loadError) {
        setError(
          "Settings could not be loaded. Run supabase/site-availability.sql in the Supabase SQL editor, then reload this page."
        );
        setLoading(false);
        return;
      }

      const nextMode = parseSiteAvailability(data?.value).mode;
      setMode(nextMode);
      setSavedMode(nextMode);
      setLoading(false);
    }

    load();
  }, []);

  const dirty = mode !== savedMode;

  const handleSave = async () => {
    setMessage("");
    setError("");

    if (mode !== "online" && mode !== savedMode) {
      const confirmed = window.confirm(
        mode === "not-found"
          ? "Switch off the public website? Visitors will see a 404 error on every public page until you turn it back on."
          : "Disable the public website? Visitors will only see the renewal notice until you turn it back on."
      );
      if (!confirmed) return;
    }

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured, so this switch cannot be saved yet.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: saveError } = await supabase.from("site_settings").upsert(
      {
        key: SITE_AVAILABILITY_KEY,
        value: { publicDisabled: mode !== "online", mode },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
    setSaving(false);

    if (saveError) {
      setError(
        "Could not save. Run supabase/site-availability.sql in the Supabase SQL editor, then try again."
      );
      return;
    }

    setSavedMode(mode);
    setMessage(
      mode === "not-found"
        ? "The public website is now offline. Visitors see a 404 error."
        : mode === "expired"
          ? "The public website is now offline. Visitors see the renewal notice."
          : "The public website is back online."
    );
  };

  const statusLabel = savedMode === "not-found" ? "404" : savedMode === "expired" ? "Renewal notice" : "Online";

  return (
    <AdminShell title="Settings" subtitle="Turn the public website on or off">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/40 border-t-accent" />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-primary">Website availability</h2>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                  savedMode === "online" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}
              >
                {statusLabel}
              </span>
            </div>

            <div className="space-y-3" role="radiogroup" aria-label="Website availability">
              {OPTIONS.map((option) => {
                const selected = mode === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition",
                      selected
                        ? "border-accent bg-accent-blend/40"
                        : "border-primary/15 bg-primary/5 hover:bg-primary/[0.07]"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        selected ? "border-primary" : "border-primary/30"
                      )}
                      aria-hidden
                    >
                      {selected ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-primary">{option.label}</span>
                      <span className="mt-0.5 block text-xs text-primary/60">{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {message && (
              <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>
            )}
            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <div className="mt-6 flex justify-end">
              <AdminButton onClick={handleSave} loading={saving} disabled={!dirty}>
                Save settings
              </AdminButton>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
            <div className="border-b border-primary/10 px-6 py-4">
              <h2 className="text-lg font-bold text-primary">
                {mode === "not-found"
                  ? "What visitors see with the 404 error"
                  : mode === "expired"
                    ? "What visitors see with the renewal notice"
                    : "Public website"}
              </h2>
              <p className="mt-1 text-sm text-primary/60">
                {mode === "online"
                  ? "Choose Option 1 or Option 2 to replace the public pages."
                  : "This replaces the header, pages, and footer on the public website."}
              </p>
            </div>
            {mode === "not-found" ? (
              <SiteNotFoundScreen compact />
            ) : mode === "expired" ? (
              <SiteExpiredScreen compact />
            ) : (
              <div className="flex min-h-[280px] items-center justify-center px-6 text-center text-sm text-primary/60">
                The public website stays visible.
              </div>
            )}
          </section>
        </div>
      )}
    </AdminShell>
  );
}
