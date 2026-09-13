import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const PAGE = {
  title: "Now",
  description: "What Usman Sethi is currently focused on.",
  path: "/now",
};

export const metadata: Metadata = buildMetadata(PAGE);

// Update this date whenever the focus list below actually changes —
// it's what makes a /now page honest rather than decorative.
const LAST_UPDATED = "2026-01-01";

export default function NowPage() {
  return (
    <>
      <JsonLd data={webPageSchema(PAGE)} />
      <section className="content-grid py-16 md:py-24">
        <h1 className="text-h1 font-display text-ink">Now</h1>
        <p className="mt-2 font-mono text-small text-muted">
          Last updated{" "}
          <time dateTime={LAST_UPDATED}>
            {new Date(LAST_UPDATED).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>

        <ul className="mt-10 flex max-w-[60ch] flex-col gap-6 text-body-lg text-ink">
          <li>
            <span className="font-medium">Studying —</span>{" "}
            <span className="text-muted">
              3rd-semester coursework at the University of Peshawar.
            </span>
          </li>
          <li>
            <span className="font-medium">Deepening —</span>{" "}
            <span className="text-muted">TypeScript and the Next.js App Router.</span>
          </li>
          <li>
            <span className="font-medium">Starting to explore —</span>{" "}
            <span className="text-muted">AWS, and how full stack apps actually get deployed.</span>
          </li>
          <li>
            <span className="font-medium">Building —</span>{" "}
            <span className="text-muted">this portfolio, as a real project rather than a template.</span>
          </li>
        </ul>
      </section>
    </>
  );
}
