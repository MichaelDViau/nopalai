import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a short, human-friendly title from the first user message. */
export function deriveChatTitle(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "Nuevo chat";
  return cleaned.length > 48 ? `${cleaned.slice(0, 48)}…` : cleaned;
}
