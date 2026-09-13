import { JOURNEY_MILESTONES } from "@/data/journey";

export function JourneyTimeline() {
  return (
    <section className="content-grid py-16 md:py-24" aria-labelledby="journey-heading">
      <h2 id="journey-heading" className="text-h2 font-display text-ink">
        Journey so far
      </h2>
      <p className="mt-3 max-w-[60ch] text-body text-muted">
        Framed by semester, since that&apos;s the real unit of time here — not a polished résumé
        timeline.
      </p>

      <ol className="mt-10 border-l border-border pl-6">
        {JOURNEY_MILESTONES.map((milestone) => (
          <li key={milestone.id} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper ${
                milestone.current ? "bg-primary" : "bg-border"
              }`}
              aria-hidden="true"
            />
            <p className="font-mono text-small text-muted">{milestone.period}</p>
            <h3 className="mt-1 text-h3 font-display text-ink">{milestone.title}</h3>
            <p className="mt-2 max-w-[60ch] text-body text-muted">{milestone.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
