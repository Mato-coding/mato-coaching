# CLAUDE.md

Briefing für Claude Code. Lies zu Beginn jeder Sitzung diese Datei und `design-system.md`.
Im Repo liegt zusätzlich eine `AGENTS.md`. Halte beide widerspruchsfrei, diese Datei ist die Quelle der Wahrheit.

---

## Projekt

Persönliche Brand- und Akquise-Website für Lasse Klüver (mato-coaching.de).
Angebot: Somatic Breathwork und IFS-orientierte (Internal Family Systems) Prozessbegleitung.
Sprache: Deutsch. Ziel: Premium-Wirkung, Vertrauen, Conversion zu kostenfreiem Erstgespräch und zum Lead-Magneten.
Anmutung: "Quiet Luxury", ruhig, klar, autoritativ. Zielgruppe: zahlungskräftige Menschen mit stressbedingter innerer Unruhe, Anspannung, Erschöpfung.

---

## Stack

- Next.js 16.2.9, App Router, `src/app`, Turbopack, TypeScript
- Tailwind CSS v4. Tokens in `globals.css` via `@theme` sind die Quelle der Wahrheit. KEINE `tailwind.config.ts` (v4, config-less). Keine neue anlegen.
- Framer Motion, zurückhaltend. Bestehende `ui/FadeIn.tsx` wiederverwenden (duration 0.8, easeOut, y:20, viewport once).
- Cal.com via `@calcom/embed-react`, eingebettet unter `/termin`. Cal-Link `lasse-kluever/erstgespraech`.
- Supabase (`@supabase/supabase-js`) und Resend für Lead-Magnet und Tracking.
- MDX fürs Journal (Artikel als Dateien in `src/content/journal/`).
- Deploy: Vercel via GitHub `main`.
- Schriften: Spectral (Display, `font-serif`), Geist Sans (Body/UI, `font-sans`).

---

## Repo-Struktur (Ist-Stand)

```
src/
├── app/
│   ├── layout.tsx                 # Root: <html lang="de">, Fonts, metadataBase, Title-Template
│   ├── icon.svg                   # Favicon
│   ├── sitemap.ts                 # nimmt Journal-Artikel automatisch auf
│   ├── robots.ts
│   ├── api/
│   │   ├── lead/route.ts          # Lead-Magnet: Supabase + Resend, Versandstatus
│   │   └── assessment/route.ts    # speichert anonyme Assessment-Abschlüsse (keine Mail)
│   └── (public)/
│       ├── layout.tsx             # Metadaten, OpenGraph, <JsonLd/>; <main> mit pt-Offset (fixer Header)
│       ├── page.tsx               # Startseite
│       ├── assessment/page.tsx    # rendert <AssessmentForm/>
│       ├── termin/
│       │   ├── page.tsx           # Server, metadata
│       │   └── CalEmbed.tsx       # Client, Cal.com-Embed; liest cluster/result aus URL und prefillt
│       └── journal/
│           ├── page.tsx           # Übersicht
│           └── [slug]/page.tsx    # Artikel, MDX-Rendering, BlogPosting-JSON-LD, generateStaticParams
├── components/
│   ├── sections/                  # Startseiten-Sektionen
│   │   ├── Hero.tsx Transformation.tsx Cause.tsx Method.tsx About.tsx CTA.tsx
│   │   └── LeadMagnet.tsx         # Audio-Sektion, nutzt <LeadMagnetForm source="startseite" />
│   ├── forms/
│   │   ├── AssessmentForm.tsx     # Branching, Scoring, Ergebnis; POSTet Abschluss an /api/assessment
│   │   ├── LeadMagnetForm.tsx     # E-Mail-Formular; props: autoFocus, source, assessmentCluster, assessmentResult
│   │   └── ResultActions.tsx      # Drei Optionen; gibt cluster/result weiter
│   ├── ui/
│   │   ├── Header.tsx Footer.tsx FadeIn.tsx
│   └── seo/JsonLd.tsx
├── content/
│   └── journal/                   # Artikel als <slug>.mdx
└── lib/
    ├── assessment-config.ts       # Fragen, Branching, Scoring, Ergebnis-Inhalte
    ├── journal.ts                 # liest/parst .mdx aus src/content/journal/
    └── supabase.ts                # server-only Admin-Client (lazy factory)
```

