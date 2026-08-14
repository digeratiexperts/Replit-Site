import { describe, expect, it } from "vitest";
import { mergeReviewFeed } from "./reviews";
import type { CatalogReview } from "../client/src/data/reviewsCatalog";

describe("mergeReviewFeed", () => {
  it("merges live Google with catalog Yelp and Thumbtack without inventing rows", () => {
    const catalog: CatalogReview[] = [
      {
        source: "yelp",
        authorName: "Catalog Yelp",
        rating: 5,
        text: "Exact Yelp body",
      },
      {
        source: "thumbtack",
        authorName: "Catalog Thumbtack",
        rating: 5,
        text: "Exact Thumbtack body",
      },
      {
        source: "google",
        authorName: "Same Person",
        rating: 5,
        text: "Duplicate text",
      },
    ];

    const merged = mergeReviewFeed({
      live: [
        {
          id: "live-google-0",
          source: "google",
          sourceLabel: "Google",
          origin: "live",
          authorName: "Same Person",
          rating: 5,
          text: "Duplicate text",
        },
      ],
      catalog,
    });

    expect(merged.map((r) => r.source)).toEqual(["google", "yelp", "thumbtack"]);
    expect(merged).toHaveLength(3);
    expect(merged[0]?.origin).toBe("live");
  });

  it("drops catalog entries missing author or text", () => {
    const merged = mergeReviewFeed({
      live: [],
      catalog: [
        { source: "yelp", authorName: "", rating: 5, text: "Nope" },
        { source: "thumbtack", authorName: "Name", rating: 5, text: "   " },
      ],
    });
    expect(merged).toEqual([]);
  });
});
