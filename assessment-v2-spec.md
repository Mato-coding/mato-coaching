# Bau-Auftrag: Assessment v2 (komplette Neukonzeption)

Status: umgesetzt am 11.08.2026, Referenz.

Für Claude Code. Lies vorab CLAUDE.md und design-system.md.

## Verbindliche Regeln für diesen Auftrag

1. **Alle Texte in dieser Spec sind final. Wortlaut exakt übernehmen.** Keine Umformulierungen, keine Kürzungen, keine eigenen Formulierungen ergänzen. Jede Frage, jede Antwort, jeder Ergebnisbaustein steht hier im Wortlaut.
2. **Keine inhaltlichen, strategischen oder Scoring-Entscheidungen treffen.** Bei Unklarheiten oder Konflikten: stoppen und nachfragen, nicht raten.
3. Design-System vollständig anwenden: Tokens aus globals.css, Cormorant für Display, Hanken Grotesk für Body, Umber sparsam, keine Schatten, keine Gedankenstriche im UI-Text.
4. Branch: `feature/assessment-v2` von main abzweigen. Am Ende committen und pushen, NICHT selbst auf main mergen. Der Merge passiert nach manuellem Test.

## Überblick

Das bestehende Assessment (5 Fragen, 3 Cluster, statische Ergebnistexte) wird ersetzt durch: 7 Fragen, 4 Cluster (neu: mixed), eine Mehrfachauswahl-Frage, zweidimensionale Auswertung (Readiness plus Care) und einen modular aus den tatsächlichen Antworten komponierten Ergebnistext.

Betroffene Dateien:

- `src/lib/assessment-config.ts`: vollständig neu (Struktur unten).
- `src/components/forms/AssessmentForm.tsx`: Mehrfachauswahl, mixed-Cluster, Entfernen von Überspringen, neues Ergebnis-Rendering.
- Neu: `src/components/forms/AssessmentResult.tsx` (o.ä.): rendert den komponierten Ergebnistext oberhalb der bestehenden ResultActions.
- `src/components/forms/ResultActions.tsx`: unverändert bis auf die Typ-Erweiterung des cluster-Werts um "mixed".
- `src/app/api/assessment/route.ts`: prüfen, dass cluster "mixed" akzeptiert wird (DB-Spalte ist text, jsonb answers unverändert). Keine Schemaänderung.

## 1. Datenstruktur (assessment-config.ts)

```ts
export type Cluster = "exhaustion" | "tension" | "panic" | "mixed";
export type ResultRoute = "ready" | "almost" | "not_yet";

export interface Answer {
  id: string;              // stabil, z.B. "q1.a1"
  label: string;
  tags: string[];
  cluster?: Cluster;       // nur bei q1
  exclusive?: boolean;     // nur bei Mehrfachauswahl-Fragen
}

export interface Question {
  id: string;
  question: string;
  mode: "single" | "multi";
  hint?: string;           // z.B. "Mehrfachauswahl möglich"
  onlyForCluster?: Cluster;
  answers: Answer[];
}
```

Scoring-Tags: `readiness_signal` zählt 1 Punkt, `readiness_soft` zählt 0,5 Punkte.
Care-Tags: `care_signal` (hart), `care_signal_soft` (weich).
Alle übrigen Tags dienen der Ergebnistext-Komposition.

## 2. Fragen und Antworten (final)

### F1 (id: q1, single)

Frage: "Was beschreibt am ehesten, womit du gerade kämpfst?"

1. "Ich bin erschöpft. Zutiefst erschöpft. Selbst nach Schlaf oder Urlaub kommt die Energie nicht zurück." → cluster: exhaustion, tags: []
2. "Ich stehe permanent unter Strom und kann nicht abschalten. Kopf und Körper finden keine Ruhe, selbst wenn eigentlich alles okay ist." → cluster: tension, tags: []
3. "Mich überrollen Momente von Panik oder Überwältigung, plötzlich und ohne dass ich sie kommen sehe." → cluster: panic, tags: []
4. "Es ist schwer zu greifen. Eine Mischung, oder etwas, das hier nicht steht." → cluster: mixed, tags: []

### F2 (id: q2, single)

Frage: "Seit wann ist das so, und wohin entwickelt es sich?"

