import type { Metadata } from "next";
import { AdminShellProvider } from "@/components/admin/AdminShellContext";
import SupabaseBrowserConfig from "@/components/SupabaseBrowserConfig";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MVUTO Console",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupabaseBrowserConfig />
      <AdminShellProvider>{children}</AdminShellProvider>
    </>
  );
}

