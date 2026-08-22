# Design System, Lasse Klüver

**Marke:** Persönliche Brand, Name-forward (Lasse Klüver), kanonische Domain www.lassekluever.de.
**Anmutung:** Stille Eleganz, Quiet Luxury. Vertrauen, Klarheit, Autorität, Ruhe.
**Was vermieden wird:** Verspieltheit, Esoterik-Optik und der generische KI-Look
(Creme + lautes Terrakotta + liebloses Default-Pairing). Charakter wird an *einer*
Stelle ausgegeben, alles andere bleibt diszipliniert und leise.

Quelle der Wahrheit: Tokens leben in `globals.css` (`@theme`, Tailwind v4). Dieses
Dokument hält Prinzipien, Absicht und Richtwerte. Bei Konflikt gewinnt `@theme`
für Werte, dieses Dokument für Haltung.

---

## 1. Farbe

| Token | Hex | Rolle |
|-------|-----|-------|
| `--color-paper` | `#FCFAF0` | Hintergrund (warmes Papierweiß) |
| `--color-surface` | `#FFFFFF` | Karten, leicht erhöhte Flächen |
| `--color-ink` | `#19191A` | Primäre Textfarbe |
| `--color-navy` | `#09173B` | Primär: Autorität, CTAs, Akzentflächen |
| `--color-muted` | `#6B6E72` | Sekundärtext, Captions |
| `--color-umber` | `#7C6A57` | Einziger warmer Zier-Akzent. Sehr sparsam: dünne Linie, Eyebrow-Strich, kleine Marke. |
| `--color-hairline` | `muted @ 30%` | Abgeleitet, für Hairlines (`color-mix`). |

Regeln:
- CTAs: Fläche `--color-navy`, Text `--color-paper`. Sekundär-CTA: Outline in `--color-navy`.
- `--color-umber` ist Signal, nicht Dekoration. Selten und absichtsvoll.
- Navy bleibt der Anker, Umber ist warm, aber nie laut. Nie beide als Flächen konkurrieren lassen.
- Umber nie für Fließtext. Kontrast immer prüfen.

---

## 2. Typografie

**Pairing (final): Display = Cormorant · Body/UI = Hanken Grotesk**

- **Cormorant** (via `next/font/google`) für Überschriften. Kontrastreiche, aber
  zurückhaltend gesetzte Serife, deren Ruhe über Größe, Gewicht und Abstand
  entsteht, nicht über niedrigen Kontrast. Das ist die Stelle, an der die Marke
  Charakter zeigt. Echte Kursive vorhanden, für Betonungen und das
  Testimonial-Zitat nutzen.
- **Hanken Grotesk** für Fließtext, UI und Buttons.
- Gewichte schlank halten: Cormorant 400/500/600 (+ italic), Hanken Grotesk 400/500.
- Disziplin als Gegengewicht: weil Cormorant kontrastreich ist, bleiben Layout,
  Farbe und Bewegung umso ruhiger.

Type-Skala. Display, Display-sub, Section und Emphasis sind über `Heading.tsx` (Props `variant="display"|"display-sub"|"section"|"emphasis"`) verdrahtet und damit verbindlich. Ein eigener H1-Token, Body- und Small-Tokens sowie ein eigener Eyebrow-Größen-Token wurden bewusst **nicht** eingeführt (Architektur-Refactoring Auftrag 5, Entscheidung zur offenen Frage 6 aus architektur-audit.md): Fließtext läuft direkt über die plain-Tailwind-Klassen `text-lg`/`leading-relaxed` an der jeweiligen Stelle, Eyebrow-Label über `text-sm`. Ohne eine einzige Fundstelle im Code wären eigene Tokens dafür tote Dokumentation.

