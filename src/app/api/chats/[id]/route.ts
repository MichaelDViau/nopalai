import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { isSameOrigin } from "@/lib/http";
import { renameChatSchema } from "@/lib/validation";
import { deleteChat, getChat, renameChat } from "@/lib/chats";

export const runtime = "nodejs";

const idSchema = z.string().uuid();

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const result = await getChat(userId, id);
  if (!result) {
    return NextResponse.json({ error: "Chat no encontrado" }, { status: 404 });
  }
  return NextResponse.json(result);
}

export async function PATCH(req: Request, { params }: Params) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = renameChatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Título inválido" }, { status: 400 });
  }

  await renameChat(userId, id, parsed.data.title);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await deleteChat(userId, id);
  return NextResponse.json({ ok: true });
}
