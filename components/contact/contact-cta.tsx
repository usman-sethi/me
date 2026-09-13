import Link from "next/link";

import { MagneticButton } from "@/components/cursor/magnetic-button";

export function ContactCta() {
  return (
    <section className="content-grid py-16 md:py-24" aria-labelledby="contact-cta-heading">
      <div className="rounded-lg border border-border bg-surface p-10 text-center md:p-16">
        <h2 id="contact-cta-heading" className="text-h2 font-display text-ink">
          Have something worth building?
        </h2>
        <p className="mx-auto mt-3 max-w-[50ch] text-body-lg text-muted">
          Open to internships, collaborations, and small projects that are a genuine chance to
          learn something new.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Get in touch
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
