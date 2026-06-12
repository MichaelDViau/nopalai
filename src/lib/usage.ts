import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { FREE_DAILY_LIMIT, PREMIUM_DAILY_LIMIT } from "@/lib/constants";
import type { Plan } from "@/types/database";

/** Mexico City day boundary (UTC-6, no DST since 2023) used for daily limits. */
export function mxToday(): string {
  const now = new Date();
  // Shift to America/Mexico_City (UTC-6) then take the date portion.
  const mx = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  return mx.toISOString().slice(0, 10);
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
  const day = mxToday();
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
  const day = mxToday();

  const { data, error } = await supabase.rpc("increment_usage", {
    p_user_id: userId,
    p_day: day,
  });

  if (error) throw error;
  return data ?? 0;
}