Neben `(public)` gibt es weitere Route-Gruppen (auth, protected). Marketing-Inhalte gehören in `(public)`.

---

## Marke (verbindlich)

- "Mato Coaching" ist der kanonische Geschäftsname überall (Header, Metadaten, Schema, Google Business, Footer).
- Lasse Klüver ist die sichtbare Person und der `founder` (About-Sektion, Schema, Porträtfoto).
- Niemals "Mato Coaching by Lasse Klüver". Keine Vermischung der Ebenen.

---

## Angebot (Arbeitsstand, Preise vorläufig)

- "Erdung": Gruppen-Breathwork-Reihe, hybrid, Einstieg, ca. 190 bis 390 EUR p. P.
- "Neuausrichtung": 1:1-Begleitung ca. 10 bis 12 Wochen, hybrid, Premium, ca. 2.900 bis 4.500 EUR.

---

## Design-System (Kurzreferenz, Details in design-system.md)

| Token | Wert | Verwendung |
|---|---|---|
| `--color-background` | #fcfaf0 | Papierweiß, Seitenhintergrund |
| `--color-surface` | #ffffff | Karten, Formulare |
| `--color-primary` | #19191a | Fließtext |
| `--color-accent` | #09173b | Navy, primäre CTAs |
| `--color-muted` | #6b6e72 | Nebentext |
| `--color-umber` | #7c6a57 | einziger warmer Akzent, sparsam (Eyebrows, Hairlines) |

- Display = Spectral (`font-serif`), Body/UI = Geist Sans (`font-sans`).
- Section-Padding `py-16 md:py-24`. Buttons `rounded-md`, keine Schatten, keine Pillen.
- Eyebrow-Muster: kurze Umber-Hairline plus Uppercase-Label in `text-umber`.

---

## Assessment (`/assessment`)

- Inhalt und Logik getrennt: alle Texte, Branching, Scoring und Ergebnis-Inhalte in `src/lib/assessment-config.ts`.
- Typen: `Cluster = "exhaustion" | "tension" | "panic"`, `ResultRoute = "ready" | "almost" | "not_yet"`.
- 5 Fragen: q1 setzt den Cluster ("Etwas anderes" fällt auf `tension`), q2 Dauer, q3 verzweigt nach Cluster, q4 Versuchtes, q5 Bedarf. Jede Frage hat eine "Etwas anderes"-Option.
- Scoring (`calculateResult`): zählt `readiness_signal`-Tags. >=4 => `ready`, >=2 => `almost`, sonst `not_yet`.
- Ergebnis-Routen-CTAs: `ready`/`almost` zeigen auf `/termin`; `not_yet` auf `/` mit "Zurück zur Startseite".
- `AssessmentForm.tsx`: history-basierter State, Zurück, Überspringen, Umber-Fortschrittsbalken. Beim Erreichen des Ergebnisses wird der Abschluss EINMAL an `/api/assessment` gesendet (Doppel-Send über useRef verhindert). Gibt `cluster` und `result` an `ResultActions` weiter.
- `ResultActions.tsx`: drei Karten (Desktop-Breakout-Band, mobil gestapelt), gleich hoch, Buttons `mt-auto` unten bündig, feste Breite `w-72 mx-auto` statt voller Breite. Karte 1 Erstgespräch (ergebnisabhängiger CTA, hängt bei `/termin` `?cluster=...&result=...` an), Karte 2 Audio (öffnet `LeadMagnetForm` mit Assessment-Kontext), Karte 3 Journal (Schalter `JOURNAL_READY`). Kein Neustart-Link mehr (kein `onRestart`-Prop); großzügiges `pb-16 md:pb-24` unten zum Footer.

---

## Journal (`/journal`)

- Gebaut. Artikel liegen als `src/content/journal/<slug>.mdx`. Dateiname = Slug.
- Frontmatter: `title`, `description`, `publishedAt` (ISO-Datum), optional `updatedAt`, `excerpt`, `coverImage`, `tags`, `draft`. Loader und Artikel müssen exakt diese Feldnamen verwenden (Datum heißt `publishedAt`).
- Übersicht listet Artikel, Detailseite rendert MDX mit eigenem BlogPosting-JSON-LD, Sitemap nimmt Artikel automatisch auf, Footer verlinkt `/journal`.
- Erster Artikel: `was-ist-somatic-breathwork.mdx`. Sobald der erste Artikel live und korrekt gerendert ist, `JOURNAL_READY` in `ResultActions.tsx` auf `true` setzen.
- Inhaltsregel: erklären, nicht behandeln (siehe Copy-Regeln). Texte liefert der Inhaber.

