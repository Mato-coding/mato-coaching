# Spec: Domain-Kanonisierung auf www.lassekluever.de (Migration Phase 2)

Quelle der Wahrheit: CLAUDE.md, design-system.md, migrations-plan.md. Bei Widerspruch nachfragen, nicht raten.

## Ziel
Alle absoluten URLs im Code zeigen auf `https://www.lassekluever.de` (mit `www`, mit `https`). Aktuell zeigen mehrere Dateien noch hart auf `mato-coaching.de`.

## Strikt außerhalb dieser Aufgabe (NICHT anfassen)
- Sichtbarer Markenname „Mato Coaching" im UI-Text. Das ist die inhaltliche Marken-Umstellung (separater Task).
- Resend-Anzeigename „Lasse Klüver · Mato Coaching".
- E-Mail-Adressen (sind bereits `@lassekluever.de`).
- Mail-Subdomain `send.lassekluever.de`.
- Env-Werte (liegen in Vercel, sind in Phase 3 gesetzt).
- Vercel-Redirect, Search Console, Google Business (kein Code).

Merksatz: Diese Aufgabe ersetzt nur `mato-coaching.de` (Domain mit Bindestrich und Punkt). Sie ersetzt niemals „Mato Coaching" (Marke mit Leerzeichen).

## Schritt 1: Bestandsaufnahme
Zuerst das ganze Repo durchsuchen und die Trefferliste ausgeben, bevor irgendetwas geändert wird:

```bash
grep -rni "mato-coaching.de" src/ --include="*.ts" --include="*.tsx" --include="*.mdx" --include="*.json"
grep -rni "mato-coaching" src/ --include="*.ts" --include="*.tsx"
```

Zusätzlich nach versteckten absoluten URLs und `http://` suchen:

```bash
grep -rni "http://" src/
grep -rn "metadataBase\|openGraph\|alternates\|canonical\|@id\|\"url\"\|sameAs" src/
```

Trefferliste hier festhalten. Jeder Treffer wird im Folgenden bewusst zugeordnet (URL ersetzen vs. bewusst stehen lassen).

## Schritt 2: Zentrale Konstante anlegen
Neue Datei `src/lib/site.ts`:

```ts
// Kanonische Domain der Website. Quelle der Wahrheit für alle absoluten URLs.
// Migration: ersetzt die früheren harten Referenzen auf mato-coaching.de.
export const SITE_URL = "https://www.lassekluever.de";

// Optional, falls schon irgendwo gebraucht: absolute URL aus Pfad bauen.
export function absoluteUrl(path: string = "/"): string {
  return new URL(path, SITE_URL).toString();
}
```

## Schritt 3: Bekannte Fundstellen umstellen
Laut CLAUDE.md zeigen diese Dateien noch hart auf `mato-coaching.de`. Jede prüfen, die Domain durch `SITE_URL` aus `src/lib/site.ts` ersetzen (nicht durch einen neuen String-Literal, damit es eine einzige Quelle bleibt):

- `src/app/layout.tsx`: `metadataBase` auf `new URL(SITE_URL)`.
- `src/app/sitemap.ts`: Basis-URL auf `SITE_URL`, alle Einträge davon ableiten (Startseite, /assessment, /termin, /journal plus alle Journal-Artikel).
- `src/app/robots.ts`: `sitemap` und etwaige `host`-Angabe auf `SITE_URL`.
- `src/components/seo/JsonLd.tsx`: `url`, `@id` und alle absoluten URLs auf `SITE_URL` bzw. `absoluteUrl(...)`. `founder.sameAs` (LinkedIn) bleibt unverändert, das ist keine Domain-Referenz.
- `src/app/(public)/layout.tsx`: Metadaten und JsonLd-Props, OpenGraph-`url`, etwaige `alternates.canonical`.
- `src/app/(public)/journal/[slug]/page.tsx`: BlogPosting-JSON-LD `url`/`@id`, OpenGraph-`url`, `alternates.canonical`.

Falls weitere Treffer aus Schritt 1 auftauchen (z. B. `src/app/(public)/page.tsx`, MDX-Frontmatter, OG-Bild-URLs), ebenso auf `SITE_URL`/`absoluteUrl(...)` umstellen.

## Schritt 4: OpenGraph- und OG-Bild-URLs
- Wenn OG-/Twitter-Bilder als relative Pfade angegeben sind, reicht ein korrekt gesetztes `metadataBase`, damit Next sie absolut auflöst. Dann nichts weiter nötig.
- Wenn irgendwo eine absolute OG-Bild-URL hart steht, auf `absoluteUrl(...)` umstellen.
- Hinweis, kein Blocker: Ein eigenes OG-Bild 1200x630 existiert laut CLAUDE.md noch nicht (separater Task). Keine neue Bilddatei erfinden, nur die Domain korrekt machen.

## Guardrails beim Ersetzen
- Immer `https://www.lassekluever.de`, nie apex (`lassekluever.de` ohne www), nie `http`.
- Keine doppelten Slashes beim Zusammensetzen (`absoluteUrl` nutzen statt String-Konkatenation).
- „Mato Coaching" als sichtbarer Text bleibt. Wenn ein Treffer Markentext statt Domain ist, stehen lassen und in der Trefferliste als „bewusst belassen" markieren.

## Schritt 5: Verifikation
```bash
# darf nichts mehr finden:
grep -rni "mato-coaching.de" src/
# darf keine apex- oder http-Domain finden:
grep -rni "http://www.lassekluever\|//lassekluever.de" src/

npm run build
```
Zusätzlich prüfen:
- `app/sitemap.xml` Ausgabe: alle Loc-URLs auf `www.lassekluever.de`, inkl. Journal-Artikel.
- `app/robots.txt` Ausgabe: Sitemap-Zeile auf `www.lassekluever.de`.
- Startseite und ein Journal-Artikel: gerendertes JSON-LD im HTML prüfen, `url` und `@id` korrekt, LinkedIn-`sameAs` unverändert.
- Per-Page-Metadaten nur in Server-Komponenten (Regel aus CLAUDE.md beachten, nicht versehentlich in Client-Komponente verschieben).

## Commit
- Branch: `feat/domain-canonicalization`.
- Ein Commit für `site.ts` und Kanonisierung, Message sinngemäß: „Kanonisiere absolute URLs auf www.lassekluever.de (Migration Phase 2)".
- Sentence case, aktive Verben, keine Gedankenstriche in Commit und Code-Kommentaren.

## Definition of done
- `grep` auf `mato-coaching.de` in `src/` ist leer.
- Build grün.
- Sitemap, robots, JSON-LD, OpenGraph zeigen auf `www.lassekluever.de`.
- Sichtbarer Markenname und Resend-Anzeigename unverändert.
