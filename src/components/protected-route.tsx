"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function ProtectedRoute({
  children,
  requireSuperuser = false,
}: {
  children: React.ReactNode;
  requireSuperuser?: boolean;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requireSuperuser && !user.isSuperuser) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, requireSuperuser, router]);

  const blocked =
    isLoading || !user || (requireSuperuser && !user.isSuperuser);

  if (blocked) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-sm text-text-secondary">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
