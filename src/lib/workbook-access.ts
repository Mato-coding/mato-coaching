import { createClient } from "@/lib/supabase/server";

export interface WorkbookAccess {
  unlockedAreas: number[];
}

// Keine Zeile vorhanden: kein Zugang zum Programm, kein stiller Default.
export async function getWorkbookAccess(
  userId: string,
  program: string
): Promise<WorkbookAccess | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workbook_access")
    .select("unlocked_areas")
    .eq("client_id", userId)
    .eq("program", program)
    .maybeSingle();

  if (!data) return null;
  return { unlockedAreas: data.unlocked_areas ?? [] };
}

// Bereich 0 (Einstieg) ist immer offen, sobald eine Zeile existiert.
export function isAreaUnlocked(
  access: WorkbookAccess | null,
  areaIndex: number
): boolean {
  if (!access) return false;
  if (areaIndex === 0) return true;
  return access.unlockedAreas.includes(areaIndex);
}