1. "Seit ein paar Wochen. Es ist neu und beunruhigt mich." → tags: [duration_short, readiness_signal]
2. "Seit Monaten. Ich habe gewartet, dass es von selbst besser wird. Wird es aber nicht." → tags: [duration_medium, readiness_signal]
3. "Seit Jahren, schleichend mehr. Irgendwann wurde es mein Normalzustand." → tags: [duration_long, chronic_pattern, readiness_signal]
4. "Es kommt in Wellen. Phasenweise geht es, dann holt es mich wieder ein." → tags: [duration_waves, readiness_signal]

### F3 (vier Varianten, je single, onlyForCluster)

#### q3_exhaustion

Frage: "Wie zeigt sich die Erschöpfung in deinem Alltag am deutlichsten?"

1. "Ich funktioniere für alle anderen. Für mich selbst bleibt nichts übrig." → tags: [depleted_for_others, readiness_signal]
2. "Dinge, die mir früher Freude gemacht haben, fühlen sich leer an." → tags: [joy_loss, readiness_signal]
3. "Ich schiebe alles auf, selbst Kleinigkeiten fühlen sich wie Berge an." → tags: [overwhelm_paralysis]
4. "Ich schlafe, aber wache nicht erholt auf. Als würde der Körper nicht mehr auftanken." → tags: [sleep_no_recovery]

#### q3_tension

Frage: "Wann spürst du die Anspannung am stärksten?"

1. "Nachts. Der Körper ist müde, aber der Kopf dreht weiter." → tags: [night_racing, readiness_signal]
2. "In ruhigen Momenten. Sobald nichts zu tun ist, wird es innerlich laut." → tags: [rest_intolerance, readiness_signal]
3. "Unter Menschen oder unter Druck. Ich bin ständig auf Habachtstellung." → tags: [social_alarm]
4. "Eigentlich immer. Ich weiß gar nicht mehr, wie sich echte Ruhe anfühlt." → tags: [chronic_alarm, readiness_signal, care_signal_soft]

#### q3_panic

Frage: "Wie gehst du mit diesen Momenten um, wenn sie kommen?"

1. "Ich kämpfe dagegen an oder versuche, Situationen zu vermeiden, in denen es passieren könnte." → tags: [avoidance, readiness_signal]
2. "Ich funktioniere nach außen weiter. Kaum jemand ahnt, was in mir los ist." → tags: [hidden_struggle, readiness_signal]
3. "Ich fühle mich ihnen ausgeliefert und habe Angst vor dem nächsten Mal." → tags: [overwhelmed, care_signal]
4. "Ich versuche zu verstehen, was da passiert, aber Verstehen allein stoppt es nicht." → tags: [insight_no_relief, readiness_signal]

#### q3_mixed

Frage: "Was davon kommt deinem Erleben am nächsten?"

1. "Ich bin dünnhäutiger geworden. Dinge treffen mich stärker als früher." → tags: [thin_skinned, readiness_signal]
2. "Ich fühle mich seltsam abgeschnitten. Von mir selbst, von anderen, vom Leben." → tags: [disconnection, readiness_signal, care_signal_soft]
3. "Mein Körper sendet Signale, die ich nicht einordnen kann. Verspannungen, Unruhe, Enge." → tags: [body_signals, readiness_signal]
4. "Es wechselt. Mal erschöpft, mal aufgedreht, selten einfach ruhig." → tags: [state_swings, readiness_signal]

### F4 (id: q4, multi, hint: "Mehrfachauswahl möglich")

Frage: "Wo zeigt sich das alles in deinem Körper? Nimm dir einen Moment und spür kurz hin."

1. "Enge in Brust oder Hals, flacher Atem." → tags: [body_chest_breath]
2. "Verspannte Schultern, Nacken oder Kiefer. Wie dauerhaft in Habachtstellung." → tags: [body_tension_guard]
3. "Unruhe oder Druck im Bauch, im Magen, in der Mitte." → tags: [body_gut]
4. "Eher Taubheit. Ich spüre meinen Körper kaum noch richtig." → tags: [body_numbness, care_signal_soft]
5. "Schwer zu sagen. Ich habe darauf ehrlich gesagt nie geachtet." → tags: [body_unaware], exclusive: true

Verhalten exclusive: Wird Antwort 5 gewählt, werden alle anderen abgewählt. Wird bei gewählter Antwort 5 eine andere Antwort gewählt, wird Antwort 5 abgewählt. Weiter erst ab mindestens einer Auswahl.

