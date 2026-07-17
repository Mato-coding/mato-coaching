// Reine, DB-freie Hilfsfunktionen rund um Programm-Configs, Bereiche, Schritte
// und Fortschritt. Datenbankzugriffe leben in workbook-access.ts und
// workbook-responses.ts.

import type {
  WorkbookArea,
  WorkbookBlock,
  WorkbookProgram,
  WorkbookStep,
} from "@/lib/workbook-types";
import { ifsProgram } from "@/content/workbook/ifs";

const PROGRAM_REGISTRY: Record<string, WorkbookProgram> = {
  [ifsProgram.slug]: ifsProgram,
};

export function getProgram(slug: string): WorkbookProgram | undefined {
  return PROGRAM_REGISTRY[slug];
}

export function findArea(
  program: WorkbookProgram,
  areaSlug: string
): WorkbookArea | undefined {
  return program.areas.find((area) => area.slug === areaSlug);
}

export function findStep(
  area: WorkbookArea,
  stepSlug: string
): WorkbookStep | undefined {
  return area.steps.find((step) => step.slug === stepSlug);
}

// Reine text-Blöcke haben keinen value, sie zählen nicht zum Fortschritt.
export function getCountingBlocks(step: WorkbookStep): WorkbookBlock[] {
  return step.blocks.filter((block) => block.type !== "text");
}

export interface StepProgress {
  answered: number;
  total: number;
  complete: boolean;
}

export function computeStepProgress(
  step: WorkbookStep,
  answeredBlockIds: ReadonlySet<string>
): StepProgress {
  const countingBlocks = getCountingBlocks(step);
  const answered = countingBlocks.filter((block) =>
    answeredBlockIds.has(block.id)
  ).length;
  const total = countingBlocks.length;
  return { answered, total, complete: total > 0 && answered === total };
}

export interface AreaProgress {
  completedSteps: number;
  totalSteps: number;
}

export function computeAreaProgress(
  area: WorkbookArea,
  answeredBlockIds: ReadonlySet<string>
): AreaProgress {
  const totalSteps = area.steps.length;
  const completedSteps = area.steps.filter(
    (step) => computeStepProgress(step, answeredBlockIds).complete
  ).length;
  return { completedSteps, totalSteps };
}
