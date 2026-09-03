import { getSupabaseAnonKey, getSupabaseUrl, isSecretSupabaseKey } from "@/lib/supabase/env";

export default function SupabaseBrowserConfig({
  url,
  anonKey,
}: {
  url?: string;
  anonKey?: string;
}) {
  const resolvedUrl = (url ?? getSupabaseUrl()).trim();
  const resolvedKey = (anonKey ?? getSupabaseAnonKey()).trim();
  if (!resolvedUrl || !resolvedKey || isSecretSupabaseKey(resolvedKey)) return null;

  return (
    <script
      id="mvuto-supabase-config"
      dangerouslySetInnerHTML={{
        __html: `window.__MVUTO_SUPABASE__=${JSON.stringify({
          url: resolvedUrl,
          anonKey: resolvedKey,
        })};`,
      }}
    />
  );
}
