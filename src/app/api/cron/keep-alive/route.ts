import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Keep-alive-Cron fuers Supabase-Free-Projekt: haelt die DB per harmlosem Read wach,
// damit Supabase nach 7 Tagen Inaktivitaet nicht pausiert. Entfaellt nach Upgrade
// auf Supabase Pro (siehe CLAUDE.md, offene Aufgaben).
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error(
      "CRON_SECRET fehlt: Keep-alive-Cron kann nicht autorisieren, bitte Env-Variable in Vercel setzen."
    );
    return NextResponse.json({ error: "Server-Konfiguration fehlt." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("leads")
      .select("id", { head: true, count: "exact" });

    if (error) {
      console.error("Keep-alive-Cron: Supabase-Fehler:", error.message);
      return NextResponse.json({ error: "Supabase-Fehler." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keep-alive-Cron: unerwarteter Fehler:", err);
    return NextResponse.json({ error: "Unerwarteter Fehler." }, { status: 500 });
  }
}
