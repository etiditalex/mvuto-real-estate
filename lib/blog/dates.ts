function parseLocalNoon(isoDate: string): Date {
  const day = (isoDate || "").slice(0, 10);
  return new Date(`${day}T12:00:00`);
}

/** e.g. "MAY 14, 2026" for blog hero cards */
export function formatBlogDateCarousel(isoDate: string): string {
  return parseLocalNoon(isoDate)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

/** e.g. "May 14, 2026" for blog list cards */
export function formatBlogCardDate(isoDate: string): string {
  const date = parseLocalNoon(isoDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatLongDateFromIso(isoDate: string): string {
  const date = parseLocalNoon(isoDate);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatNewsDate(isoDate: string): string {
  const date = parseLocalNoon(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

/** ~200 words per minute */
export function estimateReadMinutes(...parts: string[]): number {
  const text = parts.join(" ").trim();
  if (!text) return 1;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
