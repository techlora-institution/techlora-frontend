"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, type LoginResponse } from "@/lib/api";

interface AuthUser {
  username: string;
  isSuperuser: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "techlora-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore the session from localStorage on first load.
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser({
          username: parsed.username,
          isSuperuser: parsed.isSuperuser,
        });
        setAccessToken(parsed.access);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  // Two things api.ts's authFetch can signal, without direct access to
  // this component's state:
  // 1. It silently refreshed the access token (routine — happens once
  //    the 30-minute access token expires but the 7-day refresh token
  //    is still valid). Sync that new token into state so every page
  //    using useAuth().accessToken picks it up immediately.
  // 2. The refresh token itself expired too (session genuinely over)
  //    — log out and send them back to /login.
  useEffect(() => {
    function handleTokenRefreshed(event: Event) {
      const newAccess = (event as CustomEvent<string>).detail;
      setAccessToken(newAccess);
    }

    function handleSessionExpired() {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem(STORAGE_KEY);
      router.push("/login");
    }

    window.addEventListener("techlora-token-refreshed", handleTokenRefreshed);
    window.addEventListener("techlora-session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener(
        "techlora-token-refreshed",
        handleTokenRefreshed,
      );
      window.removeEventListener(
        "techlora-session-expired",
        handleSessionExpired,
      );
    };
  }, [router]);

  async function login(identifier: string, password: string) {
    const res = await apiLogin(identifier, password);

    setUser({ username: res.username, isSuperuser: res.is_superuser });
    setAccessToken(res.access);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        access: res.access,
        refresh: res.refresh,
        username: res.username,
        isSuperuser: res.is_superuser,
      }),
    );

    return res;
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}
