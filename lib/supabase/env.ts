/**
 * Supabase env helpers — read at runtime via dynamic keys so Vercel/serverless
 * sees values even when NEXT_PUBLIC_* were not present at build time.
 */
function readEnv(names: readonly string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return "";
}

function decodeJwtRole(token: string): string {
  try {
    const part = token.split(".")[1];
    if (!part) return "";
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof Buffer !== "undefined"
        ? Buffer.from(padded, "base64").toString("utf8")
        : atob(padded);
    const payload = JSON.parse(json) as { role?: string };
    return payload.role || "";
  } catch {
    return "";
  }
}

/** True for service-role / sb_secret keys that must never run in the browser. */
export function isSecretSupabaseKey(key: string): boolean {
  const value = key.trim();
  if (!value) return false;
  if (value.startsWith("sb_secret_")) return true;
  if (value.startsWith("sb_publishable_")) return false;
  if (value.startsWith("eyJ") && decodeJwtRole(value) === "service_role") return true;
  return false;
}

function readPublicKey(names: readonly string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value && !isSecretSupabaseKey(value)) return value;
  }
  return "";
}

export function getSupabaseUrl(): string {
  return readEnv(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]);
}

export function getSupabaseAnonKey(): string {
  return readPublicKey([
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_KEY",
  ]);
}

export function getSupabaseServiceRoleKey(): string {
  return readEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
  ]);
}

export function isSupabaseServerConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    getSupabaseUrl() && getSupabaseAnonKey() && getSupabaseServiceRoleKey()
  );
}

export function getMissingAuthEnvVars(): string[] {
  const missing: string[] = [];
  if (!getSupabaseUrl()) {
    missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  }
  if (!getSupabaseAnonKey()) {
    missing.push("SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  if (!getSupabaseServiceRoleKey()) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }
  return missing;
}

export function authConfigError(): string {
  const missing = getMissingAuthEnvVars();
  if (missing.length === 0) return "";
  return `Authentication service is not configured. Add in Vercel → Settings → Environment Variables (Production), then redeploy: ${missing.join(", ")}`;
}
