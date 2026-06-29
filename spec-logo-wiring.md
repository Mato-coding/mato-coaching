# Spec: Neues Logo einbinden (Header, Footer, Favicon)

Für Claude Code. Eine Sitzung. Reiner Asset-Swap plus zwei Doku-Edits. Die
sichtbare Marken-Umstellung (Lasse vorn) wird hier NICHT angefasst, vorhandener
Wortmarken-Text bleibt unverändert.

## Ausgangslage
Neues Logo ist ein abstraktes Bildzeichen ohne Wortmarke. Zwei SVG-Varianten
liegen bereit (vom Menschen ins Repo gelegt oder unten als Inhalt übernommen):
- Header/Footer-Marke: `currentColor`, viewBox 0 0 160 160.
- Favicon: feste Farbe Navy `#09173B`, viewBox 0 0 48 48.

Wichtig: Das Favicon nutzt bewusst eine feste Farbe, weil `src/app/icon.svg` von
Next.js als externe Datei verlinkt wird und `currentColor` dort auf Schwarz
zurückfällt. Nicht auf currentColor ändern.

## Zieldateien
- src/app/icon.svg (ersetzen)
- src/components/ui/LogoMark.tsx (neu)
- src/components/ui/Header.tsx (oder der echte Header-Pfad)
- src/components/ui/Footer.tsx (oder der echte Footer-Pfad)
- CLAUDE.md (Repo-Wurzel)

---

## Änderung A: Favicon ersetzen

`src/app/icon.svg` durch diesen Inhalt ersetzen:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#09173B" stroke-width="4" stroke-linecap="butt">
  <path d="M24 6V42"/>
  <path d="M24 14a10 10 0 1 0 0 20a10 10 0 1 0 0-20"/>
</svg>
```

---

## Änderung B: LogoMark-Komponente anlegen

Neue Datei `src/components/ui/LogoMark.tsx`. Inline-SVG, damit `currentColor`
greift. Größe und Farbe steuert der Aufrufer über className.

```tsx
type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={4.5}
      strokeLinecap="butt"
      className={className}
      aria-hidden="true"
    >
      <path d="M80 16V94" />
      <path d="M80 102V144" />
      <path d="M84.9 35A31.8 31.8 0 1 1 75.1 35" />
    </svg>
  );
}
```

---

## Änderung C: Header verdrahten

Zuerst den aktuellen Header zeigen (relevanten JSX-Ausschnitt ausgeben), damit
die Platzierung stimmt. Dann:

- Das bisherige Logo-Grafikelement durch `<LogoMark />` ersetzen. Falls aktuell
  keine Grafik existiert, die Marke vor den vorhandenen Wortmarken-Text setzen.
- Vorhandenen Wortmarken-Text exakt so lassen, wie er ist. Nicht von
  "Mato Coaching" auf "Lasse Klüver" ändern, das ist die separate Marken-Umstellung.
- Größe und Farbe per className: z. B. `className="h-8 w-8 text-navy"`.
- Der Logo-Link bekommt ein `aria-label` (z. B. "Zur Startseite"), das SVG bleibt
  `aria-hidden`, damit kein doppelter Vorlesetext entsteht.

## Änderung D: Footer verdrahten

- Dieselbe `<LogoMark />` einsetzen.
- Farbe über die geerbte Textfarbe des Footers via `currentColor`. Wenn der
  Footer eine eigene Textfarbe setzt, übernimmt die Marke sie automatisch. Nur
  falls nötig eine Klasse setzen (z. B. `text-paper` auf dunkler Fläche).
- Größe per className passend zum Footer.

---

## Änderung E: CLAUDE.md, zwei Edits

1. Abschnitt "Marke (in Umstellung)":
   - Alt: `Der Bär ist die verbindende Symbolik (Logo).`
   - Neu: `Der Bär ist die verbindende Symbolik (Bärenenergie als Markenkonzept, nicht als Bildzeichen).`

2. Abschnitt "Offene Aufgaben", Punkt 5:
   - Alt: `Neues Logo (Bär-Symbolik), danach BIMI fürs Absender-Avatar.`
   - Neu: `Neues Logo (abstraktes Bildzeichen, keine Wortmarke), danach BIMI fürs Absender-Avatar.`

---

## Prüfschritte vor dem Commit
1. Dev-Server starten. Header und Footer zeigen die neue Marke, Farbe stimmt pro
   Fläche, Größe passt zum Layout.
2. Favicon prüfen: im Browser-Tab erscheint das Navy-Symbol, nicht Schwarz.
3. Keine doppelten SVG-id-Kollisionen in der Konsole (die Marken haben keine ids,
   sollte sauber sein).
4. Tastatur-Fokus auf dem Logo-Link sichtbar, aria-label wird vorgelesen, SVG ist
   aria-hidden.
5. Wortmarken-Text im Header unverändert.

## Bekannter Folgepunkt (nicht in dieser Sitzung)
Auf sehr dunklen Browser-Tabs kann das Navy-Favicon schwer lesbar sein. Robuste
Lösung ist eine Favicon-Variante mit gefüllter Backplate (Navy-Fläche, Symbol in
Papierfarbe). Separat behandeln, zusammen mit OG-Bild und BIMI.

## Commit
Klein und in sich geschlossen. Vorschlag:
`Logo: neues Bildzeichen in Header, Footer und Favicon, CLAUDE.md nachgezogen`
