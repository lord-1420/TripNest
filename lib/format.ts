export function cedis(amount: number | null | undefined, opts: { compact?: boolean } = {}): string {
  const value = Number(amount ?? 0);
  if (opts.compact && Math.abs(value) >= 10000) {
    return `GH₵ ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `GH₵ ${value.toLocaleString("en-GH", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function parseDateOnly(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "Dates not set";
  const d = parseDateOnly(value);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatShortDate(value: string): string {
  const d = parseDateOnly(value);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

export function formatWeekday(value: string): string {
  return DAYS[parseDateOnly(value).getUTCDay()];
}

export function dateRange(start: string | null, end: string | null): string {
  if (!start && !end) return "Dates not set";
  if (start && !end) return `From ${formatDate(start)}`;
  if (!start && end) return `Until ${formatDate(end)}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function nights(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  const ms = parseDateOnly(end).getTime() - parseDateOnly(start).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export function addDays(value: string, days: number): string {
  const d = parseDateOnly(value);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function dayRange(start: string, end: string): string[] {
  const out: string[] = [];
  const total = nights(start, end);
  for (let i = 0; i <= total; i++) out.push(addDays(start, i));
  return out;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatTime(value: string | null): string | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m ?? 0).padStart(2, "0")}${suffix}`;
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
