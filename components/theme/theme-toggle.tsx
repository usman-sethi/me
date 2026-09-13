"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink transition-colors duration-150 hover:bg-surface-elevated focus-visible:outline-none",
        className,
      )}
    >
      {/* Render both icons and swap visibility only after mount to avoid a
          server/client mismatch — the button is still fully functional
          (and correctly labeled) before hydration finishes. */}
      <Sun className={cn("h-4 w-4", mounted && isDark ? "hidden" : "block")} aria-hidden="true" />
      <Moon className={cn("h-4 w-4", mounted && isDark ? "block" : "hidden")} aria-hidden="true" />
    </button>
  );
}