### F5 (id: q5, single)

Frage: "Was kostet dich dieser Zustand gerade am meisten?"

1. "Nähe. Für die Menschen, die mir wichtig sind, bleibt nicht die Energie, die sie verdienen." → tags: [cost_relationships, readiness_signal]
2. "Lebendigkeit. Ich funktioniere, aber Freude und Leichtigkeit sind selten geworden." → tags: [cost_aliveness, readiness_signal]
3. "Den Kontakt zu mir. Ich bin ständig hart mit mir und nichts fühlt sich gut genug an." → tags: [cost_self_contact, inner_critic, readiness_signal]
4. "Zuversicht. Ein Teil von mir glaubt kaum noch daran, dass es wieder anders wird." → tags: [cost_hope, care_signal]
5. "Schwer auf eins festzulegen. Es zieht sich durch alles." → tags: [cost_pervasive, readiness_signal]

### F6 (id: q6, single)

Frage: "Was hast du bisher versucht, um da rauszukommen?"

1. "Noch nicht viel. Ich fange gerade erst an, ernsthaft nach Wegen zu suchen." → tags: [tried_nothing, readiness_signal]
2. "Ich habe viel gelesen, gehört, verstanden. Aber im Körper ändert das nichts." → tags: [tried_cognitive, insight_no_relief, readiness_signal]
3. "Therapie oder Coaching. Es hat mir geholfen, aber etwas Grundlegendes ist geblieben." → tags: [tried_therapy, readiness_signal]
4. "Sport, Meditation, Routinen. Es hilft im Moment, trägt aber nicht in den Alltag." → tags: [tried_practices, readiness_signal]
5. "Vieles. Und ich bin müde davon, immer wieder von vorn anzufangen." → tags: [tried_many, search_fatigue, readiness_signal]

### F7 (id: q7, single)

Frage: "Wenn du ehrlich bist: Was brauchst du jetzt am ehesten?"

1. "Erst mal verstehen, was da in mir passiert. Ich bin noch im Sortieren." → tags: [need_understanding]
2. "Einen Weg, der über Verstehen hinausgeht. Ich will es im Körper spüren, nicht nur im Kopf wissen." → tags: [need_embodiment, readiness_signal]
3. "Jemanden, der mich ein Stück begleitet. Allein drehe ich mich im Kreis." → tags: [need_guidance, readiness_signal]
4. "Ich bin bereit für einen ernsthaften Prozess. Ich will da wirklich raus." → tags: [need_action, readiness_signal]
5. "Ich weiß es ehrlich gesagt nicht. Vielleicht erst mal das Gefühl, nicht allein damit zu sein." → tags: [need_companionship, readiness_soft]

## 3. Auswertung

### Readiness-Score

Über alle gesammelten Tags: Anzahl `readiness_signal` mal 1 plus Anzahl `readiness_soft` mal 0,5.

- ready: Score >= 4
- almost: Score >= 2,5 und < 4
- not_yet: Score < 2,5

### Care-Logik

careActive = (Anzahl `care_signal` >= 1) oder (Anzahl `care_signal_soft` >= 2).

careActive ändert die Route NICHT. Es steuert nur: Care-Absatz in Block 3 und die Care-Variante des ready-Textes in Block 4.

### Signatur

```ts
export function calculateResult(collectedTags: string[]): {
  route: ResultRoute;
  careActive: boolean;
}
```

## 4. Ergebnistext-Komposition

Der Ergebnistext wird aus Bausteinen komponiert. Verbindliche Regel: Ein Baustein erscheint nur, wenn der zugehörige Tag durch eine tatsächlich gewählte Antwort gesammelt wurde. Reihenfolge der Blöcke ist fix:

1. Headline (nach Cluster)
2. Einstieg (nach Cluster)
3. Spiegelbaustein F3 (nach gewähltem Tag)
4. Körperabsatz F4 (Regeln unten)
5. Spiegelbaustein F5 (nach gewähltem Tag)
6. Nervensystem-Absatz (nach Cluster)
7. Optional: Zusatzsatz insight_no_relief (wenn Tag vorhanden, egal ob aus F3 oder F6, maximal einmal)
8. Optional: Zusatzsatz chronic_pattern (wenn Tag vorhanden)
9. Optional: Care-Absatz (wenn careActive)
10. Optional: Modifikator need_embodiment ODER need_companionship (Regeln unten)
11. Routentext (nach route, mit optionalem search_fatigue-Einschub)

