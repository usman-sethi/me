import Link from "next/link";

import { DeleteProjectForm } from "@/components/admin/delete-project-form";
import { deleteProject, togglePublish } from "@/lib/actions/projects";
import { connectToDatabase } from "@/lib/db/connect";
import { ProjectModel } from "@/lib/db/models/Project";

export default async function AdminDashboardPage() {
  let projects: Array<{
    _id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
    featured: boolean;
  }> = [];
  let connectionError: string | null = null;

  try {
    await connectToDatabase();
    const docs = await ProjectModel.find().sort({ createdAt: -1 }).lean();
    projects = docs.map((doc) => ({
      _id: String(doc._id),
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      published: doc.published,
      featured: doc.featured,
    }));
  } catch (error) {
    connectionError =
      error instanceof Error ? error.message : "Could not connect to the database.";
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-display text-ink">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          New project
        </Link>
      </div>

      {connectionError ? (
        <div className="mt-8 rounded-md border border-danger/40 bg-surface p-6">
          <p className="text-body text-ink">Database not connected.</p>
          <p className="mt-2 text-small text-muted">{connectionError}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-8 rounded-md border border-border bg-surface p-10 text-center">
          <p className="text-body-lg text-ink">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-block text-small text-primary underline"
          >
            Create your first one
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-md border border-border">
          <table className="w-full text-left text-small">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-t border-border">
                  <td className="px-4 py-3 text-ink">{project.title}</td>
                  <td className="px-4 py-3 text-muted">{project.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={project.published ? "text-secondary" : "text-muted"}
                    >
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        action={togglePublish.bind(null, project._id, !project.published)}
                      >
                        <button type="submit" className="text-muted hover:text-ink">
                          {project.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <DeleteProjectForm
                        action={deleteProject.bind(null, project._id)}
                        projectTitle={project.title}
                      >
                        <button type="submit" className="text-danger hover:underline">
                          Delete
                        </button>
                      </DeleteProjectForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
