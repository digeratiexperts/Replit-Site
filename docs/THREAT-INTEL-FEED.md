# Digerati Threat Intelligence Feed

Live MSP threat stream for **Recent Threats & Insights** (homepage) and `/resources/security-updates`.

This is not a manually maintained blog. The Node process refreshes authoritative feeds on a schedule, scores each item, and only promotes homepage cards that clear a relevance threshold.

## Sources (v1)

| Source | Endpoint | Role |
| --- | --- | --- |
| CISA KEV | `https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json` | Active exploitation — primary homepage signal |
| CISA Advisories | `https://www.cisa.gov/cybersecurity-advisories/cybersecurity-advisories.xml` + `alerts.xml` | Campaigns / urgent activity. ICS product advisories and “CISA Adds N KEV” duplicates are skipped |
| FIRST EPSS | `https://api.first.org/data/v1/epss` | 30-day exploit probability |
| NIST NVD | `https://services.nvd.nist.gov/rest/json/cves/2.0` | CVSS for a small KEV subset (supporting) |
| Microsoft MSRC | SUG API `vulnerability` (non-Mariner) | Windows / M365 / Exchange / SharePoint / Defender. Chromium-upstream Edge rows are skipped |

**Not in v1:** ThreatFox, URLhaus, MalwareBazaar (abuse.ch commercial-use terms must be confirmed first). Vendor PSIRTs and CISA Vulnrichment can be added later.

## Relevance score

```
+40  CISA KEV
+25  EPSS > 80%
+15  Critical CVSS (>= 9.0)
+15  Microsoft 365 / Windows / common SMB tech
+10  ransomware association
+10  remote / unauthenticated / RCE language
+10  CISA urgent advisory
-20  niche / enterprise-only product
-20  older than 45 days
```

Homepage: score ≥ 40, age ≤ 45 days, max 4 cards.
Archive: score ≥ 15, age ≤ 90 days, max 40 items.

Categories are **not** all called “alert”:

`Active Exploitation · Threat Advisory · Critical Vulnerability · Malware Activity · Ransomware · Microsoft Security · DE Advisory`

## Refresh

- In-process scheduler starts after listen (`server/index.ts`) and runs every **6 hours**.
- First GET with an empty cache triggers a refresh.
- Cache file: `THREAT_FEED_PATH` or `/home/digeratiexperts.com/logs/threat-feed.json` (writable under the production unit) or `data/threat-feed.json` locally.
- Manual: `curl -X POST http://127.0.0.1:3300/api/internal/threats/refresh` (localhost only).
- One-shot: `npx tsx server/services/threat-intel/cli.ts`

Optional systemd timer: `deploy/vps/digeratiexperts-threat-refresh.timer` (backup; the in-process job is enough).

## Public API

- `GET /api/public/threats` — homepage subset
- `GET /api/public/threats?scope=all` — archive stream

Never invent CVEs, CVSS, clients, or exploitation claims. Honest empty state if nothing qualifies.

## Env

| Variable | Purpose |
| --- | --- |
| `THREAT_FEED_PATH` | Override cache path |
| `THREAT_FEED_STARTUP_DELAY_MS` | Delay before first refresh (default 8000) |
| `NVD_API_KEY` | Optional; higher NVD rate limit |
