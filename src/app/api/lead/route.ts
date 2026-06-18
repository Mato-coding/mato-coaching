import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

// Absender und Antwortadresse
const FROM = "Mato Coaching <hello@mato-coaching.de>";
const REPLY_TO = "hello@mato-coaching.de";

// Link zum gefuehrten Breathwork-Audio.
// Sobald die echte Datei online ist, in Vercel die Variable LEAD_AUDIO_URL setzen.
const AUDIO_URL =
  process.env.LEAD_AUDIO_URL ||
  "https://www.mato-coaching.de/audio/breathwork-reset.mp3";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const consent = body.consent === true;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Bitte stimme der Verarbeitung deiner Daten zu." },
        { status: 400 }
      );
    }

    // 1. Kontakt in Supabase speichern
    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase.from("leads").insert({
      email,
      name: name || null,
      source: "lead_magnet",
      consent,
    });

    if (dbError) {
      console.error("Supabase-Fehler:", dbError);
      return NextResponse.json(
        { error: "Etwas ist schiefgelaufen. Bitte versuche es später erneut." },
        { status: 500 }
      );
    }

    // 2. Mails über Resend versenden
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const greeting = safeName ? ` ${safeName}` : "";

    // Audio-Mail an den Interessenten
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "Dein geführtes Breathwork-Audio",
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#fcfaf0;padding:32px;color:#19191a;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;padding:40px 32px;">
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hallo${greeting},</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">schön, dass du da bist. Hier ist dein geführtes Breathwork-Audio.</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">Nimm dir ein paar ruhige Minuten, setz dich bequem hin und lass dich durch die Atmung führen. Am besten mit Kopfhörern und an einem Ort, an dem du ungestört bist.</p>
            <p style="margin:0 0 28px;">
              <a href="${AUDIO_URL}" style="display:inline-block;background:#09173b;color:#fcfaf0;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:16px;">Audio anhören</a>
            </p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Wenn du magst, schreib mir gern, wie es für dich war.</p>
            <p style="font-size:16px;line-height:1.7;margin:0;">Herzlich,<br/>Lasse</p>
          </div>
          <p style="max-width:520px;margin:20px auto 0;font-size:12px;line-height:1.6;color:#6b6e72;text-align:center;">Mato Coaching · Hamburg · Diese Begleitung ersetzt keine psychotherapeutische oder ärztliche Behandlung.</p>
        </div>
      `,
    });

    // Benachrichtigung an Lasse
    const notify = process.env.LEAD_NOTIFICATION_EMAIL;
    if (notify) {
      const timestamp = new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      });
      await resend.emails.send({
        from: FROM,
        to: notify,
        replyTo: email,
        subject: "Neue Anmeldung zum Breathwork-Audio",
        html: `
          <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#19191a;">
            <h2 style="font-size:18px;margin:0 0 16px;">Neue Anmeldung über das Breathwork-Audio</h2>
            <p style="margin:0 0 8px;">Name: ${safeName || "(nicht angegeben)"}</p>
            <p style="margin:0 0 8px;">E-Mail: ${safeEmail}</p>
            <p style="margin:0;">Zeitpunkt: ${timestamp}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead-Route-Fehler:", err);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen. Bitte versuche es später erneut." },
      { status: 500 }
    );
  }
}
