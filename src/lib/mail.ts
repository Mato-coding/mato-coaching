// mail.ts
// Gemeinsame Resend-Helfer für alle Formulare, die serverseitig Mails
// versenden (Lead-Magnet, Feedback). Vorher in src/app/api/lead/route.ts
// lokal definiert, hierher extrahiert, damit /api/feedback/route.ts dieselbe
// Absenderadresse und dieselbe HTML-Escape-Funktion nutzt statt sie zu
// duplizieren.

import { participantMail } from "@/lib/feedback-config";

export const MAIL_FROM = "Lasse Klüver · Mato Coaching <hello@lassekluever.de>";
export const MAIL_REPLY_TO = "hello@lassekluever.de";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Farben aus design-system.md als Hex, für die schlichte Mail-Optik der
// Teilnehmer-Mail (kein Zugriff auf Tailwind-Tokens im Mail-HTML).
const MAIL_COLOR_BACKGROUND = "#fcfaf0"; // --color-background (Paper)
const MAIL_COLOR_PRIMARY = "#19191a"; // --color-primary (Ink)
const MAIL_COLOR_ACCENT = "#09173b"; // --color-accent (Navy)
const MAIL_COLOR_MUTED = "#6b6e72"; // --color-muted

function mailButtonHtml(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${MAIL_COLOR_ACCENT};color:${MAIL_COLOR_BACKGROUND};text-decoration:none;padding:12px 28px;border-radius:6px;font-size:15px;">${escapeHtml(
    label
  )}</a>`;
}

// Bestätigungsmail an die teilnehmende Person nach dem Absenden von
// /feedback (nur wenn E-Mail angegeben und contactConsent true, siehe
// /api/feedback). Texte in feedback-config.ts (participantMail), damit
// route.ts schlank bleibt. audioUrl/googleReviewUrl kommen aus den
// serverseitig gelesenen Envs NEXT_PUBLIC_FEEDBACK_AUDIO_URL/
// NEXT_PUBLIC_GOOGLE_REVIEW_URL; fehlt eine, entfällt der jeweilige Block
// ohne Platzhalter, kein stiller Fallback.
export function buildParticipantMail({
  name,
  audioUrl,
  googleReviewUrl,
}: {
  name: string | null;
  audioUrl: string | null;
  googleReviewUrl: string | null;
}): { subject: string; html: string; text: string } {
  const greeting = name
    ? participantMail.greetingNamed(name)
    : participantMail.greetingGeneric;

  const audioBlockHtml = audioUrl
    ? `
        <tr><td style="padding-top:32px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:${MAIL_COLOR_MUTED};">${escapeHtml(
            participantMail.audio.heading
          )}</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            participantMail.audio.text
          )}</p>
          ${mailButtonHtml(audioUrl, participantMail.audio.buttonLabel)}
        </td></tr>`
    : "";

  const googleBlockHtml = googleReviewUrl
    ? `
        <tr><td style="padding-top:32px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            participantMail.google.text
          )}</p>
          ${mailButtonHtml(googleReviewUrl, participantMail.google.buttonLabel)}
        </td></tr>`
    : "";

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;background:${MAIL_COLOR_BACKGROUND};padding:32px 16px;">
      <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;">
        <tr><td>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            greeting
          )}</p>
          <p style="margin:0;font-size:16px;line-height:1.6;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            participantMail.intro
          )}</p>
        </td></tr>
        ${audioBlockHtml}
        ${googleBlockHtml}
        <tr><td style="padding-top:32px;">
          <p style="margin:0;font-size:16px;line-height:1.6;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            participantMail.closingParagraph
          )}</p>
        </td></tr>
        <tr><td style="padding-top:32px;">
          <p style="margin:0;font-size:16px;color:${MAIL_COLOR_PRIMARY};">${escapeHtml(
            participantMail.signOff
          )}</p>
          <p style="margin:8px 0 0;font-size:13px;color:${MAIL_COLOR_MUTED};">${escapeHtml(
            participantMail.footer
          )}</p>
        </td></tr>
      </table>
    </div>
  `;

  const textLines = [greeting, "", participantMail.intro];
  if (audioUrl) {
    textLines.push(
      "",
      participantMail.audio.heading,
      participantMail.audio.text,
      `${participantMail.audio.buttonLabel}: ${audioUrl}`
    );
  }
  if (googleReviewUrl) {
    textLines.push(
      "",
      participantMail.google.text,
      `${participantMail.google.buttonLabel}: ${googleReviewUrl}`
    );
  }
  textLines.push(
    "",
    participantMail.closingParagraph,
    "",
    participantMail.signOff,
    participantMail.footer
  );

  return { subject: participantMail.subject, html, text: textLines.join("\n") };
}
