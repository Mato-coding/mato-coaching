create table public.workbook_responses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  program text not null,
  block_id text not null,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, program, block_id)
);

alter table public.workbook_responses enable row level security;

create policy "clients_select_own_responses" on public.workbook_responses
  for select using (auth.uid() = client_id);

create policy "clients_insert_own_responses" on public.workbook_responses
  for insert with check (auth.uid() = client_id);

create policy "clients_update_own_responses" on public.workbook_responses
  for update using (auth.uid() = client_id)
  with check (auth.uid() = client_id);

create table public.workbook_access (
  client_id uuid not null references auth.users(id) on delete cascade,
  program text not null,
  unlocked_areas int[] not null default '{1}',
  updated_at timestamptz not null default now(),
  primary key (client_id, program)
);

alter table public.workbook_access enable row level security;

create policy "clients_select_own_access" on public.workbook_access
  for select using (auth.uid() = client_id);
