// feedback-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Inhalt des Feedback-Formulars unter /feedback: Fragen, Optionen und die
// Texte der Danke-Ansicht. Kein Fragetext im Komponenten-Code (siehe
// CLAUDE.md, Bau-Auftrag Feedback-Seite).
//
// Die Frage-Typen (choice/scale/freetext) und ihre Datenform orientieren sich
// bewusst am Blockmodell des Workbooks (design-system.md Abschnitt 8,
// aktuell nur auf Branch feature/workbook), damit die Renderer sich später
// zusammenführen lassen. Keine Code-Abhängigkeit auf feature/workbook, nur
// dieselben Konzepte (Frage-Typ, Variante, Nummerierung).
// ─────────────────────────────────────────────────────────────────────────────

export type Format = "klasse" | "workshop" | "einzel";

export const FORMAT_ORDER: Format[] = ["klasse", "workshop", "einzel"];

// Kurzform für Mail-Betreff und -Inhalt, getrennt von den längeren
// Options-Labels der Frage selbst.
export const formatShortLabels: Record<Format, string> = {
  klasse: "Klasse",
  workshop: "Workshop",
  einzel: "Einzelsitzung",
};

export interface ChoiceOption {
  id: string;
  label: string;
}

interface BaseQuestion {
  id: string;
  question: string;
  hint?: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  mode: "single" | "multi";
  variant: "rows" | "pills";
  options: ChoiceOption[];
  minSelect?: number; // nur bei mode "multi"
  maxSelect?: number; // nur bei mode "multi"
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface FreetextQuestion extends BaseQuestion {
  type: "freetext";
  placeholder: string;
  required: boolean;
  minLength?: number; // nur relevant, wenn required
  maxLength: number;
}

export type FeedbackQuestion = ChoiceQuestion | ScaleQuestion | FreetextQuestion;

// Reihenfolge der Schritte im Formular. "contact" ist kein Eintrag in
// `questions` (eigener Schritt mit mehreren Feldern, siehe FeedbackForm.tsx),
// zählt aber für Fortschritt und Nummerierung als sechster und letzter
// Schritt.
export const STEP_ORDER = [
  "format",
  "rating",
  "descriptors",
  "best",
  "improve",
  "contact",
] as const;

export type StepId = (typeof STEP_ORDER)[number];

export const TOTAL_STEPS = STEP_ORDER.length;

// ─────────────────────────────────────────────────────────────────────────────
// FRAGEN 1–5 (Frage 6 "contact" ist ein eigener Formular-Schritt)
// ─────────────────────────────────────────────────────────────────────────────

export const formatQuestion: ChoiceQuestion = {
  id: "format",
  type: "choice",
  mode: "single",
  variant: "rows",
  question: "Was hast du besucht?",
  options: [
    { id: "klasse", label: "Regelmäßige öffentliche Klasse" },
    { id: "workshop", label: "Workshop oder Special" },
    { id: "einzel", label: "Einzelsitzung" },
  ],
};

// Bewusst 5 statt der 7 Stufen aus dem Workbook: der Wert soll später gegen
// Google-Bewertungen lesbar sein. Der Renderer nimmt min/max aus der Config.
export const ratingQuestion: ScaleQuestion = {
  id: "rating",
  type: "scale",
  question: "Wie war die Stunde für dich insgesamt?",
  min: 1,
  max: 5,
  minLabel: "Hat nicht gepasst",
  maxLabel: "Richtig gut",
};

export const descriptorsQuestion: ChoiceQuestion = {
  id: "descriptors",
  type: "choice",
  mode: "multi",
  variant: "pills",
  question: "Welche Worte beschreiben deine Erfahrung am besten?",
  hint: "Wähl bis zu drei.",
  minSelect: 1,
  maxSelect: 3,
  options: [
    { id: "beruhigend", label: "beruhigend" },
    { id: "befreiend", label: "befreiend" },
    { id: "intensiv", label: "intensiv" },
    { id: "klaerend", label: "klärend" },
    { id: "koerperlich_spuerbar", label: "körperlich spürbar" },
    { id: "emotional", label: "emotional" },
    { id: "entspannend", label: "entspannend" },
    { id: "ueberraschend", label: "überraschend" },
    { id: "herausfordernd", label: "herausfordernd" },
    { id: "zu_schnell", label: "zu schnell" },
    { id: "zu_viel", label: "zu viel" },
    { id: "nicht_erreicht", label: "hat mich nicht erreicht" },
  ],
};

export const DESCRIPTOR_IDS: string[] = descriptorsQuestion.options.map((o) => o.id);

export const bestQuestion: FreetextQuestion = {
  id: "best",
  type: "freetext",
  question: "Was hat dir am meisten gebracht?",
  placeholder: "Ein, zwei Sätze reichen.",
  required: true,
  minLength: 3,
  maxLength: 1000,
};

export const improveQuestion: FreetextQuestion = {
  id: "improve",
  type: "freetext",
  question: "Was hätte die Stunde für dich noch besser gemacht?",
  placeholder: "Alles, was dir auffällt. Auch Kleinigkeiten.",
  required: false,
  maxLength: 1000,
};

// Texte des Kontakt-Schritts (Frage 6), eigener Schritt statt generischer
// Frage, weil er mehrere Felder und zwei unabhängige Checkboxen kombiniert.
export const contactStep = {
  heading: "Darf ich mich bei dir melden?",
  intro:
    "Wenn du magst, lass mir Namen und E-Mail da. Ich antworte persönlich, besonders wenn etwas nicht gepasst hat.",
  namePlaceholder: "Name (optional)",
  emailPlaceholder: "Deine E-Mail-Adresse (optional)",
  contactConsentLabel: "Lasse darf mich zu meinem Feedback kontaktieren.",
  quoteConsentLabel:
    "Lasse darf meine Worte anonym als Teilnehmerstimme auf seiner Website zeigen.",
  privacyPrefix: "Mehr dazu in der",
  privacyLinkLabel: "Datenschutzerklärung",
  submitLabel: "Feedback senden",
  submitLoadingLabel: "Wird gesendet …",
};

// ─────────────────────────────────────────────────────────────────────────────
// DANKE-ANSICHT
// ─────────────────────────────────────────────────────────────────────────────

export const thankYou = {
  heading: "Danke dir.",
  intro: "Deine Rückmeldung ist angekommen. Ich lese jede einzelne.",
  audio: {
    eyebrow: "Mein Dankeschön",
    title: "Ankommen in zehn Minuten. Atem und Stille.",
    description:
      "Eine kurze geführte Übung für zu Hause, als Dankeschön fürs Ausfüllen.",
    downloadLabel: "Audio herunterladen",
  },
  nextSteps: {
    eyebrow: "Wie es weitergehen kann",
    schedule: {
      // Ziel wird nachgetragen, sobald eine feste Übersichtsseite für
      // Klassen und Workshops steht.
      href: "/",
      label: "Aktuelle Klassen und Workshops",
    },
    journal: {
      href: "/journal",
      label: "Im Journal findest du Hintergründe zu Nervensystem und Somatic Breathwork.",
    },
  },
  share: {
    text: "Wenn du magst, hilf anderen, meine Klassen zu finden, und teile deine Erfahrung auf Google. Wenn etwas nicht gepasst hat, schreib mir gern direkt. Ich antworte persönlich.",
    googleLabel: "Auf Google bewerten",
    directLabel: "Lieber direkt schreiben",
    mailSubject: "Feedback zu deiner Stunde",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// VALIDIERUNG (geteilt zwischen Client-Vorprüfung und /api/feedback)
// ─────────────────────────────────────────────────────────────────────────────

export function isValidFormat(value: unknown): value is Format {
  return typeof value === "string" && (FORMAT_ORDER as string[]).includes(value);
}

export function isValidRating(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= ratingQuestion.min &&
    value <= ratingQuestion.max
  );
}

export function isValidDescriptors(value: unknown): value is string[] {
  if (!Array.isArray(value)) return false;
  const max = descriptorsQuestion.maxSelect ?? Infinity;
  const min = descriptorsQuestion.minSelect ?? 0;
  if (value.length < min || value.length > max) return false;
  return value.every((id) => typeof id === "string" && DESCRIPTOR_IDS.includes(id));
}

// QR-Herkunftskennung (z. B. "mo-19"). Freier Kurzname, aber begrenzt auf ein
// unkritisches Zeichenset, geprüft beim Auslesen des Query-Parameters
// (page.tsx) und nochmal serverseitig in /api/feedback.
const SOURCE_PATTERN = /^[a-z0-9-]{1,40}$/;

export function isValidFeedbackSource(value: unknown): value is string {
  return typeof value === "string" && SOURCE_PATTERN.test(value);
}
