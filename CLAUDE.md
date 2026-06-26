# CLAUDE.md

Briefing für Claude Code. Lies zu Sitzungsbeginn diese Datei und design-system.md. Halte sie und AGENTS.md widerspruchsfrei.

## Projekt
Brand- und Akquise-Website für Lasse Klüver. Angebot: Somatic Breathwork und IFS-orientierte Prozessbegleitung. Zielgruppe: zahlungskräftige Menschen mit stressbedingter innerer Unruhe, Anspannung, Erschöpfung. Anmutung: Quiet Luxury, ruhig, klar, autoritativ. Sprache Deutsch. Ziel: Conversion zu kostenfreiem Erstgespräch und zum Audio-Lead-Magneten.

## Marke (in Umstellung)
- Entscheidung: Lasse Klüver ist die primäre Identität. "Mato" wird zur Methoden- und Markenebene, die später eigenständiger werden kann. Der Bär ist die verbindende Symbolik (Bärenenergie als Markenkonzept, nicht als Bildzeichen).
- Umgesetzt: Header zeigt "Lasse Klüver" plus Umber-Eyebrow "Somatic Breathwork · IFS Coaching". Footer führt bewusst "Lasse Klüver · Mato Coaching" (Lasse vorn, Mato als zweite Ebene). JSON-LD nutzt name "Lasse Klüver" und alternateName "Mato Coaching".
- Header-Lockup: Header.tsx nutzt seit dem SVG-Lockup-Umbau public/header-lockup-outlined.svg (ab sm, Lockup mit Mark + Name + Eyebrow) und public/mark-symbol-tight.svg (mobil, nur Bildmarke). Name und Eyebrow stehen zusätzlich als sr-only-Span im Link (SEO, Screenreader). Die frühere Eyebrow-plus-translate-Konstruktion mit Text-Spans ist abgelöst. LogoMark.tsx bleibt, da vom Footer genutzt.
- Nie "Mato Coaching by Lasse Klüver".

## Domain (in Migration)
- Neue kanonische Domain: www.lassekluever.de. mato-coaching.de wird per 301 darauf umgeleitet.
- Stand: Domain in Vercel live, E-Mail migriert. Offen: Code kanonisieren (metadataBase, sitemap, robots, Schema- und OG-URLs), Vercel auf primär/Redirect umschalten, Search-Console-Adressänderung, Google Business. Details in migrations-plan.md.
- Alle absoluten URLs im Code sollen auf https://www.lassekluever.de zeigen.

## Stack
- Next.js 16.2.9, App Router, src/app, Turbopack, TypeScript.
- Tailwind v4, config-less. Tokens in globals.css via @theme sind die Quelle. KEINE tailwind.config.ts.
- Framer Motion sparsam, ui/FadeIn.tsx wiederverwenden.
- Cal.com via @calcom/embed-react unter /termin. Supabase und Resend fürs Backend. MDX fürs Journal.
- Deploy: Vercel via GitHub main. Schriften: Cormorant (font-serif, Display), Hanken Grotesk (font-sans, Body).

## Repo (Kurzüberblick)
- src/app/: layout.tsx (Root, Fonts, metadataBase), icon.svg, sitemap.ts, robots.ts
- src/app/api/: lead/route.ts (Lead-Magnet: Supabase + Resend, Versandstatus), assessment/route.ts (anonyme Abschlüsse)
- src/app/(public)/: layout.tsx (Metadaten, JsonLd), page.tsx (Startseite), assessment/page.tsx, termin/ (page.tsx + CalEmbed.tsx), journal/ (page.tsx + [slug]/page.tsx)
- src/components/sections/ (Hero, Transformation, Cause, Method, About, CTA, LeadMagnet, LeadMagnetCTA)
- src/components/forms/ (AssessmentForm, LeadMagnetForm, ResultActions)
- src/components/ui/ (Header, Footer, FadeIn), src/components/seo/JsonLd.tsx
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
NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL (hello@lassekluever.de), LEAD_AUDIO_URL (https://www.lassekluever.de/audio/breathwork-reset.mp3).

## SEO
- sitemap.ts und robots.ts in src/app. JsonLd: ProfessionalService, areaServed Hamburg, founder Lasse Klüver (sameAs LinkedIn). Unternehmens-sameAs leer (später Instagram).
- knowsAbout enthält bewusst "Anxiety" und "Panikattacken" als Wissensgebiete (Inhaberentscheidung, nicht entfernen, keine Behandlungsversprechen im sichtbaren Text).
- Bei neuen Seiten die Sitemap erweitern. Per-Page-Metadaten nur in Server-Komponenten.

## Copy- und Rechtsregeln
- KEINE Heilversprechen, Diagnosen oder Behandlungszusagen im sichtbaren Text. Framing: Nervensystem-Regulation, Persönlichkeitsentwicklung, Stressregulation.
- Footer-Disclaimer sinngemäß: "...ersetzt keine psychotherapeutische oder ärztliche Behandlung."
- Stil: Sentence case, aktive Verben, keine Floskeln, KEINE Gedankenstriche.
- DSGVO: Einwilligung im Formular. Die Datenschutzerklärung muss source, page_path, referrer, assessment_cluster, assessment_result und audio_email_status abdecken. Vor Newsletter Double-Opt-in. Auftragsverarbeitung mit Supabase und Resend.

## Offene Aufgaben
1. Domain-Migration abschließen: Code kanonisieren (metadataBase, sitemap.ts, robots.ts, JsonLd.tsx und journal/[slug]/page.tsx zeigen noch hart auf mato-coaching.de), Vercel-Redirect, Search Console, Google Business. migrations-plan.md ist referenziert, existiert aber noch nicht im Repo.
2. ~~Inhaltliche Marken-Umstellung~~ (erledigt). Mato-Methoden-Naming noch offen (separater Task).
3. Service-Seiten /breathwork, /coaching, /ifs (eigene Metadaten, Service-Schema, interne Links).
4. Hör-Tracking des Audios (eigene Hörseite plus Token pro Lead, DSGVO-sensibel, eigener Auftrag mit Datenschutz-Absatz).
5. Neues Logo (abstraktes Bildzeichen, keine Wortmarke), danach BIMI fürs Absender-Avatar.
6. Weitere Journal-Artikel. AggregateRating sobald Bewertungen. OG-Bild 1200×630. Instagram in sameAs. Assessment-Videos.

## Perspektivisch
Datenschutzfreundliche Analytics (Plausible, cookieless). Double-Opt-in vorbereiten. Lead-Dedup nach E-Mail. Resend-Webhook für "delivered". Cal.com-Webhook für Buchung in Supabase. Lokale Testumgebung (.env.local plus .env.local.example): separates Supabase-Dev-Projekt oder diszipliniert gegen Produktion (echte Tests schreiben in die DB und versenden echte Mails).

## Off-Code (keine Claude-Code-Aufgaben)
Google Business verifiziert (wird auf "Lasse Klüver" umbenannt), Bewertungen einsammeln ist der lokale Hebel. Search Console pending. Keine bezahlten Anzeigen, bis der Funnel konvertiert.

## Arbeitsweise
- Kleine Aufgaben, ein Feature pro Sitzung. Tokens, Schriften, Spacing aus globals.css und design-system.md. FadeIn wiederverwenden. Häufig committen, vor Größerem ein Branch.
- Dev-Hinweis: @theme in globals.css wird ggf. als unbekannte At-Rule markiert (harmlos). "Tailwind CSS IntelliSense" installieren oder css.lint.unknownAtRules auf ignore.
