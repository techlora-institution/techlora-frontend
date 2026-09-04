"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { getStaffAnalytics, type StaffAnalyticsData } from "@/lib/api";

function StaffAnalyticsContent() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<StaffAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    getStaffAnalytics(accessToken)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const stats = [
    { label: "Total staff", value: data?.total_staff ?? "—" },
    { label: "Present today", value: data?.present_today ?? "—" },
    { label: "Absent today", value: data?.absent_today ?? "—" },
    {
      label: "Attendance (today)",
      value: data ? `${data.attendance_percentage}%` : "—",
    },
    {
      label: "Avg. hours (30 days)",
      value: data ? `${data.avg_hours}h` : "—",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Admin
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold">
        Staff analytics
      </h1>

      {loading ? (
        <p className="mt-8 text-sm text-text-secondary">Loading...</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <p className="font-heading text-2xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {data?.top_performer && (
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-surface p-6">
              {data.top_performer.profile_image ? (
                <Image
                  src={data.top_performer.profile_image}
                  alt={data.top_performer.full_name || data.top_performer.username}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {(data.top_performer.full_name || data.top_performer.username).slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Top performer
                </p>
                <p className="mt-0.5 font-heading text-lg font-bold">
                  {data.top_performer.full_name || data.top_performer.username}
                </p>
                <p className="text-sm text-text-secondary">
                  {data.top_performer.designation}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-heading text-lg font-bold">Staff ranking</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-surface-muted text-left text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Staff</th>
                    <th className="px-4 py-3 font-semibold">Designation</th>
                    <th className="px-4 py-3 font-semibold">
                      Performance score
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Attendance (30 days)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.staff_ranking ?? []).map((staff) => (
                    <tr key={staff.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">
                        {staff.full_name || staff.username}
                      </td>
                      <td className="px-4 py-3">{staff.designation}</td>
                      <td className="px-4 py-3">{staff.performance_score}</td>
                      <td className="px-4 py-3">
                        {staff.attendance_percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default function StaffAnalyticsPage() {
  return (
    <ProtectedRoute requireSuperuser>
      <StaffAnalyticsContent />
    </ProtectedRoute>
  );
}
