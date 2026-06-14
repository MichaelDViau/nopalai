/**
 * Lightweight CSRF defense for state-changing API routes.
 *
 * Browsers always attach an `Origin` header to cross-origin (and most
 * same-origin) POST/PATCH/DELETE requests. We reject any request whose
 * Origin doesn't match our own host. Combined with Clerk's SameSite
 * session cookies, this blocks forged cross-site requests. Requests with
 * no Origin at all (some non-browser clients) fall through to the normal
 * auth checks.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // no Origin header → rely on auth

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const host = req.headers.get("host");
  if (host && originHost === host) return true;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    try {
      if (originHost === new URL(appUrl).host) return true;
    } catch {
      /* ignore malformed env */
    }
  }
  return false;
}
