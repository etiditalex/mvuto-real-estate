export const ADMIN_DEVICE_KEY = "admin_device";
export const ADMIN_DEVICE_COOKIE = "mvuto_admin_device";

export type AdminDeviceLock = {
  enabled: boolean;
  tokenHash: string;
};

const OPEN: AdminDeviceLock = { enabled: false, tokenHash: "" };

export function parseAdminDevice(value: unknown): AdminDeviceLock {
  if (!value || typeof value !== "object") return OPEN;
  const record = value as { enabled?: unknown; tokenHash?: unknown };
  const tokenHash = typeof record.tokenHash === "string" ? record.tokenHash : "";
  if (record.enabled !== true || tokenHash.length === 0) return OPEN;
  return { enabled: true, tokenHash };
}

export function createAdminDeviceToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function hashAdminDeviceToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function adminDeviceTokensMatch(left: string, right: string): boolean {
  if (!left || !right || left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

export function adminDeviceCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  };
}
