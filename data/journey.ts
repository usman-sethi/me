import type { JourneyMilestone } from "@/types/journey";

/**
 * Framed by semester, not calendar dates — exact months/years for these
 * milestones aren't known, and this file should stay that way rather than
 * guessing. Update the `period` labels as real dates become known.
 */
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "started",
    period: "Getting started",
    title: "First lines of code",
    description:
      "Started learning the fundamentals of the web — HTML, CSS, and JavaScript — before formally enrolling in a degree program.",
  },
  {
    id: "university",
    period: "Semester 1–2",
    title: "Enrolled at the University of Peshawar",
    description:
      "Began coursework and started building small front-end projects alongside it, moving from static pages to interactive UI.",
  },
  {
    id: "mern",
    period: "Semester 2–3",
    title: "Picked up the MERN stack",
    description:
      "Moved from front-end-only pages to full applications: React on the client, Node.js and Express on the server, MongoDB for data.",
  },
  {
    id: "now",
    period: "Semester 3 — now",
    title: "Full stack, with TypeScript",
    description:
      "Currently a 3rd-semester student, deepening TypeScript and Next.js, and using Git and GitHub as the default workflow for every project.",
    current: true,
  },
  {
    id: "next",
    period: "Exploring next",
    title: "Cloud and infrastructure",
    description:
      "Starting to explore AWS and how full-stack applications are actually deployed, monitored, and run in production.",
  },
];
