import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { PLAYGROUND_EXPERIMENTS } from "@/data/playground";

const EXPERIMENT_COMPONENTS: Record<string, ComponentType> = {
  "cursor-grid": dynamic(() => import("@/components/playground/experiments/cursor-grid")),
  "contrast-checker": dynamic(
    () => import("@/components/playground/experiments/contrast-checker"),
  ),
};

export function PlaygroundGrid() {
  return (
    <div className="flex flex-col gap-16">
      {PLAYGROUND_EXPERIMENTS.map((experiment) => {
        const Experiment = EXPERIMENT_COMPONENTS[experiment.component];
        return (
          <div key={experiment.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-h3 font-display text-ink">{experiment.title}</h2>
              <ul className="flex gap-2">
                {experiment.tags.map((tag) => (
                  <li key={tag} className="font-mono text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 max-w-[65ch] text-body text-muted">{experiment.description}</p>
            <div className="mt-6">{Experiment ? <Experiment /> : null}</div>
          </div>
        );
      })}
    </div>
  );
}
