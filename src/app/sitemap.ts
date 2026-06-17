import type { MetadataRoute } from "next";

const baseUrl = "https://www.mato-coaching.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/assessment", "/termin", "/impressum", "/datenschutz"];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
