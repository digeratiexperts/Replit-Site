/**
 * Greater Phoenix city homepages linked from the homepage
 * "Serving Greater Phoenix" tiles and the location-page city switcher.
 * Keep this list in one place so both surfaces stay in sync.
 */
export const GREATER_PHOENIX_CITIES = [
  { name: "Chandler", href: "/locations/chandler-az", slug: "chandler-az" },
  { name: "Phoenix", href: "/locations/phoenix-az", slug: "phoenix-az" },
  { name: "Gilbert", href: "/locations/gilbert-az", slug: "gilbert-az" },
  { name: "Tempe", href: "/locations/tempe-az", slug: "tempe-az" },
  { name: "Mesa", href: "/locations/mesa-az", slug: "mesa-az" },
  { name: "Scottsdale", href: "/locations/scottsdale-az", slug: "scottsdale-az" },
] as const;

export type GreaterPhoenixCity = (typeof GREATER_PHOENIX_CITIES)[number];

export function cityPageSlug(city: string): string {
  return `${city.toLowerCase().replace(/\s+/g, "-")}-az`;
}
