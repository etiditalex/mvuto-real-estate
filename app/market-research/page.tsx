"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, MapPin, TrendingUp, FileText, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import {
  STATIC_MARKET_INSIGHTS,
  STATIC_MARKET_REPORTS,
  type WebsiteMarketInsight,
  type WebsiteMarketReport,
} from "@/lib/market-research/catalog";
import { formatIsoDate } from "@/lib/admin/utils";

const iconMap = {
  TrendingUp,
  MapPin,
  BarChart3,
};

export default function MarketResearchPage() {
  const [insights, setInsights] = useState<WebsiteMarketInsight[]>(STATIC_MARKET_INSIGHTS);
  const [reports, setReports] = useState<WebsiteMarketReport[]>(STATIC_MARKET_REPORTS);

  useEffect(() => {
    fetch("/api/content/market-research", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.insights?.length) setInsights(data.insights);
        if (data.reports?.length) setReports(data.reports);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHero title="Market Research" />
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight, index) => {
              const Icon =
                iconMap[insight.icon as keyof typeof iconMap] || TrendingUp;
              return (
                <motion.article
                  key={insight.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-primary/10 bg-[#f5f2ed] p-6"
                >
                  <Icon className="mb-4 h-8 w-8 text-accent" strokeWidth={1.5} />
                  <p className="text-3xl font-bold text-primary">{insight.value}</p>
                  <h2 className="mt-2 font-bold uppercase tracking-wide text-primary">
                    {insight.title}
                  </h2>
                  <p className="mt-2 text-sm text-primary/70">{insight.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ed] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-primary lg:text-3xl">Reports & Guides</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <article
                key={report.id}
                className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {report.report_type}
                    </p>
                    <h3 className="text-lg font-bold text-primary">{report.title}</h3>
                    <p className="mt-1 text-sm text-primary/70">{report.description}</p>
                    <p className="mt-2 text-xs text-primary/50">
                      {formatIsoDate(report.report_date)}
                    </p>
                  </div>
                </div>
                {report.file_url ? (
                  <a
                    href={report.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-primary hover:bg-accent-blend"
                  >
                    Download <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-accent hover:bg-primary/90"
                  >
                    Request a copy
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
