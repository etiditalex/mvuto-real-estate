/**
 * Browser Supabase client. Prefers runtime config injected by the server
 * (Vercel env is available at request time) over build-time NEXT_PUBLIC_* values.
 */
import { createBrowserClient } from "@supabase/ssr";
import { isSecretSupabaseKey } from "@/lib/supabase/env";

type PublicSupabaseConfig = {
  url: string;
  anonKey: string;
};

declare global {
  interface Window {
    __MVUTO_SUPABASE__?: PublicSupabaseConfig;
  }
}

function sanitizeBrowserKey(key: string): string {
  const value = key.trim();
  if (!value || isSecretSupabaseKey(value)) return "";
  return value;
}

function readBrowserConfig(): PublicSupabaseConfig {
  const injected =
    typeof window !== "undefined" ? window.__MVUTO_SUPABASE__ : undefined;
  return {
    url: (
      injected?.url ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      ""
    ).trim(),
    anonKey: sanitizeBrowserKey(
      injected?.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    ),
  };
}

export function getBrowserSupabaseConfig(): PublicSupabaseConfig {
  return readBrowserConfig();
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = readBrowserConfig();
  return Boolean(url && anonKey);
}

export function createClient(config?: Partial<PublicSupabaseConfig>) {
  const fallback = readBrowserConfig();
  const url = (config?.url || fallback.url).trim();
  const anonKey = sanitizeBrowserKey(config?.anonKey || fallback.anonKey);
  return createBrowserClient(url, anonKey);
}
