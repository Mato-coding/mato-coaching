# Bau-Auftrag: Feinschliff Assessment-Ergebnisseite

Für Claude Code. Lies vorab CLAUDE.md und design-system.md. Tokens, Schriften und Spacing aus dem Design-System verwenden. Keine Gedankenstriche, keine Heilversprechen, ruhiger Ton.

Betroffen: `src/components/forms/ResultActions.tsx` und die Erfolgsansicht in `src/components/forms/LeadMagnetForm.tsx`.

## 1. Buttons der drei Karten (ResultActions)
- Die drei Karten gleich hoch machen: das Grid bleibt dreispaltig mit `items-stretch`, jede Karte ist `flex flex-col h-full`.
- Den Button-Bereich jeder Karte unten bündig setzen, sodass alle drei Buttons auf einer Linie stehen: Button (bzw. dessen Wrapper) mit `mt-auto`.
- Alle drei Buttons auf volle Kartenbreite (`w-full`), Beschriftung zentriert. Dadurch einheitliche Breite und saubere Linie.
- Stile aus dem Design-System beibehalten: Karte 1 (Erstgespräch) gefüllt in `accent`, Karten 2 und 3 als Outline-Buttons. Alle `rounded-md`, keine Schatten.

## 2. "Assessment neu starten" nach oben
- Den Link aus dem unteren Bereich entfernen (samt großer Umber-Trennlinie).
- Stattdessen direkt UNTER den Ergebnistext (Headline und Body), also OBERHALB der drei Karten, platzieren.
- Bewusst leise halten: kleiner, gedämpfter Link (`text-sm text-muted`, Hover nach `accent`). Er darf nicht mit den Handlungsaufrufen in den Karten konkurrieren. Keine große Trennlinie mehr.

## 3. Erfolgsansicht als sanfter Wegweiser (LeadMagnetForm)
Die Erfolgsansicht (status === "success") erweitern. Bestätigung bleibt, danach ruhige nächste Schritte. KEINE automatische Weiterleitung.

Aufbau und exakter Text:

Überschrift (font-display, wie bisher):
"Schau in dein Postfach"

Absatz:
"Dein Audio ist unterwegs zu dir. Falls es nicht gleich da ist, wirf auch einen Blick in den Spam-Ordner."

Danach ein dezent abgesetzter Block (z. B. feine Umber-Hairline darüber):

Kleine Eyebrow-Zeile (uppercase, text-umber): "Wie es für dich weitergehen kann"

Zwei ruhige Optionen, je eine Zeile Beschreibung plus Link:
- "Im Journal findest du Hintergründe zu Nervensystem, Somatic Breathwork und innerer Ruhe." Link: "Zum Journal" -> `/journal`
- "Wenn du spürst, dass du dir Begleitung wünschst, lass uns unverbindlich sprechen." Link: "Erstgespräch vereinbaren" -> `/termin`

Social-Media-Slot vorbereiten, aber NICHT aktiv schalten: einen klar als TODO markierten, auskommentierten Platzhalter für eine spätere Instagram-Zeile setzen (z. B. "Mehr Impulse findest du auf Instagram"). Erst aktivieren, wenn der Kanal existiert. Keinen Link auf einen nicht vorhandenen Kanal setzen.

Styling: ruhig, zurückhaltend (Quiet Luxury). Links dezent, Akzentfarbe für die Linktexte, keine lauten Buttons in diesem Block.

Hinweis: Die Erfolgsansicht erscheint sowohl auf der Startseite als auch auf der Assessment-Ergebnisseite. Der Block oben funktioniert in beiden Fällen. Das bestehende Scroll-zu-Section-Verhalten bei Erfolg unverändert lassen.
