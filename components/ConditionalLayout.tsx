"use client";

import { usePathname } from "next/navigation";
import { isAdminPath } from "@/lib/admin/path";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname ? isAdminPath(pathname) : false;

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
