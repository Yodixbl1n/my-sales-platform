-- NP Sales: Схема базы данных
-- Синхронизирована с реальным кодом на 2026-08-31

-- Таблица инвайт-кодов
create table if not exists public.invite_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  type text not null default 'free' check (type in ('free', 'black')),
  used boolean default false,
  used_by text null,  -- id пользователя, который использовал код
  used_at timestamp,
  created_at timestamp default now()
);

-- Таблица пользователей
create table if not exists public.users (
  id text primary key,
  email text unique,
  password_hash text,
  name text,
  first_name text,
  last_name text,
  username text,
  invite_code text,
  free boolean default false,
  blocked boolean default false,
  modules_limit integer default 1,
  progress text default '[]',
  created_at timestamp default now()
);

-- Индексы для быстрых запросов
create index if not exists idx_invite_codes_code on public.invite_codes(code);
create index if not exists idx_invite_codes_used on public.invite_codes(used);
create index if not exists idx_users_email on public.users(email);
create index if not exists idx_users_username on public.users(username);
create index if not exists idx_users_blocked on public.users(blocked);

-- Row Level Security
alter table public.invite_codes enable row level security;
alter table public.users enable row level security;

-- Политики: разрешаем всё для service_role (используется бэкендом)
create policy "Enable all for service role" on public.invite_codes
  for all using (true) with check (true);

create policy "Enable all for service role" on public.users
  for all using (true) with check (true);
