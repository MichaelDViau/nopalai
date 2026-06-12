import { auth, currentUser } from "@clerk/nextjs/server";

import { getOrCreateProfile, planOf } from "@/lib/profile";
import { getUsage } from "@/lib/usage";
import { listChats } from "@/lib/chats";
import { ChatApp } from "@/components/dashboard/chat-app";
import type { ChatSummary, UsageState } from "@/types/chat";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  // Layout already guards, but keep TypeScript + safety happy.
  if (!userId) return null;

  const user = await currentUser();
  const profile = await getOrCreateProfile(
    userId,
    user?.primaryEmailAddress?.emailAddress,
  );
  const plan = planOf(profile);

  const [chatsRaw, usage] = await Promise.all([
    listChats(userId),
    getUsage(userId, plan),
  ]);

  const chats: ChatSummary[] = chatsRaw.map((c) => ({
    id: c.id,
    title: c.title,
    mode: c.mode,
    created_at: c.created_at,
    updated_at: c.updated_at,
  }));

  const usageState: UsageState = {
    plan,
    used: usage.used,
    limit: usage.limit,
    remaining: usage.remaining,
  };

  return <ChatApp initialChats={chats} initialUsage={usageState} />;
}
