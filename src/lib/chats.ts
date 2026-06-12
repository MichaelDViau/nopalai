import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { deriveChatTitle } from "@/lib/utils";
import { sanitizeText } from "@/lib/validation";
import type { Database, MessageRole } from "@/types/database";

type Chat = Database["public"]["Tables"]["chats"]["Row"];
type Message = Database["public"]["Tables"]["messages"]["Row"];

export async function listChats(userId: string): Promise<Chat[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return data ?? [];
}

export async function createChat(
  userId: string,
  mode: string,
  title?: string,
): Promise<Chat> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chats")
    .insert({ user_id: userId, mode, title: title ?? "Nuevo chat" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function getChat(
  userId: string,
  chatId: string,
): Promise<{ chat: Chat; messages: Message[] } | null> {
  const supabase = getSupabaseAdmin();
  const { data: chat, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!chat) return null;

  const { data: messages, error: msgError } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });
  if (msgError) throw msgError;

  return { chat, messages: messages ?? [] };
}

export async function renameChat(
  userId: string,
  chatId: string,
  title: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("chats")
    .update({ title: sanitizeText(title), updated_at: new Date().toISOString() })
    .eq("id", chatId)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function deleteChat(userId: string, chatId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId)
    .eq("user_id", userId);
  if (error) throw error;
}

/** Verify a chat belongs to the user (used before streaming a reply). */
export async function ensureChatOwnership(
  userId: string,
  chatId: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("chats")
    .select("id")
    .eq("id", chatId)
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(data);
}

export async function appendMessage(
  userId: string,
  chatId: string,
  role: MessageRole,
  content: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const clean = sanitizeText(content);
  const { error } = await supabase
    .from("messages")
    .insert({ user_id: userId, chat_id: chatId, role, content: clean });
  if (error) throw error;

  // Bump the chat's updated_at so it sorts to the top of history.
  await supabase
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId)
    .eq("user_id", userId);
}

/** Set the chat title from its first user message if still default. */
export async function maybeAutoTitle(
  userId: string,
  chatId: string,
  firstUserMessage: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data: chat } = await supabase
    .from("chats")
    .select("title")
    .eq("id", chatId)
    .eq("user_id", userId)
    .maybeSingle();

  if (chat && (chat.title === "Nuevo chat" || !chat.title)) {
    await supabase
      .from("chats")
      .update({ title: deriveChatTitle(firstUserMessage) })
      .eq("id", chatId)
      .eq("user_id", userId);
  }
}
