import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/api";
import { EnquireForm } from "@/components/enquire-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id).catch(() => null);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.short_description,
    alternates: { canonical: `/services/${id}` },
    openGraph: {
      title: `${service.title} | Techlora Institution`,
      description: service.short_description,
      images: service.image ? [service.image] : undefined,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getService(id).catch(() => null);

  if (!service) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      {service.image && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        {service.title}
      </h1>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-text-secondary">
        {service.short_description}
      </p>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-heading text-lg font-bold">Ask about this service</h2>
        <EnquireForm enquiryType="Service" />
      </div>
    </section>
  );
}
