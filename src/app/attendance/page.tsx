"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { checkIn, checkOut, type AttendanceRecord } from "@/lib/api";

function AttendanceCenterContent() {
  const { accessToken } = useAuth();
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [lastRecord, setLastRecord] = useState<AttendanceRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCheckIn() {
    if (!accessToken) return;
    setStatus("loading");
    try {
      const record = await checkIn(accessToken);
      setLastRecord(record);
      setMessage("Checked in — have a great day!");
    } catch {
      setMessage("Couldn't check in — please try again.");
    } finally {
      setStatus("idle");
    }
  }

  async function handleCheckOut() {
    if (!accessToken) return;
    setStatus("loading");
    try {
      const record = await checkOut(accessToken);
      setLastRecord(record);
      setMessage("Checked out — see you next time!");
    } catch {
      setMessage("Couldn't check out — make sure you've checked in today.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Staff portal
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Attendance Center
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Mark your check-in and check-out for today.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleCheckIn}
            disabled={status === "loading"}
            className="rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={status === "loading"}
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-text-primary transition hover:border-accent disabled:opacity-60"
          >
            Check Out
          </button>
        </div>

        {message && (
          <p className="mt-6 text-sm text-text-secondary">{message}</p>
        )}

        {lastRecord && (
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-text-secondary">Check-in</p>
              <p className="mt-1 font-semibold">
                {lastRecord.check_in
                  ? new Date(lastRecord.check_in).toLocaleTimeString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Check-out</p>
              <p className="mt-1 font-semibold">
                {lastRecord.check_out
                  ? new Date(lastRecord.check_out).toLocaleTimeString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Status</p>
              <p className="mt-1 font-semibold">{lastRecord.status}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Salary earned</p>
              <p className="mt-1 font-semibold">
                {lastRecord.day_salary_earned
                  ? `₹${lastRecord.day_salary_earned}`
                  : "—"}
              </p>
            </div>
          </div>
        )}
      </div>

      <Link
        href="/attendance-history"
        className="mt-6 inline-block text-sm font-medium text-accent hover:opacity-80"
      >
        View attendance history →
      </Link>
    </section>
  );
}

export default function AttendancePage() {
  return (
    <ProtectedRoute>
      <AttendanceCenterContent />
    </ProtectedRoute>
  );
}