Jeder Block ist ein eigener Absatz. Empfohlene Config-Struktur: ein `resultBlocks`-Objekt mit Records pro Baustein-Gruppe (keyed nach Tag bzw. Cluster bzw. Route), plus eine Funktion `composeResult(collectedTags, cluster, route, careActive)`, die ein geordnetes Array von Absätzen (strings) plus die Headline zurückgibt.

### Block 1 und 2: Headlines und Einstieg

exhaustion:
- Headline: "Diese Erschöpfung ist kein Charakterfehler. Sie ist ein Zustand deines Nervensystems."
- Einstieg: "Danke für deine Offenheit. Aus deinen Antworten ergibt sich ein klares Bild, und ich möchte dir zurückgeben, was ich darin sehe."

tension:
- Headline: "Dein System steht auf Dauer-Alarm. Nicht weil mit dir etwas falsch ist, sondern weil es dich schützen will."
- Einstieg: identisch mit exhaustion.

panic:
- Headline: "Was dich überrollt, ist kein Versagen. Es ist ein Nervensystem, das gerade mehr trägt, als es halten kann."
- Einstieg: identisch mit exhaustion.

mixed:
- Headline: "Nicht alles braucht sofort einen Namen, um ernst genommen zu werden."
- Einstieg: "Danke für deine Offenheit. Auch wenn sich dein Erleben nicht in eine Schublade fügt, zeigen deine Antworten ein deutliches Bild. Ich möchte dir zurückgeben, was ich darin sehe."

### Block 3: Spiegelbausteine F3 (keyed nach Tag)

- depleted_for_others: "Du funktionierst für alle anderen, und für dich bleibt nichts übrig. Das ist kein Mangel an Disziplin. Das ist ein System, das lange gegeben hat, ohne aufzutanken."
- joy_loss: "Dinge, die dir früher Freude gemacht haben, fühlen sich leer an. Das ist eines der leisesten und zugleich deutlichsten Zeichen, dass dein System in den Sparmodus gegangen ist."
- overwhelm_paralysis: "Selbst Kleinigkeiten fühlen sich wie Berge an. Das ist keine Faulheit, auch wenn ein Teil von dir das vielleicht behauptet. Ein erschöpftes Nervensystem stuft alles als zu viel ein, weil die Reserven fehlen."
- sleep_no_recovery: "Du schläfst, aber wachst nicht erholt auf. Erholung ist mehr als Schlaf. Ein System, das nachts auf Wache bleibt, kann nicht auftanken."
- night_racing: "Nachts ist dein Körper müde, aber dein Kopf dreht weiter. Dein System hat verlernt, von Leistung auf Erholung umzuschalten, und die Nacht ist der Moment, in dem das am deutlichsten wird."
- rest_intolerance: "Sobald nichts zu tun ist, wird es innerlich laut. Viele Menschen, die viel tragen, kennen genau das: Ruhe fühlt sich nicht wie Erholung an, sondern wie Bedrohung. Das ist gelernt, und es lässt sich verlernen."
- social_alarm: "Unter Menschen oder unter Druck bist du auf Habachtstellung. Dein System scannt permanent nach Gefahr, auch dort, wo keine ist. Das kostet enorm viel Kraft."
- chronic_alarm: "Du weißt kaum noch, wie sich echte Ruhe anfühlt. Das ist eine ernste und zugleich wichtige Erkenntnis. Denn ein Zustand, der immer da ist, fühlt sich irgendwann wie Persönlichkeit an. Er ist es nicht."
- avoidance: "Du kämpfst dagegen an oder meidest Situationen, in denen es passieren könnte. Das ist eine völlig verständliche Strategie. Auf Dauer macht sie die Welt allerdings kleiner, und genau das hast du vermutlich schon bemerkt."
- hidden_struggle: "Nach außen funktionierst du weiter, kaum jemand ahnt, was in dir los ist. Diese Diskrepanz zwischen außen und innen ist eine eigene, stille Last."
- overwhelmed: "Du fühlst dich diesen Momenten ausgeliefert und trägst die Angst vor dem nächsten Mal mit dir. Diese Angst vor der Angst ist oft anstrengender als die Momente selbst. Ich möchte, dass du weißt: Damit bist du nicht allein, und es gibt Wege, wieder Boden zu gewinnen."
- insight_no_relief (als F3-Spiegel, nur panic): "Du verstehst inzwischen einiges von dem, was da passiert, aber Verstehen allein stoppt es nicht. Diese Erfahrung ist wichtig. Sie zeigt, dass die Antwort nicht im Kopf liegt, sondern eine Ebene tiefer."
- thin_skinned: "Du bist dünnhäutiger geworden, Dinge treffen dich stärker als früher. Dünnhäutigkeit ist kein Defekt. Sie zeigt, dass deine Schutzschicht aufgebraucht ist."
- disconnection: "Du fühlst dich abgeschnitten, von dir selbst, von anderen, vom Leben. Das ist eine der leisesten Formen von Belastung, und eine, die ernst genommen werden will. Dass du sie benennen kannst, ist bereits ein Schritt in Richtung Verbindung."
- body_signals: "Dein Körper sendet Signale, die du nicht einordnen kannst. Verspannung, Unruhe, Enge. Dein Körper spricht bereits mit dir. Was fehlt, ist nicht das Signal, sondern die Übersetzung."
- state_swings: "Mal erschöpft, mal aufgedreht, selten einfach ruhig. Dieses Pendeln ist typisch für ein Nervensystem, das seine Mitte verloren hat und zwischen Gas und Notbremse wechselt."

