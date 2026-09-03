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

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)",
  ],
};
