"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const identifier = String(data.get("identifier") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!identifier || !password) {
      setError("Enter your username/Gmail ID and password.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await login(identifier, password);
      router.push(res.is_superuser ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("Invalid username/Gmail ID or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm px-6 py-20">
      <h1 className="font-heading text-2xl font-bold">Staff login</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Use your username or Gmail ID.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <input
          name="identifier"
          placeholder="Username or Gmail ID"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="mt-5 flex justify-between text-sm">
        <Link href="/forgot-password" className="text-accent hover:opacity-80">
          Forgot password?
        </Link>
        <Link href="/signup" className="text-accent hover:opacity-80">
          Create an account
        </Link>
      </div>
    </section>
  );
}
