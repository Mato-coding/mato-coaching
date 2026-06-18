# CLAUDE.md — mato-coaching

Briefing für Claude Code. Lies zu Beginn jeder Sitzung diese Datei und `design-system.md`.
Hinweis: Im Repo liegt zusätzlich eine `AGENTS.md`. Halte beide widerspruchsfrei, diese Datei ist die Quelle der Wahrheit.

---

## Projekt

Persönliche Brand- und Akquise-Website für Lasse Klüver (mato-coaching.de).
Angebot: Somatic Breathwork und IFS-orientierte (Internal Family Systems) Prozessbegleitung.
Sprache: Deutsch. Ziel: Premium-Wirkung, Vertrauen, Conversion zu kostenfreiem Erstgespräch und zum Lead-Magneten.
Anmutung: "Quiet Luxury", ruhig, klar, autoritativ. Zielgruppe: zahlungskräftige Menschen mit stressbedingter innerer Unruhe, Anspannung, Erschöpfung.

---

## Stack

- Next.js 16.2.9, App Router, `src/app`, Turbopack, TypeScript
- Tailwind CSS v4. Tokens in `globals.css` via `@theme` sind die Quelle der Wahrheit. Es gibt KEINE `tailwind.config.ts` mehr (wurde wegen v4-Inkompatibilität gelöscht). Keine neue anlegen.
- Framer Motion, zurückhaltend. Bestehende `ui/FadeIn.tsx` wiederverwenden (duration 0.8, easeOut, y:20, viewport once). Keine zweite Animationslösung einführen.
- Cal.com via `@calcom/embed-react`, eingebettet unter `/termin`. Cal-Link aktuell `lasse-kluever/erstgespraech` (Platzhalter, vom Inhaber zu bestätigen).
- Supabase (`@supabase/supabase-js`) und Resend für den Lead-Magneten.
- Deploy: Vercel via GitHub `main`.
- Schriften: Spectral (Display, `font-serif`, via next/font/google, 400/500 plus italic), Geist Sans (Body/UI, `font-sans`).

---

## Repo-Struktur (Ist-Stand)

```
src/
├── app/
│   ├── layout.tsx                 # Root: <html lang="de">, Fonts, metadataBase, Title-Template
│   ├── icon.svg                   # Favicon (alte favicon.ico wurde entfernt)
│   ├── sitemap.ts                 # -> /sitemap.xml
│   ├── robots.ts                  # -> /robots.txt
│   ├── api/
│   │   └── lead/route.ts          # Lead-Magnet API (Supabase + Resend)
│   └── (public)/                  # Route-Gruppe der Marketing-Seiten
│       ├── layout.tsx             # Metadaten, OpenGraph, bindet <JsonLd/> ein; <main> hat pt-Offset für den fixen Header
│       ├── page.tsx               # Startseite (Server, eigener metadata-Export)
│       ├── assessment/page.tsx    # Assessment (Server-Wrapper, rendert <AssessmentForm/>)
│       └── termin/
│           ├── page.tsx           # Server, metadata
│           └── CalEmbed.tsx       # Client, Cal.com-Embed
├── components/
│   ├── sections/                  # Startseiten-Sektionen
│   │   ├── Hero.tsx  Transformation.tsx  Cause.tsx  Method.tsx
│   │   ├── About.tsx  CTA.tsx
│   │   └── LeadMagnet.tsx         # Audio-Lead-Magnet-Sektion (nutzt LeadMagnetForm)
│   ├── forms/
│   │   ├── AssessmentForm.tsx     # Branching-Funnel, Scoring, Ergebnis
│   │   ├── LeadMagnetForm.tsx     # E-Mail-Formular, prop autoFocus (scrollt + fokussiert)
│   │   └── ResultActions.tsx      # Drei Optionen auf der Ergebnisseite
│   ├── ui/
│   │   ├── Header.tsx             # Logo /logo.svg (h-10) + Schriftzug "Mato Coaching", py-3
│   │   ├── Footer.tsx             # Logo, Disclaimer, Hamburg-Tagline
│   │   └── FadeIn.tsx             # Standard-Animationswrapper
│   └── seo/JsonLd.tsx             # ProfessionalService-Schema
└── lib/
    ├── assessment-config.ts       # Fragen, Branching, Scoring, Ergebnis-Inhalte
    └── supabase.ts                # Server-only Admin-Client (lazy factory)

public/
├── logo.svg                       # Symbol, dunkeltauglich
├── portrait-lasse-sw.jpg          # echtes Porträt
└── audio/                         # hier kommt die Lead-Magnet-Audiodatei rein
```

