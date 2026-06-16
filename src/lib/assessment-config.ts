// assessment-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Hier liegt der gesamte Inhalt des Assessments. Fragen, Antworten, Scoring
// und Ergebnis-Texte können hier geändert werden, ohne die Form-Logik anzufassen.
// ─────────────────────────────────────────────────────────────────────────────

export type Cluster = "exhaustion" | "tension" | "panic";
export type ResultRoute = "ready" | "almost" | "not_yet";

export interface Answer {
  label: string;
  tags: string[];
  cluster?: Cluster;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  onlyForCluster?: Cluster;
}

export interface ResultContent {
  headlines: Partial<Record<Cluster, string>> & { default: string };
  body: string;
  ctaLabel: string;
  ctaHref: string;
  videoUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// FRAGEN
// ─────────────────────────────────────────────────────────────────────────────

export const questions: Question[] = [
  {
    id: "q1",
    question: "Was trifft am ehesten auf das zu, womit du gerade kämpfst?",
    answers: [
      {
        label: "Ich bin chronisch erschöpft und antriebslos. Die Energie ist einfach weg.",
        tags: ["exhaustion"],
        cluster: "exhaustion",
      },
      {
        label: "Ich stehe permanent unter Strom. Kopf und Körper finden keine Ruhe.",
        tags: ["tension"],
        cluster: "tension",
      },
      {
        label: "Ich erlebe plötzliche Zustände von Panik oder Überwältigung, die mich aus dem Alltag reißen.",
        tags: ["panic"],
        cluster: "panic",
      },
      {
        label: "Etwas anderes.",
        tags: [],
        cluster: "tension", // Fallback-Cluster
      },
    ],
  },
  {
    id: "q2",
    question: "Wie lange begleitet dich das schon?",
    answers: [
      {
        label: "Seit einigen Wochen. Es ist neu und beunruhigt mich.",
        tags: ["duration_short"],
      },
      {
        label: "Seit mehreren Monaten. Es wird nicht besser.",
        tags: ["duration_medium", "readiness_signal"],
      },
      {
        label: "Seit Jahren. Ich habe mich irgendwie damit arrangiert, will aber raus.",
        tags: ["duration_long", "readiness_signal"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
  {
    id: "q3_exhaustion",
    question: "Was glaubst du, steckt dahinter?",
    onlyForCluster: "exhaustion",
    answers: [
      {
        label: "Zu viel Stress über zu lange Zeit, zu wenig echte Erholung.",
        tags: ["aware_surface"],
      },
      {
        label: "Ich trage etwas mit mir, das ich noch nicht wirklich angeschaut habe.",
        tags: ["aware_deep", "readiness_signal"],
      },
      {
        label: "Ich weiß es nicht. Das macht es so schwer.",
        tags: ["uncertain"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
  {
    id: "q3_tension",
    question: "Wann kommst du am wenigsten zur Ruhe?",
    onlyForCluster: "tension",
    answers: [
      {
        label: "Nachts. Mein Kopf dreht weiter, wenn ich schlafen will.",
        tags: ["sleep", "readiness_signal"],
      },
      {
        label: "Unter Druck oder in sozialen Situationen. Ich bin ständig auf Alarm.",
        tags: ["social_pressure", "readiness_signal"],
      },
      {
        label: "Eigentlich immer. Ich kenne kaum noch einen Zustand echter Ruhe.",
        tags: ["chronic", "readiness_signal"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
  {
    id: "q3_panic",
    question: "Wie gehst du aktuell mit den Momenten der Überwältigung um?",
    onlyForCluster: "panic",
    answers: [
      {
        label: "Ich versuche sie zu kontrollieren oder ihnen aus dem Weg zu gehen.",
        tags: ["avoidance"],
      },
      {
        label: "Ich funktioniere irgendwie weiter, aber es zermürbt mich.",
        tags: ["functioning", "readiness_signal"],
      },
      {
        label: "Ich fühle mich ihnen hilflos ausgeliefert.",
        tags: ["overwhelmed", "readiness_signal"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
  {
    id: "q4",
    question: "Was hast du bisher versucht?",
    answers: [
      {
        label: "Noch nicht viel. Ich suche gerade erst nach Wegen.",
        tags: ["tried_nothing"],
      },
      {
        label: "Klassische Ansätze: Therapie, Coaching, Selbsthilfe.",
        tags: ["tried_cognitive", "readiness_signal"],
      },
      {
        label: "Einiges. Aber nichts hat wirklich nachhaltig geholfen.",
        tags: ["tried_many", "readiness_signal"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
  {
    id: "q5",
    question: "Was brauchst du jetzt?",
    answers: [
      {
        label: "Ich möchte erst verstehen, was mit mir passiert, bevor ich mich auf etwas einlasse.",
        tags: ["need_understanding"],
      },
      {
        label: "Ich brauche einen klaren Weg mit jemandem, dem ich vertrauen kann.",
        tags: ["need_guidance", "readiness_signal"],
      },
      {
        label: "Ich bin bereit, ernsthaft zu arbeiten. Ich will raus hier.",
        tags: ["need_action", "readiness_signal"],
      },
      {
        label: "Etwas anderes.",
        tags: [],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────────────────────────────────────

export function calculateResult(
  collectedTags: string[],
  cluster: Cluster
): ResultRoute {
  const score = collectedTags.filter((t) => t === "readiness_signal").length;
  if (score >= 4) return "ready";
  if (score >= 2) return "almost";
  return "not_yet";
}

// ─────────────────────────────────────────────────────────────────────────────
// ERGEBNIS-INHALTE
// ─────────────────────────────────────────────────────────────────────────────

export const results: Record<ResultRoute, ResultContent> = {
  ready: {
    headlines: {
      default: "Du bist bereit. Lass uns sprechen.",
      exhaustion: "Was du spürst, ist kein Charakterfehler. Es ist ein erschöpftes Nervensystem.",
      tension: "Dein Körper ist seit zu langer Zeit auf Alarm. Es ist Zeit, das zu ändern.",
      panic: "Panik ist kein Zeichen von Schwäche. Es ist ein Nervensystem, das Unterstützung braucht.",
    },
    body:
      "Deine Antworten zeigen einen klaren Leidensdruck und die Bereitschaft, ernsthaft an dir zu arbeiten. Das kostenfreie Erstgespräch ist der nächste logische Schritt. Wir schauen gemeinsam, ob wir ein gutes Match für diesen Weg sind.",
    ctaLabel: "Erstgespräch vereinbaren",
    ctaHref: "/termin",
    videoUrl: "",
  },
  almost: {
    headlines: {
      default: "Du spürst, dass sich etwas ändern muss.",
      exhaustion: "Die Erschöpfung zeigt dir, dass dein System an seine Grenzen gestoßen ist.",
      tension: "Dauerhafte Anspannung ist kein Normalzustand. Auch wenn er sich so anfühlt.",
      panic: "Panikmomente sind ein klares Signal deines Nervensystems. Kein Grund zur Scham.",
    },
    body:
      "Du stehst noch am Anfang deiner Suche oder hast noch Fragen, bevor du dich auf einen Prozess einlässt. Das ist völlig in Ordnung. Im kostenfreien Erstgespräch beantworte ich dir alle offenen Fragen, ohne Druck und ohne Erwartung.",
    ctaLabel: "Erstgespräch vereinbaren",
    ctaHref: "/termin",
    videoUrl: "",
  },
  not_yet: {
    headlines: {
      default: "Ehrlichkeit gehört dazu.",
      exhaustion: "Ehrlichkeit gehört dazu.",
      tension: "Ehrlichkeit gehört dazu.",
      panic: "Ehrlichkeit gehört dazu.",
    },
    body:
      "Auf Basis deiner Antworten bin ich nicht sicher, ob der Moment für eine intensive Begleitung schon der richtige ist. Das soll dich nicht entmutigen. Manchmal braucht es noch Zeit, bevor man wirklich bereit ist, tief zu schauen. Wenn sich das ändert, bin ich hier.",
    ctaLabel: "Zurück zur Startseite",
    ctaHref: "/",
    videoUrl: "",
  },
};