import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import { EntityCard } from "@/components/entity-card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, AI & ML solutions, UI/UX design, and more — professional services from Techlora Institution, Tiruchirappalli.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        What we offer
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Services
      </h1>

      {services.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <EntityCard
              key={service.id}
              tag="Service"
              title={service.title}
              description={service.short_description}
              href={`/services/${service.id}`}
              image={service.image}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-text-secondary">
          No services yet — add some via Django admin.
        </p>
      )}
    </section>
  );
}
