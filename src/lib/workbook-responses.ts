import { createClient } from "@/lib/supabase/server";

// Antworten eines Klienten für eine Menge von Block-IDs, als Map block_id -> value.
// Ein fehlender Key heißt: der Block ist noch nicht beantwortet.
export async function getResponseValues(
  userId: string,
  program: string,
  blockIds: string[]
): Promise<Record<string, unknown>> {
  if (blockIds.length === 0) return {};

  const supabase = await createClient();
  const { data } = await supabase
    .from("workbook_responses")
    .select("block_id, value")
    .eq("client_id", userId)
    .eq("program", program)
    .in("block_id", blockIds);

  const result: Record<string, unknown> = {};
  for (const row of data ?? []) {
    result[row.block_id as string] = row.value;
  }
  return result;
}
