import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { requireAdminService } from "@/lib/admin/requireAdminService";
import { authConfigError, isSupabaseAuthConfigured } from "@/lib/supabase/env";
import {
  ADMIN_DEVICE_COOKIE,
  ADMIN_DEVICE_KEY,
  adminDeviceCookieOptions,
  adminDeviceTokensMatch,
  createAdminDeviceToken,
  hashAdminDeviceToken,
} from "@/lib/site/adminDevice";
import { fetchAdminDevice } from "@/lib/site/fetchAdminDevice";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({ error: authConfigError() }, { status: 503 });
  }

  const auth = await requireAdminService();
  if (!auth.ok) return auth.error;

  const lock = await fetchAdminDevice();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_DEVICE_COOKIE)?.value ?? "";
  const trusted =
    lock.enabled && token
      ? adminDeviceTokensMatch(await hashAdminDeviceToken(token), lock.tokenHash)
      : false;

  return NextResponse.json({ enabled: lock.enabled, trusted });
}

export async function POST(request: Request) {
  if (!isSupabaseAuthConfigured()) {
    return NextResponse.json({ error: authConfigError() }, { status: 503 });
  }

  const auth = await requireAdminService();
  if (!auth.ok) return auth.error;

  const body = (await request.json().catch(() => null)) as { enabled?: unknown } | null;
  const enabled = body?.enabled === true;
  const cookieStore = await cookies();

  if (!enabled) {
    const { error } = await auth.serviceClient.from("site_settings").upsert(
      {
        key: ADMIN_DEVICE_KEY,
        value: { enabled: false },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
    if (error) {
      return NextResponse.json({ error: "Could not update admin access." }, { status: 500 });
    }
    cookieStore.set(ADMIN_DEVICE_COOKIE, "", { ...adminDeviceCookieOptions(), maxAge: 0 });
    return NextResponse.json({ enabled: false, trusted: false });
  }

  const token = createAdminDeviceToken();
  const tokenHash = await hashAdminDeviceToken(token);
  const { error } = await auth.serviceClient.from("site_settings").upsert(
    {
      key: ADMIN_DEVICE_KEY,
      value: { enabled: true, tokenHash },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );
  if (error) {
    return NextResponse.json({ error: "Could not lock the dashboard to this device." }, { status: 500 });
  }

  cookieStore.set(ADMIN_DEVICE_COOKIE, token, adminDeviceCookieOptions());
  return NextResponse.json({ enabled: true, trusted: true });
}
