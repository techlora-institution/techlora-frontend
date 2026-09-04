import type { Metadata } from "next";
import { getInternships } from "@/lib/api";
import { EntityCard } from "@/components/entity-card";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Hands-on internships at Techlora Institution, Trichy — Web Development, AI & Machine Learning, Data Science, and UI/UX Design, with real industry exposure.",
  alternates: { canonical: "/internships" },
};

export default async function InternshipsPage() {
  const internships = await getInternships().catch(() => []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Hands-on experience
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Internships
      </h1>

      {internships.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <EntityCard
              key={internship.id}
              tag={internship.duration}
              title={internship.internship_name}
              description={internship.description}
              href={`/internships/${internship.id}`}
              image={internship.image}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-text-secondary">
          No internships yet — add some via Django admin.
        </p>
      )}
    </section>
  );
}
