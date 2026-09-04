import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Bot,
  BookOpen,
  Briefcase,
  Brain,
  Clock,
  Code,
  GraduationCap,
  Handshake,
  Languages,
  Laptop,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  Phone,
  PenTool,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { getAbout, getSiteSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Techlora Institution, Tiruchirappalli — an ISO 9001:2015 certified technology training institute founded to make quality education practical, transparent, and career-oriented.",
  alternates: { canonical: "/about" },
};

const CORE_VALUES = [
  { icon: Handshake, title: "Transparency", description: "Building trust through honest communication, clear expectations and ethical practices." },
  { icon: Award, title: "Quality Education", description: "Delivering practical, industry-relevant and outcome-driven learning experiences." },
  { icon: GraduationCap, title: "Student Success", description: "Prioritizing confidence, growth, employability and career success." },
  { icon: ShieldCheck, title: "Integrity", description: "Maintaining professionalism, honesty and responsibility." },
  { icon: Star, title: "Excellence", description: "Constantly striving for the highest standards in training and support." },
  { icon: Lightbulb, title: "Empowerment", description: "Equipping students with skills, knowledge and confidence." },
];

const WHY_CHOOSE_LEFT = [
  "Transparent and Student-Centric Learning Environment",
  "Affordable Fees Without Compromising Quality",
  "Industry-Focused Training From Basic To Advanced Levels",
  "Experienced Faculty With Practical Expertise",
  "Real-Time Projects For Hands-On Learning",
];

const WHY_CHOOSE_RIGHT = [
  "Dedicated Placement Training And Career Guidance",
  "Resume Building And Interview Preparation",
  "Spoken English And Aptitude Training",
  "Freelancing Opportunities And Portfolio Building",
  "Continuous Mentorship And Student Support",
];

const DOMAINS = [
  { icon: Laptop, title: "Software Development", description: "Full Stack, Python Full Stack, MERN Stack, MEAN Stack, Web Development." },
  { icon: Brain, title: "Artificial Intelligence", description: "AI, Machine Learning, Deep Learning, Data Science, Data Analytics." },
  { icon: PenTool, title: "Design & Multimedia", description: "Graphic Design, Video Editing, UI UX, Creative Design." },
  { icon: Megaphone, title: "Digital Marketing", description: "SEO, Social Media Marketing, Branding, Campaign Management." },
  { icon: Languages, title: "Career Development", description: "Spoken English, Aptitude, Soft Skills, Communication." },
  { icon: Bot, title: "Emerging Technologies", description: "Robotics, IoT, Research Projects, Future Technologies." },
];

const BEYOND_TRAINING = [
  "Internship Programs", "Real-Time Project Training", "Academic Projects",
  "Mini & Final Year Projects", "IoT Project Development", "Resume Building",
  "Interview Preparation", "Career Guidance", "Placement Assistance",
  "Freelancing Opportunities", "Skill Development Workshops",
];

const DEPARTMENTS = [
  { icon: Code, title: "Development", description: "Software Development, AI, Data Science, Web Applications." },
  { icon: Palette, title: "Design", description: "UI UX, Branding, Graphic Design." },
  { icon: TrendingUp, title: "Marketing", description: "Digital Marketing, Promotions, Brand Growth." },
  { icon: Users, title: "Management", description: "Operations, Student Success, Placements." },
];

const ACHIEVEMENTS = [
  { icon: GraduationCap, value: "4+", label: "Students" },
  { icon: BookOpen, value: "40+", label: "Courses" },
  { icon: Code, value: "10+", label: "Projects" },
  { icon: Briefcase, value: "10+", label: "Internships" },
];

const TECH_STACK = [
  "Python", "Django", "Flask", "React JS", "JavaScript", "HTML5", "CSS3",
  "Bootstrap", "Tailwind CSS", "MySQL", "PostgreSQL", "Git & GitHub",
  "Machine Learning", "Deep Learning", "Artificial Intelligence",
  "Data Science", "Data Analytics", "Digital Marketing", "Graphic Design", "Robotics",
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8889172794643!2d78.6761226!3d10.8198122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5e9263601d5%3A0xbf929df04da20052!2sTechlora%20Institution!5e0!3m2!1sen!2sin!4v1780730553096!5m2!1sen!2sin";

function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
        {badge}
      </span>
      <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}

