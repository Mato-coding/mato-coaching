# Design System, Lasse Klüver

> Stand: 18.07.2026 (Abschnitt 8.2a ergänzt: Kopfzonen- und Listenregeln gelten
> für das gesamte Workbook-Segment. Programmübersicht und Bereichsseite unter
> /programme/ifs auf diesen Stand umgebaut, Kartenmuster durch Listenzeilen
> ersetzt). Diese Zeile bei jeder Änderung an den Gestaltungsregeln
> aktualisieren.

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

Type-Skala (Richtwerte, `clamp()` für responsive Größen):

| Rolle | Größe | Font | Gewicht | Line-height |
|-------|-------|------|---------|-------------|
| Display (Hero) | `clamp(2.5rem, 5vw, 4rem)` | Cormorant | 400 bis 500 | 1.1 |
| H1 / Section | `clamp(2rem, 3.5vw, 2.75rem)` | Cormorant | 500 | 1.15 |
| H2 | `1.5rem` | Cormorant | 500 (600 falls Striche zu dünn wirken) | 1.25 |
| Body | `1.125rem` (18px) | Hanken Grotesk | 400 | 1.6 |
| Small | `0.9375rem` | Hanken Grotesk | 400 | 1.55 |
| Eyebrow | `0.625rem` (10px), uppercase, `letter-spacing: 0.14em` | Hanken Grotesk | 500 | 1.4 |

Eyebrows tragen einen dünnen `--color-umber`-Strich davor oder darunter (Signature-Detail).

---

## 3. Spacing & Layout, der „Atem-Rhythmus"

Basiseinheit 4px. Skala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

- **Großzügige, gleichmäßige vertikale Rhythmik** ist das Markenzeichen: die Seite „atmet".
- Sektions-Innenabstand (vertikal): Desktop `96 bis 160px`, Mobil `64 bis 96px`.
- Content-Container: max. `~1140px`. Textspalten max. `~68ch` für ruhigen Lesefluss.
- Radius: `rounded-sm` (4px) für Inputs, `rounded-md` (8px) für Karten und Buttons.
- Hairlines: 1px in `--color-hairline` (muted bei ~30% Deckkraft).

---

## 4. Motion (Framer Motion + CSS)

Leise, langsam, absichtsvoll. Kein Bounce, kein Spring, keine Streueffekte.

- Einblendungen: `600ms` und `900ms` (Tokens `--duration-med` und `--duration-slow`), Easing `cubic-bezier(0.16, 1, 0.3, 1)`.
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
  `font-sans` (Body), diese Namen nicht ändern.
- In `next/font/google` heißt die Familie `Cormorant`, nicht `Cormorant_Garamond`.

---

## 8. Workbook-Blöcke

Verbindliche Regeln für alle Blocktypen im geschützten Workbook. Quelle: abgenommener
Claude-Design-Prototyp vom 18.07.2026. Blocktypen und Datenmodell stehen in
workbook-konzept.md, dieses Kapitel regelt die Gestaltung.

### 8.1 Grundprinzip

Blöcke liegen direkt auf dem Papier-Hintergrund. Keine Karten, keine Rahmen, keine
Schatten. Trennung entsteht ausschließlich über vertikalen Abstand (Atem-Rhythmus)
und die Frage-Typografie. `--color-surface` bleibt für Pills reserviert, sonst kommt
es im Workbook nicht vor.

### 8.2 Schritt-Kopf

- Zurück-Link: Pfeil plus "Zurück zur Übersicht" (immer dieser kurze Text, nie der
  Bereichstitel), 14px, `--color-muted`, Hover `--color-ink`, min-height 44px.
- Eyebrow: 16px-Umber-Strich plus Label ("Bereich n"), Bestandsmuster der Website.
  Abstand Eyebrow zu H1: 12px.
- Schritt-Titel: Cormorant 500, 32px mobil / 46px Desktop, line-height 1.08,
  letter-spacing -0.01em.
- Fortschritt: 24px unter dem Titel. 1px-Hairline in voller Spaltenbreite, gefüllter
  Anteil in `--color-navy`. Darunter 8px Abstand, dann "n von m beantwortet" in 13px
  `--color-muted`. Keine Prozentzahl, keine weiteren Kennzahlen.
- Einführungstext (text-Block direkt nach dem Kopf): 32px mobil / 44px Abstand nach
  oben, Body-Größe (16px mobil / 18px Desktop).

### 8.2a Geltungsbereich der Kopfzone und Bereichsseiten

Die Kopfzonen-Regeln aus 8.2 gelten für ALLE Seiten im Workbook-Segment
(Programmübersicht, Bereichsseite, Schrittseite), nicht nur für Schritte:
Zurück-Link kurz und ohne Unterstreichung, Eyebrow mit Umber-Strich, Titel in
Cormorant, Fortschritt als Hairline mit Navy-Füllung plus Textzeile, niemals
Prozentzahlen. Auf der Programmübersicht entfällt der Zurück-Link.

Fortschritts-Wording je Ebene: Schrittseite "n von m beantwortet",
Bereichsseite "n von m Schritten abgeschlossen", Programmübersicht
"n von m Bereichen abgeschlossen".

