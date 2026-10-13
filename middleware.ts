import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isSupabaseServerConfigured } from "@/lib/supabase/env";
import {
  ADMIN_LOGIN_PATH,
  getAdminBasePath,
  isAdminLoginPath,
  isAdminPath,
  isLegacyAdminPath,
  toInternalAdminPath,
  usesSecretAdminPath,
} from "@/lib/admin/path";
import { ADMIN_DEVICE_COOKIE, adminDeviceTokensMatch, hashAdminDeviceToken } from "@/lib/site/adminDevice";
import { fetchAdminDevice } from "@/lib/site/fetchAdminDevice";
import { fetchSiteAvailability } from "@/lib/site/fetchSiteAvailability";
import type { SiteOfflineMode } from "@/lib/site/availability";

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function rewriteOffline(request: NextRequest, mode: Exclude<SiteOfflineMode, "online">) {
  const url = request.nextUrl.clone();
  url.pathname = "/site-unavailable";
  url.search = "";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-mvuto-site-expired", "1");
  requestHeaders.set("x-mvuto-offline-mode", mode);
  const rewritten = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  rewritten.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  rewritten.headers.set("Cache-Control", "private, no-store");
  return rewritten;
}

async function adminDeviceAllows(request: NextRequest): Promise<boolean> {
  const lock = await fetchAdminDevice();
  if (!lock.enabled) return true;
  const token = request.cookies.get(ADMIN_DEVICE_COOKIE)?.value ?? "";
  if (!token) return false;
  return adminDeviceTokensMatch(await hashAdminDeviceToken(token), lock.tokenHash);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const dashboardRequest =
    isAdminPath(pathname) ||
    pathname.startsWith("/api/admin") ||
    pathname === `${ADMIN_LOGIN_PATH}/` ||
    pathname === "/admin/login";

  if (dashboardRequest && !(await adminDeviceAllows(request))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const availability = await fetchSiteAvailability();
    const mode = availability.mode === "expired" ? "expired" : "not-found";
    return rewriteOffline(request, mode);
  }

  if (pathname === `${ADMIN_LOGIN_PATH}/` || pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN_PATH;
    return withNoIndex(NextResponse.redirect(url));
  }

  if (isAdminLoginPath(pathname)) {
    if (isSupabaseServerConfigured()) {
      return withNoIndex(await updateSession(request));
    }
    return withNoIndex(NextResponse.next({ request }));
  }

  if (usesSecretAdminPath() && isLegacyAdminPath(pathname)) {
    return withNoIndex(NextResponse.rewrite(new URL("/not-found", request.url)));
  }

  if (isAdminPath(pathname)) {
    let response: NextResponse;

    if (isSupabaseServerConfigured()) {
      response = await updateSession(request);
    } else {
      response = NextResponse.next({ request });
    }

    const adminBase = getAdminBasePath();
    if (adminBase !== "/admin") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = toInternalAdminPath(pathname);
      const rewriteResponse = NextResponse.rewrite(rewriteUrl);

      response.cookies.getAll().forEach((cookie) => {
        rewriteResponse.cookies.set(cookie);
      });
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === "location") {
          rewriteResponse.headers.set(key, value);
        }
      });

      if (response.status >= 300 && response.status < 400) {
        return withNoIndex(response);
      }

      return withNoIndex(rewriteResponse);
    }

    return withNoIndex(response);
  }

  if (!pathname.startsWith("/api") && pathname !== "/site-unavailable") {
    const { publicDisabled, mode } = await fetchSiteAvailability();
    if (publicDisabled) {
      return rewriteOffline(request, mode === "not-found" ? "not-found" : "expired");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)",
  ],
};
