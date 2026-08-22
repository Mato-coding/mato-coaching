-- Überspringbare Schritte (format, descriptors, best, improve) und eigene
-- Beschreibungsworte (descriptors) im Feedback-Formular /feedback. rating
-- bleibt Pflicht und damit NOT NULL.

alter table public.feedback_submissions
  alter column format drop not null,
  alter column best drop not null;

-- Bestehende CHECK-Constraints auf format erlauben NULL bereits implizit
-- (eine NULL-Auswertung ist in Postgres nie FALSE, der Constraint schlägt
-- also nicht fehl). Trotzdem hier explizit umformuliert, damit die Absicht
-- (NULL erlaubt, sonst nur die drei bekannten Werte) aus der Definition
-- selbst hervorgeht statt sich auf das implizite NULL-Verhalten zu
-- verlassen.
alter table public.feedback_submissions
  drop constraint feedback_submissions_format_check;

alter table public.feedback_submissions
  add constraint feedback_submissions_format_check
  check (format is null or format in ('klasse', 'workshop', 'einzel'));

-- Eigene, frei eingegebene Beschreibungsworte (bis zu drei zusammen mit den
-- festen descriptors-Optionen, geprüft serverseitig in /api/feedback).
alter table public.feedback_submissions
  add column descriptors_custom text[] not null default '{}';
