import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="content-grid flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm text-ink">{SITE_CONFIG.name}</p>
          <p className="text-sm text-muted">{SITE_CONFIG.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {[...SITE_CONFIG.nav, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-150 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-4 text-sm text-muted">
          <li>
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-150 hover:text-ink"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={SITE_CONFIG.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-150 hover:text-ink"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <div className="content-grid border-t border-border py-4 text-xs text-muted">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  );
}
