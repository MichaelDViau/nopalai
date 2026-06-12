import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { createChatSchema } from "@/lib/validation";
import { createChat, listChats } from "@/lib/chats";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const chats = await listChats(userId);
  return NextResponse.json({ chats });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const parsed = createChatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const chat = await createChat(userId, parsed.data.mode, parsed.data.title);
  return NextResponse.json({ chat }, { status: 201 });
}