---

## Lead-Magnet und Backend

Ablauf: `LeadMagnetForm` (Client) sendet an `POST /api/lead`. Die Route speichert den Lead zuerst (mit `audio_email_status: "pending"`), versucht dann das Audio per Resend zu senden, aktualisiert `audio_email_status` auf `sent`/`failed` und verschickt danach IMMER die Benachrichtigung an Lasse (auch wenn der Audio-Versand fehlschlug) — erst danach antwortet die Route ggf. mit Fehler. Resend-Fehler werden geprüft (nicht ignoriert).

- Absender `Mato Coaching <hello@mato-coaching.de>`, Reply-To `hello@mato-coaching.de` (Strato-Postfach).
- Audio-Link aus `LEAD_AUDIO_URL` (Datei liegt in `public/audio/`).
- `LeadMagnetForm`: props `autoFocus`, `source`, `assessmentCluster`, `assessmentResult`. Scrollt bei Erfolg so weit nach oben, dass Eyebrow und Überschrift sichtbar sind. Schickt zusätzlich `pagePath` und `referrer` mit.
- `/api/assessment`: speichert anonyme Abschlüsse, versendet KEINE Mail.

Supabase:
- Projekt "Mato Coaching", Region EU (Frankfurt). Client `src/lib/supabase.ts` ist server-only (Service-Role), nie im Client importieren.
- Alle Tabellen mit RLS, ohne Public-Policy. Nur der Server schreibt.

Resend:
- Domain verifiziert (DKIM, SPF, MX alle grün).
- Der `send`-MX liegt auf der in Strato angelegten Subdomain `send.mato-coaching.de`, die eine eigene DNS-Verwaltung hat. Der Root-MX zeigt auf "STRATO Mailserver" (Postfach `hello@`). Diesen Aufbau nicht anfassen.

Vercel-Umgebungsvariablen (Werte nur in Vercel, nie im Code):

| Variable | Zweck |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (ohne `/rest/v1`) |
| `SUPABASE_SERVICE_ROLE_KEY` | geheimer Service-Role-Key, nur Server |
| `RESEND_API_KEY` | Resend API Key |
| `LEAD_NOTIFICATION_EMAIL` | Benachrichtigungsadresse |
| `LEAD_AUDIO_URL` | öffentliche URL der Audiodatei |

---

## Datenbank-Schema

`public.leads`:
- id (uuid), created_at (timestamptz)
- email (text), name (text), consent (bool)
- source (text), page_path (text), referrer (text)
- assessment_cluster (text), assessment_result (text)
- audio_email_status (text): "pending" beim Anlegen, dann "sent" oder "failed"

`public.assessment_submissions`:
- id (uuid), created_at (timestamptz)
- cluster (text), result_route (text), answers (jsonb)

Hinweis: Keine IP-Adresse speichern. User-Agent wird nur in der Benachrichtigungsmail ausgegeben, nicht gespeichert.

---

## SEO

- `sitemap.ts` und `robots.ts` in `src/app`. Neue Seiten (Service-Seiten) in die Sitemap aufnehmen.
- `JsonLd.tsx`: `ProfessionalService` "Mato Coaching", `areaServed` Hamburg, `founder` Lasse Klüver mit `sameAs` LinkedIn. Unternehmens-`sameAs` ist leer (nimmt später berufliches Instagram auf).
- `knowsAbout` enthält auf Wunsch des Inhabers auch "Anxiety" und "Panikattacken" als Wissensgebiete. Nicht entfernen. Das sind Wissensgebiete, keine Behandlungsversprechen.
- Hamburg dezent eingewoben (Title/Description, Schema, About, Footer).
- Assets: `public/portrait-lasse-sw.jpg`, `public/logo.svg`, Favicon `src/app/icon.svg`.

---

## Copy- und Rechtsregeln (wichtig)

