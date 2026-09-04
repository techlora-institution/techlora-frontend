import Image from "next/image";
import type { Metadata } from "next";
import {
  Award,
  Briefcase,
  BookOpen,
  Code,
  GraduationCap,
  Laptop,
  UserCheck,
} from "lucide-react";
import {
  getHero,
  getCourses,
  type HeroSection,
  type Course,
} from "@/lib/api";
import { Button } from "@/components/button";
import { EntityCard } from "@/components/entity-card";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHero().catch((): HeroSection | null => null);

  const description =
    hero?.description ||
    "Techlora Institution offers industry focused courses, internships and real-time projects designed to make you job ready from day one.";

  return {
    title: "Techlora Institution — Courses, Internships & Projects in Trichy",
    description,
    alternates: { canonical: "/" },
    openGraph: { title: "Techlora Institution", description },
  };
}

const WHY_CHOOSE = [
  { icon: Laptop, title: "Realtime Projects", description: "Build industry level applications and gain practical experience." },
  { icon: UserCheck, title: "Expert Mentors", description: "Learn directly from experienced professionals." },
  { icon: Briefcase, title: "Placement Support", description: "Career guidance and interview preparation." },
  { icon: Award, title: "Certification", description: "Recognized certificates after successful completion." },
];

// Same figures used on the About page's "Our Growing Impact" section —
// kept in sync deliberately so the numbers never disagree.
const STATS = [
  { icon: GraduationCap, value: "4+", label: "Students" },
  { icon: BookOpen, value: "40+", label: "Courses" },
  { icon: Code, value: "10+", label: "Projects" },
  { icon: Briefcase, value: "10+", label: "Internships" },
];

export default async function HomePage() {
  const [hero, courses] = await Promise.all([
    getHero().catch((): HeroSection | null => null),
    getCourses().catch((): Course[] => []),
  ]);

  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      {/* Hero — exact replica of the original neon hero */}
      <section className="hero-next">
        <div className="hero-aurora" />
        <div className="hero-grid-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="hero-next-badge">
                <span className="badge-dot" />
                {hero?.badge || "Welcome to Techlora Institution"}
              </span>

              <h1 className="hero-next-title mt-4 font-heading text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
                {hero?.title || "Build Your Career With"}{" "}
                <span className="title-gradient">
                  {hero?.highlighted_text || "Real-Time Skills"}
                </span>{" "}
                {hero?.ending_text || "Not Just Certificates"}
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
                {hero?.description ||
                  "Techlora Institution offers industry focused courses, internships and real-time projects designed to make you job ready from day one."}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a href={hero?.primary_button_url || "/courses"} className="btn-neon">
                  {hero?.primary_button_text || "Explore Courses"}
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={hero?.secondary_button_url || "https://wa.me/919962511805"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-neon"
                >
                  {hero?.secondary_button_text || "Chat On WhatsApp"}
                </a>
              </div>

              <div className="mt-7 flex flex-col gap-3 text-sm font-semibold text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <span className="hero-trust-item flex items-center gap-2">
                  <Laptop className="h-4 w-4 flex-shrink-0" /> Realtime Projects
                </span>
                <span className="hidden h-5 w-px bg-border sm:block" />
                <span className="hero-trust-item flex items-center gap-2">
                  <Award className="h-4 w-4 flex-shrink-0" /> Certified Programs
                </span>
                <span className="hidden h-5 w-px bg-border sm:block" />
                <span className="hero-trust-item flex items-center gap-2">
                  <Briefcase className="h-4 w-4 flex-shrink-0" /> Placement Support
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit orbit-1" />
              <div className="orbit orbit-2" />

              <div className="hero-img-frame">
                {hero?.hero_image ? (
                  <Image
                    src={hero.hero_image}
                    alt={hero.title || "Techlora"}
                    fill
                    className="hero-next-image object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src="/logo.png"
                    alt="Techlora"
                    fill
                    className="hero-next-image object-contain bg-white p-6"
                  />
                )}
                <div className="img-scanline" />
              </div>

              <div className="float-chip chip-1">
                <Code className="h-4 w-4" /> Python
              </div>
              <div className="float-chip chip-2">
                <GraduationCap className="h-4 w-4" /> AI &amp; ML
              </div>
              <div className="float-chip chip-3">
                <Code className="h-4 w-4" /> Fullstack
              </div>
              <div className="float-chip chip-4">
                <BookOpen className="h-4 w-4" /> Data Science
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Techlora */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Why Choose Techlora
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            Industry focused learning experience with realtime practical
            exposure.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 text-center"
            >
              <item.icon className="mx-auto h-8 w-8 text-accent" />
              <h3 className="mt-4 font-heading text-base font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats — kept identical to the About page's achievement numbers */}
        <div className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto h-7 w-7 text-accent" />
              <p className="mt-3 font-heading text-3xl font-bold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Popular
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
              Featured courses
            </h2>
          </div>
          <Button href="/courses" variant="ghost">
            View all →
          </Button>
        </div>

        {featuredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
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
          <p className="text-sm text-text-secondary">
            Courses will appear here once the backend has content — run the
            seed commands, or add some via Django admin.
          </p>
        )}
      </section>
    </>
  );
}
