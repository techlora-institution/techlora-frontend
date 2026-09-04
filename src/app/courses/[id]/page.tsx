import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getSiteSettings } from "@/lib/api";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EnquireForm } from "@/components/enquire-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id).catch(() => null);

  if (!course) return { title: "Course not found" };

  return {
    title: course.course_name,
    description: course.description,
    alternates: { canonical: `/courses/${id}` },
    openGraph: {
      title: `${course.course_name} | Techlora Institution`,
      description: course.description,
      images: course.image ? [course.image] : undefined,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [course, siteSettings] = await Promise.all([
    getCourse(id).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  if (!course) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.course_name,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Techlora Institution",
    },
  };

  const hasOffer =
    course.offer_price &&
    course.fees &&
    parseFloat(course.offer_price) < parseFloat(course.fees);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {course.image && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={course.image}
            alt={course.course_name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <span className="inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
        {course.category}
      </span>
      <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
        {course.course_name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {course.duration && (
          <span className="text-sm text-text-secondary">
            {course.duration}
          </span>
        )}
        {course.offer_price && (
          <span className="font-heading text-xl font-bold text-accent">
            ₹{parseFloat(course.offer_price).toLocaleString("en-IN")}
          </span>
        )}
        {hasOffer && (
          <span className="text-sm text-text-secondary line-through">
            ₹{parseFloat(course.fees).toLocaleString("en-IN")}
          </span>
        )}
      </div>

      <p className="mt-4 whitespace-pre-line leading-relaxed text-text-secondary">
        {course.description}
      </p>

      {course.includes && (
        <div className="mt-6">
          <h2 className="font-heading text-base font-bold">
            What&apos;s included
          </h2>
          <ul className="mt-2 grid gap-1.5 text-sm text-text-secondary">
            {course.includes
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-heading text-lg font-bold">
          Interested in this course?
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Share your details and we&apos;ll get back to you.
        </p>
        <EnquireForm enquiryType="Course" entityField="course" entityId={course.id} />

        <a
          href={buildWhatsAppLink(
            siteSettings?.whatsapp_number,
            `I want to enquire about ${course.course_name}`,
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
