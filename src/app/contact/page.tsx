import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you're building. Free 30-minute consultation, written proposal within 72 hours, and a reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="contact"
        title="Tell us what you're building."
        intro="Free 30-minute consultation, a written proposal within 72 hours, and a reply within 24 hours. No jargon, no obligation."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="card h-96 p-8" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5">
            <div className="grid gap-5">
              <div className="card p-7">
                <p className="eyebrow mb-3">/ email us</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[1.05rem] font-medium text-blueprint hover:underline"
                >
                  {site.email}
                </a>
                <p className="mt-4 eyebrow mb-3">/ whatsapp</p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[1.05rem] font-medium text-ink hover:text-blueprint"
                >
                  WhatsApp Business
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="card p-7">
                <p className="eyebrow mb-3">/ locations</p>
                <ul className="space-y-1.5 text-[0.95rem] text-ink">
                  {site.locations.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blueprint" />
                      {l}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-slate">
                    <span className="h-1.5 w-1.5 rounded-full bg-grid" />
                    Remote, worldwide
                  </li>
                </ul>
              </div>

              <div className="card bg-surface p-7">
                <p className="eyebrow mb-3">/ response time</p>
                <p className="font-display text-[1.3rem] font-semibold leading-snug tracking-tight">
                  We reply within 24 hours.
                </p>
                <p className="mt-2 text-[0.9rem] text-slate">
                  Prefer to talk? Ask for a call in your message and we&apos;ll
                  send a booking link.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
