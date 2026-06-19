/**
 * Minimal typed schema for the Supabase tables used by NopalAI.
 * Mirrors supabase/schema.sql. Regenerate with the Supabase CLI if the
 * schema changes: `supabase gen types typescript`.
 *
 * The shape (Tables/Views/Functions/Enums/CompositeTypes + Relationships on
 * each table) must satisfy supabase-js's `GenericSchema`, otherwise the
 * typed client collapses query results to `never`.
 */

export type Plan = "free" | "plus" | "pro";
export type MessageRole = "user" | "assistant";

type ProfileInsert = {
  id: string;
  email?: string | null;
  plan?: Plan;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  subscription_status?: string | null;
  current_period_end?: string | null;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          plan: Plan;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          subscription_status: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: ProfileInsert;
        Update: Partial<ProfileInsert>;
        Relationships: [];
      };
      chats: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          mode: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          mode?: string;
        };
        Update: {
          title?: string;
          mode?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          user_id: string;
          role: MessageRole;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          user_id: string;
          role: MessageRole;
          content: string;
        };
        Update: {
          content?: string;
        };
        Relationships: [];
      };
      usage_daily: {
        Row: {
          user_id: string;
          day: string;
          message_count: number;
        };
        Insert: {
          user_id: string;
          day: string;
          message_count?: number;
        };
        Update: {
          message_count?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_usage: {
        Args: { p_user_id: string; p_day: string };
        Returns: number;
      };
      decrement_usage: {
        Args: { p_user_id: string; p_day: string };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
