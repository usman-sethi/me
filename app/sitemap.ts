import type { MetadataRoute } from "next";

import { getAllProjects } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { 
      url: SITE_CONFIG.url, 
      lastModified: today,
      changeFrequency: "weekly", 
      priority: 1.0 
    },
    { 
      url: `${SITE_CONFIG.url}/projects`, 
      lastModified: today,
      changeFrequency: "weekly", 
      priority: 0.95 
    },
    { 
      url: `${SITE_CONFIG.url}/about`, 
      lastModified: today,
      changeFrequency: "monthly", 
      priority: 0.8 
    },
    { 
      url: `${SITE_CONFIG.url}/contact`, 
      lastModified: today,
      changeFrequency: "yearly", 
      priority: 0.7 
    },
    { 
      url: `${SITE_CONFIG.url}/playground`, 
      lastModified: today,
      changeFrequency: "monthly", 
      priority: 0.6 
    },
    { 
      url: `${SITE_CONFIG.url}/now`, 
      lastModified: today,
      changeFrequency: "weekly", 
      priority: 0.5 
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects()
    .filter((project) => project.published)
    .map((project) => ({
      url: `${SITE_CONFIG.url}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.85 : 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}
