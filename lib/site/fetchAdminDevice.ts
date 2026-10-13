import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/supabase/env";
import { ADMIN_DEVICE_KEY, parseAdminDevice, type AdminDeviceLock } from "@/lib/site/adminDevice";

const OPEN: AdminDeviceLock = { enabled: false, tokenHash: "" };

/** Reads the admin-device lock. Missing config or a failed read leaves every device allowed. */
export async function fetchAdminDevice(): Promise<AdminDeviceLock> {
  try {
    const url = getSupabaseUrl();
    const key = getSupabaseServiceRoleKey();
    if (!url || !key) return OPEN;

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", ADMIN_DEVICE_KEY)
      .maybeSingle();

    if (error || !data) return OPEN;
    return parseAdminDevice(data.value);
  } catch {
    return OPEN;
  }
}
