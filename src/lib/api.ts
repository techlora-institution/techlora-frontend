const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Public content changes rarely — safe to cache briefly and let
    // pages opt out (revalidate: 0) where they need fresher data.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `Request to ${path} failed (${res.status})`);
  }

  // DELETE (and some POST) endpoints return 204 No Content — no body
  // to parse, so res.json() would throw.
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------
// Types (mirrors core/serializers.py)
// ---------------------------------------------------------

export interface SiteSettings {
  institution_name: string;
  primary_email: string;
  primary_phone: string;
  whatsapp_number: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  [key: string]: unknown;
}

export interface HeroSection {
  badge: string;
  title: string;
  highlighted_text: string;
  ending_text: string;
  description: string;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;
  hero_image: string | null;
  is_active: boolean;
}

export interface HomepageStatistic {
  id: number;
  label: string;
  value: string;
  is_active: boolean;
}

export interface Course {
  id: number;
  category: string;
  course_name: string;
  duration: string;
  fees: string;
  offer_price: string;
  description: string;
  includes: string | null;
  image: string | null;
  is_available: boolean;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  short_description: string;
  image: string | null;
}

export interface Internship {
  id: number;
  internship_name: string;
  technologies: string;
  duration: string;
  stipend: string;
  eligibility: string;
  benefits: string;
  description: string;
  image: string | null;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string;
  short_description: string;
  full_description: string;
  features: string;
  deployment_details: string;
  github_link: string | null;
  demo_link: string | null;
  image: string | null;
}

export interface Founder {
  name: string;
  designation: string;
  photo: string | null;
  message: string;
  experience: number;
  linkedin: string;
  email: string;
}

export interface StaffProfile {
  id: number;
  username: string;
  full_name: string;
  email: string;
  is_superuser: boolean;
  designation: string;
  phone: string;
  profile_image: string | null;
  joining_date: string;
  students_handling: number;
  projects_involved: number;
  internships_handling: number;
  performance_score: number;
}

export interface AboutData {
  founder: Founder | null;
  staff: StaffProfile[];
}

// ---------------------------------------------------------
// Public content
// ---------------------------------------------------------

export const getSiteSettings = () => apiFetch<SiteSettings>("/site-settings/");
export const getHero = () => apiFetch<HeroSection>("/hero/");
export const getHomepageStats = () =>
  apiFetch<HomepageStatistic[]>("/homepage-stats/");
export const getAbout = () => apiFetch<AboutData>("/about/");

export const getCourses = () => apiFetch<Course[]>("/courses/");
export const getCourse = (id: number | string) =>
  apiFetch<Course>(`/courses/${id}/`);

export interface BlogPostListItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string | null;
  author_name: string;
  published_at: string;
}

export interface BlogPostDetail extends BlogPostListItem {
  content: string;
}

export const getBlogPosts = () => apiFetch<BlogPostListItem[]>("/blog/");
export const getBlogPost = (slug: string) =>
  apiFetch<BlogPostDetail>(`/blog/${slug}/`);

export const getServices = () => apiFetch<Service[]>("/services/");
export const getService = (id: number | string) =>
  apiFetch<Service>(`/services/${id}/`);

export const getInternships = () => apiFetch<Internship[]>("/internships/");
export const getInternship = (id: number | string) =>
  apiFetch<Internship>(`/internships/${id}/`);

export const getProjects = () => apiFetch<Project[]>("/projects/");
export const getProject = (id: number | string) =>
  apiFetch<Project>(`/projects/${id}/`);

// ---------------------------------------------------------
// Enquiry / contact
// ---------------------------------------------------------

export interface EnquiryPayload {
  enquiry_type: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  course?: number;
  internship?: number;
  project?: number;
}

export const submitEnquiry = (payload: EnquiryPayload) =>
  apiFetch<{ id: number }>("/enquiries/", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// ---------------------------------------------------------
// Auth
// ---------------------------------------------------------

export interface LoginResponse {
  access: string;
  refresh: string;
  username: string;
  is_superuser: boolean;
}

export const login = (identifier: string, password: string) =>
  apiFetch<LoginResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });

export interface SignupPayload {
  username: string;
  email: string;
  designation: string;
  phone: string;
  password: string;
}

export const signup = (payload: SignupPayload) =>
  apiFetch<{ message: string }>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const forgotPassword = (email: string) =>
  apiFetch<{ message: string }>("/auth/forgot-password/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPasswordConfirm = (
  uid: string,
  token: string,
  new_password: string,
) =>
  apiFetch<{ message: string }>("/auth/reset-password/", {
    method: "POST",
    body: JSON.stringify({ uid, token, new_password }),
  });

// ---------------------------------------------------------
// Authenticated (staff) calls — pass the JWT access token
// ---------------------------------------------------------

// Keep this in sync with auth-context.tsx's STORAGE_KEY — this module
// reads/writes the same localStorage entry so a silent token refresh
// here is picked up by the AuthProvider too (via the custom event
// dispatched below).
const AUTH_STORAGE_KEY = "techlora-auth";

