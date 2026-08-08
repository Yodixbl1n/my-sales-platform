create table if not exists public.invite_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  used boolean default false,
  used_by text null,
  used_at timestamp,
  created_at timestamp default now()
);

create table if not exists public.users (
  id text primary key,
  first_name text,
  last_name text,
  username text,
  created_at timestamp default now()
);

alter table public.invite_codes enable row level security;
alter table public.users enable row level security;

create policy "Enable all for service role" on public.invite_codes
  for all using (true) with check (true);

create policy "Enable all for service role" on public.users
  for all using (true) with check (true);
