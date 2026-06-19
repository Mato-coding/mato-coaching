import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cluster = typeof body.cluster === "string" ? body.cluster : null;
    const route = typeof body.route === "string" ? body.route : null;
    const answers = body.answers ?? null;

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
