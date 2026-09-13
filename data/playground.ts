import type { PlaygroundExperiment } from "@/types/playground";

export const PLAYGROUND_EXPERIMENTS: PlaygroundExperiment[] = [
  {
    slug: "cursor-grid",
    title: "Cursor-reactive grid",
    description:
      "A grid of dots that scale based on distance to the cursor. A small proof of a smooth, GPU-friendly hover interaction — try moving your mouse over it.",
    tags: ["Motion", "SVG", "Interaction"],
    component: "cursor-grid",
  },
  {
    slug: "contrast-checker",
    title: "Contrast checker",
    description:
      "A small, real tool: type two colors and get the WCAG contrast ratio and pass/fail at AA and AAA. Built while double-checking this site's own palette.",
    tags: ["Accessibility", "Tool"],
    component: "contrast-checker",
  },
];