Schritt-Listen auf Bereichsseiten (und Bereichs-Listen auf der Übersicht) sind
keine Karten, sondern Listenzeilen: volle Spaltenbreite, getrennt durch
1px-Hairlines, vertikales Padding 24px, ganze Zeile klickbar (min-height 44px).
Zeileninhalt: Titel in Cormorant 500, 22px, ink; darunter 6px Abstand, dann
Status in 13px muted ("n von m beantwortet" bzw. "abgeschlossen"). Rechts ein
Pfeil (→) in muted, bei Hover ink; Hover hebt zusätzlich den Titel leicht an
(opacity oder Farbe, keine Bewegung). Gesperrte Einträge: Titel und Status in
muted, kein Pfeil, nicht klickbar, Statustext "Öffnet nach Bereich n".
Abgeschlossene Einträge tragen statt des Status ein schlichtes "Abgeschlossen"
in 13px muted, keine Haken-Icons, keine Badges.

### 8.3 Frage-Anatomie

- Jeder antwortende Block trägt eine laufende zweistellige Nummer ("01", "02") in
  Cormorant 500, 18px, `--color-muted`, gefolgt von der Frage in Cormorant Italic
  500, 19px mobil / 21px Desktop, line-height 1.4, `--color-ink`. Nummer und Frage
  baseline-ausgerichtet, 16px Lücke. Nummern zählen nur antwortende Blöcke,
  text-Blöcke bleiben unnummeriert.
- Blockabstände: 44px mobil / 60px Desktop vor dem ersten Block, 40px mobil / 52px
  Desktop zwischen Blöcken.
- Textspalte max. 68ch, Container max. 1140px. Horizontales Seiten-Padding 20px
  mobil / 24px Desktop, Header und Content auf denselben Kanten.

### 8.4 Blocktypen

**freetext:** Randloses Feld auf Papier, kein Rand, kein Resize-Griff, min-height
100px, Schrift wie Body. Platzhalter `--color-muted` bei 65% Deckkraft. Untere
1px-Hairline als Schreiblinie; bei Fokus wird sie 2px und `--color-navy` (das ist
der Fokus-Indikator, kein zusätzlicher Ring). Autosave debounced nach ~900ms
Tipp-Pause.

**scale:** Standard 7 Stufen, immer ungerade Stufenzahl mit Mittelpunkt. Punkte auf
einer 1px-Hairline, gleichmäßig verteilt. Unselektiert: 8px-Punkt in `--color-muted`
bei 55%. Gewählt: 16px-Punkt in `--color-navy`, genau ein Wert. Unsichtbare
Touch-Fläche 44px pro Punkt. Horizontaler Innenrand der Skala 22px, damit
Touch-Flächen und Labels in der Spalte bleiben. Endpunkt-Labels (Pflicht, 13px,
`--color-muted`) mittig unter dem ersten und letzten Punkt, keine Beschriftung der
Zwischenstufen, keine Ziffern.

**choice, Variante rows (Standard):** Für längere Antworten oder wenige Optionen.
Untereinander als Zeilen, min-height 48px, führender Kreis 18px mit 1px-Rand in
`--color-navy`, bei Auswahl Navy gefüllt. Label Body-Größe, `--color-ink`, 16px
Lücke zum Kreis.

**choice, Variante pills:** Für kurze Antworten (ein bis zwei Wörter). Umbrechende
Zeile mit 12px Lücke. Pill: Radius 999px, min-height 44px, Padding 10px 20px, 16px
Schrift. Unselektiert `--color-surface` mit Hairline-Rand, gewählt `--color-navy`
mit Text in `--color-paper`. Die Variante steht in der Block-Config
(`variant: 'rows' | 'pills'`), Default rows.

### 8.5 Speicherfeedback

Pro Block, rechtsbündig unterhalb, "Gespeichert" in 13px `--color-muted`. Erscheint
nach erfolgreichem Speichern, blendet nach 2s über 600ms (`--ease-settle`) aus. Die
Zeile reserviert ihre Höhe (min-height ~21px), damit nichts springt. Ton immer
nüchtern: "Gespeichert", bei Fehlern "Speichern fehlgeschlagen, wird erneut
versucht". Keine Haken-Icons, keine Ausrufezeichen.

### 8.6 Interaktion, Fokus, Motion

- Tastatur-Fokus: 2px-Ring in `--color-navy`, Offset 2px, auf allen interaktiven
  Elementen. Ausnahme freetext (Unterlinien-Fokus, siehe 8.4).
- Auswahl-Elemente sind Buttons mit `aria-pressed`, Skalen-Punkte mit
  `aria-label` "Stufe n von m".
- Einblendung der Blöcke: Opazität plus 8px Y-Versatz, 600ms, `--ease-settle`.
  `prefers-reduced-motion` schaltet alle Animationen und Transitionen ab.
- Umber erscheint im Workbook nur im Eyebrow-Strich. Nie in Blöcken, Skalen oder
  Auswahlzuständen.

### 8.7 Offen (eigene Design-Briefs vor Umsetzung)

table mobil, Audio-Player und bodymap sind noch nicht gestaltet. Für sie gilt: erst
Varianten in Claude Design auf Basis dieses Kapitels, Entscheidung im Strategie-Chat,
dann Regeln hier ergänzen. Keine Umsetzung im Blindflug.
