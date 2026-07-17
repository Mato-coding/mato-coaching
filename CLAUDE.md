# CLAUDE.md

Briefing für Claude Code. Lies zu Sitzungsbeginn diese Datei und design-system.md. Halte sie und AGENTS.md widerspruchsfrei. Bei Aufgaben zu Copy, Positionierung, Angebot oder Personendarstellung zusätzlich profil-lasse.md lesen. Bei Aufgaben rund um Erstgespräch, /termin oder /coaching zusätzlich erstgespraech-leitfaden.md lesen. Bei Aufgaben zum digitalen Workbook zusätzlich workbook-konzept.md lesen.

> Stand: 17.07.2026 (Workbook-Konzept auf Programm-Bereich-Schritt-Block-Hierarchie erweitert, Auftrag 1 abgeschlossen, Branch feature/workbook). Diese Zeile bei jedem live gegangenen Feature mit aktualisieren.

## Projekt
Brand- und Akquise-Website für Lasse Klüver. Angebot: Somatic Breathwork und IFS-orientierte Prozessbegleitung. Zielgruppe: zahlungskräftige Menschen mit stressbedingter innerer Unruhe, Anspannung, Erschöpfung. Anmutung: Quiet Luxury, ruhig, klar, autoritativ. Sprache Deutsch. Ziel: Conversion zu kostenfreiem Erstgespräch und zum Audio-Lead-Magneten. Person, Qualifikation, Angebot und Business-Ziele stehen in profil-lasse.md. Konfliktregel: CLAUDE.md für Projekt- und Technikstand, design-system.md für Gestaltung, profil-lasse.md für Person und Angebot.

## Marke
- Entscheidung: Lasse Klüver ist die primäre Identität. "Mato" ist die Methoden- und Markenebene, die später eigenständiger werden kann. Der Bär ist die verbindende Symbolik, der aber nicht bildlich im Logo gezeigt wird.
- Umgesetzt: Lasse Klüver steht vorn in Header, Metadaten, Schema und Footer; Mato dahinter als Methode. Die Seite zeigt "Lasse Klüver", nicht mehr "Mato Coaching".
- Nie "Mato Coaching by Lasse Klüver".
- Erstgespräch: etwa 45 Minuten, Leitfaden in erstgespraech-leitfaden.md (interne Datei, nicht auf die Website, nicht in die Sitemap).

## Domain (Migration abgeschlossen)
- Kanonische Domain: www.lassekluever.de. mato-coaching.de leitet dauerhaft per 301 auf www.lassekluever.de um.
- Alle absoluten URLs im Code zeigen auf https://www.lassekluever.de (über SITE_URL in src/lib/site.ts). Code kanonisiert, Vercel umgeschaltet, Search Console und Google Business aktualisiert. Details in migrations-plan.md.

## Stack
- Next.js 16.2.9, App Router, src/app, Turbopack, TypeScript.
- Tailwind v4, config-less. Tokens in globals.css via @theme sind die Quelle. KEINE tailwind.config.ts.
- Framer Motion sparsam, ui/FadeIn.tsx wiederverwenden.
- Cal.com via @calcom/embed-react unter /termin. Supabase und Resend fürs Backend. MDX fürs Journal.
- Deploy: Vercel via GitHub main. Schriften: Cormorant (font-serif, Display), Hanken Grotesk (font-sans, Body).

