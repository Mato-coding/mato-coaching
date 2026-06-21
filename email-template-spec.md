# Bau-Auftrag: Audio-E-Mail anpassen

Für Claude Code. Betrifft nur `src/app/api/lead/route.ts` (Absender und HTML-Vorlage der Audio-Mail). Inline-CSS verwenden, weil E-Mail-Clients keine externen Styles laden. Alle Bilder als absolute URL auf `https://www.lassekluever.de/...`, niemals relativ.

## 1. Absender
FROM-Anzeigename auf `Lasse Klüver · Mato Coaching` ändern, Adresse bleibt `hello@lassekluever.de`. Reply-To bleibt `hello@lassekluever.de`. Das gilt auch für die Benachrichtigungsmail, die denselben Absender nutzt.

## 2. Text der Audio-Mail (Platzhalter für den Vornamen beibehalten, mit Fallback "Hallo," falls kein Name)

Anrede:
"Hallo {Vorname},"

Absatz 1:
"schön, dass du da bist. Hier ist dein geführtes Breathwork-Audio."

Absatz 2:
"Nimm dir ein paar ruhige Minuten und finde einen Ort, an dem du für ein paar Minuten ungestört bist. Setze dich bequem hin oder lege dich auf den Rücken und lass dich durch diese sanfte Atmung führen. Ich empfehle dir, Kopfhörer zu nutzen, um wirklich ganz einzutauchen, aber natürlich funktioniert es auch gut ohne."

Button (unverändert): "Audio anhören"

Absatz nach dem Button:
"Schon diese kurze Übung kann dir helfen, dein Nervensystem etwas zur Ruhe zu bringen. Du würdest mir eine Freude machen, wenn du mir später schreibst und teilst, wie es dir mit der Übung ging."

Grußformel:
"Lieben Gruß,
Lasse"

## 3. Signatur (neu, unter der Grußformel)
Eine kleine, ruhige Signatur: links ein rundes Foto (etwa 48 bis 56 px, border-radius 50 Prozent), rechts daneben in einer Spalte:
- "Lasse Klüver" (etwas kräftiger)
- darunter dezent und gedämpft: "Mato Coaching · Somatic Breathwork & Coaching"
- darunter als Link: "www.lassekluever.de"

Bildquelle als absolute URL, vorerst `https://www.lassekluever.de/portrait-lasse-sw.jpg` (das bestehende Porträt). Der Inhaber tauscht das Bild ggf. später gegen ein eigenes Signatur-Foto in `public/` aus. Styling zurückhaltend, passend zu den Design-Tokens.

## 4. Fußzeile (zwei Zeilen statt einer)
Zeile 1: "Mato Coaching von Lasse Klüver · Hamburg"
Zeile 2: "Diese Begleitung ersetzt keine psychotherapeutische oder ärztliche Behandlung."
Beide Zeilen klein und gedämpft wie bisher, nur eben mit Zeilenumbruch dazwischen.

## Hinweis
Keine Heilversprechen. Der entschärfte Satz in Abschnitt 2 ("kann dir helfen") ist bewusst so gewählt, bitte so übernehmen.
