-- =====================================================================
-- NopalAI — Supabase schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).
-- Identity is owned by Clerk; user ids are Clerk's `user_...` strings.
-- The app talks to these tables with the service-role key from the
-- server only, so RLS is enabled and locked down by default.
-- =====================================================================

-- ---------- profiles ----------
create table if not exists public.profiles (
  id                    text primary key,            -- Clerk user id
  email                 text,
  -- 'premium' is the legacy paid tier (now mapped to 'plus' in code).
  plan                  text not null default 'free' check (plan in ('free','plus','pro','premium')),
  stripe_customer_id    text unique,
  stripe_subscription_id text,
  subscription_status   text,
  current_period_end    timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists profiles_stripe_customer_idx
  on public.profiles (stripe_customer_id);

-- Upgrading an existing database from the old ('free','premium') constraint?
-- Run this once to widen it for the Plus/Pro tiers:
--   alter table public.profiles drop constraint profiles_plan_check;
--   alter table public.profiles
--     add constraint profiles_plan_check
--     check (plan in ('free','plus','pro','premium'));

-- ---------- chats ----------
create table if not exists public.chats (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,
  title       text not null default 'Nuevo chat',
  mode        text not null default 'general',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists chats_user_updated_idx
  on public.chats (user_id, updated_at desc);

-- ---------- messages ----------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  chat_id     uuid not null references public.chats (id) on delete cascade,
  user_id     text not null,
  role        text not null check (role in ('user','assistant')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists messages_chat_idx
  on public.messages (chat_id, created_at);

-- ---------- usage_daily ----------
create table if not exists public.usage_daily (
  user_id        text not null,
  day            date not null,
  message_count  integer not null default 0,
  primary key (user_id, day)
);

-- =====================================================================
-- Atomic usage increment — prevents races past the daily limit.
-- =====================================================================
create or replace function public.increment_usage(p_user_id text, p_day date)
returns integer
language plpgsql
security definer
as $$
declare
  new_count integer;
begin
  insert into public.usage_daily (user_id, day, message_count)
  values (p_user_id, p_day, 1)
  on conflict (user_id, day)
  do update set message_count = public.usage_daily.message_count + 1
  returning message_count into new_count;

  return new_count;
end;
$$;

-- =====================================================================
-- Keep updated_at fresh on profiles.
-- =====================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- =====================================================================
-- Row Level Security
-- The server uses the service-role key which bypasses RLS. We still
-- enable RLS so the public anon key cannot read or write these tables.
-- =====================================================================
alter table public.profiles    enable row level security;
alter table public.chats       enable row level security;
alter table public.messages    enable row level security;
alter table public.usage_daily enable row level security;

-- No permissive policies for anon/authenticated => access is denied
-- unless using the service role. (Add policies here if you later adopt
-- Supabase Auth / Clerk-Supabase JWT integration.)
