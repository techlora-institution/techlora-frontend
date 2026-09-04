"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { NavAuthLinks } from "./nav-auth-links";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/services", label: "Services" },
  { href: "/internships", label: "Internships" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <Image
            src="/logo-zoomed-circle.png"
            alt="Techlora"
            width={56}
            height={56}
            className="h-11 w-11 flex-shrink-0 sm:h-14 sm:w-14"
          />
          <span className="font-heading text-xl font-bold tracking-tight sm:text-3xl">
            TECHLORA
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link text-sm font-medium transition-colors ${
                  isActive
                    ? "nav-link-active text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <NavAuthLinks />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}