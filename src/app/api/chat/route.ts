import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { streamText, type CoreMessage } from "ai";

import { isSameOrigin } from "@/lib/http";
import { chatRequestSchema } from "@/lib/validation";
import { getMode } from "@/lib/modes";
import { modelForPlan } from "@/lib/openrouter";
import { getOrCreateProfile, planOf } from "@/lib/profile";
import {
  consumeDailyMessage,
  limitForPlan,
  refundDailyMessage,
} from "@/lib/usage";
import {
  appendMessage,
  ensureChatOwnership,
  maybeAutoTitle,
} from "@/lib/chats";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  // CSRF: reject forged cross-origin requests.
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

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

  // ---- Ownership + plan (parallel) ----
  const [owns, profile] = await Promise.all([
    ensureChatOwnership(userId, chatId),
    getOrCreateProfile(userId),
  ]);
  if (!owns) {
    return NextResponse.json({ error: "Chat no encontrado" }, { status: 404 });
  }

  const plan = planOf(profile);
  const limit = limitForPlan(plan);

  // ---- Daily limit (atomic, race-free) ----
  const { allowed } = await consumeDailyMessage(userId, limit);
  if (!allowed) {
    // We incremented to detect the breach; give that message back so the
    // counter reflects reality and the user isn't charged for a blocked turn.
    await refundDailyMessage(userId).catch(() => {});
    return NextResponse.json(
      {
        error: "limit_reached",
        message:
          plan === "free"
            ? "Alcanzaste tu límite gratuito de 20 mensajes hoy. Mejora a Plus o Pro para continuar."
            : "Alcanzaste el límite diario de uso justo.",
        limit,
      },
      { status: 429 },
    );
  }

  // Persist the new user turn before streaming so it survives a failed stream.
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (lastUser) {
    await appendMessage(userId, chatId, "user", lastUser.content);
  }

  const assistant = getMode(mode);
  const coreMessages: CoreMessage[] = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  const maxTokens = plan === "pro" ? 2048 : plan === "plus" ? 1536 : 1024;

  // Refund the consumed message at most once if generation yields nothing,
  // whether that surfaces via onError or an empty onFinish.
  let refunded = false;
  const refundOnce = async () => {
    if (refunded) return;
    refunded = true;
    await refundDailyMessage(userId).catch(() => {});
  };

  const result = streamText({
    model: modelForPlan(plan),
    system: assistant.systemPrompt,
    messages: coreMessages,
    temperature: 0.6,
    maxTokens,
    maxRetries: 2,
    // Stop generating (and stop paying) if the user navigates away.
    abortSignal: req.signal,
    async onFinish({ text }) {
      if (!text.trim()) {
        await refundOnce();
        return;
      }
      await Promise.all([
        appendMessage(userId, chatId, "assistant", text),
        lastUser
          ? maybeAutoTitle(userId, chatId, lastUser.content)
          : Promise.resolve(),
      ]);
    },
    // Provider/stream failure produced no usable answer — refund.
    onError: refundOnce,
  });

  return result.toDataStreamResponse({
    getErrorMessage: () =>
      "Ocurrió un error al generar la respuesta. Intenta de nuevo.",
  });
}
