import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { authConfigError } from "@/lib/supabase/env";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function requireAdminService(): Promise<
  { ok: true; serviceClient: SupabaseClient } | { ok: false; error: NextResponse }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const serviceClient = createServiceClient();
  if (!serviceClient) {
    return { ok: false, error: NextResponse.json({ error: authConfigError() }, { status: 503 }) };
  }

  return { ok: true, serviceClient };
}
