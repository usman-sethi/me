import Link from "next/link";

import { verifySession } from "@/lib/auth/dal";
import { logout } from "@/lib/actions/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirects to /admin/login if there is no valid session. This is the
  // real authorization check — proxy.ts only does a fast optimistic
  // version of it before the request even reaches this layout.
  await verifySession();

  return (
    <div>
      <header className="border-b border-border bg-surface">
        <div className="content-grid flex h-16 items-center justify-between">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/admin" className="font-display text-ink">
              Admin
            </Link>
            <Link href="/admin/projects/new" className="text-muted hover:text-ink">
              New project
            </Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-muted hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="content-grid py-10">{children}</div>
    </div>
  );
}
