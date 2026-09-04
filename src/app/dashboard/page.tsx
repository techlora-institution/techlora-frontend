"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Clock, History, TrendingUp } from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { getDashboard, type DashboardData } from "@/lib/api";

const QUICK_LINKS = [
  { href: "/attendance", label: "Attendance", icon: Clock },
  { href: "/attendance-history", label: "Attendance History", icon: History },
  { href: "/my-performance", label: "My Performance", icon: TrendingUp },
  { href: "/my-portfolio", label: "My Portfolio", icon: Briefcase },
];

function DashboardContent() {
  const { user, accessToken } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    getDashboard(accessToken).then(setData).catch(() => setData(null));
  }, [accessToken]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Staff portal
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold">
        Welcome, {data?.staff?.full_name ?? user?.username}
      </h1>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm font-semibold text-text-primary">
          {data?.staff?.designation ?? "Staff"}
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          {data?.attendance_count ?? 0} total attendance records
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-border bg-surface p-5 text-center transition hover:border-accent"
          >
            <link.icon className="mx-auto h-6 w-6 text-accent" />
            <p className="mt-3 text-sm font-semibold text-text-primary">
              {link.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
