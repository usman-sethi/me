import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  "web-app": "Web apps",
  tool: "Tools",
  "landing-page": "Landing pages",
  experiment: "Experiments",
};

export function ProjectFilters({
  categories,
  activeCategory,
}: {
  categories: ProjectCategory[];
  activeCategory?: ProjectCategory;
}) {
  return (
    <nav aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      <Link
        href="/projects"
        className={cn(
          "rounded-full border px-3.5 py-1.5 text-small transition-colors duration-150",
          !activeCategory
            ? "border-primary text-primary"
            : "border-border text-muted hover:text-ink",
        )}
        aria-current={!activeCategory ? "page" : undefined}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/projects?category=${category}`}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-small transition-colors duration-150",
            activeCategory === category
              ? "border-primary text-primary"
              : "border-border text-muted hover:text-ink",
          )}
          aria-current={activeCategory === category ? "page" : undefined}
        >
          {CATEGORY_LABEL[category]}
        </Link>
      ))}
    </nav>
  );
}
