"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="content-grid flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-h1 font-display text-ink">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-[50ch] text-body-lg text-muted">
        An unexpected error occurred. You can try again, or head back to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-md border border-border px-5 py-3 text-sm text-ink hover:bg-surface-elevated"
      >
        Try again
      </button>
    </section>
  );
}
