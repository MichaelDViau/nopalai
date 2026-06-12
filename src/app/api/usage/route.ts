import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { getOrCreateProfile, planOf } from "@/lib/profile";
import { getUsage } from "@/lib/usage";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const user = await currentUser();
  const profile = await getOrCreateProfile(
    userId,
    user?.primaryEmailAddress?.emailAddress,
  );
  const plan = planOf(profile);
  const usage = await getUsage(userId, plan);

  return NextResponse.json({ plan, ...usage });
}
