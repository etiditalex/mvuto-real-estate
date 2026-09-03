"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import { useAdminShell } from "./AdminShellContext";
import { cn } from "@/lib/admin/utils";
import type { Profile } from "@/lib/supabase/types";

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export default function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const pathname = usePathname();
  const { collapsed, mobileOpen, setMobileOpen } = useAdminShell();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState({ inquiries: 0, leads: 0 });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (prof) setProfile(prof as Profile);

      const [{ count: inq }, { count: leads }] = await Promise.all([
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("property_leads").select("*", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setBadges({ inquiries: inq || 0, leads: leads || 0 });
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-primary/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <AdminSidebar badges={badges} logoUrl={profile?.avatar_url} />

      <AdminTopBar
        title={title}
        subtitle={subtitle}
        userName={profile?.full_name || undefined}
        userEmail={profile?.email || undefined}
        avatarUrl={profile?.avatar_url}
      />

      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] p-4 transition-all duration-300 sm:p-6",
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