- KEINE Heilversprechen, KEINE klinischen Diagnosen oder Behandlungszusagen im sichtbaren Text.
- Erlaubtes Framing: stressbedingte innere Unruhe, Nervensystem-Regulation, Persönlichkeitsentwicklung, Stressregulation.
- Im `knowsAbout`-Schema dürfen Themen wie Anxiety/Panikattacken stehen. Im sichtbaren Text nie als angebotene Behandlung formulieren.
- Footer-Disclaimer sinngemäß: "Diese Begleitung dient der Persönlichkeitsentwicklung und Stressregulation und ersetzt keine psychotherapeutische oder ärztliche Behandlung."
- Stil: Sentence case, aktive Verben, keine Floskeln, keine typischen KI-Formulierungen. KEINE Gedankenstriche. Buttons sagen konkret, was passiert.

DSGVO:
- Einwilligung im Formular vorhanden. Vor Newsletter-Nutzung wäre Double-Opt-in nötig.
- Die Datenschutzerklärung muss alle gespeicherten Felder abdecken: source, page_path, referrer, assessment_cluster, assessment_result, audio_email_status sowie die anonymen Assessment-Daten. Auftragsverarbeitungsverträge mit Supabase und Resend.
- Keine IP-Adresse, kein dauerhafter Wiedererkennungs-Identifikator über Sitzungen hinweg.

---

## Offene Code-Aufgaben (Priorität absteigend)

1. Weitere Journal-Artikel ablegen (Texte vom Inhaber). `JOURNAL_READY` auf `true`, sobald der erste Artikel live ist.
2. Dedizierte Service-Seiten (`/breathwork`, `/coaching`, `/ifs`): eigene Metadaten, Inhalte, `Service`-Schema, interne Verlinkung.
3. Hör-Tracking des Audios: eigene Hörseite mit Audio-Player und zufälligem Token pro Lead, die das Abspielen an eine API meldet und den Lead markiert. Eigener Bau-Auftrag mit Datenschutz-Absatz folgt. Sensibel, weil Verhaltens-Tracking einer identifizierten Person, daher Rechtsgrundlage und Datenschutzerklärung klären.
4. Cal.com-Webhook (optional): Buchungen mit Assessment-Kontext in Supabase verknüpfen. Aktuell kommt der Kontext nur per Prefill in die Cal-Buchungsmail.
5. `AggregateRating`-Schema in `JsonLd.tsx`, sobald Google-Bewertungen vorhanden sind.
6. OG-Vorschaubild 1200x630 nach `public/` und in den Metadaten referenzieren.
7. Berufliches Instagram, sobald live, in das Unternehmens-`sameAs` eintragen.
8. Assessment-Videos: `videoUrl` je Route in `assessment-config.ts` füllen.
9. Mehr echte Testimonials und ein kurzes Intro-Video auf der Startseite.

---

## Perspektivisch erwägen

- Datenschutzfreundliche Analytics (z. B. Plausible, cookieless). Ohne Messung keine gezielte Conversion-Optimierung.
- Double-Opt-in-Flow vorbereiten, bevor Newsletter starten.
- Lead-Deduplizierung nach E-Mail in `/api/lead`.
- Echte Zustellbestätigung ("delivered") via Resend-Webhook, der `audio_email_status` aktualisiert.

---

## Off-Code-Kontext (KEINE Claude-Code-Aufgaben)

- Google Business Profil verifiziert (Life Coach, Einzugsgebiet Hamburg). Weiter füllen, Bewertungen einsammeln (größter lokaler Hebel).
- Google Search Console: Verifizierung und Sitemap-Einreichung stehen aus.
- Keine bezahlten Anzeigen, bis der Funnel beweisbar konvertiert. Keine gekauften Reviews oder Backlinks.
- Datenschutzerklärung aktualisieren: muss jetzt zusätzlich source, page_path, referrer, assessment_cluster, assessment_result, audio_email_status sowie die anonymen `assessment_submissions`-Daten abdecken. Rechtstext liefert der Inhaber, hier nur als offener Punkt vermerkt.

---

## Arbeitsweise

- Kleine, klar umrissene Aufgaben, ein Feature pro Sitzung.
- Tokens, Schriften, Spacing aus `globals.css` und `design-system.md` verwenden. `FadeIn.tsx` wiederverwenden.
- Häufig committen, vor größeren Änderungen einen Branch anlegen.
- Bei Copy die Copy- und Rechtsregeln beachten.
- Dev-Hinweis: VS Code markiert `@theme` in `globals.css` ggf. als unbekannte At-Rule. Harmlos. "Tailwind CSS IntelliSense" installieren oder `"css.lint.unknownAtRules": "ignore"` setzen.