import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInternship, getSiteSettings } from "@/lib/api";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EnquireForm } from "@/components/enquire-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const internship = await getInternship(id).catch(() => null);

  if (!internship) return { title: "Internship not found" };

  return {
    title: internship.internship_name,
    description: internship.description,
    alternates: { canonical: `/internships/${id}` },
    openGraph: {
      title: `${internship.internship_name} | Techlora Institution`,
      description: internship.description,
      images: internship.image ? [internship.image] : undefined,
    },
  };
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [internship, siteSettings] = await Promise.all([
    getInternship(id).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  if (!internship) notFound();

  const facts = [
    { label: "Duration", value: internship.duration },
    { label: "Stipend", value: internship.stipend },
    { label: "Technologies", value: internship.technologies },
  ].filter((f) => f.value);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      {internship.image && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={internship.image}
            alt={internship.internship_name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        {internship.internship_name}
      </h1>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-text-secondary">
        {internship.description}
      </p>

      {facts.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {fact.label}
              </p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {internship.eligibility && (
        <div className="mt-6">
          <h2 className="font-heading text-base font-bold">Eligibility</h2>
          <p className="mt-1 whitespace-pre-line text-sm text-text-secondary">
            {internship.eligibility}
          </p>
        </div>
      )}

      {internship.benefits && (
        <div className="mt-6">
          <h2 className="font-heading text-base font-bold">Benefits</h2>
          <p className="mt-1 whitespace-pre-line text-sm text-text-secondary">
            {internship.benefits}
          </p>
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-heading text-lg font-bold">Apply for this internship</h2>
        <EnquireForm
          enquiryType="Internship"
          entityField="internship"
          entityId={internship.id}
        />

        <a
          href={buildWhatsAppLink(
            siteSettings?.whatsapp_number,
            `I want to apply for ${internship.internship_name}`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/10"
        >
          Apply on WhatsApp
        </a>
      </div>
    </section>
  );
}
