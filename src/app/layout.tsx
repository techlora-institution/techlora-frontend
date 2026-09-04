import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getSiteSettings } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Techlora Institution — Courses, Internships & Projects in Trichy",
    template: "%s | Techlora Institution",
  },
  description:
    "Techlora Institution offers industry-focused courses, internships and real-time projects in Tiruchirappalli, Tamil Nadu — designed to make you job ready from day one.",
  keywords: [
    "Techlora Institution",
    "software training Trichy",
    "courses in Tiruchirappalli",
    "internship Trichy",
    "web development course Trichy",
    "AI course Trichy",
    "IT training institute Trichy",
  ],
  authors: [{ name: "Techlora Institution" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Techlora Institution",
    url: siteUrl,
    title: "Techlora Institution — Courses, Internships & Projects in Trichy",
    description:
      "Industry-focused courses, internships and real-time projects designed to make you job ready from day one.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Techlora Institution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techlora Institution",
    description:
      "Industry-focused courses, internships and real-time projects in Trichy.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  // Favicon / apple-touch-icon are handled automatically by Next.js via
  // src/app/icon.png and src/app/apple-icon.png (the circular logo mark).
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings().catch(() => null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteSettings?.institution_name || "Techlora Institution",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Techlora Institution offers industry-focused courses, internships and real-time projects in Tiruchirappalli, Tamil Nadu.",
    address: siteSettings?.address
      ? { "@type": "PostalAddress", streetAddress: siteSettings.address }
      : undefined,
    email: siteSettings?.primary_email,
    telephone: siteSettings?.primary_phone,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer siteSettings={siteSettings} />
            <WhatsAppButton phoneNumber={siteSettings?.whatsapp_number} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
