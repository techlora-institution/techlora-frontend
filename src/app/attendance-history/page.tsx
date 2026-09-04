"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { getAttendanceHistory, type AttendanceRecord } from "@/lib/api";

function AttendanceHistoryContent() {
  const { accessToken } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    getAttendanceHistory(accessToken)
      .then(setRecords)
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, [accessToken]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Staff portal
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold">
        Attendance history
      </h1>

      {loading ? (
        <p className="mt-8 text-sm text-text-secondary">Loading...</p>
      ) : records.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-surface-muted text-left text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Check-in</th>
                <th className="px-4 py-3 font-semibold">Check-out</th>
                <th className="px-4 py-3 font-semibold">Hours</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Salary Earned</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-t border-border">
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">
                    {record.check_in
                      ? new Date(record.check_in).toLocaleTimeString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {record.check_out
                      ? new Date(record.check_out).toLocaleTimeString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">{record.working_hours ?? "—"}</td>
                  <td className="px-4 py-3">{record.status}</td>
                  <td className="px-4 py-3">
                    {record.day_salary_earned
                      ? `₹${record.day_salary_earned}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-sm text-text-secondary">
          No attendance records yet — check in from the dashboard.
        </p>
      )}
    </section>
  );
}

export default function AttendanceHistoryPage() {
  return (
    <ProtectedRoute>
      <AttendanceHistoryContent />
    </ProtectedRoute>
  );
}
