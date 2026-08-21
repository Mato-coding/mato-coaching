-- Feedback-Formular unter /feedback (QR-Einladung nach Klassen, Workshops
-- und Einzelsitzungen). Analog zu leads/assessment_submissions: RLS an,
-- keine Public-Policy, nur der Service-Role-Key (server-seitig, umgeht RLS)
-- schreibt und liest. Keine IP, kein User-Agent.

create table public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  format text not null check (format in ('klasse', 'workshop', 'einzel')),
  rating smallint not null check (rating between 1 and 5),
  descriptors text[] not null,
  best text not null,
  improve text,
  name text,
  email text,
  contact_consent boolean not null default false,
  quote_consent boolean not null default false,
  source text,
  page_path text,
  notify_status text not null default 'pending' check (notify_status in ('pending', 'sent', 'failed'))
);

alter table public.feedback_submissions enable row level security;

-- Bewusst keine Policy: ohne Public-Policy kann RLS-gebunden (anon/authenticated)
-- weder lesen noch schreiben. Nur der Service-Role-Key (src/lib/supabase.ts,
-- getSupabaseAdmin) umgeht RLS und darf serverseitig schreiben.
