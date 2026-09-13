"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";

import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 md:flex">
      {SITE_CONFIG.nav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              className={cn(
                "relative block rounded-md px-3 py-2 text-sm transition-colors duration-150",
                isActive ? "text-ink" : "text-muted hover:text-ink",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
              {isActive && (
                <m.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-3 -bottom-px h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
