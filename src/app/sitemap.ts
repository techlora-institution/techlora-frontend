import type { MetadataRoute } from "next";
import { getCourses, getServices, getInternships, getProjects, getBlogPosts } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/courses`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/services`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/internships`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
  ].map((route) => ({ ...route, lastModified: new Date() }));

  const [courses, services, internships, projects, posts] = await Promise.all([
    getCourses().catch(() => []),
    getServices().catch(() => []),
    getInternships().catch(() => []),
    getProjects().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...courses.map((c) => ({
      url: `${siteUrl}/courses/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...internships.map((i) => ({
      url: `${siteUrl}/internships/${i.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}