# Spec: Re-Skin auf neues Design (Fonts und Tokens)

Für Claude Code. Eine Sitzung, klar begrenzt. Die Informationsarchitektur bleibt
unberührt. Es ist ein Token- und Font-Swap, kein Umbau.

## Ziel
- Display-Schrift Spectral wird Cormorant (400/500/600 + italic).
- Body/UI-Schrift Geist wird Hanken Grotesk (400/500).
- @theme-Block in globals.css durch die neue Token-Fassung ersetzen.
- design-system.md und CLAUDE.md so anpassen, dass die Quelle der Wahrheit
  konsistent bleibt.
- Keine Farbe ändert sich, daher kein Kontrast-Risiko und kein Re-Check nötig.

## Wichtige Designentscheidung (vorab lesen)
Der Font-Export aus Claude Design nannte die Token `--font-display` und
`--font-body`. In dieser Spec heißen sie bewusst `--font-serif` und
`--font-sans`, weil die Komponenten laut CLAUDE.md diese Utility-Klassen nutzen
(`font-serif` für Display, `font-sans` für Body). So bleibt der Re-Skin auf
globals.css und layout.tsx beschränkt und kein Komponenten-Code muss angefasst
werden. Vor der Umsetzung einmal verifizieren (siehe Prüfschritt 1).

## Zieldateien
- src/app/globals.css (der @theme-Block)
- src/app/layout.tsx (Font-Verdrahtung über next/font/google)
- design-system.md (Repo-Wurzel)
- CLAUDE.md (Repo-Wurzel)

---

## Änderung A: globals.css, @theme-Block ersetzen

Den bestehenden @theme-Block durch diesen ersetzen. Die Font-Familien kommen aus
next/font (layout.tsx) als `*-src`-Variablen und werden hier mit Fallback-Stack
zu `--font-serif` / `--font-sans` komponiert.

```css
@theme {
  /* ── Farben (unverändert) ─────────────────── */
  --color-paper: #FCFAF0;
  --color-surface: #FFFFFF;
  --color-ink: #19191A;
  --color-navy: #09173B;
  --color-muted: #6B6E72;
  --color-umber: #7C6A57;
  --color-hairline: color-mix(in srgb, var(--color-muted) 30%, transparent);
  --opacity-hairline: 0.3;

  /* ── Schriften ────────────────────────────── */
  /* Familien aus next/font (layout.tsx) als *-src-Variablen, hier komponiert */
  --font-serif: var(--font-serif-src), Georgia, "Times New Roman", serif;            /* Display: Cormorant */
  --font-sans: var(--font-sans-src), system-ui, -apple-system, "Segoe UI", sans-serif; /* Body/UI: Hanken Grotesk */

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;   /* nur Cormorant */
  --font-weight-display: 500;    /* Headlines */
  --font-weight-hero: 400;       /* sehr großes Hero-Display */

  /* ── Type Scale ───────────────────────────── */
  --text-display: clamp(2.5rem, 5vw, 4rem);
  --text-h1: clamp(2rem, 3.5vw, 2.75rem);
  --text-h2: 1.5rem;
  --text-body: 1.125rem;         /* 18px */
  --text-small: 0.9375rem;       /* 15px */
  --text-eyebrow: 0.625rem;      /* 10px */

  --leading-display: 1.1;
  --leading-h1: 1.15;
  --leading-h2: 1.25;
  --leading-body: 1.6;
  --leading-small: 1.55;

  --tracking-eyebrow: 0.14em;

  /* ── Spacing (Basis 4px) ──────────────────── */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-24: 96px;
  --spacing-32: 128px;
  --spacing-40: 160px;
  --spacing-eyebrow-headline: 12px;
  --spacing-headline-body: 24px;

  /* ── Radien ───────────────────────────────── */
  --radius-sm: 4px;              /* Inputs */
  --radius-md: 8px;              /* Karten / Buttons */

  /* ── Layout ───────────────────────────────── */
  --container-max: 1140px;
  --measure: 68ch;

  /* ── Motion ───────────────────────────────── */
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow: 900ms;
  --duration-med: 600ms;
}
```

Hinweis: Vor dem Ersetzen den aktuellen @theme-Block kurz diffen und prüfen, dass
kein Token wegfällt, das eine Komponente aktuell referenziert. Farben, Radien und
Spacing-Namen bleiben gleich, das Risiko liegt allein bei den Font-Token (siehe
Prüfschritt 1).

---

## Änderung B: layout.tsx, Fonts über next/font/google

Die alten Imports (Spectral, Geist) entfernen und durch Cormorant und
Hanken Grotesk ersetzen. Achtung: in next/font/google heißt die Familie
`Cormorant`, nicht `Cormorant_Garamond`. Das sind zwei verschiedene Schriften.

```tsx
import { Cormorant, Hanken_Grotesk } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-src",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans-src",
  display: "swap",
});
```

Die bestehende className-Verdrahtung auf `<html>` beibehalten, nur die beiden
Variablen einsetzen:

```tsx
<html lang="de" className={`${cormorant.variable} ${hankenGrotesk.variable}`}>
```

Wenn das Repo die Variablen bisher anders auf `<html>` oder `<body>` gehängt hat,
dieses Muster beibehalten und nur die Namen `--font-serif-src` und
`--font-sans-src` setzen. Keine zweite Mapping-Schicht einführen.

