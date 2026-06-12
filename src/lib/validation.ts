import { z } from "zod";
import { isModeId } from "@/lib/modes";

/** A single chat message coming from the client. */
export const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().max(16000),
});

export const chatRequestSchema = z.object({
  // useChat sends the full transcript; we cap length to bound token cost.
  messages: z.array(messageSchema).min(1).max(60),
  chatId: z.string().uuid().optional(),
  mode: z
    .string()
    .refine((v) => isModeId(v), { message: "Modo inválido" })
    .default("general"),
});

export const renameChatSchema = z.object({
  title: z.string().trim().min(1).max(80),
});

export const createChatSchema = z.object({
  title: z.string().trim().min(1).max(80).optional(),
  mode: z.string().refine((v) => isModeId(v), { message: "Modo inválido" }),
});

/** Basic defense-in-depth sanitizer: strip C0/DEL control chars and trim. */
export function sanitizeText(input: string): string {
  // Keep tab/newline/carriage-return; drop other control characters.
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}
