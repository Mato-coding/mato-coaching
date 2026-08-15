# Architektur-Audit, lassekluever.de

Stand: 15.08.2026. Reines Lese-Audit, keine Code-Änderungen. Geprüft: gesamtes `src/`, gegen CLAUDE.md und design-system.md. Alle Befunde sind mit Dateipfad und Zeile belegt; Zeilenangaben beziehen sich auf den Stand von main zum Zeitpunkt dieses Audits.

---

## 1. Ist-Stand

### Seiten (App Router, `src/app/(public)/`)
- `/` – [page.tsx](src/app/(public)/page.tsx): Home, komponiert aus 7 Sections.
- `/breathwork` – [breathwork/page.tsx](src/app/(public)/breathwork/page.tsx): Service-Seite, komponiert aus 8 Sections (eigener Unterordner) + einer inline JSX-Sektion.
- `/coaching` – [coaching/page.tsx](src/app/(public)/coaching/page.tsx): Service-Seite, 8 Sektionen **vollständig inline** in der page.tsx, keine Extraktion.
- `/assessment` – [assessment/page.tsx](src/app/(public)/assessment/page.tsx): dünner Rahmen um `AssessmentForm`.
- `/termin` – [termin/page.tsx](src/app/(public)/termin/page.tsx) + [CalEmbed.tsx](src/app/(public)/termin/CalEmbed.tsx): Cal.com-Einbettung.
- `/journal` – [journal/page.tsx](src/app/(public)/journal/page.tsx): Artikelübersicht aus `lib/journal.ts`.
- `/journal/[slug]` – [journal/[slug]/page.tsx](src/app/(public)/journal/[slug]/page.tsx) + [mdx-components.tsx](src/app/(public)/journal/[slug]/mdx-components.tsx): MDX-Rendering.
- `/impressum`, `/datenschutz`: statische Rechtsseiten, kein Section-Muster.
- Layout: [app/layout.tsx](src/app/layout.tsx) (Fonts, Root-Metadata) → [(public)/layout.tsx](src/app/(public)/layout.tsx) (Header, Footer, JsonLd, weitere Metadata).

### API-Routen (`src/app/api/`)
- [lead/route.ts](src/app/api/lead/route.ts): Lead-Magnet, Supabase-Insert + zwei Resend-Mails.
- [assessment/route.ts](src/app/api/assessment/route.ts): anonymer Abschluss-Tracking-Insert.
- [cron/keep-alive/route.ts](src/app/api/cron/keep-alive/route.ts): Supabase-Keep-alive, Bearer-Secret-geschützt.

### Sektionen (`src/components/sections/`)
- Home-only (8): Hero, Transformation, Cause, Method, About, CTA, LeadMagnet, LeadMagnetCTA.
- `breathwork/` (8): BreathworkHero, BreathworkResonance, BreathworkMethod, BreathworkProcess, BreathworkFitFor, BreathworkAbout (**tot, s. 2.7**), BreathworkFAQ, BreathworkClosingCTA.
- `/coaching` hat keinen eigenen Unterordner; alle 8 Sektionen leben als JSX-Blöcke direkt in der Page.

### Forms (`src/components/forms/`)
AssessmentForm, AssessmentResult, ResultActions, LeadMagnetForm – alle Client-Komponenten, decken den kompletten Assessment- und Lead-Flow ab.

### UI-Primitive (`src/components/ui/`)
Eyebrow, FadeIn, Header, Footer, LogoMark. Eyebrow existiert als Primitive, wird aber nur in einem Teil der Codebase tatsächlich verwendet (s. 2.2).

### SEO (`src/components/seo/`)
JsonLd.tsx – einzige globale JSON-LD-Komponente (ProfessionalService), in `(public)/layout.tsx` eingebunden. Service- und Article-Schemas werden **nicht** darüber ausgespielt, sondern pro Seite inline nachgebaut (s. 2.6).

### lib (`src/lib/`)
- `assessment-config.ts`: Fragen, Antworten, Scoring, Ergebnistext-Komposition – vollständig typisiert, Inhalt und Logik sauber getrennt. Referenzmuster für den Rest der Codebase.
- `journal.ts`: MDX-Loader über `gray-matter`, liest nur einen Teil des dokumentierten Frontmatters (s. 2.7).
- `scroll.ts`, `site.ts`, `supabase.ts`: klein, klar plaziert, keine Befunde.

### Content (`src/content/journal/`)
3 MDX-Artikel mit vollständigerem Frontmatter (inkl. `excerpt`, `tags`, `draft`), als der Code aktuell konsumiert.

### Datenflüsse
- `LeadMagnetForm` → `POST /api/lead` → Supabase-Insert (`leads`, Status `pending`) → zwei Resend-Mails (Audio an Interessent, Benachrichtigung an Lasse) → Status-Update (`sent`/`failed`).
- `AssessmentForm` → `calculateResult`/`composeResult` (lokal, `assessment-config.ts`) → Ergebnis-Rendering → einmaliger `POST /api/assessment` (nur Tracking, keine Mail).
- `CalEmbed` liest `cluster`/`result` aus der URL (von `ResultActions`/`AssessmentForm` gesetzt) und reicht sie als Metadaten an Cal.com weiter.
- `journal.ts` liest `src/content/journal/*.mdx` zur Build-/Request-Zeit für Übersicht, Detailseite und `sitemap.ts`.

