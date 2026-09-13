"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifySession } from "@/lib/auth/dal";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/lib/db/models/Project";
import { ProjectFormSchema, type ProjectFormState } from "@/lib/validation/schemas";

function parseProjectForm(formData: FormData) {
  return ProjectFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    category: formData.get("category"),
    imageSrc: formData.get("imageSrc"),
    imageSrcPublicId: formData.get("imageSrcPublicId") || undefined,
    imageAlt: formData.get("imageAlt"),
    githubUrl: formData.get("githubUrl") || "",
    liveUrl: formData.get("liveUrl") || "",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });
}

function revalidatePublicProjectPages(slug?: string) {
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await verifySession();

  const validated = parseProjectForm(formData);
  if (!validated.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    await connectToDatabase();
    await ProjectModel.create({
      ...data,
      technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      image: {
        src: data.imageSrc,
        alt: data.imageAlt,
        width: 1200,
        height: 800,
        publicId: data.imageSrcPublicId,
      },
    });
  } catch (error) {
    console.error("Failed to create project:", error);
    return { status: "error", message: "Could not save the project. Is the slug unique?" };
  }

  revalidatePublicProjectPages(data.slug);
  redirect("/admin");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await verifySession();

  const validated = parseProjectForm(formData);
  if (!validated.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    await connectToDatabase();
    await ProjectModel.findByIdAndUpdate(id, {
      ...data,
      technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      image: {
        src: data.imageSrc,
        alt: data.imageAlt,
        width: 1200,
        height: 800,
        publicId: data.imageSrcPublicId,
      },
    });
  } catch (error) {
    console.error("Failed to update project:", error);
    return { status: "error", message: "Could not save the project." };
  }

  revalidatePublicProjectPages(data.slug);
  redirect("/admin");
}

export async function deleteProject(id: string) {
  await verifySession();

  await connectToDatabase();
  const deleted = await ProjectModel.findByIdAndDelete(id);

  if (deleted?.image?.publicId) {
    try {
      const { cloudinary } = await import("@/lib/cloudinary/config");
      await cloudinary.uploader.destroy(deleted.image.publicId);
    } catch (error) {
      // The DB record is already gone — log and move on rather than
      // failing the whole delete over an orphaned Cloudinary asset.
      console.error("Failed to delete Cloudinary asset:", error);
    }
  }

  revalidatePublicProjectPages(deleted?.slug);
  redirect("/admin");
}

export async function togglePublish(id: string, published: boolean) {
  await verifySession();

  await connectToDatabase();
  const updated = await ProjectModel.findByIdAndUpdate(id, { published }, { new: true });

  revalidatePublicProjectPages(updated?.slug);
}
