"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import {
  getMyPortfolio,
  createPortfolioItem,
  deletePortfolioItem,
  type PortfolioItem,
} from "@/lib/api";

function PortfolioContent() {
  const { accessToken } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadItems(token: string) {
    getMyPortfolio(token)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!accessToken) return;
    loadItems(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();

    if (!title) {
      setError("Give this item a title.");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await createPortfolioItem(accessToken, {
        portfolio_type: String(data.get("portfolio_type") ?? "Project"),
        title,
        technologies: String(data.get("technologies") ?? ""),
        description: String(data.get("description") ?? ""),
        project_link: String(data.get("project_link") ?? ""),
        github_link: String(data.get("github_link") ?? ""),
      });
      form.reset();
      loadItems(accessToken);
    } catch {
      setError("Couldn't save this item — please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!accessToken) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deletePortfolioItem(accessToken, id);
    } catch {
      loadItems(accessToken);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Staff portal
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold">My portfolio</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="font-heading text-lg font-bold">Add an item</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <select
            name="portfolio_type"
            defaultValue="Project"
            className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            <option value="Project">Project</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            name="title"
            placeholder="Title"
            className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>

        <input
          name="technologies"
          placeholder="Technologies used (comma-separated)"
          className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <textarea
          name="description"
          placeholder="Short description"
          rows={3}
          className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="project_link"
            placeholder="Live demo link (optional)"
            className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="github_link"
            placeholder="GitHub link (optional)"
            className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="mt-1 w-fit rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add item"}
        </button>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-text-secondary">Loading...</p>
        ) : items.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                      {item.portfolio_type}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-bold">
                      {item.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs font-medium text-text-secondary hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {item.description && (
                  <p className="mt-2 text-sm text-text-secondary">
                    {item.description}
                  </p>
                )}
                {item.technologies && (
                  <p className="mt-2 text-xs text-text-secondary">
                    {item.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            No portfolio items yet — add your first one above.
          </p>
        )}
      </div>
    </section>
  );
}

export default function MyPortfolioPage() {
  return (
    <ProtectedRoute>
      <PortfolioContent />
    </ProtectedRoute>
  );
}
