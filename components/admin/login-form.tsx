"use client";

import { useActionState } from "react";

import { login } from "@/lib/actions/auth";
import type { LoginFormState } from "@/lib/validation/schemas";

const initialState: LoginFormState = undefined;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="block text-small font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-small font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-primary"
        />
      </div>

      {state?.status === "error" && state.message && (
        <p role="alert" className="text-small text-danger">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
