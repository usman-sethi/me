import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { decryptSession } from "@/lib/auth/session";

export const SESSION_COOKIE = "session";

/**
 * The real authorization check — redirects to /admin/login if there is no
 * valid session. Cached for the lifetime of a single render pass so calling
 * it from a layout AND a page doesn't decrypt the cookie twice. Proxy.ts
 * only does the fast, optimistic version of this check; this is the one
 * that actually gates data access.
 */
export const verifySession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await decryptSession(token);

  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }

  return { isAuthenticated: true as const };
});
