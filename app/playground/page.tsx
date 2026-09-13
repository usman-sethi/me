import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { PlaygroundGrid } from "@/components/playground/playground-grid";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

const PAGE = {
  title: "Playground",
  description:
    "UI experiments and small tools by Usman Sethi — a rawer, more experimental space than the main portfolio.",
  path: "/playground",
};

export const metadata: Metadata = buildMetadata(PAGE);

export default function PlaygroundPage() {
  return (
    <>
      <JsonLd data={webPageSchema(PAGE)} />
      <JsonLd data={breadcrumbSchema([{ name: "Playground", path: "/playground" }])} />

      <section className="content-grid py-16 md:py-24">
        <h1 className="text-h1 font-display text-ink">Playground</h1>
        <p className="mt-3 max-w-[60ch] text-body-lg text-muted">
          Smaller, rougher, and more experimental than the rest of the site — things built to
          learn something specific, not to be polished.
        </p>

        <div className="mt-14">
          <PlaygroundGrid />
        </div>
      </section>
    </>
  );
}
