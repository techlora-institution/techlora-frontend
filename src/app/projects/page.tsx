import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import { EntityCard } from "@/components/entity-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real-world student projects built at Techlora Institution, Trichy — full-stack, AI/ML, IoT, and data science projects with source code and live demos.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Built by our students
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Projects
      </h1>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <EntityCard
              key={project.id}
              tag={project.category}
              title={project.title}
              description={project.short_description}
              href={`/projects/${project.id}`}
              image={project.image}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-text-secondary">
          No projects yet — add some via Django admin.
        </p>
      )}
    </section>
  );
}
