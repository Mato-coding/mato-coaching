# Design System, mato-coaching (Lasse Klüver)

**Marke:** Persönliche Brand, Name-forward (Lasse Klüver), Domain in Migration auf www.lassekluever.de.
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

## 4. Motion (Framer Motion)

Leise, langsam, absichtsvoll. Kein Bounce, kein Spring, keine Streueffekte.

- Einblendungen: `600ms` und `900ms` (Tokens `--duration-med` und `--duration-slow`), Easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Bewegung minimal: Opazität plus kleiner Y-Versatz (`8 bis 16px`).
- **Eine** orchestrierte Hero-Einblendung beim Laden („settle"), danach Stille.
- Scroll-Reveals dezent und einmalig, nicht bei jedem Re-Enter.
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
