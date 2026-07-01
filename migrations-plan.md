# Migrations- und Changeplan: Domainwechsel zu lassekluever.de

> Status: abgeschlossen und archiviert. Dieses Dokument ist reine Referenz für das Domain- und Mail-Setup (DNS, Resend, Vercel). Es ist kein aktives Arbeitsdokument mehr und muss nicht zu Sitzungsbeginn gelesen werden. Aktueller Projektstand steht in CLAUDE.md.

Status-Legende: [erledigt] · [offen] · [in Arbeit]

## Ziel
Kanonische Hauptdomain wird www.lassekluever.de. mato-coaching.de leitet dauerhaft (301) darauf um. Die Namens-Umstellung im sichtbaren Inhalt (Lasse vorn, Mato als Methode) ist ein separater Task.

## Phase 0 – Entscheidungen [erledigt]
- E-Mail zieht auf @lassekluever.de um. [erledigt]
- Google Business Profil auf "Lasse Klüver" umbenannt (Phase 6). [erledigt]

## Phase 1 – Neue Domain erreichbar und E-Mail
- Vercel: lassekluever.de und www hinzugefügt, www kanonisch, apex 308 auf www, alle "Valid Configuration". Läuft parallel zur alten Domain. [erledigt]
- Strato DNS: A @ 216.198.79.1, CNAME www auf da1b965463e13c45.vercel-dns-017.com. [erledigt]
- Resend: mato-coaching.de entfernt, lassekluever.de hinzugefügt (Region Ireland), verifiziert. DKIM (resend._domainkey), SPF (TXT auf send), MX feedback-smtp.eu-west-1.amazonses.com über die Strato-Subdomain send.lassekluever.de. Root-MX bleibt Strato Mailserver, Postfach hello@lassekluever.de eingerichtet. [erledigt]
- Neuer RESEND_API_KEY mit Full access erstellt (der alte war auf mato-coaching.de beschränkt), in Vercel ersetzt, redeployt. Versand-Test erfolgreich. [erledigt]
- google-site-verification-TXT für lassekluever.de bei Strato (für Search Console, Phase 5). [erledigt]

## Phase 2 – Code auf neue Domain kanonisieren (Claude Code) [erledigt]
metadataBase, sitemap.ts, robots.ts, JSON-LD (url, @id, founder), OpenGraph- und OG-Bild-URLs sowie absolute interne Links auf https://www.lassekluever.de umgestellt. Umsetzung über eine zentrale Konstante src/lib/site.ts (SITE_URL plus absoluteUrl), alle 10 Fundstellen ziehen daraus. Auf main gemergt und deployt. Verifiziert: grep auf mato-coaching.de in src/ leer, Build grün, sitemap.xml, robots.txt und JSON-LD zeigen auf die neue Domain. Hinweis: Die separate inhaltliche Marken-Umstellung (Lasse vorn, sichtbarer Name nicht mehr "Mato Coaching") ist inzwischen umgesetzt.

## Phase 3 – Env und Integrationen
- Vercel Env: LEAD_AUDIO_URL auf www.lassekluever.de, LEAD_NOTIFICATION_EMAIL auf hello@lassekluever.de. [erledigt]
- Resend Absender und Reply-To auf hello@lassekluever.de, Anzeigename "Lasse Klüver · Mato Coaching". [erledigt]
- Supabase Auth: Site URL und Redirect-/Allow-URLs auf die neue Domain umstellen. [erledigt]
- Cal.com: etwaige Weiterleitungs-, Branding- oder Embed-Allowlist-Einträge auf die neue Domain. [erledigt]

## Phase 4 – Umschalten und Weiterleiten [erledigt]
Vercel: lassekluever.de als primär gesetzt, mato-coaching.de und www.mato-coaching.de leiten dauerhaft per 301 auf www.lassekluever.de um.

## Phase 5 – Suchmaschinen [erledigt]
Search Console: Property für lassekluever.de verifiziert, Sitemap eingereicht, Adressänderungs-Tool ausgeführt.

## Phase 6 – Profile und extern [erledigt]
Google Business: Website-URL auf www.lassekluever.de, Umbenennung auf "Lasse Klüver" abgeschlossen. LinkedIn-Website-Feld, weitere Verzeichnisse, E-Mail-Signatur aktualisiert.

## Phase 7 – Testen [erledigt]
- E-Mail-Versand auf der neuen Domain getestet, Audio und Benachrichtigung kommen an, audio_email_status auf sent. [erledigt]
- Kompletter Funnel auf www.lassekluever.de getestet: Assessment, Lead-Formular, Cal-Buchung, interne Links. mato-coaching.de leitet sauber per 301 weiter. [erledigt]

## Sicherheit
Die alte Domain bleibt registriert und nach Phase 4 dauerhaft weiterleitend, nicht auslaufen lassen. Bei Problemen lässt sich die Primärdomain in Vercel zurückstellen.

## Status
Alle Phasen abgeschlossen. Die Domain-Migration ist vollständig. www.lassekluever.de ist die einzige aktive Domain; mato-coaching.de leitet dauerhaft weiter.
