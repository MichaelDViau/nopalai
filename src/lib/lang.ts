import "server-only";
import { cookies } from "next/headers";

import { type Lang, resolveLang } from "@/lib/i18n";

export const LANG_COOKIE = "lang";

/** Read the visitor's preferred language from the cookie (server-side). */
export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  return resolveLang(store.get(LANG_COOKIE)?.value);
}
