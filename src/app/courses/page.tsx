import type { Metadata } from "next";
import { getCourses } from "@/lib/api";
import { EntityCard } from "@/components/entity-card";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore industry-focused courses at Techlora Institution, Trichy — Web Development, AI & Machine Learning, Data Science, and more, with real-time projects and placement support.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const courses = await getCourses().catch(() => []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Programs
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Courses
      </h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Practical, project-driven training across web development, AI/ML,
        and cloud — built by industry practitioners.
      </p>

      {courses.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <EntityCard
              key={course.id}
              tag={course.category}
              title={course.course_name}
              description={course.description}
              href={`/courses/${course.id}`}
              image={course.image}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-text-secondary">
          No courses yet — add some via Django admin or run
          `python manage.py seed_courses`.
        </p>
      )}
    </section>
  );
}
