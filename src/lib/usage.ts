import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { FREE_DAILY_LIMIT, PREMIUM_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/types/database";

// Single reference timezone for the daily-limit reset. We anchor on Mexico
// City so every user's quota rolls over at the same wall-clock moment,
// regardless of where they are in LATAM.
const RESET_TIMEZONE = "America/Mexico_City";

// `en-CA` formats as YYYY-MM-DD, which is exactly the `date` shape Postgres
// expects — and Intl handles any future DST rule changes for us.
const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: RESET_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date (YYYY-MM-DD) in the reset timezone, used for daily limits. */
export function resetDay(): string {
  return dayFormatter.format(new Date());
}

export function limitForPlan(plan: Plan): number {
  return plan === "premium" ? PREMIUM_DAILY_LIMIT : FREE_DAILY_LIMIT;
}

export interface UsageStatus {
  used: number;
  limit: number;
  remaining: number;
  day: string;
}

/** Read today's usage without mutating it (for the dashboard meter). */
export async function getUsage(userId: string, plan: Plan): Promise<UsageStatus> {
  const supabase = getSupabaseAdmin();
  const day = resetDay();
  const limit = limitForPlan(plan);

  const { data } = await supabase
    .from("usage_daily")
    .select("message_count")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();

  const used = data?.message_count ?? 0;
  return { used, limit, remaining: Math.max(0, limit - used), day };
}

/**
 * Atomically increment today's usage and return the new count. Uses a
 * Postgres function (see schema.sql) so concurrent chat requests can't
 * race past the daily limit.
 */
export async function incrementUsage(userId: string): Promise<number> {
  const supabase = getSupabaseAdmin();
  const day = resetDay();

  const { data, error } = await supabase.rpc("increment_usage", {
    p_user_id: userId,
    p_day: day,
  });

  if (error) throw error;
  return data ?? 0;
}

/**
 * Consume one message against the daily limit, race-free.
 *
 * We increment first (an atomic DB operation) and then compare, so two
 * concurrent requests can never both slip past the limit — the counter is
 * the single source of truth. Returns whether the message is allowed and
 * the resulting count.
 */
export async function consumeDailyMessage(
  userId: string,
  limit: number,
): Promise<{ allowed: boolean; used: number }> {
  const newCount = await incrementUsage(userId);
  return { allowed: newCount <= limit, used: newCount };
}
