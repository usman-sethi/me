"use client";

import { useActionState } from "react";

import { submitContactForm } from "@/lib/actions/contact";
import type { ContactFormState } from "@/lib/validation/schemas";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-md border border-border bg-surface p-6">
        <p className="text-body-lg text-ink">Message sent.</p>
        <p className="mt-1 text-body text-muted">Thanks for reaching out — I&apos;ll reply by email.</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from real visitors and skipped by screen readers via
          aria-hidden + tabIndex, not just visually via CSS. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-small font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
        {state.errors?.name && (
          <p id="name-error" className="mt-1 text-small text-danger">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-small font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-1 text-small text-danger">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-small font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className="mt-2 w-full resize-y rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1 text-small text-danger">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-small text-danger">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
