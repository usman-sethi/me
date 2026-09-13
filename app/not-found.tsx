import Link from "next/link";

export default function NotFound() {
  return (
    <section className="content-grid flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-small text-muted">404</p>
      <h1 className="mt-2 text-h1 font-display text-ink">Page not found</h1>
      <p className="mx-auto mt-3 max-w-[50ch] text-body-lg text-muted">
        That page doesn&apos;t exist, or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
      >
        Back home
      </Link>
    </section>
  );
}
