export const SITE_AVAILABILITY_KEY = "site_availability";

export const EXPIRED_HEADING = "Domain and hosting have expired";
export const EXPIRED_BANNER = "Contact the administrator to renew";

export type SiteOfflineMode = "online" | "expired" | "not-found";

export type SiteAvailability = {
  publicDisabled: boolean;
  mode: SiteOfflineMode;
};

const ONLINE: SiteAvailability = { publicDisabled: false, mode: "online" };

export function parseSiteAvailability(value: unknown): SiteAvailability {
  if (!value || typeof value !== "object") return ONLINE;
  const record = value as { publicDisabled?: unknown; mode?: unknown };

  if (record.mode === "not-found") {
    return { publicDisabled: true, mode: "not-found" };
  }
  if (record.mode === "expired" || record.publicDisabled === true) {
    return { publicDisabled: true, mode: "expired" };
  }
  return ONLINE;
}
