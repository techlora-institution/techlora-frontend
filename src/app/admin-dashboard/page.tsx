"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { getAdminDashboard, type AdminDashboardData } from "@/lib/api";

function AdminDashboardContent() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    getAdminDashboard(accessToken)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const stats = [
    { label: "Total staff", value: data?.total_staff ?? "—" },
    { label: "Present today", value: data?.present_today ?? "—" },
    { label: "Total enquiries", value: data?.total_enquiries ?? "—" },
    { label: "Pending enquiries", value: data?.pending_enquiries ?? "—" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Admin
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">
            Admin dashboard
          </h1>
        </div>
        <Link
          href="/staff-analytics"
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:border-accent"
        >
          Staff analytics →
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-text-secondary">Loading...</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
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

          <div className="mt-10">
            <h2 className="font-heading text-lg font-bold">Staff</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[500px] text-sm">
                <thead className="bg-surface-muted text-left text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Username</th>
                    <th className="px-4 py-3 font-semibold">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.staff_list ?? []).map((staff) => (
                    <tr key={staff.id} className="border-t border-border">
                      <td className="px-4 py-3">{staff.full_name || staff.username}</td>
                      <td className="px-4 py-3">{staff.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-heading text-lg font-bold">
              Recent enquiries
            </h2>
            <div className="mt-4 space-y-3">
              {(data?.recent_enquiries ?? []).map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                      {enquiry.name} · {enquiry.enquiry_type}
                    </p>
                    <span
                      className={
                        enquiry.is_resolved
                          ? "text-xs font-medium text-accent"
                          : "text-xs font-medium text-text-secondary"
                      }
                    >
                      {enquiry.is_resolved ? "Resolved" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {enquiry.email} · {enquiry.phone}
                  </p>
                  {enquiry.message && (
                    <p className="mt-2 text-sm text-text-secondary">
                      {enquiry.message}
                    </p>
                  )}
                </div>
              ))}
              {data?.recent_enquiries.length === 0 && (
                <p className="text-sm text-text-secondary">
                  No enquiries yet.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireSuperuser>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
