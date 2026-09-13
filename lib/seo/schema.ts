import { SITE_CONFIG } from "@/lib/constants";
import type { Project } from "@/types/project";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: SITE_CONFIG.role,
    image: `${SITE_CONFIG.url}/avatar.png`,
    description: SITE_CONFIG.shortBio,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SITE_CONFIG.education.institution,
    },
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
    knowsAbout: [
      "Full Stack Development",
      "Web Development",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Web Design",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.shortBio,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    creator: {
      "@type": "Person",
      name: SITE_CONFIG.name,
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
    name: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.shortDescription,
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    image: `${SITE_CONFIG.url}${project.image.src}`,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    keywords: project.technologies.join(", "),
    technologies: project.technologies,
    category: project.category,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    creator: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    datePublished: project.createdAt,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.shortBio,
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${SITE_CONFIG.url}/contact`,
    },
  };
}
