import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects, getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  const rest = getAllProjects().filter((p) => !featured.includes(p));

  if (featured.length === 0 && rest.length === 0) return null;

  return (
    <section className="content-grid py-16 md:py-24" aria-labelledby="work-heading">
      <div className="flex items-end justify-between gap-4">
        <h2 id="work-heading" className="text-h2 font-display text-ink">
          Selected work
        </h2>
        <Link
          href="/projects"
          className="hidden text-sm text-muted transition-colors duration-150 hover:text-ink md:inline-block"
        >
          All projects
        </Link>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {featured.slice(0, 1).map((project) => (
          <ProjectCard key={project.slug} project={project} variant="featured" />
        ))}

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>

      <Link
        href="/projects"
        className="mt-8 inline-block text-sm text-muted transition-colors duration-150 hover:text-ink md:hidden"
      >
        All projects
      </Link>
    </section>
  );
}
