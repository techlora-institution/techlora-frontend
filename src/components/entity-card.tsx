import Image from "next/image";
import Link from "next/link";

interface EntityCardProps {
  tag: string;
  title: string;
  description: string;
  href: string;
  image?: string | null;
}

export function EntityCard({
  tag,
  title,
  description,
  href,
  image,
}: EntityCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      {image && (
        <div className="relative aspect-video w-full">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          {tag}
        </span>
        <h3 className="font-heading text-lg font-bold text-text-primary">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
