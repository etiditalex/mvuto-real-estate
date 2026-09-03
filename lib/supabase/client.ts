/**
 * Browser Supabase client. Prefers runtime config injected by the server
 * (Vercel env is available at request time) over build-time NEXT_PUBLIC_* values.
 */
import { createBrowserClient } from "@supabase/ssr";

type PublicSupabaseConfig = {
  url: string;
  anonKey: string;
};

declare global {
  interface Window {
    __MVUTO_SUPABASE__?: PublicSupabaseConfig;
  }
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
    anonKey: (
      injected?.anonKey ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ""
    ).trim(),
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
  const anonKey = (config?.anonKey || fallback.anonKey).trim();
  return createBrowserClient(url, anonKey);
}
