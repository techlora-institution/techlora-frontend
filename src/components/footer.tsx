import Link from "next/link";
import type { SiteSettings } from "@/lib/api";

const FOOTER_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/services", label: "Services" },
  { href: "/internships", label: "Internships" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12s0-3.15-.4-4.67a2.98 2.98 0 0 0-2.1-2.1C17.98 4.83 12 4.83 12 4.83s-5.98 0-7.5.4a2.98 2.98 0 0 0-2.1 2.1C2 8.85 2 12 2 12s0 3.15.4 4.67a2.98 2.98 0 0 0 2.1 2.1c1.52.4 7.5.4 7.5.4s5.98 0 7.5-.4a2.98 2.98 0 0 0 2.1-2.1C22 15.15 22 12 22 12Zm-12 3.2V8.8l5.2 3.2-5.2 3.2Z" />
    </svg>
  );
}

export function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const socialLinks = [
    { url: siteSettings?.facebook, Icon: FacebookIcon, label: "Facebook" },
    { url: siteSettings?.instagram, Icon: InstagramIcon, label: "Instagram" },
    { url: siteSettings?.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { url: siteSettings?.youtube, Icon: YoutubeIcon, label: "YouTube" },
  ].filter((item) => item.url);

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-bold">
              {siteSettings?.institution_name ?? "Techlora"}
            </p>
            <p className="mt-2 max-w-xs text-sm text-text-secondary">
              {siteSettings?.address ?? "Trichy, Tamil Nadu"}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition hover:border-accent hover:text-accent"
                  >
                    <item.Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary">Explore</p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {siteSettings?.primary_email && (
                <li>{siteSettings.primary_email}</li>
              )}
              {siteSettings?.primary_phone && (
                <li>{siteSettings.primary_phone}</li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-text-secondary">
          © {new Date().getFullYear()}{" "}
          {siteSettings?.institution_name ?? "Techlora"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}