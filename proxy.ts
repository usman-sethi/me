import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decryptSession } from "@/lib/auth/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next();

  // Optimistic check only — reads the cookie, does not hit the database.
  // The real check (lib/auth/dal.ts's verifySession) runs server-side on
  // every admin page and Server Action regardless of what happens here.
  const token = request.cookies.get("session")?.value;
  const session = await decryptSession(token);

  if (!session || session.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
