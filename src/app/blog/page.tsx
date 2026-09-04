import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/api";
import { BlogCard } from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, placement stories, course updates, and tutorials from Techlora Institution, Tiruchirappalli.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Insights
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Placement stories, course updates, workshops, and tutorials from
        Techlora Institution.
      </p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-text-secondary">
          No posts published yet — add one via Django admin under Blog
          Posts.
        </p>
      )}
    </section>
  );
}