Hinweis Implementierung: Der F3-Spiegel wird über den F3-Antwort-Tag aufgelöst. Für q3_panic Antwort 4 wird der Baustein insight_no_relief als F3-Spiegel gerendert; der Zusatzsatz in Block 7 entfällt dann NICHT automatisch, siehe Regel in Block 7.

### Block 4: Körperabsatz F4

Standardfall (mindestens eine der Antworten 1 bis 3, keine Taubheit):
- Einleitung: "Und dein Körper spricht mit:"
- Phrasen (in Auswahlreihenfolge der Antworten 1 bis 3, verbunden als Aufzählung mit Komma, letzte mit "und"):
  - body_chest_breath: "die Enge in Brust oder Hals, der flache Atem"
  - body_tension_guard: "die Anspannung in Schultern, Nacken oder Kiefer"
  - body_gut: "die Unruhe in deiner Mitte"
- Abschluss: "Das sind keine Zufälle. Es ist dieselbe Geschichte, erzählt vom Körper."
- Zusammensetzung als ein Absatz: Einleitung, Leerzeichen, Aufzählung, Punkt, Leerzeichen, Abschluss.

Sonderfall nur body_numbness (einzige Auswahl): kompletter Absatz stattdessen:
"Und dann ist da die Taubheit. Du spürst deinen Körper kaum noch richtig. Wenn ein System lange überfordert ist, dreht es irgendwann die Wahrnehmung leiser, um dich zu schützen. Der Weg zurück ins Spüren braucht deshalb vor allem eines: Behutsamkeit."

Sonderfall body_numbness plus andere: Standardfall-Absatz (nur mit den Phrasen der Antworten 1 bis 3), danach im selben Absatz angehängt:
"Und dazwischen immer wieder Taubheit. Auch das gehört dazu: Ein überfordertes System dreht die Wahrnehmung zeitweise leiser, um dich zu schützen."

Sonderfall body_unaware (per exclusive immer einzige Auswahl): kompletter Absatz stattdessen:
"Auf die Frage nach deinem Körper hast du ehrlich geantwortet: Du hast nie darauf geachtet. Das ist kein Defizit. Die meisten von uns haben gelernt, vom Hals aufwärts zu leben. Die Verbindung nach unten lässt sich aufbauen, und sie verändert mehr, als die meisten erwarten."

### Block 5: Spiegelbausteine F5 (keyed nach Tag)

