import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { FREE_DAILY_LIMIT, PREMIUM_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/types/database";

/**
 * Daily reset boundary for usage limits. We anchor on UTC-6 (Central
 * Latin America, e.g. CDMX) as a stable region-wide reference so the
 * counter resets at a consistent local-ish midnight across the region.
 */
export function regionToday(): string {
  const now = new Date();
  // Shift to UTC-6 then take the date portion.
  const local = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  return local.toISOString().slice(0, 10);
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
  const day = regionToday();
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
  const day = regionToday();

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
