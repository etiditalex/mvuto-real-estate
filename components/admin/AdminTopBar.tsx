"use client";

import { Bell, Search, ExternalLink, PanelLeftClose, PanelLeft, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/admin/utils";
import { useAdminShell } from "./AdminShellContext";

type AdminTopBarProps = {
  title: string;
  subtitle?: string;
  userName?: string;
  userEmail?: string;
  avatarUrl?: string | null;
};

export default function AdminTopBar({
  title,
  subtitle,
  userName,
  userEmail,
  avatarUrl,
}: AdminTopBarProps) {
  const { collapsed, toggleCollapsed, toggleMobile } = useAdminShell();

  const initials = (userName || userEmail || "M")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-primary/10 bg-white/90 backdrop-blur-xl transition-all duration-300",
        collapsed ? "lg:ml-[72px]" : "lg:ml-64"
      )}
    >
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleMobile}
            className="rounded-xl p-2 text-primary/60 transition hover:bg-primary/5 hover:text-primary lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden rounded-xl p-2 text-primary/60 transition hover:bg-primary/5 hover:text-primary lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-primary sm:text-xl">{title}</h1>
            {subtitle && <p className="truncate text-xs text-primary/55 sm:text-sm">{subtitle}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 md:flex">
            <Search size={16} className="text-primary/40" />
            <input
              type="search"
              placeholder="Quick search..."
              className="w-48 bg-transparent text-sm text-primary outline-none placeholder:text-primary/40"
            />
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1.5 rounded-xl border border-accent/40 bg-accent-blend/50 px-3 py-2 text-xs font-medium text-primary transition hover:bg-accent-blend sm:flex"
          >
            <ExternalLink size={14} />
            View Site
          </Link>

          <button
            type="button"
            className="relative rounded-xl p-2 text-primary/60 transition hover:bg-primary/5 hover:text-primary"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>

          <div className="flex items-center gap-2 border-l border-primary/10 pl-2 sm:gap-3 sm:pl-4">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={userName || "Admin"}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/50"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-accent ring-2 ring-accent/50">
                {initials}
              </div>
            )}
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-primary">{userName || "Admin"}</p>
              <p className="text-xs text-primary/55">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
