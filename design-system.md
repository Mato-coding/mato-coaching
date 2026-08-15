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

Type-Skala. Display, Section und Emphasis sind über `Heading.tsx` (Props `variant="display"|"section"|"emphasis"`) verdrahtet und damit verbindlich; H1/Body/Small/Eyebrow bleiben vorerst dokumentierte Richtwerte ohne Komponenten-Anbindung.

| Rolle | Größe | Font | Gewicht | Line-height | Status |
|-------|-------|------|---------|-------------|--------|
| Display (Hero), `variant="display"` | `text-display` 3rem mobil · `md:text-display-md` 3.75rem · `lg:text-display-lg` 4.5rem (Breakpoint-Stufen, kein `clamp()`) | Cormorant | 500 | `leading-display` 1.1 | verdrahtet |
| Section-Headline (H2), `variant="section"` | `text-h2` 1.875rem mobil · `md:text-h2-md` 2.25rem | Cormorant | 500 | `leading-h2` 1.15 | verdrahtet |
| Emphasis-Headline (H2), `variant="emphasis"` | Mobil identisch mit `section` (`text-h2` 1.875rem) · ab `md:text-h2-emphasis-md` 3rem (48px) | Cormorant | 500 | `leading-h2` 1.15 | verdrahtet |
| H1 (Richtwert, noch nicht verwendet) | `clamp(2rem, 3.5vw, 2.75rem)` | Cormorant | 500 | 1.15 | Richtwert |
| Body | `1.125rem` (18px) | Hanken Grotesk | 400 | 1.6 | Richtwert |
| Small | `0.9375rem` | Hanken Grotesk | 400 | 1.55 | Richtwert |
| Eyebrow-Label | `text-sm` (14px, nicht der Token `--text-eyebrow`) | Hanken Grotesk | 500 | 1.4 | Größe Richtwert, Tracking verdrahtet |

Eyebrows tragen einen dünnen `--color-umber`-Strich davor oder darunter (Signature-Detail), Tracking über `tracking-eyebrow` (`--tracking-eyebrow: 0.15em`), verdrahtet in `Eyebrow.tsx`.

Hinweis: Die Breakpoint-Stufen bei Display, Section und Emphasis bilden die historisch gewachsene Tailwind-Kette (`text-5xl/6xl/7xl` bzw. `text-3xl/4xl` bzw. `text-3xl/5xl`) 1:1 ab, statt sie durch eine kontinuierliche `clamp()`-Kurve zu ersetzen, damit sich beim Verdrahten keine Pixelgröße ändert. `emphasis` ist die Variante für einzelne Sektionen mit bewusst stärkerer Betonung (bisher Cause.tsx' größere H2, jetzt auf die Skala verdrahtet statt als Ausnahme geführt).

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
- Hairlines: 1px in `--color-hairline` (muted bei ~30% Deckkraft), verbindlich über `Card.tsx` (Kartenrand) statt `border-primary/N`.

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