Es existieren neben `(public)` weitere Route-Gruppen (auth, protected). Marketing-Inhalte gehören in `(public)`.

---

## Marke (verbindlich)

- "Mato Coaching" ist der kanonische Geschäftsname ÜBERALL: Header, Metadaten, Schema, Google Business Profil, Footer, Copyright.
- Lasse Klüver ist die sichtbare Person und der `founder`. Er lebt in der "Der Guide"/About-Sektion, im Schema als founder und im Porträtfoto.
- Niemals "Mato Coaching by Lasse Klüver" oder Ähnliches. Keine Vermischung der beiden Ebenen.

---

## Angebot (Arbeitsstand, Preise vorläufig)

- "Erdung": Gruppen-Breathwork-Reihe, hybrid, Einstieg, ca. 190 bis 390 EUR p. P.
- "Neuausrichtung": 1:1-Begleitung ca. 10 bis 12 Wochen, hybrid, Premium, ca. 2.900 bis 4.500 EUR (Einmal oder Raten).

---

## Design-System (Kurzreferenz, Details in design-system.md)

| Token | Wert | Verwendung |
|---|---|---|
| `--color-background` | #fcfaf0 | Papierweiß, Seitenhintergrund |
| `--color-surface` | #ffffff | Karten, Formulare |
| `--color-primary` | #19191a | Fließtext |
| `--color-accent` | #09173b | Navy, primäre CTAs, Autorität |
| `--color-muted` | #6b6e72 | Nebentext |
| `--color-umber` | #7c6a57 | einziger warmer Akzent, sparsam (Eyebrows, Hairlines) |

- Typografie: Display = Spectral (`font-serif`), Body/UI = Geist Sans (`font-sans`).
- Section-Padding `py-16 md:py-24`. Buttons `rounded-md`, keine Schatten, keine Pillen.
- Eyebrow-Muster: `<span class="h-px w-6 md:w-8 bg-umber" />` plus `<span class="text-sm uppercase tracking-widest text-umber/muted">`.
- Header ist fixiert (`py-3`); das `<main>` im `(public)`-Layout trägt einen passenden `pt`-Offset. Beide zusammen ändern, wenn die Header-Höhe verändert wird.

---

## Assessment (`/assessment`)

- Inhalt und Logik getrennt: alle Texte, Branching, Scoring und Ergebnis-Inhalte liegen in `src/lib/assessment-config.ts`. Die Logik/Darstellung in `AssessmentForm.tsx` muss dafür nicht angefasst werden.
- Typen: `Cluster = "exhaustion" | "tension" | "panic"`, `ResultRoute = "ready" | "almost" | "not_yet"`.
- 5 Fragen: q1 setzt den Cluster (Antwort "Etwas anderes" fällt auf `tension` zurück), q2 Dauer, q3 verzweigt nach Cluster (`q3_exhaustion` / `q3_tension` / `q3_panic` über `onlyForCluster`), q4 bisher Versuchtes, q5 Bedarf. Jede Frage hat eine "Etwas anderes"-Option (leere Tags).
- Scoring (`calculateResult`): zählt `readiness_signal`-Tags. Score >= 4 => `ready`, >= 2 => `almost`, sonst `not_yet`.
- `results`-Objekt: pro Route cluster-spezifische `headlines` plus `default`, `body`, `ctaLabel`, `ctaHref`, optionale `videoUrl` (aktuell leere Platzhalter).
- Ergebnis-Routen-CTAs: `ready` und `almost` zeigen auf `/termin`; `not_yet` zeigt auf `/` mit Label "Zurück zur Startseite".
- `AssessmentForm.tsx`: history-basierter State, Zurück und Frage-überspringen, Fortschrittsbalken in Umber, Zähler "Frage X von N". Die Ergebnis-Ansicht rendert `<ResultActions ctaHref={result.ctaHref} ctaLabel={result.ctaLabel} onRestart={...} />`.
- `ResultActions.tsx`: drei Karten nebeneinander (Desktop-Breakout-Band, mobil gestapelt). Karte 1 Erstgespräch (nutzt die ergebnisabhängigen `ctaHref`/`ctaLabel`), Karte 2 Audio (öffnet `LeadMagnetForm` unter den Karten, autoFocus), Karte 3 Journal (Schalter `JOURNAL_READY`, sonst "Bald verfügbar"). Darunter zentriert "Assessment neu starten" mit Umber-Hairline.

---

## Lead-Magnet und Backend

