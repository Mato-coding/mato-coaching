import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { MAIL_FROM, MAIL_REPLY_TO, isValidEmail, escapeHtml, buildParticipantMail } from "@/lib/mail";
import {
  isValidFormat,
  isValidRating,
  isValidDescriptors,
  sanitizeCustomDescriptors,
  isValidFeedbackSource,
  formatShortLabels,
  descriptorsQuestion,
  improveQuestion,
  type Format,
} from "@/lib/feedback-config";

const MAX_TEXT_LENGTH = 1000;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_PAGE_PATH_LENGTH = 200;

function truncatedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function descriptorLabels(ids: string[]): string {
  const labelById = new Map(descriptorsQuestion.options.map((o) => [o.id, o.label]));
  return ids.map((id) => labelById.get(id) ?? id).join(", ");
}

// Fehlende Werte laufen in der Benachrichtigungsmail einheitlich als
// "übersprungen" (format, descriptors, best, improve sind seit den
// überspringbaren Schritten alle optional, nur rating bleibt Pflicht).
const SKIPPED_LABEL = "übersprungen";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Explizite Typannotation nötig: body ist `any` (JSON.parse), und in
    // TypeScript kollabiert ein Ternary mit einem `any`-Zweig insgesamt zu
    // `any` statt zu "Format | null" — ohne die Annotation würde `format`
    // unten beim Indexieren von formatShortLabels wieder als `any` gelten.
    // format, descriptors und best sind seit den überspringbaren Schritten
    // optional (null bzw. leer), nur rating bleibt Pflicht.
    const format: Format | null = isValidFormat(body.format) ? body.format : null;
    const rating: number | null = isValidRating(body.rating) ? body.rating : null;

    const rawDescriptors = body.descriptors ?? [];
    if (!isValidDescriptors(rawDescriptors)) {
      return NextResponse.json(
        { error: "Ungültige Auswahl bei den Beschreibungsworten." },
        { status: 400 }
      );
    }
    const descriptors: string[] = rawDescriptors;
    const descriptorsCustom = sanitizeCustomDescriptors(body.descriptorsCustom);
    if (descriptors.length + descriptorsCustom.length > (descriptorsQuestion.maxSelect ?? Infinity)) {
      return NextResponse.json(
        { error: "Du kannst höchstens drei Worte wählen." },
        { status: 400 }
      );
    }

    const best =
      typeof body.best === "string" ? body.best.trim().slice(0, MAX_TEXT_LENGTH) : "";
    const improve =
      typeof body.improve === "string" && body.improve.trim()
        ? body.improve.trim().slice(0, MAX_TEXT_LENGTH)
        : null;

    if (!rating) {
      return NextResponse.json(
        { error: "Bitte bewerte die Stunde, um fortzufahren." },
        { status: 400 }
      );
    }
    if (improve && improve.length > improveQuestion.maxLength) {
      return NextResponse.json({ error: "Der Text ist zu lang." }, { status: 400 });
    }

    const name = truncatedString(body.name, MAX_NAME_LENGTH);
    const email = truncatedString(body.email, MAX_EMAIL_LENGTH);
    const contactConsent = body.contactConsent === true;
    const quoteConsent = body.quoteConsent === true;

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein, oder lass das Feld leer." },
        { status: 400 }
      );
    }
    if (email && !contactConsent) {
      return NextResponse.json(
        {
          error:
            "Bitte bestätige, dass ich dich kontaktieren darf, wenn du eine E-Mail-Adresse angibst.",
        },
        { status: 400 }
      );
    }

    const source = isValidFeedbackSource(body.source) ? body.source : null;
    const pagePath = truncatedString(body.pagePath, MAX_PAGE_PATH_LENGTH);
    const bestValue = best.length > 0 ? best : null;

    // 1. Feedback in Supabase speichern (zuerst, damit bei Mail-Fehlern kein
    // Feedback verloren geht).
    const supabase = getSupabaseAdmin();
    const { data: inserted, error: dbError } = await supabase
      .from("feedback_submissions")
      .insert({
        format,
        rating,
        descriptors,
        descriptors_custom: descriptorsCustom,
        best: bestValue,
        improve,
        name,
        email,
        contact_consent: contactConsent,
        quote_consent: quoteConsent,
        source,
        page_path: pagePath,
        notify_status: "pending",
        participant_mail_status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase-Fehler (Feedback):", dbError);
      return NextResponse.json(
        { error: "Etwas ist schiefgelaufen. Bitte versuche es später erneut." },
        { status: 500 }
      );
    }

    const feedbackId = inserted.id;
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 2. Benachrichtigung an Lasse. Fehler beim Versand dürfen das bereits
    // gespeicherte Feedback nicht zurückrollen, nur notify_status spiegelt
    // den Ausgang wider.
    const notify = process.env.LEAD_NOTIFICATION_EMAIL;
    let notifyStatus: "sent" | "failed" = "failed";

    if (notify) {
      const needsReply = rating <= 3 || Boolean(improve);
      const replyHint = needsReply
        ? `<p style="margin:0 0 16px;font-weight:600;">Bitte persönlich antworten</p>`
        : "";
      const timestamp = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
      const formatLabel = format ? formatShortLabels[format] : SKIPPED_LABEL;

      const wordsLine =
        descriptors.length > 0
          ? `<p style="margin:0 0 8px;">Worte: ${escapeHtml(descriptorLabels(descriptors))}</p>`
          : `<p style="margin:0 0 8px;">Worte: ${SKIPPED_LABEL}</p>`;
      const customWordsLine =
        descriptorsCustom.length > 0
          ? `<p style="margin:0 0 8px;">Eigene Worte: ${escapeHtml(descriptorsCustom.join(", "))} (eigene Worte)</p>`
          : "";

      const { error: notifyError } = await resend.emails.send({
        from: MAIL_FROM,
        to: notify,
        replyTo: email || MAIL_REPLY_TO,
        subject: `Neues Feedback: ${formatLabel}, ${rating}/5`,
        html: `
          <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#19191a;">
            ${replyHint}
            <h2 style="font-size:18px;margin:0 0 16px;">Neues Feedback über /feedback</h2>
            <p style="margin:0 0 8px;">Format: ${escapeHtml(formatLabel)}</p>
            <p style="margin:0 0 8px;">Bewertung: ${rating}/5</p>
            ${wordsLine}
            ${customWordsLine}
            <p style="margin:0 0 8px;">Hat am meisten gebracht: ${escapeHtml(bestValue || SKIPPED_LABEL)}</p>
            <p style="margin:0 0 8px;">Hätte besser gemacht: ${escapeHtml(improve || SKIPPED_LABEL)}</p>
            <p style="margin:0 0 8px;">Name: ${escapeHtml(name || "(nicht angegeben)")}</p>
            <p style="margin:0 0 8px;">E-Mail: ${escapeHtml(email || "(nicht angegeben)")}</p>
            <p style="margin:0 0 8px;">Kontakt erlaubt: ${contactConsent ? "ja" : "nein"}</p>
            <p style="margin:0 0 8px;">Als Teilnehmerstimme erlaubt: ${quoteConsent ? "ja" : "nein"}</p>
            <p style="margin:0 0 8px;">Quelle: ${escapeHtml(source || "–")}</p>
            <p style="margin:0 0 8px;">Seitenpfad: ${escapeHtml(pagePath || "–")}</p>
            <p style="margin:0;">Zeitpunkt: ${timestamp}</p>
          </div>
        `,
      });

      if (notifyError) {
        console.error("Resend-Fehler (Feedback-Benachrichtigung):", notifyError);
      } else {
        notifyStatus = "sent";
      }
    } else {
      console.warn("LEAD_NOTIFICATION_EMAIL fehlt: Feedback-Benachrichtigung wurde nicht versendet.");
    }

    // 3. Bestätigungsmail an die teilnehmende Person, nur wenn E-Mail
    // angegeben und contactConsent erteilt wurde (sonst "skipped", keine
    // Mail). Unabhängig von der Bewertung (kein Review Gating). Fehler beim
    // Versand ändern die Antwort an den Client nicht, nur
    // participant_mail_status spiegelt den Ausgang wider.
    let participantMailStatus: "sent" | "failed" | "skipped" = "skipped";

    if (email && contactConsent) {
      const audioUrl = process.env.NEXT_PUBLIC_FEEDBACK_AUDIO_URL || null;
      const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || null;
      const { subject, html, text } = buildParticipantMail({ name, audioUrl, googleReviewUrl });

      const { error: participantError } = await resend.emails.send({
        from: MAIL_FROM,
        to: email,
        replyTo: MAIL_REPLY_TO,
        subject,
        html,
        text,
      });

      if (participantError) {
        console.error("Resend-Fehler (Feedback-Teilnehmer-Mail):", participantError);
        participantMailStatus = "failed";
      } else {
        participantMailStatus = "sent";
      }
    }

    const { error: statusError } = await supabase
      .from("feedback_submissions")
      .update({ notify_status: notifyStatus, participant_mail_status: participantMailStatus })
      .eq("id", feedbackId);

    if (statusError) {
      console.error("Supabase-Fehler (Feedback-Status-Update):", statusError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback-Route-Fehler:", err);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen. Bitte versuche es später erneut." },
      { status: 500 }
    );
  }
}
