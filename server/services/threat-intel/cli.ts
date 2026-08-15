/**
 * One-shot ingest: npx tsx server/services/threat-intel/cli.ts
 */
import { refreshThreatFeed, getThreatFeed } from "./ingest";

const feed = await refreshThreatFeed();
const homepage = await getThreatFeed("homepage");
console.log(
  JSON.stringify(
    {
      generatedAt: feed.generatedAt,
      sources: feed.sources,
      scored: feed.items.length,
      homepage: homepage.items.map((item) => ({
        score: item.score,
        category: item.category,
        kicker: item.kicker,
        title: item.title,
        cve: item.cve,
        source: item.sourceName,
      })),
    },
    null,
    2,
  ),
);
