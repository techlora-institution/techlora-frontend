import Image from "next/image";
import Link from "next/link";
import type { BlogPostListItem } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent"
    >
      <div className="relative aspect-video w-full bg-surface-muted">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="/logo-zoomed-circle.png"
            alt="Techlora"
            fill
            className="object-contain p-10 opacity-40"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          {post.category}
        </span>
        <h3 className="font-heading text-lg font-bold text-text-primary">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {post.excerpt}
        </p>
        <p className="mt-5 text-xs text-text-secondary">
          {post.author_name} · {formatDate(post.published_at)}
        </p>
      </div>
    </Link>
  );
}