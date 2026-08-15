# CLAUDE.md

Briefing für Claude Code. Lies zu Sitzungsbeginn diese Datei und design-system.md. Halte sie und AGENTS.md widerspruchsfrei. Bei Aufgaben zu Copy, Positionierung, Angebot oder Personendarstellung zusätzlich profil-lasse.md lesen. Bei Aufgaben rund um Erstgespräch, /termin oder /coaching zusätzlich erstgespraech-leitfaden.md lesen. Bei Aufgaben zum digitalen Workbook zusätzlich workbook-konzept.md lesen.

> Stand: 15.08.2026 (Architektur-Refactoring Auftrag 1 von 5 auf Branch refactor/primitives umgesetzt, nach architektur-audit.md: UI-Primitives Section/Container/Heading/Button/Card in src/components/ui/ gebaut, Eyebrow darauf erweitert, Startseite vollständig darauf migriert. Doppel-FadeIn auf der Startseite aufgelöst (Audit-Befund A1), Eyebrow/H2 in LeadMagnet und LeadMagnetForm-Erfolgszustand auf die Standard-Primitives umgestellt (Audit 2.2), font-display-Alias aus globals.css entfernt (ungenutzt), text-[--color-navy] in Method.tsx auf text-accent korrigiert (Audit 2.3 Befund C). Type-Scale- und Container-Tokens in globals.css verdrahtet, siehe Abschnitt "Architektur-Konventionen". Noch nicht auf main gemergt, Merge erst nach visueller Freigabe durch Lasse. Journal-Artikel breathe-to-heal-max-strom überarbeitet: neue Headline "Breathe to heal: heilen statt bewältigen", Infoblock zu Max Strom als Hairline-abgesetzter Absatz am Artikelende, mdx-components.tsx um hr-Styling in --color-hairline ergänzt. Live auf main. Assessment v2 auf Branch feature/assessment-v2 umgesetzt nach assessment-v2-spec.md: 7 Fragen, 4 Cluster inkl. mixed, Mehrfachauswahl-Frage F4, zweidimensionale Auswertung Readiness plus Care, modular komponierter Ergebnistext. Noch nicht auf main gemergt, Merge erst nach manuellem Test). Diese Zeile bei jedem live gegangenen Feature mit aktualisieren.

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
- src/components/forms/ (AssessmentForm, LeadMagnetForm, ResultActions)
- src/components/ui/ (Header, Footer, FadeIn, Eyebrow, Section, Container, Heading, Button, Card), src/components/seo/JsonLd.tsx
- src/content/journal/<slug>.mdx; src/lib/ (assessment-config.ts, journal.ts, supabase.ts, scroll.ts)

## Design (Details in design-system.md)
- Farben: background #fcfaf0, surface #ffffff, primary #19191a, accent #09173b (CTAs), muted #6b6e72, umber #7c6a57 (warmer Akzent, sparsam, Eyebrows und Hairlines).
- Display Cormorant, Body Hanken Grotesk. Section-Padding py-16 md:py-24. Buttons rounded-md, keine Schatten. Eyebrow = Umber-Hairline plus Uppercase-Label.

