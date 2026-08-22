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
  // Eigene, frei eingegebene Worte zusätzlich zu den festen Optionen (aktuell
  // nur descriptors). Zählt gegen dasselbe maxSelect wie die festen Optionen.
  custom?: {
    addLabel: string;
    placeholder: string;
    maxLength: number;
  };
}

// Antwort der descriptors-Frage: feste Optionen (ids) plus eigene, frei
// eingegebene Worte, zusammen begrenzt durch descriptorsQuestion.maxSelect.
export interface DescriptorsAnswer {
  ids: string[];
  custom: string[];
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

// Bestätigungsfenster für Auto-Advance-Fragen (format, rating): Zeit, in der
// die gewählte Antwort sichtbar gefüllt bleibt, bevor der nächste Schritt
// erscheint (FeedbackForm.tsx, pendingAnswer-State). Gilt nicht für
// descriptors/best/improve/contact, die einen eigenen Weiter-Button haben.
export const AUTO_ADVANCE_DELAY_MS = 400;

// Label des gemeinsamen Skip-Links (TextLinkButton.tsx), für alle
// überspringbaren Schritte (format, descriptors, best, improve) identisch.
// rating bleibt Pflicht und hat keinen Skip-Link.
export const skipLabel = "Überspringen";

// Kopf des aktiven Formulars (oberhalb der ProgressBar), siehe
// FeedbackForm.tsx. Kein Text im Komponenten-Code.
export const intro = {
  eyebrow: "Feedback",
  heading: "Wie war es für dich?",
  text: "Danke, dass du da warst. Deine Rückmeldung hilft mir, meine Arbeit besser zu machen. Das dauert etwa eine Minute.",
};

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
  minSelect: 0,
  maxSelect: 3,
  custom: {
    addLabel: "Eigenes Wort",
    placeholder: "Dein Wort",
    maxLength: 30,
  },
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
  required: false,
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
  intro:
    "Deine Rückmeldung ist angekommen. Ich lese jede einzelne und antworte persönlich, wenn du das möchtest.",
  audio: {
    eyebrow: "Mein Dankeschön",
    title: "Ankommen in zehn Minuten. Atem und Stille.",
    description:
      "Eine kurze geführte Übung für zu Hause, als Dankeschön fürs Ausfüllen.",
    downloadLabel: "Audio herunterladen",
  },
  nextSteps: {
    eyebrow: "Wie es weitergehen kann",
    links: [
      {
        href: "/breathwork",
        label: "Somatic Breathwork: Klassen, Workshops und Einzelsitzungen",
      },
      {
        href: "/journal",
        label: "Journal: Hintergründe zu Nervensystem und Somatic Breathwork",
      },
    ],
  },
  share: {
    eyebrow: "Deine Erfahrung teilen",
    text: "Wenn es dir gutgetan hat, hilf anderen, meine Arbeit zu finden. Eine Bewertung auf Google dauert eine Minute. Wenn etwas nicht gepasst hat, schreib mir direkt, ich antworte persönlich.",
    googleLabel: "Auf Google bewerten",
    directLabel: "Lieber direkt schreiben",
    mailSubject: "Feedback zu deiner Stunde",
  },
};

// Entwicklungshinweis, wenn eine Danke-Ansicht-Env fehlt (nur außerhalb von
// Production sichtbar, siehe FeedbackThankYou.tsx' showEnvHints-Prop).
export function envHint(varName: string): string {
  return `Entwicklungshinweis: ${varName} fehlt, dieser Block wird im Livebetrieb erst mit gesetzter Env angezeigt.`;
}

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

// Serverseitige Sanitisierung der eigenen Beschreibungsworte (/api/feedback):
// trimmt, zieht Mehrfach-Leerzeichen zusammen, kappt auf die konfigurierte
// Länge, verwirft leere Einträge und entfernt Duplikate (case-insensitiv).
// Rohtext wird gespeichert, escapeHtml passiert erst beim Mail-Versand.
export function sanitizeCustomDescriptors(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const maxLength = descriptorsQuestion.custom?.maxLength ?? 30;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of value) {
    if (typeof raw !== "string") continue;
    const normalized = raw.trim().replace(/\s+/g, " ").slice(0, maxLength);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }
  return result;
}

// QR-Herkunftskennung (z. B. "mo-19"). Freier Kurzname, aber begrenzt auf ein
// unkritisches Zeichenset, geprüft beim Auslesen des Query-Parameters
// (page.tsx) und nochmal serverseitig in /api/feedback.
const SOURCE_PATTERN = /^[a-z0-9-]{1,40}$/;

export function isValidFeedbackSource(value: unknown): value is string {
  return typeof value === "string" && SOURCE_PATTERN.test(value);
}
