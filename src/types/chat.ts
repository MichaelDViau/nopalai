import type { ModeId } from "@/lib/modes";
import type { PlanId } from "@/lib/constants";

export interface ChatSummary {
  id: string;
  title: string;
  mode: string;
  created_at: string;
  updated_at: string;
}

export interface UsageState {
  plan: PlanId;
  used: number;
  limit: number;
  remaining: number;
}

export type { ModeId };