| Rolle | Größe | Font | Gewicht | Line-height | Status |
|-------|-------|------|---------|-------------|--------|
| Display (Hero), `variant="display"` | `text-display` 3rem mobil · `md:text-display-md` 3.75rem · `lg:text-display-lg` 4.5rem (Breakpoint-Stufen, kein `clamp()`) | Cormorant | 500 | `leading-display` 1.1 | verdrahtet |
| Display-sub (Hero), `variant="display-sub"` | `text-display` 3rem mobil · `md:text-display-md` 3.75rem (dieselben Tokens wie `display`, aber ohne `lg`-Stufe) | Cormorant | 500 | `leading-display` 1.1 | verdrahtet |
| Section-Headline (H2), `variant="section"` | `text-h2` 1.875rem mobil · `md:text-h2-md` 2.25rem | Cormorant | 500 | `leading-h2` 1.15 | verdrahtet |
| Emphasis-Headline (H2), `variant="emphasis"` | Mobil identisch mit `section` (`text-h2` 1.875rem) · ab `md:text-h2-emphasis-md` 3rem (48px) | Cormorant | 500 | `leading-h2` 1.15 | verdrahtet |
| Fließtext (kein eigener Token) | `text-lg` (18px) plain Tailwind | Hanken Grotesk | 400 | `leading-relaxed` plain Tailwind | direkt an der Stelle |
| Eyebrow-Label (kein eigener Token) | `text-sm` (14px) plain Tailwind | Hanken Grotesk | 500 | 1.4 | Größe direkt an der Stelle, Tracking verdrahtet |

Eyebrows tragen einen dünnen `--color-umber`-Strich davor oder darunter (Signature-Detail), Tracking über `tracking-eyebrow` (`--tracking-eyebrow: 0.15em`), verdrahtet in `Eyebrow.tsx`.

