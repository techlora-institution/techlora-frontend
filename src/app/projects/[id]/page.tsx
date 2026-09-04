import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getSiteSettings } from "@/lib/api";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EnquireForm } from "@/components/enquire-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id).catch(() => null);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      title: `${project.title} | Techlora Institution`,
      description: project.short_description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, siteSettings] = await Promise.all([
    getProject(id).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  if (!project) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      {project.image && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <span className="inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
        {project.category}
      </span>
      <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-text-secondary">
        {project.full_description || project.short_description}
      </p>

      {project.technologies && (
        <p className="mt-4 text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Built with:</span>{" "}
          {project.technologies}
        </p>
      )}

      {project.features && (
        <div className="mt-6">
          <h2 className="font-heading text-base font-bold">Features</h2>
          <p className="mt-1 whitespace-pre-line text-sm text-text-secondary">
            {project.features}
          </p>
        </div>
      )}

      {(project.github_link || project.demo_link) && (
        <div className="mt-6 flex gap-4">
          {project.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:opacity-80"
            >
              Live demo →
            </a>
          )}
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:opacity-80"
            >
              GitHub →
            </a>
          )}
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-heading text-lg font-bold">Interested in this project?</h2>
        <EnquireForm
          enquiryType="Project"
          entityField="project"
          entityId={project.id}
        />

        <a
          href={buildWhatsAppLink(
            siteSettings?.whatsapp_number,
            `I want to enquire about ${project.title}`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/10"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </section>
  );
}
