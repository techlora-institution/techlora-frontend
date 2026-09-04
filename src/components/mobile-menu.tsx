"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

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

const STAFF_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: Clock },
  { href: "/attendance-history", label: "Attendance History", icon: History },
  { href: "/my-performance", label: "My Performance", icon: TrendingUp },
  { href: "/my-portfolio", label: "My Portfolio", icon: Briefcase },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => setMounted(true), []);

  // Lock background scroll while the menu is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  const overlay = open && (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/50">
      <div className="flex h-screen w-[82%] max-w-sm flex-col overflow-y-auto bg-surface p-5">
        <div className="flex items-center justify-between">
              <span className="font-heading text-lg font-bold">Menu</span>
              <button
                onClick={close}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-lg px-2 py-3 text-base font-medium text-text-primary hover:bg-surface-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="my-4 h-px bg-border" />

            {!isLoading && !user && (
              <Link
                href="/login"
                onClick={close}
                className="rounded-lg px-2 py-3 text-base font-semibold text-accent hover:bg-surface-muted"
              >
                Staff login
              </Link>
            )}

            {!isLoading && user && (
              <div className="flex flex-col gap-1">
                <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Staff tools
                </p>
                {STAFF_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-base text-text-primary hover:bg-surface-muted"
                  >
                    <item.icon className="h-4 w-4 text-accent" />
                    {item.label}
                  </Link>
                ))}

                {user.isSuperuser && (
                  <>
                    <div className="my-3 h-px bg-border" />
                    <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Admin tools
                    </p>
                    <Link
                      href="/staff-analytics"
                      onClick={close}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-base text-text-primary hover:bg-surface-muted"
                    >
                      <TrendingUp className="h-4 w-4 text-accent" />
                      Staff Analytics
                    </Link>
                    <Link
                      href="/admin-dashboard"
                      onClick={close}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-base text-text-primary hover:bg-surface-muted"
                    >
                      <Users className="h-4 w-4 text-accent" />
                      Manage Staff
                    </Link>
                    <a
                      href={`${API_URL}/admin/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-base text-text-primary hover:bg-surface-muted"
                    >
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      Django Admin Panel
                    </a>
                  </>
                )}

                <div className="my-3 h-px bg-border" />
                <button
                  onClick={() => {
                    close();
                    logout();
                  }}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-left text-base text-red-500 hover:bg-surface-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-primary"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}