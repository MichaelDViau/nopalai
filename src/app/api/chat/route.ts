import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { streamText, type CoreMessage } from "ai";

import { chatRequestSchema } from "@/lib/validation";
import { getMode } from "@/lib/modes";
import { modelForPlan } from "@/lib/openrouter";
import { getOrCreateProfile, planOf } from "@/lib/profile";
import { getUsage, incrementUsage, limitForPlan } from "@/lib/usage";
import {
  appendMessage,
  ensureChatOwnership,
  maybeAutoTitle,
} from "@/lib/chats";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // ---- Validate input ----
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { messages, chatId, mode } = parsed.data;

  if (!chatId) {
    return NextResponse.json(
      { error: "Falta el identificador del chat" },
      { status: 400 },
    );
  }

  // ---- Ownership ----
  const owns = await ensureChatOwnership(userId, chatId);
  if (!owns) {
    return NextResponse.json({ error: "Chat no encontrado" }, { status: 404 });
  }

  // ---- Plan + usage limit ----
  const user = await currentUser();
  const profile = await getOrCreateProfile(
    userId,
    user?.primaryEmailAddress?.emailAddress,
  );
  const plan = planOf(profile);
  const usage = await getUsage(userId, plan);

  if (usage.used >= usage.limit) {
    return NextResponse.json(
      {
        error: "limit_reached",
        message:
          plan === "premium"
            ? "Alcanzaste el límite diario de uso justo."
            : "Alcanzaste tu límite gratuito de 20 mensajes hoy. Mejora a Premium para continuar.",
        limit: usage.limit,
      },
      { status: 429 },
    );
  }

  // The last message is the new user turn.
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (lastUser) {
    await appendMessage(userId, chatId, "user", lastUser.content);
    await maybeAutoTitle(userId, chatId, lastUser.content);
  }

  // Count this turn against the daily limit.
  await incrementUsage(userId);

  const assistant = getMode(mode);
  // Only forward user/assistant turns; the system prompt is added separately.
  const coreMessages: CoreMessage[] = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  const result = streamText({
    model: modelForPlan(plan),
    system: assistant.systemPrompt,
    messages: coreMessages,
    temperature: 0.6,
    maxTokens: plan === "premium" ? 2048 : 1024,
    async onFinish({ text }) {
      if (text.trim()) {
        await appendMessage(userId, chatId, "assistant", text);
      }
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: () =>
      "Ocurrió un error al generar la respuesta. Intenta de nuevo.",
  });
}
