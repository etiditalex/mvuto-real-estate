"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Megaphone,
  BarChart3,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/admin/utils";
import { adminPath } from "@/lib/admin/path";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useAdminShell } from "./AdminShellContext";
import { LOGO_URL } from "@/lib/site";

const navItems = [
  { segment: "", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { segment: "properties", label: "Listings", icon: MapPin },
  { segment: "blogs", label: "Blogs", icon: Newspaper },
  { segment: "news", label: "News", icon: Megaphone },
  { segment: "market-research", label: "Market Research", icon: BarChart3 },
  { segment: "testimonials", label: "Testimonials", icon: Quote },
  { segment: "inquiries", label: "Inquiries", icon: MessageSquare, badge: "inquiries" as const },
  { segment: "leads", label: "Leads", icon: Users, badge: "leads" as const },
];

type AdminSidebarProps = {
  badges?: { inquiries?: number; leads?: number };
  logoUrl?: string | null;
};

export default function AdminSidebar({ badges = {}, logoUrl }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useAdminShell();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(adminPath("login"));
    router.refresh();
  };

  const brandLogo = logoUrl || LOGO_URL;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-primary transition-all duration-300",
        collapsed ? "lg:w-[72px]" : "lg:w-64",
        mobileOpen ? "w-64 translate-x-0" : "-translate-x-full w-64",
        "lg:translate-x-0"
      )}
    >
      <button
        type="button"
        onClick={toggleCollapsed}
        className="absolute -right-3.5 top-7 z-50 hidden h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-primary text-accent shadow-lg transition hover:bg-primary/90 lg:flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={cn("flex items-center gap-3 px-4 py-5", collapsed && "lg:justify-center lg:px-2")}>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image src={brandLogo} alt="MVUTO" fill className="object-contain" sizes="40px" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold text-white">MVUTO</p>
              <p className="text-[11px] text-accent">Real Estate Ltd</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map((item) => {
          const href = item.segment ? adminPath(item.segment) : adminPath();
          const active = item.exact
            ? pathname === href || pathname === "/admin"
            : pathname.startsWith(href);
          const Icon = item.icon;
          const badgeCount =
            item.badge === "inquiries" ? badges.inquiries : item.badge === "leads" ? badges.leads : 0;

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                collapsed && "lg:justify-center lg:px-2",
                active
                  ? "bg-accent text-primary"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && badgeCount ? (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                  {badgeCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-accent",
            collapsed && "lg:justify-center lg:px-2"
          )}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>{loggingOut ? "Signing out…" : "Sign out"}</span>}
        </button>
      </div>
    </aside>
  );
}
