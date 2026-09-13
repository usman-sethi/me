"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { verifyPassword } from "@/lib/auth/password";
import { SESSION_COOKIE } from "@/lib/auth/dal";
import { encryptSession } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";
import { LoginFormSchema, type LoginFormState } from "@/lib/validation/schemas";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`login:${ip}`)) {
    return { status: "error", message: "Too many attempts. Try again in a minute." };
  }

  const validated = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { status: "error", message: "Enter a valid email and password." };
  }

  const { email, password } = validated.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not set.");
    return { status: "error", message: "Admin login isn't configured yet." };
  }

  // Constant-time-ish: always run bcrypt.compare even on email mismatch,
  // so response timing doesn't reveal whether the email was correct.
  const passwordMatches = await verifyPassword(password, adminPasswordHash);
  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();

  if (!emailMatches || !passwordMatches) {
    return { status: "error", message: "Invalid email or password." };
  }

  const token = await encryptSession({ role: "admin" });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + SEVEN_DAYS_MS),
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
