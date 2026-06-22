// Kanonische Domain der Website. Quelle der Wahrheit für alle absoluten URLs.
// Migration: ersetzt die früheren harten Domain-Referenzen aus der Altdomain.
export const SITE_URL = "https://www.lassekluever.de";

// Optional, falls schon irgendwo gebraucht: absolute URL aus Pfad bauen.
export function absoluteUrl(path: string = "/"): string {
  return new URL(path, SITE_URL).toString();
}
