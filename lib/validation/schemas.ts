import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(80, { error: "Name is too long." }),
  email: z.email({ error: "Enter a valid email address." }).trim(),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message must be at least 10 characters." })
    .max(2000, { error: "Message is too long." }),
  // Honeypot field — real users never see or fill this input; see
  // components/contact/contact-form.tsx.
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

export const LoginFormSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim(),
  password: z.string().min(8, { error: "Password must be at least 8 characters." }),
});

export type LoginFormState = {
  status: "idle" | "error";
  message?: string;
} | undefined;

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, { error: "Title is required." }).max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(120)
    .regex(slugPattern, { error: "Use lowercase letters, numbers, and hyphens only." }),
  shortDescription: z.string().trim().min(10).max(200),
  description: z.string().trim().min(20),
  technologies: z
    .string()
    .trim()
    .min(1, { error: "List at least one technology, comma-separated." }),
  category: z.enum(["web-app", "tool", "landing-page", "experiment"]),
  imageSrc: z.url({ error: "Upload an image first." }),
  imageSrcPublicId: z.string().optional(),
  imageAlt: z.string().trim().min(3, { error: "Describe the image for screen readers." }),
  githubUrl: z.union([z.url(), z.literal("")]).optional(),
  liveUrl: z.union([z.url(), z.literal("")]).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type ProjectFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};
