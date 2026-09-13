import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/lib/db/models/Project";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const project = await ProjectModel.findById(id).lean();
  if (!project) notFound();

  const boundUpdateProject = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-h2 font-display text-ink">Edit project</h1>
      <div className="mt-8">
        <ProjectForm
          action={boundUpdateProject}
          submitLabel="Save changes"
          defaultValues={{
            title: project.title,
            slug: project.slug,
            shortDescription: project.shortDescription,
            description: project.description,
            technologies: project.technologies,
            category: project.category,
            image: project.image,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            featured: project.featured,
            published: project.published,
          }}
        />
      </div>
    </div>
  );
}
