const USER_AGENT = "DigeratiExpertsThreatFeed/1.0 (+https://digeratiexperts.com)";

export async function fetchText(
  url: string,
  opts: { timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<string> {
  const timeoutMs = opts.timeoutMs ?? 20_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json, application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": USER_AGENT,
        ...opts.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText} for ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson<T>(
  url: string,
  opts: { timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<T> {
  const text = await fetchText(url, opts);
  return JSON.parse(text) as T;
}

export function stripHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function advisoryExcerpt(raw: string): string {
  const text = stripHtml(raw);
  const exec = text.match(/Executive Summary\s+(.+?)(?:\s+(?:Affected|Click to expand|Download the|Technical Details)|$)/i);
  if (exec?.[1]) return truncate(exec[1]);
  return truncate(text.replace(/^Advisory at a Glance\s+/i, ""));
}

export function truncate(value: string, max = 280): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

export function parseLooseDate(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  const isoDay = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoDay) return `${isoDay[1]}T12:00:00.000Z`;

  const twoDigit = trimmed.replace(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\s+(\d{2})\b/i,
    (_m, mon, day, yr) => `${mon} ${day} 20${yr}`,
  );
  const ms = Date.parse(twoDigit);
  if (Number.isNaN(ms)) return null;
  return new Date(ms).toISOString();
}
