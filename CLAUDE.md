# CLAUDE.md — mato-coaching

Briefing für Claude Code. Lies zu Beginn jeder Sitzung **diese Datei** und **`design-system.md`**.

## Projekt
Persönliche Brand- und Akquise-Website für Lasse Klüver (mato-coaching.de).
Angebot: Somatic Breathwork & IFS-orientierte (Internal Family Systems) Prozessbegleitung.
Sprache: **Deutsch**. Ziel: Premium-Wirkung, Vertrauen, Conversion zum kostenfreien Erstgespräch.

## Stack
- Next.js (App Router, `src/app`), TypeScript
- Tailwind CSS **v4** — Tokens in `globals.css` via `@theme` sind die **Quelle der Wahrheit**
- Framer Motion — zurückhaltend (siehe `design-system.md` → Motion)
- Cal.com unter `/termin`
- Deploy: Vercel via GitHub `main`

## Routen
- `/` Startseite (Value Proposition → Erstgespräch)
- `/assessment` Vorqualifizierung (~3 Min.)
- `/termin` Cal.com-Buchung
- `/impressum`, `/datenschutz`

## Angebot (zwei Stufen)
- **„Erdung"** — Gruppen-Breathwork-Reihe, hybrid, Einstieg (~190–390 € p. P.)
- **„Neuausrichtung"** — 1:1-Begleitung ~10–12 Wo, hybrid, Premium (~2.900–4.500 €, Einmal/Raten)

## Copy-Regeln (wichtig, rechtlich)
- KEINE Heilversprechen, KEINE Diagnosen wie „Angststörung" / „Panikstörung".
- Framing: stressbedingte innere Unruhe, Nervensystem-Regulation, Persönlichkeitsentwicklung.
- Disclaimer nahe Angebot/Footer: „dient der Stressregulation und Persönlichkeitsentwicklung und
  ersetzt keine psychotherapeutische oder ärztliche Behandlung."
- Sentence case, aktive Verben, keine Floskeln. Buttons sagen, was passiert.

## Arbeitsweise (Limits schonen)
- Kleine, klar umrissene Aufgaben — **eine Sektion pro Sitzung**.
- Routine-Umsetzung mit Sonnet, schwierige Architektur/Design mit Opus.
- Häufig committen; vor größeren Änderungen einen Branch anlegen.
- Tokens, Schriften und Spacing **nicht neu erfinden** — aus `globals.css` + `design-system.md` verwenden.
