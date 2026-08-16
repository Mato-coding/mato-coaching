import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Cluster, ResultRoute } from "@/lib/assessment-config";

const VALID_CLUSTERS: Cluster[] = ["exhaustion", "tension", "panic", "mixed"];
const VALID_ROUTES: ResultRoute[] = ["ready", "almost", "not_yet"];

// answers kommt vom Client als Objekt questionId -> Antwort-ID (string) bzw.
// Antwort-IDs (string[], bei der Mehrfachauswahl-Frage q4). Kein voller
// Schema-Check gegen assessment-config.ts (Fragen ändern sich), aber eine
// plausible Grobstruktur statt beliebiger Nutzerdaten: ein Objekt mit einer
// begrenzten Anzahl an Einträgen, deren Werte Strings oder String-Arrays
// begrenzter Größe sind.
const MAX_ANSWER_ENTRIES = 20;
const MAX_ANSWER_ARRAY_LENGTH = 20;

function isPlausibleAnswers(value: unknown): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0 || entries.length > MAX_ANSWER_ENTRIES) return false;

  return entries.every(([, answer]) => {
    if (typeof answer === "string") return true;
    if (Array.isArray(answer)) {
      return (
        answer.length <= MAX_ANSWER_ARRAY_LENGTH &&
        answer.every((item) => typeof item === "string")
      );
    }
    return false;
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cluster = VALID_CLUSTERS.includes(body.cluster) ? (body.cluster as Cluster) : null;
    const route = VALID_ROUTES.includes(body.route) ? (body.route as ResultRoute) : null;

    if (!cluster || !route) {
      return NextResponse.json(
        { error: "Ungültiger Cluster oder Route." },
        { status: 400 }
      );
    }

    const answers = isPlausibleAnswers(body.answers) ? body.answers : null;

    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase.from("assessment_submissions").insert({
      cluster,
      result_route: route,
      answers,
    });

    if (dbError) {
      console.error("Supabase-Fehler (Assessment):", dbError);
      return NextResponse.json(
        { error: "Etwas ist schiefgelaufen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Assessment-Route-Fehler:", err);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen." },
      { status: 500 }
    );
  }
}
