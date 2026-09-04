"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    if (!email) return;

    setLoading(true);
    try {
      await forgotPassword(email);
    } finally {
      setLoading(false);
      // Always show the same confirmation — the API never reveals
      // whether an account exists for a given Gmail ID.
      setSent(true);
    }
  }

  return (
    <section className="mx-auto max-w-sm px-6 py-20">
      <h1 className="font-heading text-2xl font-bold">Forgot password</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Enter the Gmail ID on your account and we&apos;ll send a reset link.
      </p>

      {sent ? (
        <p className="mt-6 rounded-lg bg-accent/15 px-4 py-3 text-sm font-medium text-accent">
          If an account exists with that Gmail ID, a reset link has been
          sent.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input
            name="email"
            type="email"
            placeholder="Gmail ID"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      <p className="mt-5 text-sm text-text-secondary">
        <Link href="/login" className="text-accent hover:opacity-80">
          Back to login
        </Link>
      </p>
    </section>
  );
}
