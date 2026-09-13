import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/projects/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, projectSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.shortDescription,
    path: `/projects/${project.slug}`,
    imagePath: `/projects/${project.slug}/opengraph-image`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const paragraphs = project.description.split("\n\n");

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <article className="content-grid py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="text-small text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6 max-w-2xl">
          <p className="font-mono text-small text-muted">{project.category.replace("-", " ")}</p>
          <h1 className="mt-2 text-h1 font-display text-ink">{project.title}</h1>
          <p className="mt-4 text-body-lg text-muted">{project.shortDescription}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-4 text-small">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
              >
                View live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-border px-4 py-2 text-ink hover:bg-surface-elevated"
              >
                View source
              </a>
            )}
          </div>
        </header>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-border">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="max-w-[68ch]">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-4 text-body text-ink first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {project.problem && (
              <div>
                <h2 className="text-small font-medium text-muted">The problem</h2>
                <p className="mt-2 text-body text-ink">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h2 className="text-small font-medium text-muted">The approach</h2>
                <p className="mt-2 text-body text-ink">{project.solution}</p>
              </div>
            )}
            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="text-small font-medium text-muted">Features</h2>
                <ul className="mt-2 flex flex-col gap-1.5 text-body text-ink">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.challenges && (
              <div>
                <h2 className="text-small font-medium text-muted">Challenges</h2>
                <p className="mt-2 text-body text-ink">{project.challenges}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-h2 font-display text-ink">Related projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((relatedProject) => (
                <ProjectCard key={relatedProject.slug} project={relatedProject} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
