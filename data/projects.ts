import type { Project } from "@/types/project";

/**
 * PLACEHOLDER DATA — replace before launch.
 *
 * These two entries exist only so every layout (featured card, grid card,
 * detail page, sitemap, JSON-LD) can be built and reviewed end to end. They
 * are deliberately labeled as samples rather than dressed up as real work —
 * swap them for real projects here, or once the database is connected,
 * manage them from /admin. See PART 15/16 of the build notes for the fields
 * each project supports.
 */
export const PROJECTS: Project[] = [
  {
    slug: "sample-project-one",
    title: "Sample Project One",
    shortDescription:
      "Placeholder entry — replace with a real project title and one-line summary.",
    description:
      "This is placeholder copy standing in for a real project description.\n\nReplace this with what the project actually does, who it's for, and what made it worth building, in your own words.",
    problem: "Describe the real problem this project addressed.",
    solution: "Describe what you built and the approach you took.",
    features: ["Replace with a real feature", "Replace with a real feature"],
    technologies: ["React", "Node.js", "MongoDB"],
    category: "web-app",
    image: {
      src: "/projects/placeholder-one.svg",
      alt: "Placeholder cover image for Sample Project One",
      width: 1200,
      height: 800,
    },
    githubUrl: "https://github.com/usman-sethi",
    featured: true,
    published: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    slug: "sample-project-two",
    title: "Sample Project Two",
    shortDescription: "Placeholder entry — replace with a real project title and one-line summary.",
    description:
      "This is placeholder copy standing in for a real project description.\n\nReplace this with what the project actually does and why it exists.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "tool",
    image: {
      src: "/projects/placeholder-two.svg",
      alt: "Placeholder cover image for Sample Project Two",
      width: 1200,
      height: 800,
    },
    githubUrl: "https://github.com/usman-sethi",
    featured: false,
    published: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS.filter((p) => p.published);
}

export function getCategories(): Project["category"][] {
  return Array.from(new Set(getAllProjects().map((p) => p.category)));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug && p.published);
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return getAllProjects()
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      project: p,
      score: p.technologies.filter((t) => project.technologies.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.project);
}