## Repo (Kurzüberblick)
- src/app/: layout.tsx (Root, Fonts, metadataBase), icon.svg, sitemap.ts, robots.ts
- src/app/api/: lead/route.ts (Lead-Magnet: Supabase + Resend, Versandstatus), assessment/route.ts (anonyme Abschlüsse)
- src/app/(public)/: layout.tsx (Metadaten, JsonLd), page.tsx (Startseite), assessment/page.tsx, breathwork/page.tsx (Service-Seite, live), coaching/page.tsx (Service-Seite, live), termin/ (page.tsx + CalEmbed.tsx), journal/ (page.tsx + [slug]/page.tsx)
- src/components/sections/ (Hero, Transformation, Cause, Method, About, CTA, LeadMagnet, LeadMagnetCTA)
- src/components/forms/ (AssessmentForm, LeadMagnetForm, ResultActions, MagicLinkForm)
- src/components/ui/ (Header, Footer, FadeIn), src/components/seo/JsonLd.tsx
- src/components/ui/HeaderAuthSlot.tsx: Client-Komponente, rechter Header-Slot mit drei Auth-Zuständen (Erstgespräch-CTA, "Mein Programm"-CTA, Abmelden-Textlink innerhalb von /programme). Prüft die Session clientseitig über den Supabase-Browser-Client, damit der Header selbst weiter statisch bleibt.
- src/app/(members)/: Route Group für Klienten-Bereich. Layout nutzt denselben Header und Footer wie die öffentliche Website. Routen: /programme (Hub), /programme/login (offen), /programme/ifs (erster Bereich). Auth via Supabase OTP-Code (kein Magic-Link-Klick). Session-Refresh site-weit in src/proxy.ts (Next.js Proxy-Konvention, ersetzt middleware.ts), getUser() läuft nur, wenn ein sb-*-auth-token-Cookie vorhanden ist, sonst kein Supabase-Roundtrip für anonyme Besucher.
- src/lib/supabase/: client.ts (Browser-Client, Anon Key), server.ts (Server-Client mit Cookie-Handling). Der Service-Role-Client bleibt in src/lib/supabase.ts, nur für API-Routen.
- src/lib/workbook-programs.ts: PROGRAMS-Konstante, ProgramSlug-Typ.
- src/lib/workbook-types.ts: Alle Block-Typen, Antwort-Typen, WorkbookResponse.
- src/app/auth/callback/route.ts: Code-Exchange nach Magic-Link-Klick.
- supabase/migrations/: SQL-Migrations (manuell im SQL Editor ausführen).
- src/content/journal/<slug>.mdx; src/lib/ (assessment-config.ts, journal.ts, supabase.ts, scroll.ts)

## Design (Details in design-system.md)
- Farben: background #fcfaf0, surface #ffffff, primary #19191a, accent #09173b (CTAs), muted #6b6e72, umber #7c6a57 (warmer Akzent, sparsam, Eyebrows und Hairlines).
- Display Cormorant, Body Hanken Grotesk. Section-Padding py-16 md:py-24. Buttons rounded-md, keine Schatten. Eyebrow = Umber-Hairline plus Uppercase-Label.

## Assessment (/assessment)
- Inhalt und Logik getrennt in src/lib/assessment-config.ts. Cluster = exhaustion|tension|panic, ResultRoute = ready|almost|not_yet.
- 5 Fragen, q1 setzt den Cluster, q3 verzweigt nach Cluster. Scoring zählt readiness_signal-Tags: >=4 ready, >=2 almost, sonst not_yet.
- AssessmentForm: history-State, Zurück und Überspringen, Umber-Fortschritt. POSTet den Abschluss einmal an /api/assessment, gibt cluster und result an ResultActions.
- ResultActions: drei Karten (Erstgespräch, Audio, Journal). Hängt bei /termin ?cluster=...&result=... an. Buttons gleich breit (max-w-62, 15.5rem), zentriert. Kein "Assessment neu starten"-Link. Lead-in-Satz über dem Audio-Formular blendet nach erfolgreichem Absenden aus (onSuccess).

## Journal (/journal)
- Gebaut. Artikel als src/content/journal/<slug>.mdx. Frontmatter: title, description, publishedAt (ISO), optional updatedAt, excerpt, coverImage, tags, draft. Datumsfeld heißt publishedAt.
- Übersicht plus Detailseite (MDX, BlogPosting-JSON-LD), Sitemap nimmt Artikel auf. JOURNAL_READY in ResultActions ist true.
- Vorhanden: was-ist-somatic-breathwork, was-bei-einer-panikattacke-passiert. Regel: erklären, nicht behandeln.

## Backend
- Lead-Magnet: LeadMagnetForm POSTet an /api/lead. Die Route speichert in Supabase, sendet Audio-Mail an die Person und Benachrichtigung an Lasse (Resend-Fehler prüfen). Absender "Lasse Klüver · Mato Coaching <hello@lassekluever.de>", Reply-To hello@lassekluever.de.
- LeadMagnetForm props: autoFocus, source, assessmentCluster, assessmentResult, onSuccess (feuert einmalig bei status "success", nutzen LeadMagnetCTA und ResultActions zum Ausblenden ihrer Einladungssätze). Sendet pagePath und referrer mit, scrollt bei Erfolg sanft nach oben.
- /api/assessment speichert anonyme Abschlüsse, versendet keine Mail.
- Resend: Domain lassekluever.de verifiziert (DKIM, SPF, send-MX über die Strato-Subdomain send.lassekluever.de). Root-MX = Strato Mailserver (Postfach hello@). RESEND_API_KEY ist Full-Access, nicht domain-beschränkt.