interface StoredAuth {
  access: string;
  refresh: string;
  username: string;
  isSuperuser: boolean;
}

function getStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

// Refreshes the access token using the stored refresh token. On
// success, updates localStorage and notifies AuthProvider (via a
// custom event) so its React state — and every component reading
// accessToken from useAuth() — picks up the new token too.
async function refreshAccessToken(): Promise<string | null> {
  const stored = getStoredAuth();
  if (!stored?.refresh) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: stored.refresh }),
    });

    if (!res.ok) return null;

    const data = (await res.json()) as { access: string };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ ...stored, access: data.access }),
    );
    window.dispatchEvent(
      new CustomEvent("techlora-token-refreshed", { detail: data.access }),
    );

    return data.access;
  } catch {
    return null;
  }
}

async function authFetch<T>(
  path: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    return await apiFetch<T>(path, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
      next: { revalidate: 0 },
    });
  } catch (err) {
    // Access tokens live for 30 minutes — this is the expected,
    // routine path once someone's been on a page longer than that.
    if (err instanceof ApiError && err.status === 401) {
      const newAccess = await refreshAccessToken();

      if (newAccess) {
        return apiFetch<T>(path, {
          ...options,
          headers: {
            Authorization: `Bearer ${newAccess}`,
            ...options.headers,
          },
          next: { revalidate: 0 },
        });
      }

      // Refresh token itself has expired (7-day lifetime) — this is a
      // real session end, not a routine refresh. Let AuthProvider log
      // the user out and send them back to /login.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("techlora-session-expired"));
      }
    }

    throw err;
  }
}

export interface DashboardData {
  staff: StaffProfile | null;
  attendance_count: number;
}

export const getDashboard = (token: string) =>
  authFetch<DashboardData>("/dashboard/", token);

export interface AttendanceRecord {
  id: number;
  date: string;
  check_in: string | null;
  check_out: string | null;
  working_hours: string | number | null;
  status: string;
  day_salary_earned: string | null;
}

export const checkIn = (token: string) =>
  authFetch<AttendanceRecord>("/attendance/check-in/", token, {
    method: "POST",
  });

export const checkOut = (token: string) =>
  authFetch<AttendanceRecord>("/attendance/check-out/", token, {
    method: "POST",
  });

export const getAttendanceHistory = (token: string) =>
  authFetch<AttendanceRecord[]>("/attendance/history/", token);

export interface PerformanceData {
  staff: StaffProfile;
  attendance_count: number;
  attendance_percentage: number;
  working_hours: number;
  salary_this_month: string;
  rank: number | null;
}

export const getMyPerformance = (token: string) =>
  authFetch<PerformanceData>("/my-performance/", token);

// ---------------------------------------------------------
// My Portfolio (full CRUD)
// ---------------------------------------------------------

export interface PortfolioItem {
  id: number;
  portfolio_type: "Project" | "Internship";
  title: string;
  technologies: string;
  description: string;
  project_link: string;
  github_link: string;
  is_featured: boolean;
  created_at: string;
}

export interface PortfolioPayload {
  portfolio_type: string;
  title: string;
  technologies?: string;
  description?: string;
  project_link?: string;
  github_link?: string;
}

export const getMyPortfolio = (token: string) =>
  authFetch<PortfolioItem[]>("/my-portfolio/", token);

export const createPortfolioItem = (
  token: string,
  payload: PortfolioPayload,
) =>
  authFetch<PortfolioItem>("/my-portfolio/", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const deletePortfolioItem = (token: string, id: number) =>
  authFetch<void>(`/my-portfolio/${id}/`, token, { method: "DELETE" });

// ---------------------------------------------------------
// Admin dashboard (superuser only)
// ---------------------------------------------------------

export interface EnquiryRecord {
  id: number;
  enquiry_type: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  is_resolved: boolean;
  created_at: string;
}

export interface AdminDashboardData {
  staff_list: StaffProfile[];
  total_staff: number;
  present_today: number;
  total_enquiries: number;
  pending_enquiries: number;
  total_portfolio_items: number;
  recent_enquiries: EnquiryRecord[];
}

export const getAdminDashboard = (token: string) =>
  authFetch<AdminDashboardData>("/admin-dashboard/", token);

// ---------------------------------------------------------
// Staff Analytics (superuser only)
// ---------------------------------------------------------

export interface StaffRankingEntry extends StaffProfile {
  attendance_percentage: number;
}

export interface StaffAnalyticsData {
  total_staff: number;
  present_today: number;
  absent_today: number;
  avg_hours: number;
  attendance_percentage: number;
  top_performer: StaffProfile | null;
  staff_ranking: StaffRankingEntry[];
}

export const getStaffAnalytics = (token: string) =>
  authFetch<StaffAnalyticsData>("/staff-analytics/", token);