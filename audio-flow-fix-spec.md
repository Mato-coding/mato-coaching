# Bau-Auftrag: Erfolgs-Flow des Audio-Formulars logisch machen

Für Claude Code. Lies vorab CLAUDE.md.

## Problem
Nach erfolgreichem Absenden des Audio-Formulars bleibt der einladende Hinweis stehen, sich einzutragen, um das Audio zu erhalten. Das ergibt an dieser Stelle keinen Sinn mehr und verwirrt.

## Ziel
Der einladende "Trag dich ein"-Hinweis ist nur sichtbar, solange das Formular noch nicht abgeschickt wurde. Nach erfolgreichem Absenden verschwindet er, und es bleibt ausschließlich die Erfolgsmeldung mit den nächsten Schritten. Der einladende Zustand vor dem Absenden bleibt unverändert.

## Umsetzung

### 1. `src/components/forms/LeadMagnetForm.tsx`
Einen optionalen Prop `onSuccess?: () => void` ergänzen, der genau einmal aufgerufen wird, sobald der Status auf "success" wechselt (z. B. im bestehenden Erfolgs-Effekt). Das bestehende Verhalten (autoFocus, Scroll zur Sektion bei Erfolg) bleibt unverändert.

### 2. Startseiten-Sektion `src/components/sections/LeadMagnet.tsx`
Den Erfolgszustand über `onSuccess` verfolgen. Solange noch nicht abgeschickt: alles wie bisher. Nach erfolgreichem Absenden den einladenden Satz ausblenden:
"Trag dich ein, und du bekommst es direkt per E-Mail."
Überschrift und die beschreibenden Sätze davor dürfen stehen bleiben, sie widersprechen dem Erfolgszustand nicht. Falls die Sektion bisher eine Server-Komponente ist, einen schlanken Client-Wrapper für diesen Zustand einführen.

### 3. `src/components/forms/ResultActions.tsx`
Analog den kleinen Lead-in über dem Audio-Formular nach erfolgreichem Absenden ausblenden:
"Trag dich ein, dann kommt dein Audio direkt per E-Mail."

## Hinweise
- Keine Gedankenstriche, keine Heilversprechen, ruhiger Ton.
- Das Scroll-zu-Section-Verhalten bei Erfolg unverändert lassen.
- Es geht nur um das Ein- und Ausblenden dieser einladenden Hinweise je nach Zustand, nicht um eine inhaltliche Umformulierung der Erfolgsmeldung selbst.
