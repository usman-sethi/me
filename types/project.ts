/**
 * The Project type is intentionally the single source of truth for shape.
 * `data/projects.ts` (mock/local) and the future `lib/db/models/Project.ts`
 * (MongoDB) both produce objects that satisfy this interface, so swapping
 * the data source later does not require touching any page or component.
 */

export type ProjectCategory = "web-app" | "tool" | "landing-page" | "experiment";

export interface ProjectMedia {
  /** Cloudinary public ID or a local /public path. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Cloudinary public_id — only present for Cloudinary-hosted images, used to delete the asset if the project is removed. */
  publicId?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  /** Longer-form description, may contain multiple paragraphs (split on \n\n). */
  description: string;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: string;
  technologies: string[];
  category: ProjectCategory;
  image: ProjectMedia;
  video?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
