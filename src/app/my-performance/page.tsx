"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { getMyPerformance, type PerformanceData } from "@/lib/api";

function PerformanceContent() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    getMyPerformance(accessToken)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const stats = [
    { label: "Attendance records", value: data?.attendance_count ?? "—" },
    {
      label: "Attendance (last 30 days)",
      value: data ? `${data.attendance_percentage}%` : "—",
    },
    {
      label: "Total working hours",
      value: data ? `${data.working_hours}h` : "—",
    },
    { label: "Rank", value: data?.rank ? `#${data.rank}` : "—" },
    {
      label: "Salary this month",
      value: data ? `₹${data.salary_this_month}` : "—",
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Staff portal
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold">My performance</h1>

      {loading ? (
        <p className="mt-8 text-sm text-text-secondary">Loading...</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <p className="font-heading text-2xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function MyPerformancePage() {
  return (
    <ProtectedRoute>
      <PerformanceContent />
    </ProtectedRoute>
  );
}
