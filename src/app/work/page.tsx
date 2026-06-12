import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WorkGrid } from "@/components/work-grid";
import { CtaBand } from "@/components/cta-band";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work",
  description:
    "15+ live products across fintech, edtech, e-commerce, SaaS, AI and marketplaces. Every case study links to a live, inspectable product.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="live work"
        title="Don't take our word for it. Click anything below — it's live."
        intro="Real products, real clients, real outcomes. Filter by sector, open a case study, or visit the live site yourself."
      />
      <Section>
        <WorkGrid />
      </Section>
      <CtaBand />
    </>
  );
}
