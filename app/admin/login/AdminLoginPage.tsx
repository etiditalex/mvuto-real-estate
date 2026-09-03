"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { adminPath } from "@/lib/admin/path";
import { LOGO_URL } from "@/lib/site";

export default function AdminLoginPage({
  supabaseUrl = "",
  supabaseAnonKey = "",
}: {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || adminPath();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const url = supabaseUrl || undefined;
      const anonKey = supabaseAnonKey || undefined;
      if (!isSupabaseConfigured() && !(url && anonKey)) {
        setError(
          "Supabase keys are missing on the server. In Vercel → Settings → Environment Variables, add SUPABASE_URL and SUPABASE_ANON_KEY (and the NEXT_PUBLIC_ copies) for Production, then Redeploy."
        );
        return;
      }
      const supabase = createClient({ url, anonKey });
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message || "Login failed");
        return;
      }
      window.location.assign(redirect);
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    if (!email.trim()) {
      setError("Enter your email address above, then click forgot password.");
      return;
    }
    const supabase = createClient({
      url: supabaseUrl || undefined,
      anonKey: supabaseAnonKey || undefined,
    });
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(adminPath())}`,
    });
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setMessage("Password reset email sent if that account exists.");
  };

  return (
    <div className="flex min-h-screen bg-primary">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-6 py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-xl bg-white">
            <Image src={LOGO_URL} alt="MVUTO Real Estate Ltd" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white">MVUTO Console</h1>
          <p className="mt-1 text-sm text-accent">Sign in to manage listings and leads</p>
        </div>

        <form onSubmit={handleLogin} className="rounded-2xl bg-white p-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-primary/20 px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent-blend"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-primary">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-primary/20 px-4 py-3 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent-blend"
              />
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {message && (
            <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-accent transition hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-3 w-full text-sm text-primary/70 hover:text-primary"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}