Ablauf: `LeadMagnetForm` (Client) sendet an `POST /api/lead` (Server). Die Route speichert in Supabase, sendet das Audio per Resend an die Person und eine Benachrichtigung an Lasse. Der Code prüft den von Resend zurückgegebenen `error` (nicht ignorieren).

- Absender: `Mato Coaching <hello@mato-coaching.de>`, Reply-To `hello@mato-coaching.de` (echtes Strato-Postfach).
- Audio-Link kommt aus `LEAD_AUDIO_URL`, mit Platzhalter-Fallback. Echte Datei nach `public/audio/` (z. B. `physiological-sigh.m4a` oder `.mp3`), dann `LEAD_AUDIO_URL` in Vercel setzen. Endung muss exakt passen.

Supabase:
- Projekt "Mato Coaching", Region EU (Frankfurt).
- Tabelle `public.leads` (id, created_at, email, name, source, consent). RLS aktiv, keine Public-Policy, nur der Server (Service-Role) schreibt.
- Client `src/lib/supabase.ts` ist server-only und darf nie in einer Client-Komponente importiert werden.

Resend:
- Domain `mato-coaching.de` verifiziert (DKIM und SPF grün). Versand funktioniert.
- MX auf `send.mato-coaching.de` ist offen: Strato erlaubt über das TXT/CNAME-Formular keinen Subdomain-MX, und das Root-MX-Formular darf nicht mit dem Resend-Wert belegt werden (würde das Postfach brechen). Der MX ist nur für Bounce-Feedback, daher unkritisch. Hier keine voreiligen "Lösungen" einbauen.

Vercel-Umgebungsvariablen (Werte nur in Vercel, nie im Code/Repo):

| Variable | Zweck |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (ohne `/rest/v1`) |
| `SUPABASE_SERVICE_ROLE_KEY` | geheimer Service-Role-Key, nur Server |
| `RESEND_API_KEY` | Resend API Key |
| `LEAD_NOTIFICATION_EMAIL` | Benachrichtigungsadresse (hello@mato-coaching.de) |
| `LEAD_AUDIO_URL` | öffentliche URL der Audiodatei (setzen, sobald Audio online) |

---

## SEO

