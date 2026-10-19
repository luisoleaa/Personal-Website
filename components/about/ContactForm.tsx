"use client";

import { useActionState } from "react";
import { sendMessage, type SendMessageState } from "@/app/about/actions";
import PlaqueButton from "@/components/common/PlaqueButton";
import styles from "./ContactForm.module.css";

const initialState: SendMessageState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div role="status" className={styles.success}>
        <p className={styles.successTitle}>Thanks for writing.</p>
        <p className={styles.successNote}>I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="cname">Your name</label>
        <input
          id="cname"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="cemail">Your email</label>
        <input
          id="cemail"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="cmsg">Message</label>
        <textarea
          id="cmsg"
          name="message"
          rows={6}
          required
          className={styles.input}
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className={styles.error}>
          {state.message}
        </p>
      )}
      <PlaqueButton type="submit" variant="primary" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </PlaqueButton>
    </form>
  );
}