## Architektur-Konventionen
- Sektionen (src/components/sections/**) sind kontextfrei: jede Sektion bringt ihren eigenen Section-Wrapper und ihre eigenen FadeIns vollständig selbst mit. Seiten (src/app/(public)/**/page.tsx) sind reine Kompositionslisten aus Sektionen, ohne äußere FadeIn-Wrapper und ohne sonstige Layout-Logik. Grund: dieselbe Sektion kann auf mehreren Seiten eingesetzt werden (z. B. About.tsx auf / und als BreathworkAbout-Alias auf /breathwork) und muss sich dort identisch verhalten.
- Wiederkehrende UI-Muster laufen ausschließlich über die Primitives in src/components/ui/: Section (Padding), Container (Breite), Heading (Überschriftengrößen), Button (CTA-Links), Card (Kartenrand/-radius), Eyebrow (Umber-Label). Keine handgerollten Klassenketten für diese Muster in Sections, Forms oder Pages.
- Section-Padding ausschließlich über die size-Prop (compact/default/spacious), nie als eigene py-*-Klasse am Aufrufer. Containerbreiten ausschließlich über Container (width prose/narrow/default), nie als eigene max-w-*-Klasse am Aufrufer.
- Ausnahmen sind erlaubt, wenn eine Sektion nachweislich von der gemeinsamen Größe abweicht (z. B. Cause.tsx' größere H2, CTA.tsx' schmalere Textspalte) — dann bleibt die betroffene Stelle bewusst außerhalb des Primitives, statt sie unbeabsichtigt zu verkleinern/verbreitern oder ein Primitive mit widersprüchlicher className zu überladen (Cascade-Reihenfolge bei zwei Utilities auf derselben CSS-Property ist nicht garantiert quellcode-Reihenfolge).
- Neue Seiten folgen dem Muster sections/<seite>/*.tsx (eigener Unterordner pro Seite, wie bereits bei breathwork/ etabliert), keine Inline-JSX-Sektionen in der page.tsx.
- Type-Scale lebt in globals.css (--text-display/-display-md/-display-lg, --text-h2/-h2-md, --leading-display/-h2) plus Heading.tsx; Containerbreiten in globals.css (--container-content, --container-measure) plus Container.tsx. Schriftgrößen für Headlines sind nur noch an diesen beiden Stellen definiert.

## Assessment (/assessment)
- Assessment v2, umgesetzt nach assessment-v2-spec.md (Statuszeile dort trägt das Umsetzungsdatum). Inhalt und Logik getrennt in src/lib/assessment-config.ts. Cluster = exhaustion|tension|panic|mixed, ResultRoute = ready|almost|not_yet.
- 7 Fragen: q1 setzt den Cluster (inkl. mixed), q2/q4/q5/q6/q7 gemeinsam für alle Cluster, q3 hat vier Varianten (q3_exhaustion/q3_tension/q3_panic/q3_mixed) und verzweigt nach Cluster. q4 ist eine Mehrfachauswahl-Frage (Körperempfindungen) mit einer exklusiven "weiß nicht"-Antwort, die alle anderen abwählt und umgekehrt abgewählt wird, sobald etwas anderes gewählt wird. Kein Überspringen mehr, jede Frage muss beantwortet werden.
- Scoring: readiness_signal zählt 1 Punkt, readiness_soft 0,5 Punkte. Schwellen: Score >=4 ready, >=2,5 und <4 almost, sonst not_yet. Care-Logik zusätzlich und unabhängig von der Route: careActive, wenn mindestens 1 care_signal-Tag oder mindestens 2 care_signal_soft-Tags gesammelt wurden. calculateResult(collectedTags) gibt { route, careActive } zurück.
- Ergebnistext ist modular aus den tatsächlich gewählten Antworten komponiert (composeResult in assessment-config.ts), nicht mehr statisch pro Route/Cluster. Bausteine in fixer Reihenfolge: Headline und Einstieg nach Cluster, Spiegelbaustein zur F3-Antwort, Körperabsatz zu den F4-Auswahlen (inkl. Sonderfällen Taubheit und "nie geachtet"), Spiegelbaustein zur F5-Antwort, Nervensystem-Absatz nach Cluster, optionale Zusatzsätze (insight_no_relief, chronic_pattern), optionaler Care-Absatz, optionaler Modifikator (need_embodiment oder need_companionship) und der Routentext mit optionalem search_fatigue-Einschub bei ready/almost. Ein Baustein erscheint nur, wenn sein Tag durch eine tatsächlich gewählte Antwort gesammelt wurde.
- AssessmentForm: history-State (inkl. Antwort-IDs pro Frage), Zurück-Button bleibt, Umber-Fortschritt. Einzelauswahl-Fragen wählen direkt und gehen weiter, q4 togglet Auswahlen und hat einen eigenen Weiter-Button (aktiv ab mindestens einer Auswahl). POSTet den Abschluss einmal an /api/assessment (answers als Objekt questionId → Antwort-ID, bei q4 als Array), gibt cluster und route an AssessmentResult/ResultActions.
- AssessmentResult (neu, src/components/forms/AssessmentResult.tsx): rendert Headline (Cormorant, H1/Section-Größe) und die komponierten Absätze als ruhigen Lesetext (max-w-[68ch], kein Kartenrahmen), danach den leisen Link "Assessment neu starten" (setzt den Form-State zurück), danach ResultActions.
- ResultActions: unverändert für alle drei Routen (keine Sonder-Variante für not_yet, die Lenkung übernimmt der Routentext). Drei Karten (Erstgespräch, Audio, Journal), Erstgespräch-Karte verlinkt immer /termin?cluster=...&result=..., cluster kann jetzt auch "mixed" sein. Buttons gleich breit (max-w-62, 15.5rem), zentriert. Lead-in-Satz über dem Audio-Formular blendet nach erfolgreichem Absenden aus (onSuccess).

## Journal (/journal)
- Gebaut. Artikel als src/content/journal/<slug>.mdx. Frontmatter: title, description, publishedAt (ISO), optional updatedAt, excerpt, coverImage, tags, draft. Datumsfeld heißt publishedAt.
- Übersicht plus Detailseite (MDX, BlogPosting-JSON-LD), Sitemap nimmt Artikel auf. JOURNAL_READY in ResultActions ist true.
- Vorhanden: was-ist-somatic-breathwork, was-bei-einer-panikattacke-passiert, breathe-to-heal-max-strom. Regel: erklären, nicht behandeln.

## Backend
- Lead-Magnet: LeadMagnetForm POSTet an /api/lead. Die Route speichert in Supabase, sendet Audio-Mail an die Person und Benachrichtigung an Lasse (Resend-Fehler prüfen). Absender "Lasse Klüver · Mato Coaching <hello@lassekluever.de>", Reply-To hello@lassekluever.de.
- LeadMagnetForm props: autoFocus, source, assessmentCluster, assessmentResult, onSuccess (feuert einmalig bei status "success", nutzen LeadMagnetCTA und ResultActions zum Ausblenden ihrer Einladungssätze). Sendet pagePath und referrer mit, scrollt bei Erfolg sanft nach oben.
- /api/assessment speichert anonyme Abschlüsse, versendet keine Mail.
- Resend: Domain lassekluever.de verifiziert (DKIM, SPF, send-MX über die Strato-Subdomain send.lassekluever.de). Root-MX = Strato Mailserver (Postfach hello@). RESEND_API_KEY ist Full-Access, nicht domain-beschränkt.
- Supabase-Keep-alive-Cron: src/app/api/cron/keep-alive/route.ts, per Vercel Cron (vercel.json) montags und donnerstags 6:00 UTC aufgerufen. Zweck: Das Supabase-Free-Projekt pausiert nach 7 Tagen Inaktivität, das hat POST /api/lead in Produktion bereits einmal fehlschlagen lassen. Die Route macht einen minimalen Read (count auf leads, keine Daten geloggt) und prüft den Bearer-Header gegen CRON_SECRET. Entfällt nach dem Upgrade auf Supabase Pro (siehe offene Aufgaben).

## Datenbank (RLS an, keine Public-Policy, nur Server schreibt)
- leads: id, created_at, email, name, consent, source, page_path, referrer, assessment_cluster, assessment_result, audio_email_status (pending dann sent oder failed). Spalte heißt audio_email_status.
- assessment_submissions: id, created_at, cluster, result_route, answers (jsonb).
- Keine IP speichern. User-Agent nur in der Mail, nicht in der DB.

## Env (in Vercel, Werte nie im Code)
NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL (hello@lassekluever.de), LEAD_AUDIO_URL (https://www.lassekluever.de/audio/physiological-sigh.m4a), CRON_SECRET (autorisiert den Vercel-Cron-Aufruf gegen /api/cron/keep-alive, von Vercel selbst als Bearer-Header mitgeschickt).

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
6. Digitales IFS-Workbook für Klienten. Konzept, Architektur und Auftragsfahrplan stehen in workbook-konzept.md. Entwicklung ausschließlich auf dem Branch feature/workbook, Merge auf main erst nach MVP-Abschluss.
7. Supabase Pro Upgrade spätestens zum Start der Gründungsrunde, danach Keep-alive-Cron entfernen.
8. Architektur-Refactoring nach architektur-audit.md, Fahrplan in Abschnitt 3 dort: Auftrag 1 (UI-Primitives, Startseite) erledigt auf Branch refactor/primitives, noch nicht gemergt. Offen: Auftrag 2 (/coaching in sections/coaching/*.tsx extrahieren, BreathworkAbout.tsx-Entscheidung), Auftrag 3 (/breathwork auf die Primitives migrieren), Auftrag 4 (Metadata/JSON-LD vereinheitlichen), Auftrag 5 (Header/Footer, restliche Seiten, verbleibende border-primary/N-Fundstellen auf --color-hairline).

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
