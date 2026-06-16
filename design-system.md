# Design System — mato-coaching (Lasse Klüver)

**Marke:** Persönliche Brand, Name-forward (Lasse Klüver), Domain mato-coaching.de
**Anmutung:** Stille Eleganz / Quiet Luxury · Vertrauen · Klarheit · Autorität · Ruhe
**Was vermieden wird:** Verspieltheit, Esoterik-Optik und der generische KI-Look
(Creme + hochkontrastige Serife + lautes Terrakotta). Boldness wird an *einer*
Stelle ausgegeben, alles andere bleibt diszipliniert und leise.

---

## 1. Farbe (Tokens)

| Token        | Hex       | Rolle |
|--------------|-----------|-------|
| `--color-paper`    | `#FCFAF0` | Hintergrund (warmes Papierweiß) |
| `--color-surface`  | `#FFFFFF` | Karten / leicht erhöhte Flächen |
| `--color-ink`      | `#19191A` | Primäre Textfarbe |
| `--color-navy`     | `#09173B` | Primär: Autorität, CTAs, Akzentflächen |
| `--color-muted`    | `#6B6E72` | Sekundärtext, Hairlines, Captions |
| `--color-umber`    | `#7C6A57` | EINZIGER warmer Zier-Akzent. Sehr sparsam: dünne Linie, Eyebrow-Strich, kleine Marke. |

Regeln:
- CTAs: Fläche `--color-navy`, Text `--color-paper`. Sekundär-CTA: Outline in `--color-navy`.
- `--color-umber` ist Signal, nicht Dekoration — selten und absichtsvoll.
- Navy bleibt der Anker; Umber ist warm, aber nie laut. Niemals beide als Flächen konkurrieren lassen.
- Umber nie für Fließtext; Kontrast immer prüfen.

---

## 2. Typografie

**Pairing (final): Display = Spectral · Body/UI = Geist Sans**
- **Spectral** (via `next/font/google`) für Überschriften — ruhig, kontrastarm, literarisch.
  Echte Kursive vorhanden: für Betonungen und das Testimonial-Zitat nutzen.
- **Geist Sans** für Fließtext, UI und Buttons (bereits verdrahtet).
- Gewichte schlank halten: Spectral 400/500 (+ italic), Geist 400/500.

Type-Skala (Richtwerte, `clamp()` für responsive Größen):
| Rolle          | Größe                          | Font     | Gewicht | Line-height |
|----------------|--------------------------------|----------|---------|-------------|
| Display (Hero) | `clamp(2.5rem, 5vw, 4rem)`     | Spectral | 400–500 | 1.1 |
| H1 / Section   | `clamp(2rem, 3.5vw, 2.75rem)`  | Spectral | 500     | 1.15 |
| H2             | `1.5rem`                       | Spectral | 500     | 1.25 |
| Body           | `1.125rem` (18px)              | Geist    | 400     | 1.6 |
| Small          | `0.9375rem`                    | Geist    | 400     | 1.55 |
| Eyebrow        | `0.8125rem`, uppercase, `letter-spacing: 0.12em` | Geist | 500 | 1.4 |

Eyebrows tragen einen dünnen `--color-umber`-Strich davor oder darunter (Signature-Detail).

---

## 3. Spacing & Layout — der „Atem-Rhythmus"

Basiseinheit 4px. Skala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

- **Großzügige, gleichmäßige vertikale Rhythmik** ist das Markenzeichen: die Seite „atmet".
- Sektions-Innenabstand (vertikal): Desktop `96–160px`, Mobil `64–96px`.
- Content-Container: max. `~1140px`; Textspalten max. `~68ch` für ruhigen Lesefluss.
- Radius: `rounded-sm` (4px) für Inputs, `rounded-md` (8px) für Karten/Buttons.
- Hairlines: 1px in `--color-muted` bei reduzierter Deckkraft (~`/30`).

---

## 4. Motion (Framer Motion)

Leise, langsam, absichtsvoll — kein Bounce, kein Spring, keine Streueffekte.
- Einblendungen: `600–1200ms`, Easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Bewegung minimal: Opazität + kleiner Y-Versatz (`8–16px`).
- **Eine** orchestrierte Hero-Einblendung beim Laden („settle"), danach Stille.
- Scroll-Reveals dezent und einmalig (nicht bei jedem Re-Enter).
- `prefers-reduced-motion`: Transforms aus, nur sanfte Opazität oder keine Bewegung.

---

## 5. Signature-Element

**„Der Atem-Rhythmus":** Pacing über großzügige, konsistente Abstände plus eine einzige
langsame Hero-Einblendung. Wiederkehrendes Signal: ein dünner `--color-umber`-Keyline-/
Eyebrow-Strich. Das ist die *eine* Stelle, an der Charakter sichtbar wird — sonst Stille.

---

## 6. Quality-Floor (immer)

- Responsive bis Mobil; sichtbarer Tastatur-Fokus; `prefers-reduced-motion` respektiert.
- Sentence-Case in der UI, aktive Verben, keine Floskeln.
- Buttons sagen, was passiert („Erstgespräch vereinbaren"), konsistent durch den Flow.

---

## 7. Technische Notiz für die Umsetzung

- `globals.css` nutzt Tailwind v4 (`@theme`) — das ist die Quelle der Wahrheit für Tokens.
- `tailwind.config.ts` enthielt tote Referenzen (`var(--background)`/`var(--foreground)`) → entfernt.
  In v4 ist die JS-Config optional; Tokens leben im `@theme`.
- Schriften über `next/font/google` (Spectral + Geist) laden und als CSS-Variablen mappen.
