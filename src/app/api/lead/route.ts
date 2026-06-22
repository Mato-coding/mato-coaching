import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

// Absender und Antwortadresse
const FROM = "Lasse Klüver · Mato Coaching <hello@lassekluever.de>";
const REPLY_TO = "hello@lassekluever.de";

// Link zum gefuehrten Breathwork-Audio.
// Sobald die echte Datei online ist, in Vercel die Variable LEAD_AUDIO_URL setzen.
const AUDIO_URL =
  process.env.LEAD_AUDIO_URL ||
  "https://www.lassekluever.de/audio/breathwork-reset.mp3";

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
    const source = typeof body.source === "string" ? body.source : "lead_magnet";
    const pagePath = typeof body.pagePath === "string" ? body.pagePath : null;
    const referrer = typeof body.referrer === "string" ? body.referrer : null;
    const assessmentCluster =
      typeof body.assessmentCluster === "string" ? body.assessmentCluster : null;
    const assessmentResult =
      typeof body.assessmentResult === "string" ? body.assessmentResult : null;
    const userAgent = request.headers.get("user-agent") || "unbekannt";

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

    // 1. Kontakt in Supabase speichern (zuerst, damit bei Mail-Fehlern kein Kontakt verloren geht)
    const supabase = getSupabaseAdmin();
    const { data: insertedLead, error: dbError } = await supabase
      .from("leads")
      .insert({
        email,
        name: name || null,
        source,
        page_path: pagePath,
        referrer,
        assessment_cluster: assessmentCluster,
        assessment_result: assessmentResult,
        audio_email_status: "pending",
        consent,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase-Fehler:", dbError);
      return NextResponse.json(
        { error: "Etwas ist schiefgelaufen. Bitte versuche es später erneut." },
        { status: 500 }
      );
    }

    const leadId = insertedLead.id;

    // 2. Mails über Resend versenden
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const greeting = safeName ? ` ${safeName}` : "";

    // Audio-Mail an den Interessenten
    const { error: audioError } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "Dein geführtes Breathwork-Audio",
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#fcfaf0;padding:32px;color:#19191a;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;padding:40px 32px;">
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hallo${greeting},</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">schön, dass du da bist. Hier ist dein geführtes Breathwork-Audio.</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">Nimm dir einen kurzen Moment für dich und finde einen Ort, an dem du für ein paar Minuten ungestört bist. Setze dich bequem hin oder lege dich auf den Rücken und lass dich durch diese sanfte Atmung führen. Ich empfehle dir, Kopfhörer zu nutzen, um wirklich ganz einzutauchen, aber natürlich funktioniert es auch gut ohne.</p>
            <p style="margin:0 0 28px;">
              <a href="${AUDIO_URL}" style="display:inline-block;background:#09173b;color:#fcfaf0;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:16px;">Audio anhören</a>
            </p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">Schon diese kurze Übung kann dir helfen, dein Nervensystem etwas zur Ruhe zu bringen. Du würdest mir eine Freude machen, wenn du mir später schreibst und teilst, wie es dir mit der Übung ging.</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 20px;">Lieben Gruß,<br/>Lasse</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;">
              <tr>
                <td style="vertical-align:middle;padding-right:14px;">
                  <img src="https://www.lassekluever.de/portrait-lasse-sw.jpg" width="52" height="52" alt="" style="display:block;width:52px;height:52px;border-radius:50%;object-fit:cover;" />
                </td>
                <td style="vertical-align:middle;">
                  <p style="margin:0;font-size:15px;font-weight:600;color:#19191a;">Lasse Klüver</p>
                  <p style="margin:2px 0 0;font-size:13px;color:#6b6e72;">Mato Coaching · Somatic Breathwork &amp; Coaching</p>
                  <p style="margin:2px 0 0;font-size:13px;"><a href="https://www.lassekluever.de" style="color:#09173b;text-decoration:none;">www.lassekluever.de</a></p>
                </td>
              </tr>
            </table>
          </div>
          <p style="max-width:520px;margin:20px auto 0;font-size:12px;line-height:1.6;color:#6b6e72;text-align:center;">Mato Coaching von Lasse Klüver · Hamburg<br/>Diese Begleitung ersetzt keine psychotherapeutische oder ärztliche Behandlung.</p>
        </div>
      `,
    });

    if (audioError) {
      console.error("Resend-Fehler (Audio-Mail):", audioError);
    }

    // 3. Versandstatus am Lead festhalten
    const { error: statusError } = await supabase
      .from("leads")
      .update({ audio_email_status: audioError ? "failed" : "sent" })
      .eq("id", leadId);

    if (statusError) {
      console.error("Supabase-Fehler (Status-Update):", statusError);
    }

    // 4. Benachrichtigung an Lasse (best effort, blockiert nicht; läuft auch bei fehlgeschlagenem Audio-Versand)
    const notify = process.env.LEAD_NOTIFICATION_EMAIL;
    if (notify) {
      const timestamp = new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      });
      const assessmentBlock =
        assessmentCluster || assessmentResult
          ? `<p style="margin:0 0 8px;">Assessment: Cluster ${escapeHtml(
              assessmentCluster || "–"
            )}, Ergebnis ${escapeHtml(assessmentResult || "–")}</p>`
          : "";
      const { error: notifyError } = await resend.emails.send({
        from: FROM,
        to: notify,
        replyTo: email,
        subject: "Neue Anmeldung zum Breathwork-Audio",
        html: `
          <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#19191a;">
            <h2 style="font-size:18px;margin:0 0 16px;">Neue Anmeldung über das Breathwork-Audio</h2>
            <p style="margin:0 0 8px;">Name: ${safeName || "(nicht angegeben)"}</p>
            <p style="margin:0 0 8px;">E-Mail: ${safeEmail}</p>
            <p style="margin:0 0 8px;">Quelle: ${escapeHtml(source)}</p>
            <p style="margin:0 0 8px;">Seitenpfad: ${escapeHtml(pagePath || "–")}</p>
            <p style="margin:0 0 8px;">Referrer: ${escapeHtml(referrer || "–")}</p>
            ${assessmentBlock}
            <p style="margin:0 0 8px;">Gerät/Browser: ${escapeHtml(userAgent)}</p>
            <p style="margin:0 0 8px;">Audio-Versand: ${audioError ? "fehlgeschlagen" : "erfolgreich"}</p>
            <p style="margin:0;">Zeitpunkt: ${timestamp}</p>
          </div>
        `,
      });
      if (notifyError) {
        console.error("Resend-Fehler (Benachrichtigung):", notifyError);
      }
    }

    if (audioError) {
      return NextResponse.json(
        { error: "Die E-Mail konnte nicht versendet werden. Bitte versuche es später erneut." },
        { status: 502 }
      );
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