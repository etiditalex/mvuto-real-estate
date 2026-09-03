import { Suspense } from "react";
import type { Metadata } from "next";
import AdminLoginPage from "@/app/admin/login/AdminLoginPage";
import SupabaseBrowserConfig from "@/components/SupabaseBrowserConfig";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function PublicAdminLoginPage() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  return (
    <>
      <SupabaseBrowserConfig url={supabaseUrl} anonKey={supabaseAnonKey} />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-primary text-accent">
            Loading…
          </div>
        }
      >
        <AdminLoginPage supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} />
      </Suspense>
    </>
  );
}