---

## Änderung C: design-system.md aktualisieren

Punktuelle Ersetzungen, ohne em-Dashes:

1. Intro, Zeile "Was vermieden wird":
   - Alt: `(Creme + hochkontrastige Serife + lautes Terrakotta)`
   - Neu: `(Creme + lautes Terrakotta + überladene Defaults)`
   - Grund: Die hochkontrastige Serife ist mit Cormorant jetzt die bewusst
     gewählte Display-Schrift. Die alte Zeile würde dem Rest des Dokuments
     widersprechen.

2. Abschnitt 2, Pairing-Zeile:
   - Alt: `Pairing (final): Display = Spectral · Body/UI = Geist Sans`
   - Neu: `Pairing (final): Display = Cormorant · Body/UI = Hanken Grotesk`

3. Abschnitt 2, Display-Beschreibung:
   - Alt: `Spectral (via next/font/google) für Überschriften, ruhig, kontrastarm, literarisch. Echte Kursive vorhanden ...`
   - Neu: `Cormorant (via next/font/google) für Überschriften. Hochkontrastige, literarische Serife, bewusst gewählt und diszipliniert eingesetzt: große Display-Größen, schlanke Gewichte, viel Ruhe drumherum. Echte Kursive vorhanden, für Betonungen und das Testimonial-Zitat nutzen.`

4. Abschnitt 2, Body-Zeile:
   - Alt: `Geist Sans für Fließtext, UI und Buttons (bereits verdrahtet).`
   - Neu: `Hanken Grotesk für Fließtext, UI und Buttons.`

5. Abschnitt 2, Gewichte-Zeile:
   - Alt: `Gewichte schlank halten: Spectral 400/500 (+ italic), Geist 400/500.`
   - Neu: `Gewichte schlank halten: Cormorant 400/500/600 (+ italic), Hanken Grotesk 400/500.`

6. Abschnitt 2, Type-Skala-Tabelle:
   - Font-Spalte: in den Zeilen Display, H1/Section und H2 jeweils `Spectral`
     durch `Cormorant` ersetzen. In den Zeilen Body und Small `Geist` durch
     `Hanken Grotesk` ersetzen.
   - Eyebrow-Zeile: Größe `0.8125rem` auf `0.625rem` ändern, letter-spacing
     `0.12em` auf `0.14em` ändern.

7. Abschnitt 4, Motion:
   - Alt: `Einblendungen: 600–1200ms, Easing cubic-bezier(0.16, 1, 0.3, 1).`
   - Neu: `Einblendungen: 600ms und 900ms (Tokens --duration-med und --duration-slow), Easing cubic-bezier(0.16, 1, 0.3, 1).`

8. Abschnitt 7, Schriften-Notiz:
   - Alt: `Schriften über next/font/google (Spectral + Geist) laden und als CSS-Variablen mappen.`
   - Neu: `Schriften über next/font/google (Cormorant + Hanken Grotesk) laden, als --font-serif-src und --font-sans-src mappen, in @theme zu --font-serif und --font-sans komponieren.`

---

## Änderung D: CLAUDE.md aktualisieren

1. Abschnitt Stack, Schriften-Zeile:
   - Alt: `Schriften: Spectral (font-serif, Display), Geist Sans (font-sans, Body).`
   - Neu: `Schriften: Cormorant (font-serif, Display), Hanken Grotesk (font-sans, Body).`

2. Abschnitt Design, Schrift-Satz:
   - Alt: `Display Spectral, Body Geist.`
   - Neu: `Display Cormorant, Body Hanken Grotesk.`

---

## Prüfschritte vor dem Commit

1. Font-Utilities verifizieren: im Repo nach `font-serif`, `font-sans`,
   `font-display`, `font-body` greppen. Erwartung: Komponenten nutzen
   `font-serif` und `font-sans`. Falls doch `font-display`/`font-body` auftaucht,
   die Token-Namen in globals.css daran angleichen, statt Komponenten zu ändern.

2. Keinen Token verlieren: alten und neuen @theme-Block diffen, sicherstellen,
   dass kein aktuell referenzierter Token entfällt.

3. Dev-Build starten und am echten Rendering prüfen:
   - Cormorant bei H2 (24px) und kleineren Headlines. Wenn die Haarstriche zu
     dünn wirken, diese Headlines auf Gewicht 600 (`--font-weight-semibold`)
     heben. Das ist genau der Grund, warum 600 mitgeladen wird.
   - Eyebrow bei 10px: noch ruhig und lesbar. Hanken Grotesk hat eine etwas
     größere x-Höhe als Geist und wirkt einen Tick kräftiger, daher kurz auf den
     vertikalen Rhythmus schauen.

4. Italic nur bei Cormorant geladen, Hanken Grotesk ohne Italic.

5. prefers-reduced-motion weiterhin respektiert: die neuen Dauern sind nur Werte,
   das Gating bleibt unverändert, einmal gegenprüfen.

6. Kein Kontrast-Re-Check nötig, da keine Farbe geändert wurde.

## Commit
Klein und in sich geschlossen. Vorschlag:
`Re-Skin: Display Cormorant, Body Hanken Grotesk, Tokens aktualisiert`
