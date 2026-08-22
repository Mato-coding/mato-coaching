// mail.ts
// Gemeinsame Resend-Helfer für alle Formulare, die serverseitig Mails
// versenden (Lead-Magnet, Feedback). Vorher in src/app/api/lead/route.ts
// lokal definiert, hierher extrahiert, damit /api/feedback/route.ts dieselbe
// Absenderadresse und dieselbe HTML-Escape-Funktion nutzt statt sie zu
// duplizieren.

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
