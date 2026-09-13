import { SITE_CONFIG } from "@/lib/constants";

export function ContactDetails() {
  return (
    <div>
      <h2 className="text-h3 font-display text-ink">Find him elsewhere</h2>
      <ul className="mt-4 flex flex-col gap-3 text-body text-muted">
        <li>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-border underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-border underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      <p className="mt-6 max-w-[45ch] text-small text-muted">
        Usually replies within a few days. For anything urgent, LinkedIn is the faster route.
      </p>
    </div>
  );
}
