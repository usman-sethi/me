import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllProjects, getCategories } from "@/data/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";
import type { ProjectCategory } from "@/types/project";

const PAGE = {
  title: "Projects",
  description:
    "Projects built by Usman Sethi with React, Next.js, Node.js, Express, and MongoDB — a full stack developer at the University of Peshawar.",
  path: "/projects",
};

export const metadata: Metadata = buildMetadata(PAGE);

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = getCategories();
  const activeCategory = categories.includes(category as ProjectCategory)
    ? (category as ProjectCategory)
    : undefined;

  const projects = getAllProjects().filter(
    (project) => !activeCategory || project.category === activeCategory,
  );

  return (
    <>
      <JsonLd data={webPageSchema(PAGE)} />
      <section className="content-grid py-16 md:py-24">
        <h1 className="text-h1 font-display text-ink">Projects</h1>
        <p className="mt-3 max-w-[60ch] text-body-lg text-muted">
          What&apos;s been built so far, and what it was built with.
        </p>

        <div className="mt-8">
          <ProjectFilters categories={categories} activeCategory={activeCategory} />
        </div>

        {projects.length === 0 ? (
          <div className="mt-16 rounded-md border border-border bg-surface p-10 text-center">
            <p className="text-body-lg text-ink">No projects in this category yet.</p>
            <p className="mt-2 text-body text-muted">Check back soon, or view all projects.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
