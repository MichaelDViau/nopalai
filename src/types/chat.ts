import type { ModeId } from "@/lib/modes";

export interface ChatSummary {
  id: string;
  title: string;
  mode: string;
  created_at: string;
  updated_at: string;
}

export interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface UsageState {
  plan: "free" | "premium";
  used: number;
  limit: number;
  remaining: number;
}

export type { ModeId };