export default async function AboutPage() {
  const [about, siteSettings] = await Promise.all([
    getAbout().catch(() => ({ founder: null, staff: [] })),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
          ISO 9001:2015 Certified Technology Institution
        </span>
        <h1 className="mt-5 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          Learn. Build. <span className="text-accent">Innovate.</span>
        </h1>
        <p className="mt-5 text-text-secondary">
          Techlora Institution empowers students through practical learning,
          industry-focused training, real-time projects, internships,
          placement support and career transformation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore Courses
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-accent"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <SectionHeader badge="Company Introduction" title="About Techlora Institution" />
        <div className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-8 text-text-secondary leading-relaxed">
          <p>
            Techlora Institution is a startup technology training and skill
            development institute established in 2026 in Tiruchirappalli,
            Tamil Nadu, India.
          </p>
          <p>
            As an ISO 9001:2015 certified organization, we provide
            industry-focused training programs designed to equip students
            with job-ready technical and professional skills.
          </p>
          <p>
            Our learning approach combines expert-led training, hands-on
            projects, career guidance, placement support and freelancing
            opportunities to help students gain practical experience and
            succeed in today&apos;s competitive technology industry.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              Our Story
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold">
              Why Techlora Was Started
            </h2>
            <div className="mt-4 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Techlora Institution was founded with a vision to make
                quality education more accessible, practical and
                transparent for every student.
              </p>
              <p>
                We observed that many learners invest significant time,
                effort and money into education with the hope of building a
                successful career, yet often struggle to find proper
                guidance, industry exposure and opportunities.
              </p>
              <p>
                This inspired us to create an institution that focuses not
                only on teaching technical concepts but also on helping
                students develop real-world skills, confidence and career
                readiness.
              </p>
              <p>
                Techlora was established to build trust, create
                opportunities and empower students to achieve their
                professional goals through honest and meaningful learning
                experiences.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8">
            <Image
              src="/logo.png"
              alt="Techlora Institution"
              width={300}
              height={300}
              className="mx-auto h-auto w-full max-w-[240px]"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <Target className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-heading text-xl font-bold">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              To provide quality, industry-focused training that equips
              students with technical skills, interview readiness,
              resume-building expertise, aptitude training and spoken
              English proficiency.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Through real-time projects, practical learning and
              transparent guidance, we empower students to become confident
              professionals and achieve successful careers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <Rocket className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-heading text-xl font-bold">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              To be recognized as Tiruchirappalli&apos;s most trusted
              technology training institute, empowering students with
              quality education, real-world experience and career
              opportunities while upholding transparency, excellence and
              trust.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <SectionHeader badge="Founder Message" title="Meet Our Founder" />
        <div className="mt-8 grid gap-8 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-[280px_1fr]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            {about.founder?.photo ? (
              <Image
                src={about.founder.photo}
                alt={about.founder.name}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/logo.png"
                alt="Founder"
                fill
                className="object-contain bg-white p-6"
              />
            )}
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold">
              {about.founder?.name || "Rasiga Priya James"}
            </h3>
            <p className="mt-1 font-semibold text-accent">
              {about.founder?.designation ||
                "B.Sc | Founder & Managing Director"}
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
              <p>
                At Techlora Institution, we believe education should be
                practical, transparent and career-oriented.
              </p>
              <p>
                Every student deserves access to quality learning, industry
                exposure and the confidence needed to build a successful
                future.
              </p>
              <p>
                Our vision is to bridge the gap between academic knowledge
                and industry requirements through hands-on training,
                real-time projects, internships, placement support and
                continuous mentorship.
              </p>
              <p>
                Techlora is not just a training institution. It is a
                platform for growth, empowerment and career transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader
          badge="Our Team"
          title="Meet The Team Behind Techlora"
          subtitle="The trainers and mentors who build our courses, projects and internships."
        />
        {about.staff.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.staff.map((member) => {
              const displayName = member.full_name || member.username;
              return (
              <div
                key={member.id}
                className="rounded-2xl border border-border bg-surface p-6 text-center"
              >
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                  {member.profile_image ? (
                    <Image
                      src={member.profile_image}
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-accent/15 text-lg font-semibold text-accent">
                      {displayName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h4 className="mt-4 font-heading text-base font-bold">
                  {displayName}
                </h4>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                  {member.designation}
                </p>
                <p className="mt-3 text-xs italic text-text-secondary">
                  Portfolio coming soon.
                </p>
              </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-text-secondary">
            Team profiles will be published here soon.
          </p>
        )}
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader badge="Our Values" title="Core Values That Drive Us" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <value.icon className="h-7 w-7 text-accent" />
              <h4 className="mt-3 font-heading text-base font-bold">
                {value.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Techlora */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <SectionHeader badge="Why Choose Us" title="Why Choose Techlora?" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[...WHY_CHOOSE_LEFT, ...WHY_CHOOSE_RIGHT].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="text-sm text-text-primary">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Domains We Train */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader badge="Training Programs" title="Domains We Train" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <div
              key={domain.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <domain.icon className="h-7 w-7 text-accent" />
              <h4 className="mt-3 font-heading text-base font-bold">
                {domain.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond Training */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <SectionHeader badge="Career Support" title="Beyond Training" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {BEYOND_TRAINING.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Our Departments */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader badge="Departments" title="Our Departments" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.title}
              className="rounded-2xl border border-border bg-surface p-6 text-center"
            >
              <dept.icon className="mx-auto h-7 w-7 text-accent" />
              <h4 className="mt-3 font-heading text-base font-bold">
                {dept.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader
          badge="Techlora Stats"
          title="Our Growing Impact"
          subtitle="Building careers through practical learning, internships and industry exposure."
        />
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-surface p-6 text-center"
            >
              <item.icon className="mx-auto h-7 w-7 text-accent" />
              <p className="mt-3 font-heading text-3xl font-bold">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <SectionHeader badge="Technology Stack" title="Technologies We Teach" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contact & Location */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <SectionHeader badge="Contact Us" title="Visit Techlora Institution" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-sm text-text-secondary">
                {siteSettings?.address ||
                  "1/1, Rajarathinam Pillai Street, Woraiyur, Tiruchirappalli, Tamil Nadu, India"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-sm text-text-secondary">
                {siteSettings?.primary_phone || "+91 99625 11805"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-sm text-text-secondary">
                {siteSettings?.primary_email ||
                  "techlorainstitution2026@gmail.com"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-sm text-text-secondary">
                Mon – Sat &middot; 9:00 AM – 7:00 PM
              </p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Techlora+Institution+Trichy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Get Directions
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src={MAP_EMBED_SRC}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Techlora Institution location"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Ready to start your journey with Techlora?
        </h2>
        <p className="mt-4 text-text-secondary">
          Explore our courses, internships, projects and career development
          opportunities designed for future professionals.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore Courses
          </Link>
          <a
            href={`https://wa.me/${(siteSettings?.whatsapp_number || "919962511805").replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-accent"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </>
  );
}
