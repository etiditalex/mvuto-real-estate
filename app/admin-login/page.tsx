import { Suspense } from "react";
import type { Metadata } from "next";
import AdminLoginPage from "@/app/admin/login/AdminLoginPage";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function PublicAdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-primary text-accent">
          Loading…
        </div>
      }
    >
      <AdminLoginPage />
    </Suspense>
  );
}
