"use server";

import { headers } from "next/headers";

import { connectToDatabase } from "@/lib/db/connect";
import { Message } from "@/lib/db/models/Message";
import { isRateLimited } from "@/lib/rate-limit";
import { ContactFormSchema, type ContactFormState } from "@/lib/validation/schemas";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`contact:${ip}`, 5, 10 * 60_000)) {
    return {
      status: "error",
      message: "Too many messages sent recently — try again in a few minutes.",
    };
  }

  const validated = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: fieldErrors,
    };
  }

  // Honeypot: a real visitor never fills this hidden field. A bot that
  // fills every field will trip this and get a silent "success" so it
  // doesn't learn the field is a trap.
  if (validated.data.company) {
    return { status: "success" };
  }

  const { name, email, message } = validated.data;

  try {
    await connectToDatabase();
    await Message.create({ name, email, message });
    return { status: "success" };
  } catch (error) {
    // Most commonly hit before MONGODB_URI is configured — fail loudly in
    // the server log, but keep the message to the visitor generic.
    console.error("Failed to save contact message:", error);
    return {
      status: "error",
      message: "Something went wrong on our end — please email directly instead.",
    };
  }
}
