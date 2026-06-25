# Migrations- und Changeplan: Domainwechsel zu lassekluever.de

Status-Legende: [erledigt] · [offen] · [in Arbeit]

## Ziel
Kanonische Hauptdomain wird www.lassekluever.de. mato-coaching.de leitet dauerhaft (301) darauf um. Die Namens-Umstellung im sichtbaren Inhalt (Lasse vorn, Mato als Methode) ist ein separater Task.

## Phase 0 – Entscheidungen [erledigt]
- E-Mail zieht auf @lassekluever.de um. [erledigt]
- Google Business Profil wird auf "Lasse Klüver" umbenannt, aber erst in Phase 6. [offen]

## Phase 1 – Neue Domain erreichbar und E-Mail
- Vercel: lassekluever.de und www hinzugefügt, www kanonisch, apex 308 auf www, alle "Valid Configuration". Läuft parallel zur alten Domain. [erledigt]
- Strato DNS: A @ 216.198.79.1, CNAME www auf da1b965463e13c45.vercel-dns-017.com. [erledigt]
- Resend: mato-coaching.de entfernt, lassekluever.de hinzugefügt (Region Ireland), verifiziert. DKIM (resend._domainkey), SPF (TXT auf send), MX feedback-smtp.eu-west-1.amazonses.com über die Strato-Subdomain send.lassekluever.de. Root-MX bleibt Strato Mailserver, Postfach hello@lassekluever.de eingerichtet. [erledigt]
- Neuer RESEND_API_KEY mit Full access erstellt (der alte war auf mato-coaching.de beschränkt), in Vercel ersetzt, redeployt. Versand-Test erfolgreich. [erledigt]
- google-site-verification-TXT für lassekluever.de bei Strato (für Search Console, Phase 5). [offen]

## Phase 2 – Code auf neue Domain kanonisieren (Claude Code) [erledigt]
metadataBase, sitemap.ts, robots.ts, JSON-LD (url, @id, founder), OpenGraph- und OG-Bild-URLs sowie absolute interne Links auf https://www.lassekluever.de umgestellt. Umsetzung über eine zentrale Konstante src/lib/site.ts (SITE_URL plus absoluteUrl), alle 10 Fundstellen ziehen daraus. Auf main gemergt und deployt. Verifiziert: grep auf mato-coaching.de in src/ leer, Build grün, sitemap.xml, robots.txt und JSON-LD zeigen auf die neue Domain. Sichtbarer Markenname "Mato Coaching" bewusst unverändert. Hinweis: Eine uncommittete Titel-/Template-Änderung in src/app/layout.tsx (zurück auf "Mato Coaching") liegt bewusst beiseite und gehört zur separaten inhaltlichen Marken-Umstellung, nicht zu dieser Migration.

## Phase 3 – Env und Integrationen
- Vercel Env: LEAD_AUDIO_URL auf www.lassekluever.de, LEAD_NOTIFICATION_EMAIL auf hello@lassekluever.de. [erledigt]
- Resend Absender und Reply-To auf hello@lassekluever.de, Anzeigename "Lasse Klüver · Mato Coaching". [erledigt]
- Supabase Auth: Site URL und Redirect-/Allow-URLs auf die neue Domain umstellen. [offen]
- Cal.com: etwaige Weiterleitungs-, Branding- oder Embed-Allowlist-Einträge auf die neue Domain. [offen, vermutlich gering]

## Phase 4 – Umschalten und Weiterleiten [offen]
Vercel: lassekluever.de als primär setzen, mato-coaching.de und www.mato-coaching.de auf dauerhafte 301-Weiterleitung zu www.lassekluever.de. Aktuell liefern noch beide Domains aus, die alte leitet noch nicht um.

## Phase 5 – Suchmaschinen [offen]
Search Console: neue Property für lassekluever.de verifizieren (per DNS-TXT aus Phase 1), Sitemap einreichen, Adressänderungs-Tool alt auf neu ausführen, sobald die 301-Weiterleitung steht.

## Phase 6 – Profile und extern [offen]
Google Business: Website-URL auf www.lassekluever.de und Umbenennung auf "Lasse Klüver" (kann eine Google-Prüfung auslösen). LinkedIn-Website-Feld, weitere Verzeichnisse, E-Mail-Signatur.

## Phase 7 – Testen [in Arbeit]
- E-Mail-Versand auf der neuen Domain getestet, Audio und Benachrichtigung kommen an, audio_email_status auf sent. [erledigt]
- Nach dem Umschalten den kompletten Funnel auf www.lassekluever.de testen: Assessment, Lead-Formular, Cal-Buchung, interne Links. Prüfen, dass mato-coaching.de sauber per 301 weiterleitet. [offen]

## Sicherheit
Die alte Domain bleibt registriert und nach Phase 4 dauerhaft weiterleitend, nicht auslaufen lassen. Bei Problemen lässt sich die Primärdomain in Vercel zurückstellen.

## Was als Nächstes ansteht
Phase 3-Rest (Supabase Auth, Cal.com), dann Phase 4 Umschalten plus 301, anschließend Phase 5 und 6. Phase 4 erst ausführen, wenn direkt danach der vollständige Funnel-Test aus Phase 7 möglich ist.