- cost_relationships: "Am meisten kostet dich das gerade Nähe. Für die Menschen, die dir wichtig sind, bleibt nicht die Energie, die sie verdienen. Ich kenne kaum einen Satz, der mehr Gewicht hat. Und kaum einen besseren Grund, etwas zu verändern."
- cost_aliveness: "Am meisten kostet dich das gerade Lebendigkeit. Du funktionierst, aber Freude und Leichtigkeit sind selten geworden. Funktionieren ist eine Fähigkeit. Ein Leben ist es noch nicht."
- cost_self_contact: "Am meisten kostet dich das gerade den Kontakt zu dir selbst. Du bist ständig hart mit dir, nichts fühlt sich gut genug an. Diese innere Stimme, die dich antreibt und gleichzeitig kleinmacht, ist übrigens kein Feind. Sie ist ein überarbeiteter Beschützer. Auch mit ihr lässt sich arbeiten."
- cost_hope: "Und da ist etwas, das ich besonders ernst nehme: Ein Teil von dir glaubt kaum noch daran, dass es wieder anders wird. Ich werde dir hier kein Versprechen machen. Aber ich möchte, dass du weißt: Dass dieser Teil müde ist, heißt nicht, dass er recht hat."
- cost_pervasive: "Du konntest dich nicht auf einen Preis festlegen, es zieht sich durch alles. Genau das macht diffuse Dauerbelastung so zermürbend: Es gibt keinen einzelnen Punkt, den man reparieren könnte. Es braucht einen Weg, der beim System ansetzt, nicht beim Symptom."

### Block 6: Nervensystem-Absatz (keyed nach Cluster)

- exhaustion: "Was du beschreibst, deutet auf ein Nervensystem hin, das zu lange im Leistungsmodus war und dessen Reserven aufgebraucht sind. Die gute Nachricht: Ein Nervensystem ist kein Schicksal. Es ist formbar, und Regulation lässt sich wieder aufbauen, über den Körper, nicht über noch mehr Willenskraft."
- tension: "Was du beschreibst, deutet auf ein Nervensystem hin, das im Alarmmodus feststeckt und den Weg zurück in die Ruhe nicht mehr von allein findet. Die gute Nachricht: Dieser Weg lässt sich wieder bahnen. Nicht durch Nachdenken, sondern über den Körper, dort, wo der Alarm sitzt."
- panic: "Was du beschreibst, deutet auf ein Nervensystem hin, das gelernt hat, sehr schnell in den Notfallmodus zu gehen. Das ist keine Schwäche, sondern ein Schutzprogramm, das über das Ziel hinausschießt. Solche Muster lassen sich über den Körper ansprechen und Schritt für Schritt beruhigen."
- mixed: "Auch wenn dein Erleben vielgestaltig ist, läuft es an einem Ort zusammen: in deinem Nervensystem. Dort entscheidet sich, ob du in Anspannung, Erschöpfung oder Unruhe lebst, und dort setzt Veränderung an. Über den Körper, nicht über noch mehr Analyse."

### Block 7: Zusatzsatz insight_no_relief

Bedingung: Tag insight_no_relief vorhanden (aus q3_panic Antwort 4 oder q6 Antwort 2 oder beiden) UND der Baustein wurde nicht bereits als F3-Spiegel gerendert. Konkret: Wenn q3_panic Antwort 4 gewählt wurde, ist der F3-Spiegel bereits dieser Inhalt, dann diesen Block auslassen. Wenn der Tag nur aus q6 stammt, diesen Block rendern:

"Du hast es selbst beschrieben: Verstehen allein verändert es nicht. Das liegt nicht an dir. Einsicht und Regulation sind zwei verschiedene Ebenen, und die zweite erreicht man nicht über die erste."

### Block 8: Zusatzsatz chronic_pattern

Bedingung: Tag chronic_pattern vorhanden UND der gewählte F3-Spiegel ist NICHT chronic_alarm (sonst doppelt sich die Persönlichkeits-Aussage). Text:

"Und weil das alles schon so lange da ist, hält ein Teil von dir es vielleicht inzwischen für deine Persönlichkeit. Nach allem, was ich in dieser Arbeit sehe: Es ist ein Zustand, kein Charakter. Zustände können sich verändern."

### Block 9: Care-Absatz

Bedingung: careActive. Text:

"Eines möchte ich dir transparent sagen, weil es zu ehrlicher Begleitung gehört: Manches von dem, was du beschreibst, kann auch ein Fall für psychotherapeutische Unterstützung sein. Coaching und Körperarbeit können viel, aber sie ersetzen keine Therapie. Beides schließt sich nicht aus, viele Menschen kombinieren es. Wenn du unsicher bist, was du brauchst, ist genau das eine gute Frage für ein Gespräch."