Hinweis: Die Breakpoint-Stufen bei Display, Section und Emphasis bilden die historisch gewachsene Tailwind-Kette (`text-5xl/6xl/7xl` bzw. `text-3xl/4xl` bzw. `text-3xl/5xl`) 1:1 ab, statt sie durch eine kontinuierliche `clamp()`-Kurve zu ersetzen, damit sich beim Verdrahten keine Pixelgröße ändert. `emphasis` ist die Variante für einzelne Sektionen mit bewusst stärkerer Betonung (bisher Cause.tsx' größere H2, jetzt auf die Skala verdrahtet statt als Ausnahme geführt). `display-sub` ist die Variante für Service-Hero-H1, die (anders als Homepage-Hero) nicht bis `lg` auf 72px weiterwächst (bisher BreathworkHero.tsx' und coaching/page.tsx' identisches, handgesetztes `text-5xl md:text-6xl`, beide Werte deckungsgleich, deshalb eine gemeinsame Variante statt zweier Ausnahmen).

---

## 3. Spacing & Layout, der „Atem-Rhythmus"

Basiseinheit 4px. Skala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

- **Großzügige, gleichmäßige vertikale Rhythmik** ist das Markenzeichen: die Seite „atmet".
- Sektions-Innenabstand (vertikal), verbindlich über `Section.tsx` (Prop `size`), drei Stufen:
  | Stufe | Mobil | Ab `md` | Wann |
  |-------|-------|---------|------|
  | `compact` | 40px (`py-10`) | 48px (`py-12`) | dichte, kampagnenartige Nebensektionen |
  | `default` | 64px (`py-16`) | 96px (`py-24`) | Standard, die meisten Sektionen |
  | `spacious` | 96px (`py-24`) | 160px (`py-40`) | wenige, bewusst große Momente |
- Content-Container über `Container.tsx` (Prop `width`), verbindlich:
  | Wert | Breite | Token |
  |------|--------|-------|
  | `default` | 1140px | `--container-content` |
  | `narrow` | 768px (`max-w-3xl`) | eingebauter Tailwind-Wert |
  | `prose` | 68ch | `--container-measure` |
- Radius: `rounded-sm` (4px) für Inputs, `rounded-md` (8px) für Karten und Buttons.
- Hairlines: 1px in `--color-hairline` (muted bei ~30% Deckkraft), verbindlich über `Card.tsx` (Kartenrand) bzw. die Utility-Klasse `border-hairline` für alle übrigen Trennlinien-, Kartenrand- und Eingabefeld-Ränder (Header-Unterkante, Formular-Inputs, Antwort-Buttons im Assessment) — nie `border-primary/N`. Gegen Surface-Weiß ist `--color-hairline` (≈ rgb(211,212,213)) dunkler/kräftiger als das frühere `border-primary/15` (≈ rgb(220,220,221)), ein eigenes Input-Border-Token war deshalb nicht nötig.

---

## 4. Motion (Framer Motion + CSS)

Leise, langsam, absichtsvoll. Kein Bounce, kein Spring, keine Streueffekte.

- Einblendungen: `600ms` und `900ms`, Easing `cubic-bezier(0.16, 1, 0.3, 1)` (Token `--ease-settle`). `900ms` ist als CSS-Token `--duration-slow` verdrahtet (Hero-Keyframe). `600ms` (FadeIn.tsx' schnellere Variante, genutzt im Assessment) läuft direkt als Framer-Motion-Prop (`durationSec={0.6}`), ohne eigenes CSS-Token: `--duration-med` hatte keine Fundstelle und wurde entfernt (Architektur-Refactoring Auftrag 5).
- Bewegung minimal: Opazität plus kleiner Y-Versatz (`8 bis 16px`).
- **Hero-Einblendung läuft als reine CSS-Animation** (Keyframe `hero-fade-up` in `globals.css`), damit der LCP-Text sofort mit dem CSS-Load startet und nicht auf JS-Hydration wartet. Gestaffelte Delays über `.hero-d1`/`.hero-d2`/`.hero-d3`-Klassen.
- Scroll-Reveals (alle Sektionen unterhalb des Hero) nutzen weiterhin `FadeIn.tsx` mit Framer Motion `whileInView`.
- `prefers-reduced-motion`: Transforms aus, nur sanfte Opazität oder keine Bewegung.

---

## 5. Signature-Element

**„Der Atem-Rhythmus":** Pacing über großzügige, konsistente Abstände plus eine
einzige langsame Hero-Einblendung. Wiederkehrendes Signal: ein dünner
`--color-umber`-Keyline- oder Eyebrow-Strich. Das ist die *eine* Stelle, an der
Charakter sichtbar wird, sonst Stille.

---

## 6. Quality-Floor (immer)

- Responsive bis Mobil, sichtbarer Tastatur-Fokus, `prefers-reduced-motion` respektiert.
- Sentence-Case in der UI, aktive Verben, keine Floskeln, keine Gedankenstriche.
- Buttons sagen, was passiert („Erstgespräch vereinbaren"), konsistent durch den Flow.

---

## 7. Technische Notiz für die Umsetzung

- `globals.css` nutzt Tailwind v4 (`@theme`) und ist die Quelle der Wahrheit für Tokens.
- Keine `tailwind.config.ts`. In v4 ist die JS-Config optional, Tokens leben im `@theme`.
- Schriften über `next/font/google` (Cormorant + Hanken Grotesk) laden, als
  `--font-serif-src` und `--font-sans-src` mappen, in `@theme` zu `--font-serif`
  und `--font-sans` komponieren. Die Komponenten nutzen `font-serif` (Display) und
  `font-sans` (Body), diese Namen nicht ändern. Kein `font-display`-Alias mehr
  (ungenutzt, aus `globals.css` entfernt).
- In `next/font/google` heißt die Familie `Cormorant`, nicht `Cormorant_Garamond`.
- Type-Scale lebt in `globals.css` (`--text-display`/`-display-md`/`-display-lg`,
  `--text-h2`/`-h2-md`/`-h2-emphasis-md`, `--leading-display`/`-h2`) plus `Heading.tsx`, das die
  Breakpoint-Klassen daraus zusammensetzt. Container über `--container-content`
  (1140px, `width="default"`) und `--container-measure` (68ch, `width="prose"`)
  plus `Container.tsx`. Beide Layout-Tokens bewusst nicht `--container-max` bzw.
  `--container-prose` genannt: diese Schlüssel kollidieren mit Tailwinds eigenen
  statischen `max-w-max`- (`max-content`) und `max-w-prose`-Utilities (fest 65ch)
  und würden den Token-Wert nur zufällig per Cascade-Reihenfolge durchsetzen,
  statt eine eindeutige, alleinstehende Utility-Regel zu erzeugen.
- `globals.css` enthält nur noch Tokens mit mindestens einer Fundstelle im Code
  (Architektur-Refactoring Auftrag 5, grep-geprüft). Entfernt: `--text-h1`,
  `--text-body`, `--text-small`, `--text-eyebrow`, `--leading-h1`/`-body`/`-small`,
  `--opacity-hairline`, `--spacing-eyebrow-headline`/`-headline-body`,
  `--font-weight-regular`/`-semibold`/`-display`/`-hero`, `--duration-med`. Vor
  einem neuen Token in `@theme` immer prüfen, ob er tatsächlich in einer
  Komponente verdrahtet wird, statt ihn "für später" stehen zu lassen.

---

## 8. Frage-Blöcke (Feedback, Basis für einen künftigen Workbook-Merge)

Verbindliche Regeln für die Frage-Schritte des Feedback-Formulars (`/feedback`,
`FeedbackForm.tsx`). Das digitale IFS-Workbook (Branch `feature/workbook`,
noch nicht gemergt) hat sein eigenes, umfangreicheres Blocksystem mit
identischer Grundsprache (eigene Abschnitt-8-Fassung auf diesem Branch:
Autosave-Feedback, Bereichs-Kopfzonen, `table`/`audio`/`bodymap`-Blöcke).
Dieser Abschnitt beschreibt bewusst nur die Teilmenge, die `/feedback`
tatsächlich nutzt, damit beide Renderer sich später ohne Widerspruch
zusammenführen lassen. Kein Code wird zwischen den Branches geteilt, nur die
Optik.

### 8.1 Grundprinzip

Fragen liegen direkt auf dem Papier-Hintergrund. Keine Karten, keine Rahmen,
keine Schatten für die Frage selbst (Karten bleiben Ausnahmen wie der
Audio-Block der Danke-Ansicht, siehe unten). Trennung entsteht über
vertikalen Abstand und die Frage-Typografie.

### 8.2 Fortschritt

`/feedback` nutzt das aus `AssessmentForm.tsx` extrahierte `ProgressBar.tsx`
(`src/components/ui/`): Zeile "Frage n von m" plus Prozentzahl, darunter ein
1px-Hairline-Balken mit `--color-umber`-Füllung. Bewusst nicht die
Workbook-Variante (Navy-Füllung, kein Prozentwert, Wording "n von m
beantwortet") — beide Kontexte behalten vorerst ihre eigene, jeweils schon
etablierte Fortschrittsoptik.

### 8.3 Frage-Anatomie

Jede Frage trägt eine laufende zweistellige Nummer ("01", "02") in Cormorant
500, `text-lg`, `--color-muted`, gefolgt von der Frage in Cormorant Italic
500, 19px mobil / 21px Desktop (`text-[1.1875rem] md:text-[1.3125rem]`),
`leading-[1.4]`, `--color-ink`. Nummer und Frage baseline-ausgerichtet, 16px
Lücke (`items-baseline gap-4`). Der Kontakt-Schritt (Frage 6) hat mehrere
Felder statt einer Antwortliste und bleibt deshalb ohne die italic
Frage-Optik, behält aber die Nummer.

**Skip-Link:** Überspringbare Schritte (`format`, `descriptors`, `best`,
`improve`; `rating` bleibt Pflicht, `contact` überspringt sich implizit über
"Feedback senden" ohne Angaben) tragen einen einheitlichen Skip-Link,
`TextLinkButton.tsx` (`src/components/ui/`): `<button type="button">`,
`text-sm text-muted underline underline-offset-2 hover:text-accent`. Label
`skipLabel` ("Überspringen", `feedback-config.ts`). Platzierung: bei Fragen
mit eigenem Weiter-Button rechts daneben in derselben Zeile (`flex
items-center gap-6`); bei Auto-Advance-Fragen ohne Weiter-Button (aktuell nur
`format`) unter der Antwort. Ein Skip setzt für den Schritt denselben leeren
Wert, den eine explizite Nicht-Antwort hätte (`format` → `null`,
`descriptors` → keine Auswahl, `best`/`improve` → leerer Text), und landet
als normaler History-Eintrag, Zurück funktioniert dadurch auch über
übersprungene Schritte hinweg, ohne Sonderfall.

### 8.4 Frage-Typen

**choice, Variante rows:** Für wenige Optionen (aktuell nur `format`).
Zeilen, min-height 48px, führender Kreis 18px mit 1px-Rand in
`--color-navy`, bei Auswahl Navy gefüllt. Bewusste Ausnahme von der
`border-hairline`-Konvention (design-system.md Abschnitt 3): dieser Kreis
ist kein Trennstrich, Kartenrand oder Eingabefeld, sondern der vom
Blocksystem vorgegebene Auswahl-Indikator.

**scale:** Punkte auf einer 1px-Hairline, gleichmäßig verteilt, horizontaler
Innenrand 22px. Unselektiert: 8px-Punkt in `--color-ink` bei 55% Deckkraft.
Gewählt: 16px-Punkt in `--color-navy`. Touch-Fläche 44px pro Punkt.
Endpunkt-Labels (13px, `--color-muted`) mittig unter erstem/letztem Punkt,
keine Zwischenbeschriftung. `/feedback` nutzt 5 Stufen (Konfigurationswert
in `feedback-config.ts`, nicht die Workbook-Vorgabe von 7) statt einer
eigenen Regel, weil der Wert später gegen Google-Bewertungen (Skala 1–5)
lesbar sein soll.

**Auto-Advance-Bestätigung (rows und scale):** Beide Fragetypen gehen ohne
eigenen Weiter-Button direkt zum nächsten Schritt über (`format`, `rating`;
`descriptors`/`best`/`improve`/`contact` haben einen Weiter-Button und sind
davon nicht betroffen). Die gewählte Option bleibt `AUTO_ADVANCE_DELAY_MS`
(400ms, `feedback-config.ts`) sichtbar gefüllt, bevor der nächste Schritt
erscheint, damit die Auswahl als Bestätigung wahrnehmbar ist, statt
kommentarlos zu verschwinden. Der Übergang zwischen unselektiert und
gewählt läuft über eine 150ms-Transition auf dem Auswahl-Indikator selbst
(Kreis-Füllung bei rows, Punktgröße/-farbe bei scale), `motion-safe`
begrenzt, sodass bei `prefers-reduced-motion` keine Transition läuft, das
400ms-Bestätigungsfenster aber bestehen bleibt. Kein Haken-Icon, kein
Toast, keine zusätzliche Farbe: die Bestätigung entsteht allein aus
gefülltem Zustand plus Pause.

**choice, Variante pills:** Für kurze Mehrfachauswahl-Antworten (aktuell nur
`descriptors`). Umbrechende Zeile, 12px Lücke, Radius 999px, min-height
44px, Padding 10px 20px. Unselektiert `--color-surface` mit
`border-hairline`, gewählt `--color-navy` mit Text in `--color-paper`.
Auswahl-Obergrenzen (hier: höchstens drei, feste plus eigene Worte
zusammengezählt) zeigen beim Erreichen einen leisen Hinweistext unter den
Pills statt die Optionen sichtbar zu deaktivieren.

**choice, Variante pills, eigenes Wort:** `descriptors` erlaubt zusätzlich zu
den zwölf festen Optionen bis zu drei eigene, frei eingegebene Worte
(zusammen mit den festen Optionen gegen dieselbe Obergrenze gezählt).
Reihenfolge in derselben umbrechenden Pill-Reihe: erst die festen Pills,
dann die bereits bestätigten eigenen Worte, danach die Add-Pill oder,
aufgeklappt, die Eingabe-Pill.

- *Eigene-Wort-Pill:* gleiche Maße wie die festen Pills, gefüllt
  `--color-navy` mit Text `--color-paper`, dahinter ein ×-Button
  (`aria-label` "<Wort> entfernen", Touch-Fläche 44px, Icon 12px,
  `--color-paper` bei 70% Deckkraft, bei Hover 100%).
- *Add-Pill:* solange feste plus eigene Worte zusammen unter drei liegen,
  gleiche Maße, Hintergrund transparent, 1px gestrichelter Rand in
  `--color-ink` bei 40% Deckkraft, Text "+ Eigenes Wort" in `--color-muted`.
- *Eingabe-Pill:* Antippen der Add-Pill wandelt sie in dieselbe Pill-Form mit
  1px durchgezogenem Navy-Rand, darin ein randloses `<input>`
  (`aria-label` "Eigenes Wort eingeben"), Autofokus, Breite wächst mit dem
  Inhalt (min 8ch, max 100%). Enter oder Blur mit Inhalt bestätigt, Escape
  oder Blur ohne Inhalt schließt ohne Eintrag, Backspace im leeren Feld
  entfernt das zuletzt hinzugefügte eigene Wort. Entspricht die Eingabe
  (getrimmt, normalisiert) dem Label einer festen Option, aktiviert das
  stattdessen diese Pill statt ein eigenes Wort anzulegen; entspricht sie
  einem bereits vorhandenen eigenen Wort, passiert nichts (Dedupe
  case-insensitiv). Nach einer Bestätigung bleibt die Eingabe-Pill offen für
  ein weiteres Wort, solange die Obergrenze nicht erreicht ist, sonst
  schließt sie und der bestehende Limit-Hinweis erscheint.

**freetext:** Randloses Feld, kein umlaufender Rand, kein Resize-Griff,
min-height 100px. Untere 1px-Hairline als Schreiblinie, bei Fokus 2px und
`--color-navy` (das ist der Fokus-Indikator, kein zusätzlicher Ring).

### 8.5 Danke-Ansicht (nur Feedback, kein Workbook-Konzept)

Die Danke-Ansicht (`FeedbackThankYou.tsx`) ersetzt nach dem Absenden den
kompletten Seitenkopf des aktiven Formulars, nicht nur dessen Inhalt: sie
trägt selbst Eyebrow ("Danke") und `Heading` mit `as="h1"`, damit die Seite
zu jedem Zeitpunkt genau eine H1 hat (aktiver Zustand: Formular-Kopf: aktiv
`FeedbackForm.tsx`; nach dem Absenden: `FeedbackThankYou.tsx`).

Der Audio-Block der Danke-Ansicht ist bewusst die eine Ausnahme vom
Card-losen Grundprinzip aus 8.1: `Card.tsx` mit Eyebrow, Titel, Beschreibung
und nativem `<audio>`-Element, weil hier ein einzelnes, in sich
abgeschlossenes Geschenk optisch abgesetzt werden soll, anders als eine
Frage im Fluss.

Der Bewertungsblock am Ende trägt eine eigene Eyebrow ("Deine Erfahrung
teilen") und ist primär/sekundär geordnet: der Google-Button (Standard-
Button-Variante, `external`) ist der Primär-CTA, "Lieber direkt schreiben"
(mailto, `variant="secondary"`) der Ausweichpfad für alle, die nicht
öffentlich bewerten wollen. Beide Blöcke (Audio, Google-Button) entfallen
lautlos, wenn die zugehörige Env fehlt (kein stiller Fallback, s. CLAUDE.md
offene Aufgabe 5); außerhalb von Production zeigt die Stelle stattdessen
einen `text-sm text-umber`-Entwicklungshinweis, welche Env fehlt.
