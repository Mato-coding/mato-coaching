# Zusatz-Auftrag: Versandstatus des Audios am Lead

Für Claude Code. Ergänzt die Lead-Route. SQL ist bereits ausgeführt:
`alter table public.leads add column if not exists audio_email_status text default 'pending';`

## Änderung in `src/app/api/lead/route.ts`

Ziel: pro Lead festhalten, ob die Audio-Mail erfolgreich versendet wurde.

1. Beim Insert in `leads` das Feld `audio_email_status: "pending"` mitsetzen und die erzeugte Zeile mit ihrer `id` zurückgeben lassen (`.insert({ ... }).select("id").single()`).
2. Nach dem Versuch, die Audio-Mail über Resend zu senden:
   - Wenn Resend einen Fehler zurückgibt: die Zeile per `update({ audio_email_status: "failed" }).eq("id", <id>)` aktualisieren und wie bisher mit Status 502 antworten.
   - Wenn der Versand erfolgreich war: `update({ audio_email_status: "sent" }).eq("id", <id>)`.
3. In der Benachrichtigungsmail an Lasse eine Zeile ergänzen, z. B. "Audio-Versand: erfolgreich" bzw. "fehlgeschlagen".

Hinweis: "sent" bedeutet, dass Resend die Mail angenommen hat. Eine echte Zustellbestätigung ("delivered", also im Postfach angekommen) wäre nur über einen Resend-Webhook möglich und ist NICHT Teil dieses Auftrags.

Reihenfolge beibehalten: Der Lead wird weiterhin ZUERST gespeichert, damit kein Kontakt verloren geht, falls der Versand scheitert.
