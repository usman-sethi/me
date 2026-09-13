import type { MetadataRoute } from "next";

import { getAllProjects } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_CONFIG.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_CONFIG.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_CONFIG.url}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_CONFIG.url}/playground`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.url}/now`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_CONFIG.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
