"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, MessageSquare, Users, ArrowRight, Building2, TrendingUp } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import { createClient } from "@/lib/supabase/client";
import type { DashboardStats, Inquiry, PropertyLead } from "@/lib/supabase/types";
import { formatAdminDate } from "@/lib/admin/utils";
import { adminPath } from "@/lib/admin/path";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    properties: 0,
    availableProperties: 0,
    soldProperties: 0,
    newInquiries: 0,
    newLeads: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentLeads, setRecentLeads] = useState<PropertyLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [
        { count: properties },
        { count: available },
        { count: sold },
        { count: newInq },
        { count: newLeads },
        { data: inquiries },
        { data: leads },
      ] = await Promise.all([
        supabase.from("properties").select("*", { count: "exact", head: true }),
        supabase.from("properties").select("*", { count: "exact", head: true }).eq("status", "available"),
        supabase.from("properties").select("*", { count: "exact", head: true }).eq("status", "sold"),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("property_leads").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("property_leads").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        properties: properties || 0,
        availableProperties: available || 0,
        soldProperties: sold || 0,
        newInquiries: newInq || 0,
        newLeads: newLeads || 0,
      });
      setRecentInquiries((inquiries as Inquiry[]) || []);
      setRecentLeads((leads as PropertyLead[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const quickActions = [
    { href: adminPath("properties/new"), label: "Add Property", icon: MapPin },
    { href: adminPath("inquiries"), label: "View Inquiries", icon: MessageSquare },
    { href: adminPath("leads"), label: "Manage Leads", icon: Users },
  ];

  return (
    <AdminShell title="Dashboard" subtitle="Overview of MVUTO listings and leads">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/40 border-t-accent" />
        </div>
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Properties" value={stats.properties} icon={Building2} delay={0} />
            <StatCard
              title="Available Listings"
              value={stats.availableProperties}
              icon={MapPin}
              gradient="from-emerald-700 to-emerald-900"
              delay={0.1}
            />
            <StatCard
              title="Sold Out"
              value={stats.soldProperties}
              icon={TrendingUp}
              gradient="from-amber-600 to-amber-800"
              delay={0.2}
            />
            <StatCard
              title="New Leads"
              value={stats.newLeads}
              change={`${stats.newInquiries} new inquiries`}
              icon={Users}
              delay={0.3}
            />
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.href}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={action.href}
                    className="group flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition hover:border-accent hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-accent">
                      <Icon size={18} />
                    </div>
                    <span className="flex-1 text-sm font-semibold text-primary">{action.label}</span>
                    <ArrowRight
                      size={16}
                      className="text-primary/30 transition group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary">Recent Inquiries</h3>
                <Link href={adminPath("inquiries")} className="text-xs font-medium text-primary/70 hover:text-accent">
                  View all
                </Link>
              </div>
              {recentInquiries.length === 0 ? (
                <p className="py-8 text-center text-sm text-primary/40">No inquiries yet</p>
              ) : (
                <div className="space-y-3">
                  {recentInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="flex items-start justify-between rounded-xl border border-primary/10 bg-[#f5f2ed] p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">{inq.name}</p>
                        <p className="text-xs text-primary/55">{inq.subject || inq.email}</p>
                      </div>
                      <span className="text-[10px] text-primary/40">{formatAdminDate(inq.created_at)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary">Recent Leads</h3>
                <Link href={adminPath("leads")} className="text-xs font-medium text-primary/70 hover:text-accent">
                  View all
                </Link>
              </div>
              {recentLeads.length === 0 ? (
                <p className="py-8 text-center text-sm text-primary/40">No leads yet</p>
              ) : (
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-start justify-between rounded-xl border border-primary/10 bg-[#f5f2ed] p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">{lead.name}</p>
                        <p className="text-xs text-primary/55">
                          {lead.property_name || "General inquiry"} · {lead.phone}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          lead.status === "new" ? "bg-accent-blend text-primary" : "bg-primary/10 text-primary/70"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
