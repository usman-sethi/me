import { SITE_CONFIG } from "@/lib/constants";
import type { Project } from "@/types/project";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: SITE_CONFIG.role,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SITE_CONFIG.education.institution,
    },
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    url: SITE_CONFIG.url,
  };
}

export function webPageSchema(opts: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: `${SITE_CONFIG.url}${opts.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
      url: SITE_CONFIG.url,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription ?? project.shortDescription,
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    keywords: project.technologies.join(", "),
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
  };
}