### Block 10: Modifikatoren (eigener Absatz vor dem Routentext)

- Bedingung need_embodiment (alle Routen): "Du hast es selbst formuliert: Du suchst einen Weg, der über Verstehen hinausgeht. Genau da arbeite ich."
- Bedingung need_companionship (nur Routen almost und not_yet): "Du hast geschrieben, dass du vielleicht erst mal das Gefühl brauchst, nicht allein damit zu sein. Das ist kein kleiner Wunsch, das ist der Anfang von allem."
- Die beiden schließen sich durch die Einfachauswahl in F7 gegenseitig aus.

### Block 11: Routentexte

Struktur in der Config: pro Route ein Array von Absätzen. Der search_fatigue-Absatz wird, falls Tag vorhanden, bei ready und almost ZWISCHEN Absatz 1 und Absatz 2 eingefügt. Bei not_yet kein search_fatigue-Einschub.

ready, Absatz 1:
"Deine Antworten zeigen zwei Dinge: einen echten Leidensdruck und eine echte Bereitschaft, ihn anzugehen. Diese Kombination ist der Punkt, an dem Begleitung am meisten bewirkt."

ready, Absatz 2 (Standard):
"Der nächste Schritt ist einfach und unverbindlich: ein kostenfreies Erstgespräch, etwa 45 Minuten. Wir schauen gemeinsam auf deine Situation und prüfen ehrlich, ob meine Begleitung zu dir passt. Kein Skript, kein Druck. Du gehst mit mehr Klarheit raus, so oder so."

ready, Absatz 2 (Care-Variante, wenn careActive):
"Der nächste Schritt ist einfach und unverbindlich: ein kostenfreies Erstgespräch, etwa 45 Minuten. Wir schauen gemeinsam und in deinem Tempo auf deine Situation, sortieren, was du brauchst, und prüfen ehrlich, ob meine Begleitung dafür der richtige Rahmen ist. Du gehst mit mehr Klarheit raus, so oder so."

almost, Absatz 1:
"Deine Antworten zeigen, dass sich etwas ändern will, und zugleich, dass du noch sortierst. Das ist ein guter, ehrlicher Ort. Du musst von hier aus nichts entscheiden."

almost, Absatz 2:
"Wenn du magst, hol dir mein Audio zur Atempraxis und spür selbst, wie dein System auf diese Art von Arbeit reagiert. Der Atem ist dabei der Einstieg: In meiner Begleitung ist er das Werkzeug, das dein Nervensystem beruhigt und öffnet. Die tiefere Arbeit passiert danach, mit den inneren Anteilen, die dich antreiben und schützen. Im Journal findest du Hintergründe zum Nervensystem. Und wenn du lieber sprechen willst statt lesen: Das Erstgespräch ist genau dafür da, Fragen zu klären, ohne dass daraus etwas folgen muss."

not_yet, ein Absatz:
"Ich bin ehrlich mit dir, weil alles andere dir nicht helfen würde: Deine Antworten klingen für mich nicht danach, dass eine intensive Begleitung jetzt der richtige erste Schritt ist. Das ist keine Absage an dich. Es heißt nur: Der erste Schritt darf kleiner sein. Nimm dir mein Audio zur Atempraxis, fünf Minuten am Tag reichen für den Anfang. Damit du es einordnen kannst: Der Atem ist in meiner Arbeit der Einstieg, das Werkzeug, das dein Nervensystem in Richtung Ruhe und Sicherheit bringt. Die tiefere Veränderung entsteht danach, im Coaching, in der Arbeit mit deinen inneren Anteilen. Lies im Journal, was in deinem Nervensystem gerade passiert. Und wenn sich etwas bewegt, in welche Richtung auch immer, bin ich hier. Meine Tür bleibt offen."

search_fatigue-Absatz (Einschub):
"Und noch etwas, weil du geschrieben hast, dass du müde vom Suchen bist: Ich verspreche dir nicht die endgültige Lösung. Solche Versprechen haben dich müde gemacht. Ich biete dir einen Rahmen, in dem du prüfen kannst, ob dieser Weg deiner ist, bevor du dich für irgendetwas entscheidest."

## 5. UX-Flow

