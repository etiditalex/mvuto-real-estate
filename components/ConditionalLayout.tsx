"use client";

import { usePathname } from "next/navigation";
import { isAdminPath } from "@/lib/admin/path";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SiteExpiredScreen from "./SiteExpiredScreen";
import SiteNotFoundScreen from "./SiteNotFoundScreen";
import type { SiteOfflineMode } from "@/lib/site/availability";

export default function ConditionalLayout({
  children,
  offlineMode = "online",
}: {
  children: React.ReactNode;
  offlineMode?: SiteOfflineMode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname ? isAdminPath(pathname) : false;

  if (!isAdmin && offlineMode === "not-found") {
    return (
      <main id="main-content" className="min-w-0">
        <SiteNotFoundScreen />
      </main>
    );
  }

  if (!isAdmin && offlineMode === "expired") {
    return (
      <main id="main-content" className="min-w-0">
        <SiteExpiredScreen />
      </main>
    );
  }

  return (
    <>
      {!isAdmin && <Header />}
      <main id="main-content" className={isAdmin ? "" : "min-w-0 overflow-x-clip"}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}
