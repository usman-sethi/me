import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";

export function AboutPreview() {
  return (
    <section className="content-grid py-16 md:py-24" aria-labelledby="about-heading">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-start">
        <div>
          <h2 id="about-heading" className="text-h2 font-display text-ink">
            Still early, and building anyway
          </h2>
          <p className="mt-4 max-w-[65ch] text-body-lg text-muted">
            Usman is a {SITE_CONFIG.education.status.toLowerCase()} at the{" "}
            {SITE_CONFIG.education.institution}, working through the MERN stack one real project
            at a time. The goal right now isn&apos;t to look finished — it&apos;s to keep shipping
            things that work, understand why they work, and get better at the parts that
            didn&apos;t.
          </p>
        </div>
        <div>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm text-ink transition-colors duration-150 hover:bg-surface-elevated"
          >
            Read the full story
          </Link>
        </div>
      </div>
    </section>
  );
}
