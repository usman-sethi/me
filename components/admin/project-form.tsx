"use client";

import { useActionState } from "react";

import { ImageUploader } from "@/components/admin/image-uploader";
import type { ProjectFormState } from "@/lib/validation/schemas";
import type { Project } from "@/types/project";

const initialState: ProjectFormState = { status: "idle" };

interface ProjectFormProps {
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  defaultValues?: Partial<Project>;
  submitLabel: string;
}

export function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <Field label="Title" name="title" defaultValue={defaultValues?.title} errors={state.errors} />
      <Field
        label="Slug"
        name="slug"
        defaultValue={defaultValues?.slug}
        errors={state.errors}
        hint="Lowercase, hyphenated — becomes /projects/your-slug"
      />
      <Field
        label="Short description"
        name="shortDescription"
        defaultValue={defaultValues?.shortDescription}
        errors={state.errors}
      />

      <div>
        <label htmlFor="description" className="block text-small font-medium text-ink">
          Full description
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={defaultValues?.description}
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
        {state.errors?.description && (
          <p className="mt-1 text-small text-danger">{state.errors.description[0]}</p>
        )}
      </div>

      <Field
        label="Technologies"
        name="technologies"
        defaultValue={defaultValues?.technologies?.join(", ")}
        errors={state.errors}
        hint="Comma-separated, e.g. React, Node.js, MongoDB"
      />

      <div>
        <label htmlFor="category" className="block text-small font-medium text-ink">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? "web-app"}
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink"
        >
          <option value="web-app">Web app</option>
          <option value="tool">Tool</option>
          <option value="landing-page">Landing page</option>
          <option value="experiment">Experiment</option>
        </select>
      </div>

      <ImageUploader name="imageSrc" defaultValue={defaultValues?.image?.src} />
      <Field
        label="Image alt text"
        name="imageAlt"
        defaultValue={defaultValues?.image?.alt}
        errors={state.errors}
      />

      <Field label="GitHub URL" name="githubUrl" defaultValue={defaultValues?.githubUrl} errors={state.errors} />
      <Field label="Live URL" name="liveUrl" defaultValue={defaultValues?.liveUrl} errors={state.errors} />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-small text-ink">
          <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-small text-ink">
          <input type="checkbox" name="published" defaultChecked={defaultValues?.published} />
          Published
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-small text-danger">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  errors,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  errors?: Record<string, string[]>;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-small font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
      />
      {hint && <p className="mt-1 text-small text-muted">{hint}</p>}
      {errors?.[name] && <p className="mt-1 text-small text-danger">{errors[name][0]}</p>}
    </div>
  );
}
