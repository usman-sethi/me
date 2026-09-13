import Link from "next/link";

import { DependencyGraph } from "@/components/hero/dependency-graph";
import { MagneticButton } from "@/components/cursor/magnetic-button";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section className="content-grid grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div className="max-w-xl">
        <h1 className="font-display">
          <span className="block text-display leading-[1.05] text-ink">{SITE_CONFIG.name}</span>
          <span className="mt-2 block text-h2 leading-tight text-muted">{SITE_CONFIG.role}</span>
        </h1>

        <p className="mt-6 max-w-[60ch] text-body-lg text-muted">
          {SITE_CONFIG.education.status} at the {SITE_CONFIG.education.institution}, building on
          the MERN stack. Still early in the process — learning, exploring, and shipping real
          projects along the way.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform duration-150"
            >
              View projects
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:bg-surface-elevated"
            >
              Get in touch
            </Link>
          </MagneticButton>
        </div>

        <div className="mt-8 flex items-center gap-5 text-sm">
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            className="text-muted underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            className="text-muted underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mx-auto aspect-square w-full max-w-md rounded-lg border border-border bg-surface p-4">
        <DependencyGraph />
      </div>
    </section>
  );
}