---

## 2. Befunde

### 2.1 Sektions-Komposition (Kriterium 1)

**Befund A1 – Home-Sections verhalten sich je nach Seite unterschiedlich (Doppel-FadeIn).**
[page.tsx:19-37](src/app/(public)/page.tsx#L19-L37) umschließt jede Section zusätzlich von außen mit `<FadeIn delay={0.2}>` (`Transformation`, `Cause`, `Method`, `About`, `CTA`, `LeadMagnet`). Jede dieser Sections öffnet aber selbst bereits eigene `FadeIn`-Wrapper um Eyebrow/Headline/Body, z. B. [Cause.tsx:11,19,28](src/components/sections/Cause.tsx#L11-L28) oder [About.tsx:18,27,36,51,74](src/components/sections/About.tsx#L18-L74). Auf `/breathwork` wird dieselbe Komponente `About.tsx` unter dem Alias `BreathworkAbout` **ohne** äußeren Wrapper gerendert ([breathwork/page.tsx:12,76](src/app/(public)/breathwork/page.tsx#L12-L76)). Damit animiert exakt dieselbe Komponente auf den zwei Seiten unterschiedlich (verschachteltes Opacity-Timing auf Home vs. einfaches Timing auf `/breathwork`) – ein direkter Beleg dafür, dass die Sections aktuell **nicht** kontextfrei sind: ihr sichtbares Verhalten hängt vom Aufrufer ab, nicht nur ihr Markup.

**Befund A2 – `/coaching` hat keine extrahierten Sections.**
Alle 8 Abschnitte von `/coaching` (Hero, Resonanz, Programm, Methode, Über mich, Gründungsrunde, CTA, Abgrenzung) sind JSX-Blöcke direkt in [coaching/page.tsx:78-413](src/app/(public)/coaching/page.tsx#L78-L413). Nichts davon lässt sich umsortieren, auf einer anderen Seite wiederverwenden oder isoliert testen, ohne die Datei aufzuschneiden. Im Vergleich dazu ist `/breathwork` sauber in `sections/breathwork/*.tsx` extrahiert. Zwei Seiten, zwei Kompositionsmuster für denselben Seitentyp (Service-Seite).

**Befund A3 – `BreathworkAbout.tsx` ist toter Code.**
[breathwork/BreathworkAbout.tsx](src/components/sections/breathwork/BreathworkAbout.tsx) existiert als eigene Komponente mit Platzhaltertext (`[Platzhalter: Lasse liefert Text...]`, Zeile 36), wird aber nirgends importiert. `/breathwork` verwendet stattdessen `sections/About.tsx` unter dem Alias `BreathworkAbout` ([breathwork/page.tsx:12](src/app/(public)/breathwork/page.tsx#L12)). Das bedeutet: die Homepage-Vorstellung von Lasse erscheint wortgleich auch auf `/breathwork`, während die eigens für `/breathwork` vorbereitete Vorstellung nie live geht.

**Befund B1 – Home-Sections sind untereinander sonst tatsächlich kontextfrei.**
Hero, CTA, Cause, Method, Transformation nehmen keine Props, referenzieren keine Geschwister-Sections und ließen sich (Befund A1 vorausgesetzt) per Umsortieren der JSX-Liste in [page.tsx](src/app/(public)/page.tsx) verschieben. Das ist die Grundlage, auf der sich Befund A1 lohnt zu beheben.

**Befund B2 – `LeadMagnet` hat einen impliziten Cross-Page-Vertrag über die Anchor-ID.**
[LeadMagnet.tsx:6](src/components/sections/LeadMagnet.tsx#L6) setzt `id="audio"`. [coaching/page.tsx:392](src/app/(public)/coaching/page.tsx#L392) verlinkt `href="/#audio"` – ein Link auf einer anderen Seite, der sich stillschweigend auf die ID einer Section auf der Homepage verlässt. `/breathwork` hat für dieselbe Funktion eine eigene, inline gebaute Audio-Sektion mit einer **anderen** ID (`id="audio-reset"`, [breathwork/page.tsx:80](src/app/(public)/breathwork/page.tsx#L80)). Würde `LeadMagnet` von der Homepage entfernt, umbenannt oder die ID geändert, bricht der Link auf `/coaching` lautlos (kein Build-Fehler, nur ein totes Sprungziel).

### 2.2 Wiederholte UI-Muster (Kriterium 2)

**Eyebrow (Umber-Hairline + Uppercase-Label) – 3 Varianten, ~12 Handrollungen trotz vorhandener Primitive.**
`Eyebrow.tsx` existiert und wird korrekt verwendet in allen `breathwork/*.tsx`-Sections sowie in `coaching/page.tsx` (7×, z. B. [Zeile 82](src/app/(public)/coaching/page.tsx#L82), [124](src/app/(public)/coaching/page.tsx#L124), [163](src/app/(public)/coaching/page.tsx#L163)). Parallel dazu ist dieselbe Markup-Struktur (`span.h-px.bg-umber` + `span.text-sm.tracking-[0.15em].uppercase.text-muted`) von Hand nachgebaut in:
- [Hero.tsx:9-15](src/components/sections/Hero.tsx#L9-L15)
- [CTA.tsx:10-16](src/components/sections/CTA.tsx#L10-L16)
- [Cause.tsx:12-17](src/components/sections/Cause.tsx#L12-L17)
- [About.tsx:19-24](src/components/sections/About.tsx#L19-L24)
- [Method.tsx:13-18](src/components/sections/Method.tsx#L13-L18)
- [Transformation.tsx:16-21](src/components/sections/Transformation.tsx#L16-L21)
- [termin/page.tsx:26-32](src/app/(public)/termin/page.tsx#L26-L32)
- [journal/page.tsx:28-34](src/app/(public)/journal/page.tsx#L28-L34)
- [AssessmentForm.tsx:215-220](src/components/forms/AssessmentForm.tsx#L215-L220)
- [AssessmentResult.tsx:35-40](src/components/forms/AssessmentResult.tsx#L35-L40)

Eine dritte, visuell abweichende Variante (Farbe `text-umber` statt `text-muted`, `tracking-widest` statt `tracking-[0.15em]`) findet sich in [LeadMagnet.tsx:9-14](src/components/sections/LeadMagnet.tsx#L9-L14) und im Erfolgs-Zustand von [LeadMagnetForm.tsx:99-104](src/components/forms/LeadMagnetForm.tsx#L99-L104).

**Section-Wrapper (`<section className="bg-… px-6 py-16 md:py-24">` + `<div className="mx-auto max-w-…">`).**
Grep-bestätigt 24 identische `py-16 md:py-24`-Fundstellen über `src/app` und `src/components`. Kein `Section`- oder `Container`-Primitive existiert; jede Datei tippt Hintergrund, Innenabstand und Container-Breite neu ab. Container-Breiten selbst sind uneinheitlich gewählt: `max-w-2xl` (11×), `max-w-3xl` (17×), `max-w-4xl` (2×), `max-w-5xl` (1×), `max-w-6xl` (5×), `max-w-7xl` (2×) – ohne erkennbares System, welche Breite zu welchem Inhaltstyp gehört.

**Buttons/CTA-Links – 2 durchgängige Klassenketten, 1 Sondergröße.**
Primär-Button `bg-accent text-background px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity`: [Hero.tsx:32-37](src/components/sections/Hero.tsx#L32-L37), [CTA.tsx:36-41](src/components/sections/CTA.tsx#L36-L41), [BreathworkHero.tsx:31-36](src/components/sections/breathwork/BreathworkHero.tsx#L31-L36), [BreathworkClosingCTA.tsx:27-32](src/components/sections/breathwork/BreathworkClosingCTA.tsx#L27-L32), [coaching/page.tsx:103-108](src/app/(public)/coaching/page.tsx#L103-L108), [coaching/page.tsx:380-385](src/app/(public)/coaching/page.tsx#L380-L385). Sekundär-Button `border border-accent/25 text-accent px-8 py-4 rounded-md font-medium hover:border-accent/50 transition-colors`: [Hero.tsx:38-43](src/components/sections/Hero.tsx#L38-L43), [CTA.tsx:42-47](src/components/sections/CTA.tsx#L42-L47), [BreathworkHero.tsx:37-42](src/components/sections/breathwork/BreathworkHero.tsx#L37-L42), [coaching/page.tsx:109-114](src/app/(public)/coaching/page.tsx#L109-L114). Header nutzt zusätzlich eine dritte, kleinere Button-Variante ([Header.tsx:29-34](src/components/ui/Header.tsx#L29-L34), `px-5 py-2 text-sm` statt `px-8 py-4`), vermutlich bewusst für die Nav-Leiste, aber ohne dass das als Größenvariante eines gemeinsamen Buttons modelliert ist.

**H2-Section-Headline – 21 identische Fundstellen, 1 abweichende Variante.**
`font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15]` kommt grep-bestätigt 21× wortgleich vor (u. a. CTA.tsx, Cause.tsx, About.tsx, Method.tsx, Transformation.tsx, alle `breathwork/*.tsx`, 7× in coaching/page.tsx). Eine strukturell identische, aber abweichend formulierte Variante nutzt [LeadMagnet.tsx:16](src/components/sections/LeadMagnet.tsx#L16): `font-display text-3xl leading-tight text-primary md:text-4xl` – anderer Font-Utility-Name (`font-display` statt `font-serif`, beide zeigen laut `globals.css` zwar auf dieselbe CSS-Variable, sind im Code aber zwei verschiedene Klassennamen) und `leading-tight` statt `leading-[1.15]`.

**Karten (`rounded-md border border-primary/N bg-surface p-…`) – 4 verschiedene Rand-Opazitäten.**
[ResultActions.tsx:33,52,71](src/components/forms/ResultActions.tsx#L33-L71) (3× identisch, `/10`), [journal/page.tsx:57](src/app/(public)/journal/page.tsx#L57) (`/10`), [termin/page.tsx:45](src/app/(public)/termin/page.tsx#L45) (`/8`), [Method.tsx:49](src/components/sections/Method.tsx#L49) (`/8`, aber `p-8 md:p-10` statt `p-6` – eine vierte Padding-Variante), [LeadMagnetForm.tsx:160,175](src/components/forms/LeadMagnetForm.tsx#L160-L175) (`/15`, Inputs statt Karten, aber derselbe Rand-Gedanke). Fünf verschiedene Opazitätswerte (`/5`, `/8`, `/10`, `/15`) stehen für das, was eigentlich ein Token (`--color-hairline`) abdecken soll.

**Nummerierte Schritt-Listen – zwei parallele, praktisch identische Implementierungen.**
[BreathworkProcess.tsx](src/components/sections/breathwork/BreathworkProcess.tsx) (`steps`-Array, Zeilen 4-17) und [coaching/page.tsx](src/app/(public)/coaching/page.tsx) (`bausteine`-Array, Zeilen 55-68) bauen dasselbe visuelle Muster (Umber-Strich + fetter Titel + Fließtext, `<ol>` mit `space-y-8`) unabhängig voneinander nach, mit fast identischem JSX ([BreathworkProcess.tsx:34-47](src/components/sections/breathwork/BreathworkProcess.tsx#L34-L47) vs. [coaching/page.tsx:183-198](src/app/(public)/coaching/page.tsx#L183-L198)).

**JSON-LD-Boilerplate – 4×.**
`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />` in [JsonLd.tsx:52-56](src/components/seo/JsonLd.tsx#L52-L56), [breathwork/page.tsx:66-69](src/app/(public)/breathwork/page.tsx#L66-L69), [coaching/page.tsx:73-76](src/app/(public)/coaching/page.tsx#L73-L76), [journal/[slug]/page.tsx:68-71](src/app/(public)/journal/[slug]/page.tsx#L68-L71) – ohne gemeinsame Komponente.

### 2.3 Token-Treue (Kriterium 3)

**Befund A – ein kompletter Tokensatz in `globals.css` wird im Code nicht referenziert.**
`--text-display`, `--text-h1`, `--text-h2`, `--text-small`, `--text-eyebrow`, `--tracking-eyebrow`, `--leading-display/-h1/-h2/-body/-small` ([globals.css:32-45](src/app/globals.css#L32-L45)) sowie `--measure`, `--container-max` ([globals.css:67-68](src/app/globals.css#L67-L68)) und `--spacing-eyebrow-headline`/`--spacing-headline-body` ([globals.css:59-60](src/app/globals.css#L59-L60)) haben repo-weit **keine** einzige Fundstelle (grep-geprüft: `text-eyebrow`, `text-h1`, `text-h2`, `text-display`, `text-small`, `leading-display/-h1/-h2/-body/-small`, `tracking-eyebrow`, `container-max` kommen ausschließlich in `globals.css` selbst vor). Komponenten bilden dieselben Werte stattdessen über arbiträre Tailwind-Klassen nach: `text-5xl md:text-6xl lg:text-7xl` fürs Hero (statt `text-display`), `text-3xl md:text-4xl` fürs H2 (statt `text-h1`/`text-h2`), `leading-[1.15]` (statt `leading-h1`), `max-w-[68ch]` 13× wortgleich hardcodiert ([Belegliste u. a. coaching/page.tsx:134,173,183,217,330,367](src/app/(public)/coaching/page.tsx#L134), [BreathworkFitFor.tsx:19](src/components/sections/breathwork/BreathworkFitFor.tsx#L19), [BreathworkFAQ.tsx:52](src/components/sections/breathwork/BreathworkFAQ.tsx#L52)) statt `max-w-measure`, und `max-w-6xl`/`max-w-7xl` statt eines einzigen, auf `--container-max: 1140px` beruhenden Containers (Tailwinds `max-w-6xl` = 1152px, `max-w-7xl` = 1280px – beide treffen die 1140px-Vorgabe aus design-system.md nicht exakt). Das Design-System-Dokument beschreibt damit teilweise eine Typo- und Spacing-Struktur, die im gebauten Produkt nicht existiert.

**Befund B – `--color-hairline` existiert, wird aber nur an 3 Stellen genutzt.**
Token: [globals.css:11](src/app/globals.css#L11) (`muted @ 30%`). Tatsächlich als `border-hairline` verwendet in [BreathworkFAQ.tsx:54](src/components/sections/breathwork/BreathworkFAQ.tsx#L54), [AssessmentForm.tsx:252](src/components/forms/AssessmentForm.tsx#L252) (Checkbox-Rahmen) und [mdx-components.tsx:47](src/app/(public)/journal/[slug]/mdx-components.tsx#L47) (`hr`). Überall sonst, wo dieselbe Rolle gebraucht wird (Kartenrand, Trennlinie), stehen stattdessen hand-gewählte `border-primary/5` ([Header.tsx:18](src/components/ui/Header.tsx#L18)), `/8` ([Method.tsx:49](src/components/sections/Method.tsx#L49), [termin/page.tsx:45](src/app/(public)/termin/page.tsx#L45)), `/10` ([ResultActions.tsx:33](src/components/forms/ResultActions.tsx#L33), [journal/page.tsx:57](src/app/(public)/journal/page.tsx#L57)) und `/15` ([LeadMagnetForm.tsx:160](src/components/forms/LeadMagnetForm.tsx#L160), [AssessmentForm.tsx:246](src/components/forms/AssessmentForm.tsx#L246)).

**Befund B – Section-Padding: zwei dokumentierte Ausreißer.**
`py-16 md:py-24` ist der de-facto-Standard (24 Fundstellen). Zwei Abweichungen:
- [coaching/page.tsx:403](src/app/(public)/coaching/page.tsx#L403), Abgrenzungs-Sektion: `py-10 md:py-12` (40px/48px) – unterhalb selbst des Mobil-Floors aus design-system.md (64-96px).
- [impressum/page.tsx:5](src/app/(public)/impressum/page.tsx#L5) und [datenschutz/page.tsx:5](src/app/(public)/datenschutz/page.tsx#L5): festes `py-32` (128px), **ohne** responsive Reduktion für Mobil. Auf dem Handy bekommen Nutzer damit 128px Innenabstand statt der in design-system.md vorgesehenen 64-96px.

**Widerspruch CLAUDE.md vs. design-system.md, als Befund benannt, nicht entschieden:**
CLAUDE.md schreibt `py-16 md:py-24` (64px Mobil / 96px Desktop) fest. design-system.md nennt einen Bereich (Mobil 64-96px, Desktop 96-160px). Rein numerisch liegt `py-16 md:py-24` exakt am **unteren Rand** beider Bereiche – kein direkter Widerspruch. In der Praxis nutzt aber keine einzige Section im Repo einen Wert oberhalb dieses Floors: der Desktop-Spielraum bis 160px aus design-system.md kommt nirgends vor. Ob design-system.md eine tatsächliche Varianz je nach Sektionsgewicht vorsieht oder der fixe CLAUDE.md-Wert der eigentliche, alleingültige Standard ist, bleibt zwischen den beiden Dokumenten offen (siehe Abschnitt 4).

**Befund C – `text-[--color-navy]` statt `text-accent`.**
[Method.tsx:40](src/components/sections/Method.tsx#L40) nutzt einen Arbitrary-Value (`text-[--color-navy]`) für denselben "Mehr erfahren"-Link, den [BreathworkMethod.tsx:47](src/components/sections/breathwork/BreathworkMethod.tsx#L47) und [coaching/page.tsx:239](src/app/(public)/coaching/page.tsx#L239) mit der bereits vorhandenen Utility `text-accent` lösen (`--color-accent` ist in `globals.css` als Alias auf `--color-navy` definiert, [globals.css:17](src/app/globals.css#L17)).

### 2.4 Copy-Verortung (Kriterium 4)

**Positivbeispiel: `assessment-config.ts`.** Fragen, Antworten, Scoring-Logik und alle Textbausteine des komponierten Ergebnistexts sind vollständig typisiert und getrennt von der Render-Komponente (`AssessmentForm.tsx` importiert nur `questions`, `calculateResult`, `composeResult`). Dieses Muster ist der Maßstab, an dem der Rest der Codebase gemessen wird.

**Positivbeispiel: Journal-MDX.** Lange Artikeltexte liegen vollständig in `src/content/journal/*.mdx`, Rendering-Komponenten fassen nur Layout/Typografie an ([mdx-components.tsx](src/app/(public)/journal/[slug]/mdx-components.tsx)).

**Überall sonst: Copy liegt hartkodiert in JSX.** Betroffen sind u. a.:
- Alle Home-Sections (Hero, Cause, About, Method, Transformation, CTA, LeadMagnet[CTA]) – Fließtext, Testimonial-Zitat ([Method.tsx:52-55](src/components/sections/Method.tsx#L52-L55)), Credentials-Array ([About.tsx:4-8](src/components/sections/About.tsx#L4-L8)), Benefits-Array ([Transformation.tsx:3-7](src/components/sections/Transformation.tsx#L3-L7)).
- Alle `breathwork/*.tsx`-Sections, inkl. FAQ-Array ([BreathworkFAQ.tsx:4-35](src/components/sections/breathwork/BreathworkFAQ.tsx#L4-L35)) und Prozess-Schritte ([BreathworkProcess.tsx:4-17](src/components/sections/breathwork/BreathworkProcess.tsx#L4-L17)).
- Die komplette `/coaching`-Seite, inkl. `bausteine`-Array ([coaching/page.tsx:55-68](src/app/(public)/coaching/page.tsx#L55-L68)) und sämtlicher Fließtext zur Gründungsrunde.
- Header/Footer-Navigationstexte, Impressum, Datenschutzerklärung.

**Bewertung pro Seite/Bereich:**
- **Homepage, `/breathwork`, `/coaching`:** höchster Nutzen einer Extraktion. Diese Seiten werden laut CLAUDE.md-Changelog am häufigsten inhaltlich verändert (die Coaching-Seite trägt bereits jetzt einen Hinweis, dass sie nach der Gründungsrunde aktualisiert werden muss). FAQ-, Prozess- und Credential-Arrays sind schon als lokale TS-Arrays vorstrukturiert – der nächste Schritt (Verschieben nach `src/content/` oder `src/lib/`) wäre rein mechanisch, ohne Layout-Risiko.
- **Impressum/Datenschutz:** juristisch bindender Text, seltene Änderungsfrequenz. Strukturelle Extraktion hat hier wenig Priorität; wichtiger wäre inhaltliche Konsistenz (aufgefallen, aber außerhalb dieses Audit-Scopes: Impressum nennt `hello@mato-coaching.de`, während CLAUDE.md und der Rest der Seite durchgängig `hello@lassekluever.de`/`lassekluever.de` als kanonisch führen).
- **Header/Footer:** kurze, seltene Strings (Navigation, Copyright). Extraktion würde kaum Nutzen bringen.

### 2.5 Server/Client-Grenzen (Kriterium 5)

Alle 8 `"use client"`-Komponenten:
[CalEmbed.tsx](src/app/(public)/termin/CalEmbed.tsx#L1), [FadeIn.tsx](src/components/ui/FadeIn.tsx#L1), [Header.tsx](src/components/ui/Header.tsx#L1), [LeadMagnetCTA.tsx](src/components/sections/LeadMagnetCTA.tsx#L1), [LeadMagnetForm.tsx](src/components/forms/LeadMagnetForm.tsx#L1), [AssessmentResult.tsx](src/components/forms/AssessmentResult.tsx#L1), [ResultActions.tsx](src/components/forms/ResultActions.tsx#L1), [AssessmentForm.tsx](src/components/forms/AssessmentForm.tsx#L1).

7 von 8 sind eng: `CalEmbed` braucht den Browser-SDK und `useSearchParams`; `FadeIn` braucht den `useReducedMotion`-Hook von Framer Motion; `LeadMagnetForm`, `AssessmentForm`, `AssessmentResult`, `ResultActions` sind der interaktive Kern von Formular- bzw. Assessment-Flow (State, Scroll-Effekte, `fetch`); `LeadMagnetCTA` hält nur ein `submitted`-Flag, ist aber selbst die kleinste sinnvolle interaktive Einheit.

**Befund B – `Header.tsx` könnte seine Client-Grenze verkleinern.**
[Header.tsx:1](src/components/ui/Header.tsx#L1) ist komplett client-seitig, obwohl nur der Klick-Handler auf dem Logo-Link ([Header.tsx:10-15](src/components/ui/Header.tsx#L10-L15), `usePathname` + `preventDefault` + `smoothScrollToTop`) Client-JS braucht. Der Rest – Logo-Markup, primärer CTA-Link zu `/termin` – ist statisch. Da `Header` auf jeder Seite gerendert wird, ließe sich mit einer kleinen, isolierten Client-Komponente nur für den Logo-Link (z. B. `HeaderLogoLink`) der Rest von `Header` als Server-Komponente belassen und etwas Client-JS von jeder einzelnen Seite fernhalten.

Keine weiteren unnötigen `"use client"`-Direktiven gefunden; alle Pages, Sections und API-Routen bleiben Server-seitig.

### 2.6 Metadaten und SEO-Muster (Kriterium 6)

Vier unterschiedliche Varianten im Repo:

**A – Root-Layout.** [app/layout.tsx:21-29](src/app/layout.tsx#L21-L29): `metadataBase`, Title-Template, `description`. Kein `openGraph`, kein `alternates.canonical`, kein JSON-LD.

**B – Public-Layout.** [(public)/layout.tsx:7-35](src/app/(public)/layout.tsx#L7-L35): definiert **erneut** `metadataBase: new URL(SITE_URL)` (identisch zu A, redundant) sowie denselben Title-Template-String und dieselbe `description` wie A, dazu `openGraph` und `alternates.canonical: "/"`. Bindet zusätzlich die globale `<JsonLd />`-Komponente ([(public)/layout.tsx:44](src/app/(public)/layout.tsx#L44)) auf **jeder** Route ein, inklusive `/journal/[slug]`, wo pro Artikel zusätzlich ein eigenes Article-JSON-LD gerendert wird – zwei JSON-LD-Blöcke pro Artikelseite.

**C – Service-Seiten (`/breathwork`, `/coaching`).** Jede Seite exportiert ein vollständiges `Metadata`-Objekt: `title`/`description` erscheinen **zweimal wortgleich** im selben Objekt (einmal top-level, einmal in `openGraph`, z. B. [breathwork/page.tsx:17-19](src/app/(public)/breathwork/page.tsx#L17-L19) vs. [breathwork/page.tsx:24-26](src/app/(public)/breathwork/page.tsx#L24-L26)). `alternates.canonical` läuft korrekt über `absoluteUrl()`. Das Service-JSON-LD wird direkt in der Page als `<script>`-Tag von Hand gebaut ([breathwork/page.tsx:31-61](src/app/(public)/breathwork/page.tsx#L31-L61), [coaching/page.tsx:23-53](src/app/(public)/coaching/page.tsx#L23-L53)), nicht über `JsonLd.tsx`.

**D – Journal-Detailseite.** [journal/[slug]/page.tsx:20-40](src/app/(public)/journal/[slug]/page.tsx#L20-L40): `generateMetadata` (dynamisch), aber `alternates.canonical` ist ein **relativer** String (`/journal/${slug}`, Zeile 31) statt über `absoluteUrl()` gebildet, während `openGraph.url` im selben Funktionskörper aus einer lokal redeklarierten Konstante `const baseUrl = SITE_URL` ([Zeile 10](src/app/(public)/journal/[slug]/page.tsx#L10)) zusammengesetzt wird – zwei verschiedene Wege zur selben absoluten URL innerhalb einer Datei.

**E – Einfache Seiten (`/assessment`, `/termin`, `/journal`-Übersicht).** Nur `title` + `description` ([assessment/page.tsx:4-8](src/app/(public)/assessment/page.tsx#L4-L8), [termin/page.tsx:6-10](src/app/(public)/termin/page.tsx#L6-L10), [journal/page.tsx:6-10](src/app/(public)/journal/page.tsx#L6-L10)). Kein `canonical`, kein `openGraph`, kein JSON-LD, obwohl es echte, verlinkte, indexierbare Seiten sind.

**Vorschlag für EIN einheitliches Muster** (Vorschlag, keine Umsetzung in diesem Audit):
1. `metadataBase` nur im Root-Layout setzen, aus dem Public-Layout entfernen.
2. Ein kleiner Helper `buildMetadata({ path, title, description, openGraph? })` in `lib/site.ts`, der `title`/`description` einmal entgegennimmt und daraus sowohl das Root-Feld als auch `openGraph` sowie `alternates.canonical` (immer über `absoluteUrl()`) ableitet. Behebt die Doppel-Tipperei aus Variante C und den Bruch in Variante D in einem Zug.
3. Eine gemeinsame `<JsonLdScript data={…} />`-Primitive für den `<script type="application/ld+json">`-Boilerplate; `JsonLd.tsx`, die Service-Schemas und das Article-Schema werden zu ihren Konsumenten.
4. Variante E bekommt über denselben Helper mindestens ein `canonical`, damit keine indexierbare Seite ohne bleibt.

### 2.7 Typisierung und lib-Struktur (Kriterium 7)

**Positiv:** `assessment-config.ts` exportiert `Cluster`, `ResultRoute`, `Answer`, `Question`, `AnsweredQuestion` – durchgängig typisiert. `lib/scroll.ts`, `lib/site.ts`, `lib/supabase.ts` sind klein, klar plaziert, ohne Befund.

**Befund B – `ResultActions`-Props unternutzen bereits vorhandene Union-Typen.**
[ResultActions.tsx:11-12](src/components/forms/ResultActions.tsx#L11-L12) typisiert `cluster: string; result: string`, obwohl `AssessmentResult.tsx` (der einzige Aufrufer) bereits über `Cluster`/`ResultRoute` aus `assessment-config.ts` verfügt ([AssessmentResult.tsx:6](src/components/forms/AssessmentResult.tsx#L6)) und sie beim Aufruf durchreicht ([AssessmentResult.tsx:59](src/components/forms/AssessmentResult.tsx#L59)). Die Schnittstelle akzeptiert damit jeden String, nicht nur die vier gültigen Cluster-Werte.

**Befund B – `JournalMeta` bildet das dokumentierte Frontmatter nur teilweise ab, `draft` bleibt wirkungslos.**
[journal.ts:7-12](src/lib/journal.ts#L7-L12) definiert `JournalMeta` mit nur `slug`, `title`, `description`, `publishedAt`. CLAUDE.md dokumentiert zusätzlich `updatedAt`, `excerpt`, `coverImage`, `tags`, `draft` als Teil des Frontmatters, und die vorhandenen `.mdx`-Dateien setzen `excerpt`/`tags` tatsächlich (z. B. [breathe-to-heal-max-strom.mdx:4-5](src/content/journal/breathe-to-heal-max-strom.mdx#L4-L5)). `readMeta()` ([journal.ts:19-29](src/lib/journal.ts#L19-L29)) liest diese Felder nie ein. Besonders `draft` hat dadurch keine Wirkung: `getAllJournalEntries()` filtert nicht danach ([journal.ts:35-39](src/lib/journal.ts#L35-L39)) – ein Artikel mit `draft: true` würde trotzdem auf `/journal` und in der `sitemap.ts` erscheinen.

**Befund B – uneinheitliche Validierungstiefe zwischen den beiden POST-Routen.**
[api/lead/route.ts:30-39](src/app/api/lead/route.ts#L30-L39) prüft jedes Feld einzeln (E-Mail-Regex, `consent === true`, `typeof … === "string"`). [api/assessment/route.ts:6-9](src/app/api/assessment/route.ts#L6-L9) prüft `cluster`/`route` nur auf `typeof === "string"`, ohne sie auf die bereits exportierten Union-Typen `Cluster`/`ResultRoute` einzuschränken, und übernimmt `answers` komplett ungeprüft (`body.answers ?? null`).

**Befund C – `BreathworkAbout.tsx` ist zusätzlich zu Befund A3 (Abschnitt 2.1) auch ein toter Export.**
Kein Importer im gesamten Repo.

**Befund C – JSON-LD-Objekte ohne gemeinsamen Typ.**
Die vier `const … = { "@context": …, "@type": … }`-Objekte (Abschnitt 2.2) sind lose getippt, keine strukturelle Prüfung gegen ein Schema.org-Interface. Kein funktionaler Fehler, aber wiederkehrende Handarbeit statt eines gemeinsamen `ServiceJsonLd`/`ArticleJsonLd`-Typs.

---

## 3. Refactoring-Kandidaten (priorisiert)

| # | Kandidat | Nutzen | Aufwand | Risiko Live-Seite |
|---|----------|--------|---------|--------------------|
| 1 | Primitive extrahieren: Section-Wrapper, Eyebrow (durchgängig statt 3 Varianten), Button (primär/sekundär, inkl. Nav-Größe), H2-Heading, Karte | Behebt Kriterium 2 und großen Teil von Kriterium 3 in einem Schritt; künftige Design-Anpassungen an einer Stelle statt an 20+ | M | Niedrig–mittel: rein visuelles Refactoring, betrifft praktisch jede Seite, vor Merge visuell gegenprüfen |
| 2 | Doppel-FadeIn auf der Homepage auflösen (Befund A1): entweder äußere Wrapper in `page.tsx` entfernen oder Sections ihre inneren FadeIns nehmen lassen | Sections werden wieder seitenunabhängig, wie in Kriterium 1 gefordert | S | Niedrig, aber sichtbar: Timing der Einblendung ändert sich minimal |
| 3 | `/coaching` nach dem `/breathwork`-Muster in `sections/coaching/*.tsx` extrahieren; `BreathworkAbout.tsx` entweder löschen oder mit echtem Inhalt befüllen und einsetzen | Wiederverwendbarkeit, Konsistenz zwischen den beiden Service-Seiten, kein totes Platzhalter-File mehr | M | Niedrig: reines Verschieben von JSX, keine Logikänderung |
| 4 | Metadata/JSON-LD vereinheitlichen: `buildMetadata()`-Helper, `<JsonLdScript>`-Primitive, Journal-Canonical über `absoluteUrl()`, fehlende Canonicals auf `/assessment`, `/termin`, `/journal` ergänzen | SEO-Konsistenz, weniger Copy-Paste, ein Muster für die künftige `/ifs`-Seite | S–M | Niedrig: additiv/mechanisch, aber alle Seiten betroffen, sorgfältig durchgehen |
| 5 | `border-primary/N`-Wildwuchs auf `--color-hairline` (bzw. eine definierte Kartenrand-Stufe) vereinheitlichen | Ein Rand-Ton statt vier, Design-System wird wieder verbindlich | S | Niedrig |
| 6 | Ungenutzte `@theme`-Tokens (Type-Scale, `--measure`, `--container-max`, `--spacing-eyebrow-headline`/`-headline-body`) entweder in Komponenten einführen oder aus `globals.css` entfernen | Design-System bleibt Quelle der Wahrheit statt Papiertiger; Entscheidung nötig, siehe Abschnitt 4 | M (abhängig von Entscheidung) | Niedrig bis zur Einführung, dann wie # 1 |
| 7 | `Header.tsx` client-Grenze verkleinern (kleine `HeaderLogoLink`-Client-Komponente, Rest Server-Komponente) | Minimal weniger Client-JS auf jeder einzelnen Seite (Header ist global) | S | Niedrig |
| 8 | `ResultActions`-Props auf `Cluster`/`ResultRoute` umstellen; `/api/assessment` auf dieselben Union-Typen validieren statt auf bloßes `string` | Typsicherheit an einer Schnittstelle, die aktuell jeden String akzeptiert | S | Niedrig |
| 9 | `JournalMeta` um `excerpt`/`coverImage`/`tags`/`draft` erweitern, `draft: true` beim Rendern der Übersicht (und der Sitemap) filtern | Frontmatter-Vertrag aus CLAUDE.md wird tatsächlich eingehalten, verhindert versehentliches Live-Schalten von Entwürfen | S | Niedrig, aber Verhaltensänderung: vor Merge prüfen, ob aktuell ein Artikel `draft: true` gesetzt hat |

---

## 4. Offene Fragen an Lasse

1. **Padding-Bereich:** Soll design-system.md's Spanne (Desktop 96-160px, Mobil 64-96px) tatsächlich je nach Sektionsgewicht variieren (z. B. Hero größer als Nebensektionen), oder soll CLAUDE.md's fixer Wert (`py-16 md:py-24`) der einzige, alleingültige Standard bleiben und design-system.md entsprechend präzisiert werden?
2. Sollen die zwei gefundenen Padding-Ausreißer (Coaching-Abgrenzungssektion `py-10 md:py-12`, Impressum/Datenschutz `py-32` ohne Mobil-Reduktion) an den Standard angeglichen werden, oder war die abweichende Gewichtung dort bewusst?
3. `BreathworkAbout.tsx`: löschen (aktuell tot, s. 2.1/2.7), oder mit dem noch ausstehenden „Über-Lasse"-Text befüllen und tatsächlich auf `/breathwork` statt der wiederverwendeten `About.tsx` einsetzen?
4. Soll `/coaching` dem `/breathwork`-Muster angeglichen werden (Extraktion in Sektionskomponenten), oder ist Inline-JSX für kampagnenartige, kurzlebige Inhalte wie die Gründungsrunde bewusst gewählt?
5. Umfang der Primitive-Extraktion: reicht Eyebrow/Section/Button, oder sollen auch Heading und Karte als Primitive gebaut werden, bevor `/ifs` als dritte Service-Seite entsteht? Das würde direkt das Muster für `/ifs` mitbestimmen.
6. Sollen die in `globals.css` definierten, aber ungenutzten Type-Scale-Tokens (`--text-h1`, `--text-h2`, `--text-display`, `--text-small`, `--text-eyebrow`, `--measure`, `--container-max`) tatsächlich in Komponenten eingeführt werden, oder war die Type-Skala aus design-system.md nur als Richtwert gedacht und die Tokens sollten aus `globals.css` entfernt werden, um keine tote Dokumentation vorzuspiegeln?
7. `draft`-Feld im Journal-Frontmatter: Soll es tatsächlich Artikel von der Live-Seite ausschließen können (wie in 2.7/Refactoring-Kandidat 9 vorgeschlagen), oder ist es aktuell bewusst unbenutzt, weil Entwürfe ohnehin nie ins Repo committet werden?
