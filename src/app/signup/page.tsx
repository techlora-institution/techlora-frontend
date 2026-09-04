"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup, ApiError } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = String(data.get("username") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const designation = String(data.get("designation") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (!username || !email || !designation || !phone || !password) {
      setError("Please fill in every field.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await signup({ username, email, designation, phone, password });
      router.push("/login?created=1");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          "Couldn't create the account — that username or Gmail ID may already be in use.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm px-6 py-20">
      <h1 className="font-heading text-2xl font-bold">Create staff account</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Use your real Gmail ID — it&apos;s how you&apos;ll recover your
        password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <input
          name="username"
          placeholder="Username"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="email"
          type="email"
          placeholder="Gmail ID"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="designation"
          placeholder="Designation (e.g. Trainer)"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="phone"
          placeholder="Phone number"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min. 8 characters)"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:opacity-80">
          Log in
        </Link>
      </p>
    </section>
  );
}
