import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-h2 font-display text-ink">New project</h1>
      <div className="mt-8">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </div>
    </div>
  );
}