- Eine Frage pro Screen, wie bisher. Zurück-Button bleibt, History-State bleibt.
- Überspringen wird komplett entfernt. Jede Frage muss beantwortet werden (die Antwortoptionen decken das Spektrum ab, es gibt keine tote Ausweichoption mehr).
- Fortschritt: 7 Schritte, bestehende Umber-Fortschrittsanzeige weiterverwenden.
- Single-Fragen: Klick auf Antwort wählt aus und geht direkt weiter (bisheriges Verhalten beibehalten, falls es so ist; andernfalls bisheriges Muster beibehalten, nicht neu erfinden).
- F4 (multi): Antworten togglen, exclusive-Regel wie oben. Unter den Optionen ein Weiter-Button (Primärstil navy), aktiv ab mindestens einer Auswahl. Hint "Mehrfachauswahl möglich" dezent (text-sm, text-muted) unter der Frage.
- F4 Mikropause: Der Fragetext enthält die Einladung bereits. Zusätzlich F4 mit der langsamen Einblendung rendern (--duration-slow statt --duration-med), keine weiteren Effekte, kein Timer, keine Blockade.
- prefers-reduced-motion respektieren wie im Bestand.

### Ergebnis-Rendering

Neue Komponente (z.B. AssessmentResult.tsx), gerendert an der Stelle, wo bisher Headline und Body des Ergebnisses standen:

- Headline in font-serif (Cormorant), Größenordnung H1/Section laut design-system.md.
- Danach die komponierten Absätze als ruhiger Lesetext: font-sans, Body-Größe, max-w-[68ch] Lesespalte, großzügiger Absatzabstand (Atem-Rhythmus).
- Kein Kartenrahmen um den Text, direkt auf paper.
- Der Care-Absatz bekommt KEINE optische Hervorhebung (keine Box, keine Farbe). Er steht als normaler Absatz im Fluss. Begründung: keine Alarm-Anmutung.
- Danach der leise Link "Assessment neu starten" (bestehendes Muster: text-sm, text-muted, Hover accent).
- Danach die bestehenden ResultActions (drei Karten).
- Einblendung des Ergebnisses mit FadeIn (bestehende Komponente), gestaffelt und leise.

### ResultActions

- Bleiben für alle Routen unverändert: gleiche Reihenfolge, gleiche Stile (Erstgespräch gefüllt, Audio und Journal Outline). Bewusste Entscheidung: keine Sonder-Variante für not_yet, die Lenkung übernimmt der Routentext.
- Die Weitergabe von cluster und result als Query-Parameter an /termin bleibt unverändert, cluster kann jetzt auch "mixed" sein.

## 6. API und Daten

- /api/assessment: Payload-Form bleibt (cluster, result_route, answers als jsonb). Sicherstellen, dass "mixed" als cluster-Wert durchläuft (Validierung prüfen, DB-Spalte ist text, keine Migration nötig).
- In answers weiterhin die gewählten Antworten speichern; bei F4 als Array der Antwort-IDs.
- LeadMagnetForm-Props assessmentCluster und assessmentResult: Typ um "mixed" erweitern, sonst unverändert.
- Keine Speicherung von IP, keine neuen personenbezogenen Daten. Die Submissions bleiben anonym.

## 7. Abschluss des Auftrags (verbindlich)

1. `npm run build` (bzw. bestehendes Build-Kommando) muss fehlerfrei durchlaufen.
2. TypeScript strikt: keine any-Ausweichlösungen für die neuen Typen.
3. CLAUDE.md aktualisieren: Abschnitt "Assessment (/assessment)" vollständig auf den neuen Stand bringen (7 Fragen, 4 Cluster inkl. mixed, Mehrfachauswahl F4, Scoring mit readiness_soft 0,5 und Schwellen 4 / 2,5, Care-Logik, modulare Ergebniskomposition, ResultActions unverändert für alle Routen). Stand-Zeile oben in CLAUDE.md aktualisieren.
4. Diese Spec-Datei (assessment-v2-spec.md) im Repo-Root belassen, oben eine Statuszeile ergänzen: "Status: umgesetzt am [Datum], Referenz".
5. Commit mit aussagekräftiger Message und Push auf `origin feature/assessment-v2`. NICHT auf main mergen, NICHT auf main pushen.
6. Am Ende kurz auflisten: geänderte Dateien, offene Punkte, falls etwas unklar war und ausgelassen wurde.
