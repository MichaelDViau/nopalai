import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { getOrCreateProfile, planOf } from "@/lib/profile";
import { getUsage } from "@/lib/usage";

export const runtime = "nodejs";

// Polled by the dashboard usage meter, so keep it cheap. The profile (and its
// email) is created on first dashboard load, so we deliberately skip the extra
// `currentUser()` round-trip to Clerk here and just read the existing row.
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const profile = await getOrCreateProfile(userId);
  const plan = planOf(profile);
  const usage = await getUsage(userId, plan);

  return NextResponse.json({ plan, ...usage });
}
