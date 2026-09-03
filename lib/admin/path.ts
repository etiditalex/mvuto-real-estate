const LEGACY_ADMIN_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin-login";

/** Public admin URL base — set ADMIN_PATH in .env.local (share only with your team). */
export function getAdminBasePath(): string {
  const raw =
    process.env.ADMIN_PATH ||
    process.env.NEXT_PUBLIC_ADMIN_PATH ||
    LEGACY_ADMIN_PATH;
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;
  const trimmed = normalized.replace(/\/$/, "");
  return trimmed || LEGACY_ADMIN_PATH;
}

export function adminPath(...segments: string[]): string {
  const rest = segments
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  if (rest === "login") return ADMIN_LOGIN_PATH;
  const base = getAdminBasePath();
  return rest ? `${base}/${rest}` : base;
}

export function isAdminLoginPath(pathname: string): boolean {
  return pathname === ADMIN_LOGIN_PATH || pathname === `${LEGACY_ADMIN_PATH}/login`;
}

export function isAdminPath(pathname: string): boolean {
  if (isAdminLoginPath(pathname)) return true;
  const base = getAdminBasePath();
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function isLegacyAdminPath(pathname: string): boolean {
  return pathname === LEGACY_ADMIN_PATH || pathname.startsWith(`${LEGACY_ADMIN_PATH}/`);
}

export function usesSecretAdminPath(): boolean {
  return getAdminBasePath() !== LEGACY_ADMIN_PATH;
}

/** Map public admin URL → internal Next.js route under /admin */
export function toInternalAdminPath(pathname: string): string {
  const base = getAdminBasePath();
  if (!isAdminPath(pathname)) return pathname;
  if (base === LEGACY_ADMIN_PATH) return pathname;
  const suffix = pathname.slice(base.length);
  return `${LEGACY_ADMIN_PATH}${suffix}` || LEGACY_ADMIN_PATH;
}
