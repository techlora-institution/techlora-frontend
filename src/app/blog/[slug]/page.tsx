import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author_name],
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: "Techlora Institution" },
    image: post.cover_image || undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="text-sm font-medium text-accent hover:opacity-80"
      >
        ← Back to Blog
      </Link>

      <span className="mt-6 inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
        {post.category}
      </span>

      <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-text-secondary">
        {post.author_name} · {formatDate(post.published_at)}
      </p>

      {post.cover_image && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="blog-content mt-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-14 border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-accent"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}