- `sitemap.ts` und `robots.ts` liegen direkt in `src/app`. Beim Anlegen neuer Seiten (Journal, Service-Seiten) die Sitemap erweitern.
- `JsonLd.tsx`: `ProfessionalService` "Mato Coaching", `areaServed` Hamburg (Einzugsgebiet, keine Straße), `founder` Lasse Klüver mit `sameAs` LinkedIn (https://www.linkedin.com/in/lassekl%C3%BCver/). Das Unternehmens-`sameAs` ist leer und nimmt später das berufliche Instagram auf.
- `knowsAbout` enthält auf ausdrücklichen Wunsch des Inhabers auch "Anxiety" und "Panikattacken" als Wissensgebiete. Das ist eine bewusste Entscheidung, nicht entfernen. Wichtig: das sind Wissensgebiete, keine Behandlungsversprechen (siehe Copy-Regeln).
- Root-Layout: `lang="de"`, `metadataBase`, Title-Template mit "Mato Coaching". Per-Page-Metadaten in den jeweiligen Server-`page.tsx`. Hinweis: ein `metadata`-Export funktioniert nur in Server-Komponenten, nie in Dateien mit `"use client"`.
- Hamburg ist bewusst dezent eingewoben: Title/Description, Schema, About-Fließtext und Footer-Tagline.
- Assets: `public/portrait-lasse-sw.jpg`, `public/logo.svg`, Favicon `src/app/icon.svg`.

---

## Copy- und Rechtsregeln (wichtig)

- KEINE Heilversprechen, KEINE klinischen Diagnosen oder Behandlungszusagen im sichtbaren Text (z. B. nicht "Angststörung behandeln", "Burnout heilen", "Traumatherapie").
- Erlaubtes Framing: stressbedingte innere Unruhe, Nervensystem-Regulation, Persönlichkeitsentwicklung, Stressregulation.
- Unterschied beachten: Im `knowsAbout`-Schema dürfen Themen wie Anxiety/Panikattacken als Wissensgebiete stehen. Im sichtbaren Text und in Buttons niemals als angebotene Behandlung formulieren.
- Footer-Disclaimer (sinngemäß beibehalten): "Diese Begleitung dient der Persönlichkeitsentwicklung und Stressregulation und ersetzt keine psychotherapeutische oder ärztliche Behandlung."
- Stil: Sentence case, aktive Verben, keine Floskeln und keine typischen KI-Formulierungen. KEINE Gedankenstriche. Buttons sagen konkret, was passiert.

DSGVO:
- `LeadMagnetForm` holt eine Einwilligung (Checkbox) ein und speichert `consent`. Das Ausliefern des angeforderten Audios ist damit sauber.
- Vor jeder weitergehenden Nutzung der Adressen für regelmäßige Mails (Newsletter) braucht es ein Double-Opt-in. Vorher nicht für Marketing verwenden.
- Datenschutzseite muss die Speicherung der Lead-Daten und die Auftragsverarbeiter (Supabase, EU; Resend) beschreiben. Auftragsverarbeitungsverträge mit beiden abschließen.

---

## Offene Code-Aufgaben (Priorität absteigend)

1. Journal/Blog (`/journal`): größter nachhaltiger SEO-Hebel. Schaltet danach in `ResultActions.tsx` die dritte Karte scharf (`JOURNAL_READY = true`). Themenideen erklären statt behandeln (z. B. "Was im Nervensystem bei einer Panikattacke passiert").
2. Dedizierte Service-Seiten (`/breathwork`, `/coaching`, `/ifs`): je eigene Metadaten und substanzielle Inhalte, je eigenes `Service`-Schema, interne Verlinkung zu Journal und Startseite.
3. Echtes Audio aufnehmen, nach `public/audio/` legen, `LEAD_AUDIO_URL` setzen.
4. ResultActions-Feinschliff: Bei Route `not_yet` trägt Karte 1 die Überschrift "Erstgespräch vereinbaren", der Button nutzt aber `ctaLabel`/`ctaHref` der Route ("Zurück zur Startseite", `/`). Diesen Sonderfall sauber abfangen.
5. `AggregateRating`-Schema in `JsonLd.tsx`, sobald Google-Bewertungen vorhanden sind (Sterne im Suchergebnis).
6. OG-Vorschaubild 1200x630 nach `public/` und in den Metadaten referenzieren.
7. Berufliches Instagram, sobald live, in das Unternehmens-`sameAs` in `JsonLd.tsx` eintragen.
8. Assessment-Videos: `videoUrl` je Route in `assessment-config.ts` füllen.
9. Mehr echte Testimonials und ein kurzes Intro-Video auf der Startseite.

---

## Perspektivisch erwägen (mein Ausblick)

- Datenschutzfreundliche Analytics (z. B. Plausible, cookieless, oder Vercel Web Analytics). Ohne Messung lässt sich die Conversion nicht gezielt verbessern. Cookieless vermeidet ein Consent-Banner.
- Double-Opt-in-Flow für den Lead-Verteiler vorbereiten (Bestätigungslink, Status-Feld in `leads`), bevor Newsletter-Mails starten.
- Lead-Deduplizierung nach E-Mail in `route.ts` (aktuell entsteht pro Absenden eine Zeile).
- Interne Verlinkung als System planen, sobald Journal und Service-Seiten existieren.
- Strukturierte FAQ (`FAQPage`-Schema) auf Service-Seiten, wenn dort häufige Fragen beantwortet werden.

---

## Off-Code-Kontext (KEINE Claude-Code-Aufgaben, nur Projektbild)

- Google Business Profil ist verifiziert (Kategorie "Life Coach", Einzugsgebiet Hamburg, keine Adresse). Profil weiter füllen (Beschreibung, Dienstleistungen, Fotos, Öffnungszeiten "nach Vereinbarung", Buchungslink). Bewertungen einsammeln ist der größte lokale Ranking-Hebel.
- Google Search Console: Verifizierung und Sitemap-Einreichung stehen noch aus.
- Keine bezahlten Anzeigen, bis der Funnel beweisbar konvertiert. Keine gekauften Reviews oder Backlinks.

---

## Arbeitsweise

- Kleine, klar umrissene Aufgaben, ein Feature pro Sitzung.
- Tokens, Schriften, Spacing nicht neu erfinden, aus `globals.css` und `design-system.md` verwenden. `FadeIn.tsx` für Animationen wiederverwenden.
- Häufig committen, vor größeren Änderungen einen Branch anlegen.
- Bei jeder Copy die Copy- und Rechtsregeln oben beachten.
- Dev-Hinweis: VS Code markiert `@theme` in `globals.css` ggf. als unbekannte At-Rule. Harmlos. Entweder "Tailwind CSS IntelliSense" installieren oder `"css.lint.unknownAtRules": "ignore"` setzen.