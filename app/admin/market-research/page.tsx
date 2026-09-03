"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import AdminButton from "@/components/admin/AdminButton";
import { AdminInput, AdminTextarea, AdminSelect, AdminToggle } from "@/components/admin/AdminForm";
import { createClient } from "@/lib/supabase/client";
import type { MarketResearchInsight, MarketResearchReport } from "@/lib/supabase/types";
import { useWebsiteImport } from "@/lib/admin/useWebsiteImport";

const reportTypes = [
  { value: "Market Report", label: "Market Report" },
  { value: "Investment Guide", label: "Investment Guide" },
  { value: "Sector Analysis", label: "Sector Analysis" },
];

const iconOptions = [
  { value: "TrendingUp", label: "Trending Up" },
  { value: "MapPin", label: "Map Pin" },
  { value: "BarChart3", label: "Bar Chart" },
];

export default function AdminMarketResearchPage() {
  const [reports, setReports] = useState<MarketResearchReport[]>([]);
  const [insights, setInsights] = useState<MarketResearchInsight[]>([]);
  const [tab, setTab] = useState<"reports" | "insights">("reports");
  const [editingReport, setEditingReport] = useState<Partial<MarketResearchReport> | null>(null);
  const [editingInsight, setEditingInsight] = useState<Partial<MarketResearchInsight> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const supabase = createClient();
    const [{ data: r }, { data: i }] = await Promise.all([
      supabase.from("market_research_reports").select("*").order("sort_order"),
      supabase.from("market_research_insights").select("*").order("sort_order"),
    ]);
    setReports((r as MarketResearchReport[]) || []);
    setInsights((i as MarketResearchInsight[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const { importing, importMessage, runImport } = useWebsiteImport(
    "/api/admin/import-market-research",
    "Import all market research reports and insights from the public website? Existing items with the same ID will be updated."
  );

  const saveReport = async () => {
    if (!editingReport) return;
    const supabase = createClient();
    const payload = {
      title: editingReport.title?.trim() || "",
      description: editingReport.description?.trim() || "",
      report_date: (editingReport.report_date || "").slice(0, 10),
      report_type: editingReport.report_type || "Market Report",
      file_url: editingReport.file_url || null,
      sort_order: Number(editingReport.sort_order) || 0,
      published: editingReport.published ?? true,
    };
    if (editingReport.id) {
      await supabase.from("market_research_reports").update(payload).eq("id", editingReport.id);
    } else {
      await supabase.from("market_research_reports").insert(payload);
    }
    setEditingReport(null);
    load();
  };

  const saveInsight = async () => {
    if (!editingInsight) return;
    const supabase = createClient();
    const payload = {
      icon: editingInsight.icon || "TrendingUp",
      title: editingInsight.title?.trim() || "",
      value: editingInsight.value?.trim() || "",
      description: editingInsight.description?.trim() || "",
      sort_order: Number(editingInsight.sort_order) || 0,
      published: editingInsight.published ?? true,
    };
    if (editingInsight.id) {
      await supabase.from("market_research_insights").update(payload).eq("id", editingInsight.id);
    } else {
      await supabase.from("market_research_insights").insert(payload);
    }
    setEditingInsight(null);
    load();
  };

  const deleteReport = async (id: number) => {
    if (!confirm("Delete report?")) return;
    const supabase = createClient();
    await supabase.from("market_research_reports").delete().eq("id", id);
    load();
  };

  const deleteInsight = async (id: number) => {
    if (!confirm("Delete insight?")) return;
    const supabase = createClient();
    await supabase.from("market_research_insights").delete().eq("id", id);
    load();
  };

  return (
    <AdminShell title="Market Research" subtitle="Reports and insight cards on /market-research">
      <div className="mb-6 flex flex-wrap justify-end gap-2">
        <AdminButton variant="secondary" loading={importing} onClick={() => runImport(load)}>
          <Download size={16} /> Import from website
        </AdminButton>
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

      <div className="mb-4 flex gap-2">
        <AdminButton
          variant={tab === "reports" ? "primary" : "outline"}
          size="sm"
          onClick={() => setTab("reports")}
        >
          Reports
        </AdminButton>
        <AdminButton
          variant={tab === "insights" ? "primary" : "outline"}
          size="sm"
          onClick={() => setTab("insights")}
        >
          Insights
        </AdminButton>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/40 border-t-accent" />
        </div>
      ) : tab === "reports" ? (
        <div className="space-y-4">
          <AdminButton
            size="sm"
            onClick={() =>
              setEditingReport({
                title: "",
                description: "",
                report_date: new Date().toISOString().split("T")[0],
                report_type: "Market Report",
                sort_order: reports.length,
                published: true,
              })
            }
          >
            <Plus size={14} /> Add Report
          </AdminButton>
          {editingReport && (
            <div className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
              <AdminInput
                label="Title"
                value={editingReport.title || ""}
                onChange={(e) => setEditingReport({ ...editingReport, title: e.target.value })}
              />
              <AdminTextarea
                label="Description"
                value={editingReport.description || ""}
                onChange={(e) =>
                  setEditingReport({ ...editingReport, description: e.target.value })
                }
                rows={3}
              />
              <AdminInput
                label="Date"
                type="date"
                value={(editingReport.report_date || "").slice(0, 10)}
                onChange={(e) =>
                  setEditingReport({ ...editingReport, report_date: e.target.value })
                }
              />
              <AdminSelect
                label="Type"
                options={reportTypes}
                value={editingReport.report_type || ""}
                onChange={(e) =>
                  setEditingReport({ ...editingReport, report_type: e.target.value })
                }
              />
              <AdminInput
                label="File URL (optional)"
                value={editingReport.file_url || ""}
                onChange={(e) => setEditingReport({ ...editingReport, file_url: e.target.value })}
              />
              <AdminToggle
                label="Published"
                checked={editingReport.published ?? true}
                onChange={(v) => setEditingReport({ ...editingReport, published: v })}
              />
              <div className="flex gap-2">
                <AdminButton size="sm" onClick={saveReport}>
                  Save
                </AdminButton>
                <AdminButton size="sm" variant="outline" onClick={() => setEditingReport(null)}>
                  Cancel
                </AdminButton>
              </div>
            </div>
          )}
          {reports.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-xl border border-primary/10 bg-white p-4"
            >
              <div>
                <span className="text-xs font-semibold text-accent">{r.report_type}</span>
                <h4 className="font-bold text-primary">{r.title}</h4>
              </div>
              <div className="flex gap-2">
                <AdminButton variant="outline" size="sm" onClick={() => setEditingReport(r)}>
                  <Pencil size={14} />
                </AdminButton>
                <AdminButton variant="ghost" size="sm" onClick={() => deleteReport(r.id)}>
                  <Trash2 size={14} className="text-red-500" />
                </AdminButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <AdminButton
            size="sm"
            onClick={() =>
              setEditingInsight({
                icon: "TrendingUp",
                title: "",
                value: "",
                description: "",
                sort_order: insights.length,
                published: true,
              })
            }
          >
            <Plus size={14} /> Add Insight
          </AdminButton>
          {editingInsight && (
            <div className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
              <AdminSelect
                label="Icon"
                options={iconOptions}
                value={editingInsight.icon || "TrendingUp"}
                onChange={(e) => setEditingInsight({ ...editingInsight, icon: e.target.value })}
              />
              <AdminInput
                label="Title"
                value={editingInsight.title || ""}
                onChange={(e) => setEditingInsight({ ...editingInsight, title: e.target.value })}
              />
              <AdminInput
                label="Value"
                value={editingInsight.value || ""}
                onChange={(e) => setEditingInsight({ ...editingInsight, value: e.target.value })}
                placeholder="15%"
              />
              <AdminTextarea
                label="Description"
                value={editingInsight.description || ""}
                onChange={(e) =>
                  setEditingInsight({ ...editingInsight, description: e.target.value })
                }
                rows={2}
              />
              <AdminToggle
                label="Published"
                checked={editingInsight.published ?? true}
                onChange={(v) => setEditingInsight({ ...editingInsight, published: v })}
              />
              <div className="flex gap-2">
                <AdminButton size="sm" onClick={saveInsight}>
                  Save
                </AdminButton>
                <AdminButton size="sm" variant="outline" onClick={() => setEditingInsight(null)}>
                  Cancel
                </AdminButton>
              </div>
            </div>
          )}
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="flex items-center justify-between rounded-xl border border-primary/10 bg-white p-4"
            >
              <div>
                <span className="text-2xl font-bold text-primary">{ins.value}</span>
                <h4 className="font-bold text-primary">{ins.title}</h4>
                <p className="text-xs text-primary/50">{ins.description}</p>
              </div>
              <div className="flex gap-2">
                <AdminButton variant="outline" size="sm" onClick={() => setEditingInsight(ins)}>
                  <Pencil size={14} />
                </AdminButton>
                <AdminButton variant="ghost" size="sm" onClick={() => deleteInsight(ins.id)}>
                  <Trash2 size={14} className="text-red-500" />
                </AdminButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
