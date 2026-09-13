import Link from "next/link";

import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavLinks } from "@/components/navigation/nav-links";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SITE_CONFIG } from "@/lib/constants";

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-paper/85 backdrop-blur">
      <div className="content-grid flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-base font-medium text-ink">
          {SITE_CONFIG.name}
        </Link>

        <div className="flex items-center gap-2">
          <NavLinks />
          <Link
            href="/contact"
            className="hidden rounded-md border border-border px-3 py-2 text-sm text-ink transition-colors duration-150 hover:bg-surface-elevated md:inline-block"
          >
            Get in touch
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
