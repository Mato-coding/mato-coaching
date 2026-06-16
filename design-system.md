# Design System — mato-coaching (Lasse Klüver)

**Marke:** Persönliche Brand, Name-forward (Lasse Klüver), Domain mato-coaching.de
**Anmutung:** Stille Eleganz / Quiet Luxury · Vertrauen · Klarheit · Autorität · Ruhe
**Was vermieden wird:** Verspieltheit, Esoterik-Optik und der generische KI-Look
(Creme + hochkontrastige Serife + lautes Terrakotta). Boldness wird an *einer*
Stelle ausgegeben, alles andere bleibt diszipliniert und leise.

---

## 1. Farbe (Tokens)

Tokens leben in `globals.css` via `@theme` — das ist die einzige Quelle der Wahrheit.
Tailwind generiert daraus automatisch `bg-*`, `text-*`, `border-*`-Utilities.

| Token (CSS-Variable)       | Tailwind-Klasse    | Hex       | Rolle |
|----------------------------|--------------------|-----------|-------|
| `--color-background`       | `bg-background`    | `#FCFAF0` | Hintergrund (warmes Papierweiß) |
| `--color-surface`          | `bg-surface`       | `#FFFFFF` | Karten / leicht erhöhte Flächen |
| `--color-primary`          | `text-primary`     | `#19191A` | Primäre Textfarbe |
| `--color-accent`           | `bg-accent`        | `#09173B` | Primär: Autorität, CTAs, Akzentflächen |
| `--color-muted`            | `text-muted`       | `#6B6E72` | Sekundärtext, Hairlines, Captions |
| `--color-umber`            | `bg-umber`         | `#7C6A57` | EINZIGER warmer Zier-Akzent. Sehr sparsam: dünne Linie, Eyebrow-Strich. |

Regeln:
- CTAs: Fläche `bg-accent`, Text `text-background`. Sekundär-CTA: Outline in `accent`.
- `text-primary/70` etc. für Opazitätsstufen (Tailwind v4 unterstützt das nativ).
- `--color-umber` ist Signal, nicht Dekoration — selten und absichtsvoll einsetzen.
- Umber nie für Fließtext verwenden.

---

## 2. Typografie

**Pairing (final): Display = Spectral · Body/UI = Geist Sans**
- **Spectral** (via `next/font/google`) für Überschriften — ruhig, kontrastarm, literarisch.
  Echte Kursive vorhanden (`font-style: italic`): für Betonungen und das Testimonial-Zitat.
- **Geist Sans** für Fließtext, UI und Buttons (bereits verdrahtet).
- Im Code: `font-serif` (Spectral) und `font-sans` (Geist) als Tailwind-Utilities.

Type-Skala (Richtwerte, `clamp()` für responsive Größen):
| Rolle          | Größe                          | Font     | Gewicht | Line-height |
|----------------|--------------------------------|----------|---------|-------------|
| Display (Hero) | `clamp(2.5rem, 5vw, 4rem)`     | Spectral | 400–500 | 1.1 |
| H1 / Section   | `clamp(2rem, 3.5vw, 2.75rem)`  | Spectral | 500     | 1.15 |
| H2             | `1.5rem`                       | Spectral | 500     | 1.25 |
| Body           | `1.125rem` (18px)              | Geist    | 400     | 1.6 |
| Small          | `0.9375rem`                    | Geist    | 400     | 1.55 |
| Eyebrow        | `0.8125rem`, uppercase, `tracking-[0.15em]` | Geist | 500 | 1.4 |

Eyebrows tragen beidseitig einen dünnen `bg-umber`-Hairline-Strich (Signature-Detail).

---

## 3. Spacing & Layout — der „Atem-Rhythmus"

Basiseinheit 4px. Skala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

- **Großzügige, gleichmäßige vertikale Rhythmik** ist das Markenzeichen: die Seite „atmet".
- Sektions-Innenabstand (vertikal): Desktop `96–160px`, Mobil `64–96px`.
- Content-Container: max. `~1140px`; Textspalten max. `~68ch` für ruhigen Lesefluss.
- Radius: `rounded-sm` (4px) für Inputs, `rounded-md` (8px) für Karten/Buttons.
- Hairlines: 1px in `border-primary/10` (dezente Trennlinie).

---

## 4. Motion (Framer Motion)

Leise, langsam, absichtsvoll — kein Bounce, kein Spring, keine Streueffekte.
- Bestehender Wrapper: `src/components/ui/FadeIn.tsx` — immer wiederverwenden, nie duplizieren.
- Einblendungen: `duration: 0.8`, `ease: "easeOut"`, Y-Versatz `20px`.
- Gestaffelte Hero-Einblendung via `delay`-Prop (0 / 0.1 / 0.2 / 0.3).
- Scroll-Reveals: `viewport={{ once: true, margin: "-100px" }}` — einmalig, nie bei Re-Enter.
- `prefers-reduced-motion`: in `globals.css` global abgefangen (Transitions auf 0.01ms).

---

## 5. Signature-Element

**„Der Atem-Rhythmus":** Pacing über großzügige, konsistente Abstände plus eine einzige
langsame Hero-Einblendung. Wiederkehrendes visuelles Signal: beidseitige `bg-umber`-Hairlines
flankieren die Eyebrow-Dachzeile. Das ist die *eine* Stelle, an der Charakter sichtbar wird —
sonst Stille.

---

## 6. Angebot (zwei Stufen)

- **„Erdung"** — Gruppen-Breathwork-Reihe, hybrid (online + Präsenz), Einstieg (~190–390 € p. P.)
- **„Neuausrichtung"** — 1:1-Prozessbegleitung ~10–12 Wochen, hybrid, Premium (~2.900–4.500 €,
  Einmalzahlung oder 2–3 Raten)

---

## 7. Copy-Regeln (wichtig — auch rechtlich)

- KEINE Heilversprechen, KEINE klinischen Diagnosen als Zielgruppen-Label.
- Framing: stressbedingte innere Unruhe, Nervensystem-Regulation, Persönlichkeitsentwicklung.
- Disclaimer nahe Angebot und im Footer:
  „Diese Arbeit dient der Persönlichkeitsentwicklung und Stressregulation und ersetzt keine
  psychotherapeutische oder ärztliche Behandlung."
- Sentence case in der UI. Aktive Verben. Keine Floskeln.
- Buttons sagen, was passiert: „Erstgespräch vereinbaren", „Zum Kurz-Assessment".

---

## 8. Quality-Floor (immer)

- Responsive bis Mobil; sichtbarer Tastatur-Fokus (`focus-visible`).
- `prefers-reduced-motion` ist in `globals.css` global abgefangen.
- Kein neues Animations-System einführen — nur `FadeIn.tsx` verwenden.
- Tokens nicht neu erfinden — ausschließlich aus `globals.css` verwenden.

---

## 9. Technische Notiz

- Tailwind v4: Tokens in `globals.css` via `@theme`, keine `tailwind.config.ts` (gelöscht).
- Schriften via `next/font/google`: Spectral (weight 400/500, style normal/italic) +
  Geist Sans — als CSS-Variablen `--font-spectral` und `--font-geist-sans` gemappt,
  beide als Klassen auf `<body>` in `layout.tsx`.
- `h1`, `h2`, `h3` erben `font-family: var(--font-serif)` global aus `globals.css`.
  Im JSX zusätzlich `font-serif` als Tailwind-Klasse setzen, falls nötig.
