// assessment-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Assessment v2. Hier liegt der gesamte Inhalt des Assessments: Fragen,
// Antworten, Scoring und die Bausteine für den komponierten Ergebnistext.
// Wortlaut ist final und stammt aus assessment-v2-spec.md, nicht umformulieren.
// ─────────────────────────────────────────────────────────────────────────────

export type Cluster = "exhaustion" | "tension" | "panic" | "mixed";
export type ResultRoute = "ready" | "almost" | "not_yet";

export interface Answer {
  id: string; // stabil, z.B. "q1.a1"
  label: string;
  tags: string[];
  cluster?: Cluster; // nur bei q1
  exclusive?: boolean; // nur bei Mehrfachauswahl-Fragen
}

export interface Question {
  id: string;
  question: string;
  mode: "single" | "multi";
  hint?: string; // z.B. "Mehrfachauswahl möglich"
  onlyForCluster?: Cluster;
  answers: Answer[];
}

// Eine beantwortete Frage, wie sie in der History der Form gesammelt wird.
// composeResult und calculateResult brauchen nur diese beiden Felder.
export interface AnsweredQuestion {
  questionId: string;
  tags: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FRAGEN
// ─────────────────────────────────────────────────────────────────────────────

export const questions: Question[] = [
  {
    id: "q1",
    mode: "single",
    question: "Was beschreibt am ehesten, womit du gerade kämpfst?",
    answers: [
      {
        id: "q1.a1",
        label:
          "Ich bin erschöpft. Zutiefst erschöpft. Selbst nach Schlaf oder Urlaub kommt die Energie nicht zurück.",
        tags: [],
        cluster: "exhaustion",
      },
      {
        id: "q1.a2",
        label:
          "Ich stehe permanent unter Strom und kann nicht abschalten. Kopf und Körper finden keine Ruhe, selbst wenn eigentlich alles okay ist.",
        tags: [],
        cluster: "tension",
      },
      {
        id: "q1.a3",
        label:
          "Mich überrollen Momente von Panik oder Überwältigung, plötzlich und ohne dass ich sie kommen sehe.",
        tags: [],
        cluster: "panic",
      },
      {
        id: "q1.a4",
        label: "Es ist schwer zu greifen. Eine Mischung, oder etwas, das hier nicht steht.",
        tags: [],
        cluster: "mixed",
      },
    ],
  },
  {
    id: "q2",
    mode: "single",
    question: "Seit wann ist das so, und wohin entwickelt es sich?",
    answers: [
      {
        id: "q2.a1",
        label: "Seit ein paar Wochen. Es ist neu und beunruhigt mich.",
        tags: ["duration_short", "readiness_signal"],
      },
      {
        id: "q2.a2",
        label: "Seit Monaten. Ich habe gewartet, dass es von selbst besser wird. Wird es aber nicht.",
        tags: ["duration_medium", "readiness_signal"],
      },
      {
        id: "q2.a3",
        label: "Seit Jahren, schleichend mehr. Irgendwann wurde es mein Normalzustand.",
        tags: ["duration_long", "chronic_pattern", "readiness_signal"],
      },
      {
        id: "q2.a4",
        label: "Es kommt in Wellen. Phasenweise geht es, dann holt es mich wieder ein.",
        tags: ["duration_waves", "readiness_signal"],
      },
    ],
  },
  {
    id: "q3_exhaustion",
    mode: "single",
    onlyForCluster: "exhaustion",
    question: "Wie zeigt sich die Erschöpfung in deinem Alltag am deutlichsten?",
    answers: [
      {
        id: "q3_exhaustion.a1",
        label: "Ich funktioniere für alle anderen. Für mich selbst bleibt nichts übrig.",
        tags: ["depleted_for_others", "readiness_signal"],
      },
      {
        id: "q3_exhaustion.a2",
        label: "Dinge, die mir früher Freude gemacht haben, fühlen sich leer an.",
        tags: ["joy_loss", "readiness_signal"],
      },
      {
        id: "q3_exhaustion.a3",
        label: "Ich schiebe alles auf, selbst Kleinigkeiten fühlen sich wie Berge an.",
        tags: ["overwhelm_paralysis"],
      },
      {
        id: "q3_exhaustion.a4",
        label: "Ich schlafe, aber wache nicht erholt auf. Als würde der Körper nicht mehr auftanken.",
        tags: ["sleep_no_recovery"],
      },
    ],
  },
  {
    id: "q3_tension",
    mode: "single",
    onlyForCluster: "tension",
    question: "Wann spürst du die Anspannung am stärksten?",
    answers: [
      {
        id: "q3_tension.a1",
        label: "Nachts. Der Körper ist müde, aber der Kopf dreht weiter.",
        tags: ["night_racing", "readiness_signal"],
      },
      {
        id: "q3_tension.a2",
        label: "In ruhigen Momenten. Sobald nichts zu tun ist, wird es innerlich laut.",
        tags: ["rest_intolerance", "readiness_signal"],
      },
      {
        id: "q3_tension.a3",
        label: "Unter Menschen oder unter Druck. Ich bin ständig auf Habachtstellung.",
        tags: ["social_alarm"],
      },
      {
        id: "q3_tension.a4",
        label: "Eigentlich immer. Ich weiß gar nicht mehr, wie sich echte Ruhe anfühlt.",
        tags: ["chronic_alarm", "readiness_signal", "care_signal_soft"],
      },
    ],
  },
  {
    id: "q3_panic",
    mode: "single",
    onlyForCluster: "panic",
    question: "Wie gehst du mit diesen Momenten um, wenn sie kommen?",
    answers: [
      {
        id: "q3_panic.a1",
        label:
          "Ich kämpfe dagegen an oder versuche, Situationen zu vermeiden, in denen es passieren könnte.",
        tags: ["avoidance", "readiness_signal"],
      },
      {
        id: "q3_panic.a2",
        label: "Ich funktioniere nach außen weiter. Kaum jemand ahnt, was in mir los ist.",
        tags: ["hidden_struggle", "readiness_signal"],
      },
      {
        id: "q3_panic.a3",
        label: "Ich fühle mich ihnen ausgeliefert und habe Angst vor dem nächsten Mal.",
        tags: ["overwhelmed", "care_signal"],
      },
      {
        id: "q3_panic.a4",
        label: "Ich versuche zu verstehen, was da passiert, aber Verstehen allein stoppt es nicht.",
        tags: ["insight_no_relief", "readiness_signal"],
      },
    ],
  },
  {
    id: "q3_mixed",
    mode: "single",
    onlyForCluster: "mixed",
    question: "Was davon kommt deinem Erleben am nächsten?",
    answers: [
      {
        id: "q3_mixed.a1",
        label: "Ich bin dünnhäutiger geworden. Dinge treffen mich stärker als früher.",
        tags: ["thin_skinned", "readiness_signal"],
      },
      {
        id: "q3_mixed.a2",
        label: "Ich fühle mich seltsam abgeschnitten. Von mir selbst, von anderen, vom Leben.",
        tags: ["disconnection", "readiness_signal", "care_signal_soft"],
      },
      {
        id: "q3_mixed.a3",
        label: "Mein Körper sendet Signale, die ich nicht einordnen kann. Verspannungen, Unruhe, Enge.",
        tags: ["body_signals", "readiness_signal"],
      },
      {
        id: "q3_mixed.a4",
        label: "Es wechselt. Mal erschöpft, mal aufgedreht, selten einfach ruhig.",
        tags: ["state_swings", "readiness_signal"],
      },
    ],
  },
  {
    id: "q4",
    mode: "multi",
    hint: "Mehrfachauswahl möglich",
    question: "Wo zeigt sich das alles in deinem Körper? Nimm dir einen Moment und spür kurz hin.",
    answers: [
      {
        id: "q4.a1",
        label: "Enge in Brust oder Hals, flacher Atem.",
        tags: ["body_chest_breath"],
      },
      {
        id: "q4.a2",
        label: "Verspannte Schultern, Nacken oder Kiefer. Wie dauerhaft in Habachtstellung.",
        tags: ["body_tension_guard"],
      },
      {
        id: "q4.a3",
        label: "Unruhe oder Druck im Bauch, im Magen, in der Mitte.",
        tags: ["body_gut"],
      },
      {
        id: "q4.a4",
        label: "Eher Taubheit. Ich spüre meinen Körper kaum noch richtig.",
        tags: ["body_numbness", "care_signal_soft"],
      },
      {
        id: "q4.a5",
        label: "Schwer zu sagen. Ich habe darauf ehrlich gesagt nie geachtet.",
        tags: ["body_unaware"],
        exclusive: true,
      },
    ],
  },
  {
    id: "q5",
    mode: "single",
    question: "Was kostet dich dieser Zustand gerade am meisten?",
    answers: [
      {
        id: "q5.a1",
        label:
          "Nähe. Für die Menschen, die mir wichtig sind, bleibt nicht die Energie, die sie verdienen.",
        tags: ["cost_relationships", "readiness_signal"],
      },
      {
        id: "q5.a2",
        label: "Lebendigkeit. Ich funktioniere, aber Freude und Leichtigkeit sind selten geworden.",
        tags: ["cost_aliveness", "readiness_signal"],
      },
      {
        id: "q5.a3",
        label:
          "Den Kontakt zu mir. Ich bin ständig hart mit mir und nichts fühlt sich gut genug an.",
        tags: ["cost_self_contact", "inner_critic", "readiness_signal"],
      },
      {
        id: "q5.a4",
        label:
          "Zuversicht. Ein Teil von mir glaubt kaum noch daran, dass es wieder anders wird.",
        tags: ["cost_hope", "care_signal"],
      },
      {
        id: "q5.a5",
        label: "Schwer auf eins festzulegen. Es zieht sich durch alles.",
        tags: ["cost_pervasive", "readiness_signal"],
      },
    ],
  },
  {
    id: "q6",
    mode: "single",
    question: "Was hast du bisher versucht, um da rauszukommen?",
    answers: [
      {
        id: "q6.a1",
        label: "Noch nicht viel. Ich fange gerade erst an, ernsthaft nach Wegen zu suchen.",
        tags: ["tried_nothing", "readiness_signal"],
      },
      {
        id: "q6.a2",
        label: "Ich habe viel gelesen, gehört, verstanden. Aber im Körper ändert das nichts.",
        tags: ["tried_cognitive", "insight_no_relief", "readiness_signal"],
      },
      {
        id: "q6.a3",
        label: "Therapie oder Coaching. Es hat mir geholfen, aber etwas Grundlegendes ist geblieben.",
        tags: ["tried_therapy", "readiness_signal"],
      },
      {
        id: "q6.a4",
        label: "Sport, Meditation, Routinen. Es hilft im Moment, trägt aber nicht in den Alltag.",
        tags: ["tried_practices", "readiness_signal"],
      },
      {
        id: "q6.a5",
        label: "Vieles. Und ich bin müde davon, immer wieder von vorn anzufangen.",
        tags: ["tried_many", "search_fatigue", "readiness_signal"],
      },
    ],
  },
  {
    id: "q7",
    mode: "single",
    question: "Wenn du ehrlich bist: Was brauchst du jetzt am ehesten?",
    answers: [
      {
        id: "q7.a1",
        label: "Erst mal verstehen, was da in mir passiert. Ich bin noch im Sortieren.",
        tags: ["need_understanding"],
      },
      {
        id: "q7.a2",
        label:
          "Einen Weg, der über Verstehen hinausgeht. Ich will es im Körper spüren, nicht nur im Kopf wissen.",
        tags: ["need_embodiment", "readiness_signal"],
      },
      {
        id: "q7.a3",
        label: "Jemanden, der mich ein Stück begleitet. Allein drehe ich mich im Kreis.",
        tags: ["need_guidance", "readiness_signal"],
      },
      {
        id: "q7.a4",
        label: "Ich bin bereit für einen ernsthaften Prozess. Ich will da wirklich raus.",
        tags: ["need_action", "readiness_signal"],
      },
      {
        id: "q7.a5",
        label: "Ich weiß es ehrlich gesagt nicht. Vielleicht erst mal das Gefühl, nicht allein damit zu sein.",
        tags: ["need_companionship", "readiness_soft"],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AUSWERTUNG
// ─────────────────────────────────────────────────────────────────────────────

export function calculateResult(collectedTags: string[]): {
  route: ResultRoute;
  careActive: boolean;
} {
  const readinessSignals = collectedTags.filter((t) => t === "readiness_signal").length;
  const readinessSoft = collectedTags.filter((t) => t === "readiness_soft").length;
  const score = readinessSignals * 1 + readinessSoft * 0.5;

  let route: ResultRoute;
  if (score >= 4) {
    route = "ready";
  } else if (score >= 2.5) {
    route = "almost";
  } else {
    route = "not_yet";
  }

  const careSignals = collectedTags.filter((t) => t === "care_signal").length;
  const careSignalsSoft = collectedTags.filter((t) => t === "care_signal_soft").length;
  const careActive = careSignals >= 1 || careSignalsSoft >= 2;

  return { route, careActive };
}

// ─────────────────────────────────────────────────────────────────────────────
// ERGEBNISTEXT-BAUSTEINE
// ─────────────────────────────────────────────────────────────────────────────

// Block 1: Headlines (nach Cluster)
const headlines: Record<Cluster, string> = {
  exhaustion: "Diese Erschöpfung ist kein Charakterfehler. Sie ist ein Zustand deines Nervensystems.",
  tension:
    "Dein System steht auf Dauer-Alarm. Nicht weil mit dir etwas falsch ist, sondern weil es dich schützen will.",
  panic:
    "Was dich überrollt, ist kein Versagen. Es ist ein Nervensystem, das gerade mehr trägt, als es halten kann.",
  mixed: "Nicht alles braucht sofort einen Namen, um ernst genommen zu werden.",
};

// Block 2: Einstieg (nach Cluster)
const introDefault =
  "Danke für deine Offenheit. Aus deinen Antworten ergibt sich ein klares Bild, und ich möchte dir zurückgeben, was ich darin sehe.";
const introMixed =
  "Danke für deine Offenheit. Auch wenn sich dein Erleben nicht in eine Schublade fügt, zeigen deine Antworten ein deutliches Bild. Ich möchte dir zurückgeben, was ich darin sehe.";

const intros: Record<Cluster, string> = {
  exhaustion: introDefault,
  tension: introDefault,
  panic: introDefault,
  mixed: introMixed,
};

// Block 3: Spiegelbausteine F3, keyed nach dem Content-Tag der gewählten Antwort
const spiegelF3: Record<string, string> = {
  depleted_for_others:
    "Du funktionierst für alle anderen, und für dich bleibt nichts übrig. Das ist kein Mangel an Disziplin. Das ist ein System, das lange gegeben hat, ohne aufzutanken.",
  joy_loss:
    "Dinge, die dir früher Freude gemacht haben, fühlen sich leer an. Das ist eines der leisesten und zugleich deutlichsten Zeichen, dass dein System in den Sparmodus gegangen ist.",
  overwhelm_paralysis:
    "Selbst Kleinigkeiten fühlen sich wie Berge an. Das ist keine Faulheit, auch wenn ein Teil von dir das vielleicht behauptet. Ein erschöpftes Nervensystem stuft alles als zu viel ein, weil die Reserven fehlen.",
  sleep_no_recovery:
    "Du schläfst, aber wachst nicht erholt auf. Erholung ist mehr als Schlaf. Ein System, das nachts auf Wache bleibt, kann nicht auftanken.",
  night_racing:
    "Nachts ist dein Körper müde, aber dein Kopf dreht weiter. Dein System hat verlernt, von Leistung auf Erholung umzuschalten, und die Nacht ist der Moment, in dem das am deutlichsten wird.",
  rest_intolerance:
    "Sobald nichts zu tun ist, wird es innerlich laut. Viele Menschen, die viel tragen, kennen genau das: Ruhe fühlt sich nicht wie Erholung an, sondern wie Bedrohung. Das ist gelernt, und es lässt sich verlernen.",
  social_alarm:
    "Unter Menschen oder unter Druck bist du auf Habachtstellung. Dein System scannt permanent nach Gefahr, auch dort, wo keine ist. Das kostet enorm viel Kraft.",
  chronic_alarm:
    "Du weißt kaum noch, wie sich echte Ruhe anfühlt. Das ist eine ernste und zugleich wichtige Erkenntnis. Denn ein Zustand, der immer da ist, fühlt sich irgendwann wie Persönlichkeit an. Er ist es nicht.",
  avoidance:
    "Du kämpfst dagegen an oder meidest Situationen, in denen es passieren könnte. Das ist eine völlig verständliche Strategie. Auf Dauer macht sie die Welt allerdings kleiner, und genau das hast du vermutlich schon bemerkt.",
  hidden_struggle:
    "Nach außen funktionierst du weiter, kaum jemand ahnt, was in dir los ist. Diese Diskrepanz zwischen außen und innen ist eine eigene, stille Last.",
  overwhelmed:
    "Du fühlst dich diesen Momenten ausgeliefert und trägst die Angst vor dem nächsten Mal mit dir. Diese Angst vor der Angst ist oft anstrengender als die Momente selbst. Ich möchte, dass du weißt: Damit bist du nicht allein, und es gibt Wege, wieder Boden zu gewinnen.",
  // Nur als F3-Spiegel bei panic (q3_panic Antwort 4).
  insight_no_relief:
    "Du verstehst inzwischen einiges von dem, was da passiert, aber Verstehen allein stoppt es nicht. Diese Erfahrung ist wichtig. Sie zeigt, dass die Antwort nicht im Kopf liegt, sondern eine Ebene tiefer.",
  thin_skinned:
    "Du bist dünnhäutiger geworden, Dinge treffen dich stärker als früher. Dünnhäutigkeit ist kein Defekt. Sie zeigt, dass deine Schutzschicht aufgebraucht ist.",
  disconnection:
    "Du fühlst dich abgeschnitten, von dir selbst, von anderen, vom Leben. Das ist eine der leisesten Formen von Belastung, und eine, die ernst genommen werden will. Dass du sie benennen kannst, ist bereits ein Schritt in Richtung Verbindung.",
  body_signals:
    "Dein Körper sendet Signale, die du nicht einordnen kannst. Verspannung, Unruhe, Enge. Dein Körper spricht bereits mit dir. Was fehlt, ist nicht das Signal, sondern die Übersetzung.",
  state_swings:
    "Mal erschöpft, mal aufgedreht, selten einfach ruhig. Dieses Pendeln ist typisch für ein Nervensystem, das seine Mitte verloren hat und zwischen Gas und Notbremse wechselt.",
};

// Block 4: Körperabsatz F4
const BODY_ORDER = ["body_chest_breath", "body_tension_guard", "body_gut"] as const;
const bodyPhrases: Record<string, string> = {
  body_chest_breath: "die Enge in Brust oder Hals, der flache Atem",
  body_tension_guard: "die Anspannung in Schultern, Nacken oder Kiefer",
  body_gut: "die Unruhe in deiner Mitte",
};
const BODY_INTRO = "Und dein Körper spricht mit:";
const BODY_OUTRO = "Das sind keine Zufälle. Es ist dieselbe Geschichte, erzählt vom Körper.";
const BODY_NUMBNESS_ONLY =
  "Und dann ist da die Taubheit. Du spürst deinen Körper kaum noch richtig. Wenn ein System lange überfordert ist, dreht es irgendwann die Wahrnehmung leiser, um dich zu schützen. Der Weg zurück ins Spüren braucht deshalb vor allem eines: Behutsamkeit.";
const BODY_NUMBNESS_APPENDED =
  "Und dazwischen immer wieder Taubheit. Auch das gehört dazu: Ein überfordertes System dreht die Wahrnehmung zeitweise leiser, um dich zu schützen.";
const BODY_UNAWARE =
  "Auf die Frage nach deinem Körper hast du ehrlich geantwortet: Du hast nie darauf geachtet. Das ist kein Defizit. Die meisten von uns haben gelernt, vom Hals aufwärts zu leben. Die Verbindung nach unten lässt sich aufbauen, und sie verändert mehr, als die meisten erwarten.";

function joinGerman(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} und ${items[items.length - 1]}`;
}

function composeBodyParagraph(bodyTags: string[]): string {
  if (bodyTags.includes("body_unaware")) return BODY_UNAWARE;

  const hasNumbness = bodyTags.includes("body_numbness");
  const phrases = BODY_ORDER.filter((tag) => bodyTags.includes(tag)).map((tag) => bodyPhrases[tag]);

  if (phrases.length === 0 && hasNumbness) return BODY_NUMBNESS_ONLY;

  const standard = `${BODY_INTRO} ${joinGerman(phrases)}. ${BODY_OUTRO}`;
  return hasNumbness ? `${standard} ${BODY_NUMBNESS_APPENDED}` : standard;
}

// Block 5: Spiegelbausteine F5, keyed nach dem Content-Tag der gewählten Antwort
const spiegelF5: Record<string, string> = {
  cost_relationships:
    "Am meisten kostet dich das gerade Nähe. Für die Menschen, die dir wichtig sind, bleibt nicht die Energie, die sie verdienen. Ich kenne kaum einen Satz, der mehr Gewicht hat. Und kaum einen besseren Grund, etwas zu verändern.",
  cost_aliveness:
    "Am meisten kostet dich das gerade Lebendigkeit. Du funktionierst, aber Freude und Leichtigkeit sind selten geworden. Funktionieren ist eine Fähigkeit. Ein Leben ist es noch nicht.",
  cost_self_contact:
    "Am meisten kostet dich das gerade den Kontakt zu dir selbst. Du bist ständig hart mit dir, nichts fühlt sich gut genug an. Diese innere Stimme, die dich antreibt und gleichzeitig kleinmacht, ist übrigens kein Feind. Sie ist ein überarbeiteter Beschützer. Auch mit ihr lässt sich arbeiten.",
  cost_hope:
    "Und da ist etwas, das ich besonders ernst nehme: Ein Teil von dir glaubt kaum noch daran, dass es wieder anders wird. Ich werde dir hier kein Versprechen machen. Aber ich möchte, dass du weißt: Dass dieser Teil müde ist, heißt nicht, dass er recht hat.",
  cost_pervasive:
    "Du konntest dich nicht auf einen Preis festlegen, es zieht sich durch alles. Genau das macht diffuse Dauerbelastung so zermürbend: Es gibt keinen einzelnen Punkt, den man reparieren könnte. Es braucht einen Weg, der beim System ansetzt, nicht beim Symptom.",
};

// Block 6: Nervensystem-Absatz (nach Cluster)
const nervensystem: Record<Cluster, string> = {
  exhaustion:
    "Was du beschreibst, deutet auf ein Nervensystem hin, das zu lange im Leistungsmodus war und dessen Reserven aufgebraucht sind. Die gute Nachricht: Ein Nervensystem ist kein Schicksal. Es ist formbar, und Regulation lässt sich wieder aufbauen, über den Körper, nicht über noch mehr Willenskraft.",
  tension:
    "Was du beschreibst, deutet auf ein Nervensystem hin, das im Alarmmodus feststeckt und den Weg zurück in die Ruhe nicht mehr von allein findet. Die gute Nachricht: Dieser Weg lässt sich wieder bahnen. Nicht durch Nachdenken, sondern über den Körper, dort, wo der Alarm sitzt.",
  panic:
    "Was du beschreibst, deutet auf ein Nervensystem hin, das gelernt hat, sehr schnell in den Notfallmodus zu gehen. Das ist keine Schwäche, sondern ein Schutzprogramm, das über das Ziel hinausschießt. Solche Muster lassen sich über den Körper ansprechen und Schritt für Schritt beruhigen.",
  mixed:
    "Auch wenn dein Erleben vielgestaltig ist, läuft es an einem Ort zusammen: in deinem Nervensystem. Dort entscheidet sich, ob du in Anspannung, Erschöpfung oder Unruhe lebst, und dort setzt Veränderung an. Über den Körper, nicht über noch mehr Analyse.",
};

// Block 7: Zusatzsatz insight_no_relief (nur wenn nicht bereits als F3-Spiegel gerendert)
const INSIGHT_NO_RELIEF_TEXT =
  "Du hast es selbst beschrieben: Verstehen allein verändert es nicht. Das liegt nicht an dir. Einsicht und Regulation sind zwei verschiedene Ebenen, und die zweite erreicht man nicht über die erste.";

// Block 8: Zusatzsatz chronic_pattern (nur wenn F3-Spiegel nicht schon chronic_alarm ist)
const CHRONIC_PATTERN_TEXT =
  "Und weil das alles schon so lange da ist, hält ein Teil von dir es vielleicht inzwischen für deine Persönlichkeit. Nach allem, was ich in dieser Arbeit sehe: Es ist ein Zustand, kein Charakter. Zustände können sich verändern.";

// Block 9: Care-Absatz (wenn careActive)
const CARE_TEXT =
  "Eines möchte ich dir transparent sagen, weil es zu ehrlicher Begleitung gehört: Manches von dem, was du beschreibst, kann auch ein Fall für psychotherapeutische Unterstützung sein. Coaching und Körperarbeit können viel, aber sie ersetzen keine Therapie. Beides schließt sich nicht aus, viele Menschen kombinieren es. Wenn du unsicher bist, was du brauchst, ist genau das eine gute Frage für ein Gespräch.";

// Block 10: Modifikatoren (schließen sich durch die Einfachauswahl in F7 gegenseitig aus)
const NEED_EMBODIMENT_TEXT =
  "Du hast es selbst formuliert: Du suchst einen Weg, der über Verstehen hinausgeht. Genau da arbeite ich.";
const NEED_COMPANIONSHIP_TEXT =
  "Du hast geschrieben, dass du vielleicht erst mal das Gefühl brauchst, nicht allein damit zu sein. Das ist kein kleiner Wunsch, das ist der Anfang von allem.";

// Block 11: Routentexte
const routeReady = {
  para1:
    "Deine Antworten zeigen zwei Dinge: einen echten Leidensdruck und eine echte Bereitschaft, ihn anzugehen. Diese Kombination ist der Punkt, an dem Begleitung am meisten bewirkt.",
  para2Default:
    "Der nächste Schritt ist einfach und unverbindlich: ein kostenfreies Erstgespräch, etwa 45 Minuten. Wir schauen gemeinsam auf deine Situation und prüfen ehrlich, ob meine Begleitung zu dir passt. Kein Skript, kein Druck. Du gehst mit mehr Klarheit raus, so oder so.",
  para2Care:
    "Der nächste Schritt ist einfach und unverbindlich: ein kostenfreies Erstgespräch, etwa 45 Minuten. Wir schauen gemeinsam und in deinem Tempo auf deine Situation, sortieren, was du brauchst, und prüfen ehrlich, ob meine Begleitung dafür der richtige Rahmen ist. Du gehst mit mehr Klarheit raus, so oder so.",
};

const routeAlmost = {
  para1:
    "Deine Antworten zeigen, dass sich etwas ändern will, und zugleich, dass du noch sortierst. Das ist ein guter, ehrlicher Ort. Du musst von hier aus nichts entscheiden.",
  para2:
    "Wenn du magst, hol dir mein Audio zur Atempraxis und spür selbst, wie dein System auf diese Art von Arbeit reagiert. Der Atem ist dabei der Einstieg: In meiner Begleitung ist er das Werkzeug, das dein Nervensystem beruhigt und öffnet. Die tiefere Arbeit passiert danach, mit den inneren Anteilen, die dich antreiben und schützen. Im Journal findest du Hintergründe zum Nervensystem. Und wenn du lieber sprechen willst statt lesen: Das Erstgespräch ist genau dafür da, Fragen zu klären, ohne dass daraus etwas folgen muss.",
};

const routeNotYet =
  "Ich bin ehrlich mit dir, weil alles andere dir nicht helfen würde: Deine Antworten klingen für mich nicht danach, dass eine intensive Begleitung jetzt der richtige erste Schritt ist. Das ist keine Absage an dich. Es heißt nur: Der erste Schritt darf kleiner sein. Nimm dir mein Audio zur Atempraxis, fünf Minuten am Tag reichen für den Anfang. Damit du es einordnen kannst: Der Atem ist in meiner Arbeit der Einstieg, das Werkzeug, das dein Nervensystem in Richtung Ruhe und Sicherheit bringt. Die tiefere Veränderung entsteht danach, im Coaching, in der Arbeit mit deinen inneren Anteilen. Lies im Journal, was in deinem Nervensystem gerade passiert. Und wenn sich etwas bewegt, in welche Richtung auch immer, bin ich hier. Meine Tür bleibt offen.";

const SEARCH_FATIGUE_TEXT =
  "Und noch etwas, weil du geschrieben hast, dass du müde vom Suchen bist: Ich verspreche dir nicht die endgültige Lösung. Solche Versprechen haben dich müde gemacht. Ich biete dir einen Rahmen, in dem du prüfen kannst, ob dieser Weg deiner ist, bevor du dich für irgendetwas entscheidest.";

// ─────────────────────────────────────────────────────────────────────────────
// ERGEBNISTEXT-KOMPOSITION
// ─────────────────────────────────────────────────────────────────────────────

export function composeResult(
  history: AnsweredQuestion[],
  cluster: Cluster,
  route: ResultRoute,
  careActive: boolean
): { headline: string; paragraphs: string[] } {
  const tagsByQuestion = new Map(history.map((h) => [h.questionId, h.tags]));
  const allTags = history.flatMap((h) => h.tags);
  const hasTag = (tag: string) => allTags.includes(tag);

  const paragraphs: string[] = [];

  // Block 2: Einstieg
  paragraphs.push(intros[cluster]);

  // Block 3: Spiegelbaustein F3
  const q3Tags = tagsByQuestion.get(`q3_${cluster}`) ?? [];
  const f3Tag = q3Tags.find((tag) => tag in spiegelF3);
  if (f3Tag) paragraphs.push(spiegelF3[f3Tag]);

  // Block 4: Körperabsatz F4
  const q4Tags = tagsByQuestion.get("q4") ?? [];
  paragraphs.push(composeBodyParagraph(q4Tags));

  // Block 5: Spiegelbaustein F5
  const q5Tags = tagsByQuestion.get("q5") ?? [];
  const f5Tag = q5Tags.find((tag) => tag in spiegelF5);
  if (f5Tag) paragraphs.push(spiegelF5[f5Tag]);

  // Block 6: Nervensystem-Absatz
  paragraphs.push(nervensystem[cluster]);

  // Block 7: Zusatzsatz insight_no_relief (ausgelassen, wenn bereits F3-Spiegel)
  if (hasTag("insight_no_relief") && f3Tag !== "insight_no_relief") {
    paragraphs.push(INSIGHT_NO_RELIEF_TEXT);
  }

  // Block 8: Zusatzsatz chronic_pattern (ausgelassen, wenn F3-Spiegel bereits chronic_alarm)
  if (hasTag("chronic_pattern") && f3Tag !== "chronic_alarm") {
    paragraphs.push(CHRONIC_PATTERN_TEXT);
  }

  // Block 9: Care-Absatz
  if (careActive) {
    paragraphs.push(CARE_TEXT);
  }

  // Block 10: Modifikator (schließen sich gegenseitig aus)
  if (hasTag("need_embodiment")) {
    paragraphs.push(NEED_EMBODIMENT_TEXT);
  }
  if (hasTag("need_companionship") && (route === "almost" || route === "not_yet")) {
    paragraphs.push(NEED_COMPANIONSHIP_TEXT);
  }

  // Block 11: Routentext, mit optionalem search_fatigue-Einschub bei ready/almost
  const searchFatigue = hasTag("search_fatigue");
  if (route === "ready") {
    paragraphs.push(routeReady.para1);
    if (searchFatigue) paragraphs.push(SEARCH_FATIGUE_TEXT);
    paragraphs.push(careActive ? routeReady.para2Care : routeReady.para2Default);
  } else if (route === "almost") {
    paragraphs.push(routeAlmost.para1);
    if (searchFatigue) paragraphs.push(SEARCH_FATIGUE_TEXT);
    paragraphs.push(routeAlmost.para2);
  } else {
    paragraphs.push(routeNotYet);
  }

  return { headline: headlines[cluster], paragraphs };
}
