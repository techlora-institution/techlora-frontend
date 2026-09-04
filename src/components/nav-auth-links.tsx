"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  ChevronDown,
  Clock,
  History,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const STAFF_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: Clock },
  { href: "/attendance-history", label: "Attendance History", icon: History },
  { href: "/my-performance", label: "My Performance", icon: TrendingUp },
  { href: "/my-portfolio", label: "My Portfolio", icon: Briefcase },
];

export function NavAuthLinks() {
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="hidden h-9 w-28 sm:block" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="hidden text-sm font-medium text-text-secondary hover:text-text-primary sm:block"
      >
        Staff login
      </Link>
    );
  }

  return (
    <div className="relative hidden sm:block" ref={wrapRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-text-primary transition hover:border-accent"
      >
        Dashboard
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-64 rounded-2xl border border-border bg-surface p-2 shadow-2xl">
          <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            Staff tools
          </p>
          {STAFF_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
            >
              <item.icon className="h-4 w-4 text-accent" />
              {item.label}
            </Link>
          ))}

          {user.isSuperuser && (
            <>
              <div className="my-1.5 h-px bg-border" />
              <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Admin tools
              </p>
              <Link
                href="/staff-analytics"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
              >
                <TrendingUp className="h-4 w-4 text-accent" />
                Staff Analytics
              </Link>
              <Link
                href="/admin-dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
              >
                <Users className="h-4 w-4 text-accent" />
                Manage Staff
              </Link>
              <a
                href={`${API_URL}/admin/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
              >
                <ShieldCheck className="h-4 w-4 text-accent" />
                Django Admin Panel
              </a>
            </>
          )}

          <div className="my-1.5 h-px bg-border" />
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-surface-muted"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
