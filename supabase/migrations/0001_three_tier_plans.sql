-- =====================================================================
-- Migration 0001 — three-tier plans (free / plus / pro) + usage refund
-- Run this once against an existing NopalAI database. Fresh installs get
-- everything from schema.sql and do NOT need this file.
--
-- Safe to run multiple times (idempotent).
-- =====================================================================

begin;

-- 1) Migrate legacy "premium" rows to "pro". The old single paid plan granted
--    pro-level limits, so existing payers keep their access.
update public.profiles set plan = 'pro' where plan = 'premium';

-- 2) Swap the CHECK constraint to allow the three tiers.
alter table public.profiles
  drop constraint if exists profiles_plan_check;

alter table public.profiles
  add constraint profiles_plan_check check (plan in ('free', 'plus', 'pro'));

-- 3) Atomic usage refund used when generation fails before producing output.
create or replace function public.decrement_usage(p_user_id text, p_day date)
returns integer
language plpgsql
security definer
as $$
declare
  new_count integer;
begin
  update public.usage_daily
    set message_count = greatest(0, message_count - 1)
    where user_id = p_user_id and day = p_day
    returning message_count into new_count;

  return coalesce(new_count, 0);
end;
$$;

commit;
