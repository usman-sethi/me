import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "default";
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-6 overflow-hidden rounded-lg border border-border bg-surface md:grid-cols-2"
      >
        <div className="relative aspect-[3/2] md:aspect-auto">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="font-mono text-small text-muted">{project.category.replace("-", " ")}</p>
          <h3 className="mt-2 text-h2 font-display text-ink group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[55ch] text-body text-muted">{project.shortDescription}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface"
    >
      <div className="relative aspect-[3/2]">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3 font-display text-ink group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-small text-muted">{project.shortDescription}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech} className="font-mono text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