## Datenbank (RLS an, keine Public-Policy, nur Server schreibt)
- leads: id, created_at, email, name, consent, source, page_path, referrer, assessment_cluster, assessment_result, audio_email_status (pending dann sent oder failed). Spalte heißt audio_email_status.
- assessment_submissions: id, created_at, cluster, result_route, answers (jsonb).
- Keine IP speichern. User-Agent nur in der Mail, nicht in der DB.

## Env (in Vercel, Werte nie im Code)
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL (hello@lassekluever.de), LEAD_AUDIO_URL (https://www.lassekluever.de/audio/physiological-sigh.m4a).

## SEO
- sitemap.ts und robots.ts in src/app. JsonLd: ProfessionalService, areaServed Hamburg, founder Lasse Klüver (sameAs LinkedIn). Unternehmens-sameAs leer (später Instagram).
- knowsAbout enthält bewusst "Anxiety" und "Panikattacken" als Wissensgebiete (Inhaberentscheidung, nicht entfernen). Die Begriffe dürfen jetzt auch im sichtbaren Text nach der Ampel-Logik der Copy-Regeln genutzt werden.
- Bei neuen Seiten die Sitemap erweitern. Per-Page-Metadaten nur in Server-Komponenten.

## Copy- und Rechtsregeln
- Anxiety und Panikattacken im sichtbaren Text nach dieser Ampel-Logik (v2):

  Grün: Erlebens-Nennungen überall ('für Menschen mit Panikattacken', 'wenn du Anxiety kennst'). Edukative Journal-Artikel vollständig frei, inklusive hoffnungsvoller Aussagen, solange sie nicht als Versprechen des Programms formuliert sind. Teilnehmerstimmen als gekennzeichnete Zitate. Themenbenennende Metadaten. 'Hilfe bei Anxiety' und 'Begleitung bei Anxiety' sind erlaubt.
  Rot, nie: heilt, löst auf, beseitigt, befreit von, überwindet plus klinischer Begriff. Ergebniszusagen mit klinischen Begriffen. 'Behandlung von' oder 'Therapie für' plus klinischer Begriff. 'Hilfe bei Panikattacken' als Leistungsversprechen, stattdessen das für-Menschen-mit-Muster.
  Edukations-Leitplanke: In Journal-Artikeln keine direkte Verknüpfung von klinischem Begriff, Wirkzusage und dem Angebot im selben Absatz.
  Weiterhin keine Diagnosen oder Behandlungszusagen. Framing des Angebots bleibt Nervensystem-Regulation, Stressregulation, Persönlichkeitsentwicklung.
- Footer-Disclaimer sinngemäß: "...ersetzt keine psychotherapeutische oder ärztliche Behandlung."
- Stil: Sentence case, aktive Verben, keine Floskeln, KEINE Gedankenstriche.
- DSGVO: Einwilligung im Formular. Die Datenschutzerklärung muss source, page_path, referrer, assessment_cluster, assessment_result und audio_email_status abdecken. Vor Newsletter Double-Opt-in. Auftragsverarbeitung mit Supabase und Resend.

## Offene Aufgaben
1. ~~Domain-Migration~~ (erledigt). Alle Phasen abgeschlossen, Details in migrations-plan.md.
2. Restliche Service-Seite /ifs. Am /breathwork-Muster orientieren: Server-Komponente, eigene Metadaten über absoluteUrl (title, description, openGraph, alternates.canonical), Service-JSON-LD inline auf der Seite (nicht über JsonLd.tsx), Sitemap erweitern.
   Echte Header-Navigation erst entscheiden, wenn alle drei Service-Seiten stehen. Bewusst KEIN Header-Nav-Link für einzelne Seiten; Header bleibt auf den /termin-CTA reduziert.
3. Hör-Tracking des Audios (eigene Hörseite plus Token pro Lead, DSGVO-sensibel, eigener Auftrag mit Datenschutz-Absatz).
4. Weitere Journal-Artikel. AggregateRating sobald Bewertungen. OG-Bild 1200×630. Instagram in sameAs. Assessment-Videos.
5. Robuster Env-Umgang für LEAD_AUDIO_URL: In src/app/api/lead/route.ts keinen stillen Fallback auf eine hart verdrahtete Audio-URL verwenden. Fehlt die Env-Variable, eine Warnung ins Server-Log schreiben, statt lautlos eine Datei-URL zu raten. Grund: Ein stiller Fallback hat beim Domainwechsel einen falschen Link verdeckt.
6. Digitales IFS-Workbook für Klienten. Auftrag 1 (Fundament) ist umgesetzt auf feature/workbook, Details in workbook-konzept.md. Nächster Schritt: Auftrag 2 (Block-Renderer mit text, freetext, scale, choice und Autosave). Entwicklung ausschließlich auf dem Branch feature/workbook, Merge auf main erst nach MVP-Abschluss.
7. Datenschutz-Auftrag Workbook: eigener Datenschutz-Absatz und explizite Einwilligung, zwingend vor dem ersten echten Klienten im Workbook. Klienten-Reflexionen sind gesundheitsbezogene Daten.
8. Startmonat der Gründungsrunde festlegen (steht auch in profil-lasse.md als offen). Er bestimmt die Deadline für den Workbook-MVP und die Priorisierung der Aufträge 3 bis 7.
9. Marker-Entscheidung für Workbook-Schritte ohne zählende Blöcke (z.B. listened-Flag oder Gelesen-Marker), fällig bei Auftrag 3.

## Erledigt
- Inhaltliche Marken-Umstellung: Lasse vorn, Mato als Methode, in Header, Metadaten, Schema, Footer.
- Service-Seite /breathwork: umgesetzt und live auf www.lassekluever.de.
- /breathwork intern verlinkt: kontextueller Textlink in der Method-Section ("Wie Somatic Breathwork wirkt") und dezenter Footer-Link ("Somatic Breathwork"). Bewusst kein Header-Link.
- Service-Seite /coaching: live, mit Gründungsrunden-Konditionen (4 Plätze, 2.900 Euro, regulär ab 3.900 Euro) im sichtbaren Text. Copy-Prinzip der Seite: Outcomes vorn, Methoden als Begründung in eigener Sektion. Nach Abschluss der Gründungsrunde muss die Seite aktualisiert werden.
- PNG-Favicons ergänzt: src/app/icon.png (512×512) und src/app/apple-icon.png (180×180) neben icon.svg, damit Google in den Suchergebnissen zuverlässig das Icon zeigt. Next.js erzeugt automatisch <link rel="icon"> und <link rel="apple-touch-icon">.
- Lighthouse-Fixes (07.07.2026): Footer-Kontrast auf WCAG AA angehoben (/40 und /50 → /60 auf dunkelgrundigen Texten), Header-Logo-imgs mit width/height-Attributen dimensioniert (unsized-images), Hero-Einblendung von Framer Motion auf CSS-Animation umgestellt für früheres LCP (Keyframe hero-fade-up in globals.css, gestaffelte .hero-d1/.hero-d2/.hero-d3-Delays, FadeIn-Wrapper im Hero entfernt).

## Perspektivisch
Datenschutzfreundliche Analytics (Plausible, cookieless). Double-Opt-in vorbereiten. Lead-Dedup nach E-Mail. Resend-Webhook für "delivered". Cal.com-Webhook für Buchung in Supabase. Lokale Testumgebung (.env.local plus .env.local.example): separates Supabase-Dev-Projekt oder diszipliniert gegen Produktion (echte Tests schreiben in die DB und versenden echte Mails).

## Off-Code (keine Claude-Code-Aufgaben)
Google Business auf "Lasse Klüver" umbenannt, verifiziert. Search Console verifiziert, Sitemap eingereicht, Adressänderung ausgeführt. Bewertungen einsammeln ist der lokale Hebel. Keine bezahlten Anzeigen, bis der Funnel konvertiert.

## Arbeitsweise
- Kleine Aufgaben, ein Feature pro Sitzung. Tokens, Schriften, Spacing aus globals.css und design-system.md. FadeIn wiederverwenden. Häufig committen, vor Größerem ein Branch.
- Workbook-Aufträge committen und pushen immer auf origin feature/workbook, nie auf main.
- Dev-Hinweis: @theme in globals.css wird ggf. als unbekannte At-Rule markiert (harmlos). "Tailwind CSS IntelliSense" installieren oder css.lint.unknownAtRules auf ignore.
