import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/supabase/env";
import { parseSiteAvailability, SITE_AVAILABILITY_KEY, type SiteAvailability } from "@/lib/site/availability";

const ONLINE: SiteAvailability = { publicDisabled: false, mode: "online" };

function availabilityClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey() || getSupabaseAnonKey();
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

/** Reads the public-site switch. Missing config or a failed read leaves the site online. */
export async function fetchSiteAvailability(): Promise<SiteAvailability> {
  try {
    const supabase = availabilityClient();
    if (!supabase) return ONLINE;

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", SITE_AVAILABILITY_KEY)
      .maybeSingle();

    if (error || !data) return ONLINE;
    return parseSiteAvailability(data.value);
  } catch {
    return ONLINE;
  }
}
