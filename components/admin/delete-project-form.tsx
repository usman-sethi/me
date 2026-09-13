"use client";

import type { ReactNode } from "react";

export function DeleteProjectForm({
  action,
  projectTitle,
  children,
}: {
  action: () => Promise<void>;
  projectTitle: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${projectTitle}"? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
