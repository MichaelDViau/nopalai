import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Database, Plan } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Fetch a user's profile, creating it on first access. Clerk is the source
 * of truth for identity; the profile row holds plan + billing state.
 */
export async function getOrCreateProfile(
  userId: string,
  email?: string | null,
): Promise<Profile> {
  const supabase = getSupabaseAdmin();

  const { data: existing, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (existing) return existing;

  const { data: created, error: insertError } = await supabase
    .from("profiles")
    .insert({ id: userId, email: email ?? null, plan: "free" })
    .select("*")
    .single();

  if (insertError) {
    // Handle the race where two requests insert at once.
    const { data: retry } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (retry) return retry;
    throw insertError;
  }

  return created;
}

/** Does this profile have an active (or trialing) paid subscription? */
export function hasActiveSubscription(
  profile: Pick<Profile, "subscription_status">,
): boolean {
  return (
    profile.subscription_status === "active" ||
    profile.subscription_status === "trialing"
  );
}

/**
 * The plan to grant right now. The stored plan ('plus' | 'pro') only counts
 * while the subscription is active; otherwise the user falls back to free.
 */
export function planOf(
  profile: Pick<Profile, "plan" | "subscription_status">,
): Plan {
  if (
    hasActiveSubscription(profile) &&
    (profile.plan === "plus" || profile.plan === "pro")
  ) {
    return profile.plan;
  }
  return "free";
}
