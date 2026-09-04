import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { EnquireForm } from "@/components/enquire-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Techlora Institution, Tiruchirappalli — enquire about courses, internships, or projects, or visit us in person.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings().catch(() => null);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
        Get in touch
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
        Contact us
      </h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-heading text-lg font-bold">Send an enquiry</h2>
          <EnquireForm enquiryType="General" />
        </div>

        <div className="space-y-4 text-sm">
          {siteSettings?.address && (
            <div>
              <p className="font-semibold text-text-primary">Address</p>
              <p className="mt-1 text-text-secondary">{siteSettings.address}</p>
            </div>
          )}
          {siteSettings?.primary_phone && (
            <div>
              <p className="font-semibold text-text-primary">Phone</p>
              <p className="mt-1 text-text-secondary">
                {siteSettings.primary_phone}
              </p>
            </div>
          )}
          {siteSettings?.primary_email && (
            <div>
              <p className="font-semibold text-text-primary">Email</p>
              <p className="mt-1 text-text-secondary">
                {siteSettings.primary_email}
              </p>
            </div>
          )}
          {siteSettings?.whatsapp_number && (
            <div>
              <p className="font-semibold text-text-primary">WhatsApp</p>
              <p className="mt-1 text-text-secondary">
                {siteSettings.whatsapp_number}
              </p>
            </div>
          )}
          <a
            href={buildWhatsAppLink(siteSettings?.whatsapp_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/10"
          >
            Chat On WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
