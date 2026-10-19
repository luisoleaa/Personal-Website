"use server";

import supabase from "@/lib/supabase-client";

export type SendMessageState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(
  _prevState: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "That email address doesn't look right.",
    };
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return { status: "error", message: "That submission is too long." };
  }

  const { error } = await supabase
    .from("messages")
    .insert({ name, email, message });

  if (error) {
    console.error("[sendMessage] Supabase error:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }

  return { status: "success" };
}
