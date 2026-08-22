-- Teilnehmer-Bestätigungsmail nach dem Absenden von /feedback (nur bei
-- angegebener E-Mail und contactConsent, siehe /api/feedback). Analog zu
-- notify_status: die Route schreibt beim Insert zunächst 'pending' und
-- danach im selben Request den finalen Wert (sent/failed/skipped).

alter table public.feedback_submissions
  add column participant_mail_status text not null default 'pending';
