import type { MetadataRoute } from "next";
import { getJournalSlugs } from "@/lib/journal";

const baseUrl = "https://www.mato-coaching.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/assessment",
    "/termin",
    "/journal",
    "/impressum",
    "/datenschutz",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));

  const journalEntries: MetadataRoute.Sitemap = getJournalSlugs().map(
    (slug) => ({
      url: `${baseUrl}/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  return [...staticEntries, ...journalEntries];
}
