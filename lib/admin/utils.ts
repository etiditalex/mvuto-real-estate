export type ClassValue = string | undefined | null | false;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatAdminDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatKes(price: string | null | undefined): string {
  const trimmed = (price || "").trim();
  if (!trimmed) return "Price on request";
  if (/^kes\b/i.test(trimmed)) return trimmed;
  return `KES ${trimmed}`;
}

export function parsePriceAmount(price: string | null | undefined): number | null {
  if (!price) return null;
  const cleaned = price.replace(/,/g, "").trim();
  const millions = cleaned.match(/([\d.]+)\s*m/i);
  if (millions) {
    const value = parseFloat(millions[1]);
    return Number.isFinite(value) ? Math.round(value * 1_000_000) : null;
  }
  const n = parseInt(cleaned.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

