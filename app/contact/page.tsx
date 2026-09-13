import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const PAGE = {
  title: "Contact",
  description: "Get in touch with Usman Sethi — full stack web developer at the University of Peshawar.",
  path: "/contact",
};

export const metadata: Metadata = buildMetadata(PAGE);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema(PAGE)} />
      <section className="content-grid py-16 md:py-24">
        <h1 className="text-h1 font-display text-ink">Get in touch</h1>
        <p className="mt-3 max-w-[60ch] text-body-lg text-muted">
          Whether it&apos;s a project, an internship, or just a question about something he built —
          the form below reaches him directly.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
          <ContactForm />
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
