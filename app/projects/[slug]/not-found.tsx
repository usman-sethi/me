import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="content-grid py-24 text-center">
      <h1 className="text-h1 font-display text-ink">Project not found</h1>
      <p className="mx-auto mt-3 max-w-[50ch] text-body-lg text-muted">
        That project doesn&apos;t exist, or isn&apos;t published yet.
      </p>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm text-ink hover:bg-surface-elevated"
      >
        Back to projects
      </Link>
    </section>
  );
}
