import type { Metadata } from "next";

// Kanonische Domain der Website. Quelle der Wahrheit für alle absoluten URLs.
// Migration: ersetzt die früheren harten Domain-Referenzen aus der Altdomain.
export const SITE_URL = "https://www.lassekluever.de";

// Optional, falls schon irgendwo gebraucht: absolute URL aus Pfad bauen.
export function absoluteUrl(path: string = "/"): string {
  return new URL(path, SITE_URL).toString();
}

interface BuildMetadataOptions {
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
}

// Ein Muster für alle Seiten-Metadata (Architektur-Audit 2.6, Refactoring-
// Auftrag 4): nimmt Titel und Beschreibung einmal entgegen und leitet daraus
// die Top-Level-Felder, openGraph und alternates.canonical ab (immer über
// absoluteUrl, nie relativ oder über eine lokal redeklarierte Konstante).
export function buildMetadata({
  path,
  title,
  description,
  ogType = "website",
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: ogType,
      title,
      description,
      url,
    },
  };
}
