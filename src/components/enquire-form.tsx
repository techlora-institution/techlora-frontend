"use client";

import { useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/api";

interface EnquireFormProps {
  enquiryType: string;
  entityField?: "course" | "internship" | "project";
  entityId?: number;
}

export function EnquireForm({
  enquiryType,
  entityField,
  entityId,
}: EnquireFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !phone || !email) {
      setError("Please fill in your name, phone, and email.");
      return;
    }

    setError(null);
    setStatus("loading");

    try {
      await submitEnquiry({
        enquiry_type: enquiryType,
        name,
        phone,
        email,
        message,
        ...(entityField && entityId ? { [entityField]: entityId } : {}),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-4 rounded-lg bg-accent/15 px-4 py-3 text-sm font-medium text-accent">
        Thanks — we&apos;ve received your enquiry and will reach out soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Your name"
          className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <input
          name="phone"
          placeholder="Phone number"
          className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Email address"
        className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
      <textarea
        name="message"
        placeholder="Anything you'd like us to know?"
        rows={3}
        className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit enquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
