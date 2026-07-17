// Block-IDs sind stabile Strings im Schema b<bereich>.s<schritt>.<name>.
// IDs werden nie umbenannt, sonst verwaisen gespeicherte Antworten.

// ── Block types (union) ────────────────────────────────────────────────────

export type BlockType =
  | "text"
  | "audio"
  | "video"
  | "choice"
  | "freetext"
  | "scale"
  | "table"
  | "wordlist"
  | "association"
  | "cloze"
  | "bodymap"
  | "visual";

// ── Bodymap region and variant types ──────────────────────────────────────

export type BodymapVariant =
  | "full-front"
  | "full-back"
  | "upper-front"
  | "upper-back";

export type BodymapRegion =
  | "head"
  | "neck"
  | "shoulders"
  | "chest"
  | "abdomen"
  | "upper-back"
  | "lower-back"
  | "arms"
  | "hands"
  | "pelvis"
  | "legs"
  | "feet";

export type BodymapQuality =
  | "tightness"
  | "warmth"
  | "pressure"
  | "numbness"
  | "tingling"
  | "openness";

// ── Table column definition ────────────────────────────────────────────────

export interface TableColumn {
  key: string;
  label: string;
  placeholder?: string;
}

// ── Block config interfaces (discriminated union on "type") ────────────────

export interface TextBlock {
  id: string;
  type: "text";
  content: string;
}

export interface AudioBlock {
  id: string;
  type: "audio";
  storagePath: string;
  title: string;
  duration?: string;
  description?: string;
}

export interface VideoBlock {
  id: string;
  type: "video";
  vimeoId: string;
  title: string;
  description?: string;
}

export interface ChoiceBlock {
  id: string;
  type: "choice";
  question: string;
  options: string[];
  multi: boolean;
}

export interface FreetextBlock {
  id: string;
  type: "freetext";
  question: string;
  placeholder?: string;
  minHeight?: number;
}

export interface ScaleBlock {
  id: string;
  type: "scale";
  question: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface TableBlock {
  id: string;
  type: "table";
  columns: TableColumn[];
  initialRows?: Record<string, string>[];
  canAddRows: boolean;
}

export interface WordlistBlock {
  id: string;
  type: "wordlist";
  words: string[];
  canAddOwn: boolean;
  multi: boolean;
}

export interface AssociationBlock {
  id: string;
  type: "association";
  stimuli: string[];
}

export interface ClozeBlock {
  id: string;
  type: "cloze";
  template: string;
  gaps: string[];
}

export interface BodymapBlock {
  id: string;
  type: "bodymap";
  variant: BodymapVariant;
}

export interface VisualBlock {
  id: string;
  type: "visual";
  prompt: string;
}

export type WorkbookBlock =
  | TextBlock
  | AudioBlock
  | VideoBlock
  | ChoiceBlock
  | FreetextBlock
  | ScaleBlock
  | TableBlock
  | WordlistBlock
  | AssociationBlock
  | ClozeBlock
  | BodymapBlock
  | VisualBlock;

// ── Step and area structures ───────────────────────────────────────────────

export interface WorkbookStep {
  id: string;
  title: string;
  blocks: WorkbookBlock[];
}

export interface WorkbookArea {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  steps: WorkbookStep[];
}

// ── Answer value types (one per block type) ────────────────────────────────

export type TextValue = never;

export interface AudioValue {
  listened: boolean;
}

export interface VideoValue {
  watched: boolean;
}

export interface ChoiceValue {
  selected: string[];
}

export interface FreetextValue {
  text: string;
}

export interface ScaleValue {
  value: number;
}

export type TableRow = Record<string, string>;
export interface TableValue {
  rows: TableRow[];
}

export interface WordlistValue {
  chosen: string[];
  own: string[];
}

export interface AssociationValue {
  pairs: { stimulus: string; response: string }[];
}

export interface ClozeValue {
  answers: Record<string, string>;
}

export interface BodymapRegionData {
  quality?: BodymapQuality;
  intensity?: number;
  note?: string;
}

export interface BodymapValue {
  regions: Partial<Record<BodymapRegion, BodymapRegionData>>;
}

export interface VisualValue {
  description: string;
}

// ── Stored response (mirrors workbook_responses table row) ─────────────────

export interface WorkbookResponse {
  clientId: string;
  program: string;
  blockId: string;
  value:
    | AudioValue
    | VideoValue
    | ChoiceValue
    | FreetextValue
    | ScaleValue
    | TableValue
    | WordlistValue
    | AssociationValue
    | ClozeValue
    | BodymapValue
    | VisualValue;
  createdAt: string;
  updatedAt: string;
}
