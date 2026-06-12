export type Category =
  | "Fintech"
  | "EdTech"
  | "E-Commerce"
  | "SaaS"
  | "AI"
  | "Marketplace"
  | "Cloud"
  | "Security";

export type Project = {
  slug: string;
  title: string;
  sector: string;
  categories: Category[];
  tagline: string;
  problem: string;
  built: string[];
  outcome: string;
  stack: string[];
  team: string[];
  live: string | null;
  featured?: boolean;
};

export const categories: (Category | "All")[] = [
  "All",
  "Fintech",
  "EdTech",
  "E-Commerce",
  "SaaS",
  "AI",
  "Marketplace",
];

export const projects: Project[] = [
  {
    slug: "the-thesis-desk",
    title: "The Thesis Desk",
    sector: "Crypto / Community",
    categories: ["Fintech", "SaaS"],
    tagline:
      "Real-time crypto trading command center for a 500+ member community.",
    problem:
      "A 500+ member crypto trading community had no shared source of truth — prices, calls, and performance lived in scattered chats. They needed a command center the whole group could trust.",
    built: [
      "Live price feeds for BTC, ETH, SOL, BNB and XRP",
      "P&L tracking and a personal trade journal",
      "Role-based admin for managing calls and members",
      "Real-time dashboards built for fast, repeated use",
    ],
    outcome:
      "One inspectable home for a 500+ member community — live feeds, tracked performance, and admin control in a single trusted surface.",
    stack: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "PostgreSQL"],
    team: ["Abass Ibrahim"],
    live: "https://thethesisdesk.xyz",
    featured: true,
  },
  {
    slug: "helping-tribe-academy",
    title: "The Helping Tribe Academy",
    sector: "Education",
    categories: ["EdTech", "SaaS"],
    tagline:
      "School management platform for a Counselling & Positive Psychology program.",
    problem:
      "A Counselling & Positive Psychology program was running admissions and coursework manually. They needed role-separated portals and a public application pipeline that didn't depend on spreadsheets.",
    built: [
      "Three role-based portals: Student, Facilitator, Admin",
      "Dual authentication flows",
      "Public application form feeding the admin pipeline",
      "Course and cohort management",
    ],
    outcome:
      "Manual admissions and coursework replaced by three secure portals and a public application pipeline — live and in daily use.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    team: ["Bashir Abdulah", "Abass Ibrahim"],
    live: "https://helpingtribeacademy.com",
    featured: true,
  },
  {
    slug: "atlas-hr",
    title: "Atlas HR",
    sector: "HR Tech",
    categories: ["SaaS", "AI"],
    tagline: "Global HR, compliance & payroll SaaS with an AI compliance sandbox.",
    problem:
      "Hiring across Nigeria, India, the UK and the US means four sets of compliance rules and cost structures. Teams needed a way to model the risk and cost before committing to a hire.",
    built: [
      "AI Compliance Sandbox for testing scenarios",
      "Per-country cost and risk calculator (NG, IN, UK, US)",
      "Automated onboarding flows",
      "Payroll and compliance dashboards",
    ],
    outcome:
      "A single SaaS surface that turns four-country compliance and payroll into modeled, comparable decisions — with an AI sandbox to test scenarios first.",
    stack: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://atlas-hr-fq24.vercel.app",
    featured: true,
  },
  {
    slug: "airtimevault",
    title: "AirtimeVault",
    sector: "Fintech",
    categories: ["Fintech"],
    tagline: "Convert airtime to wallet cash in under 30 minutes.",
    problem:
      "Nigerians holding excess airtime (MTN, Airtel, Glo, 9mobile) had no fast, trusted way to turn it back into spendable cash. Existing options were slow, manual, and risky.",
    built: [
      "Airtime-to-cash conversion in under 30 minutes",
      "KYC and fraud monitoring",
      "P2P transfers and a virtual card",
      "Wallet with transaction history",
    ],
    outcome:
      "A fintech wallet that converts airtime across all four major networks to cash in under 30 minutes — with KYC and fraud monitoring built in.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Paystack"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://airtime-vault-plhc.vercel.app",
  },
  {
    slug: "wearables-atelier",
    title: "Wearables Atelier",
    sector: "Fashion / Retail",
    categories: ["E-Commerce"],
    tagline: "Editorial e-commerce for premium Nigerian womenswear.",
    problem:
      "A premium womenswear label needed a storefront that felt editorial, not generic — while still supporting custom orders and wholesale buyers.",
    built: [
      "Editorial product and collection pages",
      "Custom-order flow",
      "Wholesale support",
      "Persistent cart and checkout",
    ],
    outcome:
      "An editorial storefront that carries a premium brand while handling both retail custom orders and wholesale buyers.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Shadcn UI"],
    team: ["Abass Ibrahim"],
    live: "https://wearables-atelier.vercel.app",
  },
  {
    slug: "petrobrain",
    title: "PetroBrain",
    sector: "Oil & Gas / Energy AI",
    categories: ["AI", "SaaS"],
    tagline:
      "AI-native intelligence platform built exclusively for oil & gas.",
    problem:
      "Oil & gas teams sit on huge volumes of permits, procedures, and engineering standards — but answers are buried, and a wrong number on a safety-critical decision is unacceptable. They needed AI that cites its sources and never guesses.",
    built: [
      "Field Copilot — plain-English answers on permits and SOPs from company documents",
      "Engineering decision-support with worked calculations, formulas, and cited sources",
      "Compliance Guardian — audit-grade emissions reporting and methane quantification (NUPRC Tier-3 MRV)",
      "Safety-first protocols that defer critical calls to qualified personnel, with data sovereignty",
    ],
    outcome:
      "An AI platform for drilling, production, midstream and downstream that cites every source and shows its working — currently in pilot with selected operators.",
    stack: ["Next.js", "TypeScript", "OpenAI", "LangChain", "Tailwind"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://petro-brain-web.vercel.app",
  },
  {
    slug: "aureo",
    title: "Aureo",
    sector: "Hiring",
    categories: ["Marketplace", "SaaS"],
    tagline: "Trust-first hiring marketplace with verified profiles.",
    problem:
      "Hiring marketplaces are full of unverifiable claims. Aureo needed verification and trust scoring at its core so employers could filter on credibility.",
    built: [
      "Verified candidate profiles",
      "Trust scores",
      "Search and filtering on credibility",
      "Marketplace matching flows",
    ],
    outcome:
      "A hiring marketplace where verification and trust scores are the product — letting employers filter on credibility, not claims.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    team: ["Abass Ibrahim"],
    live: "https://aureeo.netlify.app",
  },
  {
    slug: "studycoach",
    title: "StudyCoach",
    sector: "Education / AI",
    categories: ["AI", "EdTech"],
    tagline: "Turn lecture notes into summaries and quizzes.",
    problem:
      "Students drown in lecture notes with no fast way to revise. StudyCoach needed to turn raw notes into structured study material automatically.",
    built: [
      "AI summarization of lecture notes (OpenAI + LangChain)",
      "Auto-generated quizzes",
      "Study session flows",
      "Note upload and processing",
    ],
    outcome:
      "Cut student study time by up to 40% by turning raw lecture notes into summaries and quizzes automatically.",
    stack: ["Next.js", "OpenAI", "LangChain", "TypeScript", "Tailwind"],
    team: ["Abdulhaleem Sanuth", "Abass Ibrahim"],
    live: "https://study-coach-five.vercel.app",
  },
  {
    slug: "clabed-autos",
    title: "Clabed Autos",
    sector: "Automotive",
    categories: ["E-Commerce"],
    tagline: "Automotive sales platform that cut WhatsApp dependence.",
    problem:
      "An automotive dealer ran sales almost entirely through WhatsApp inquiries — slow, repetitive, and impossible to scale. They needed a real platform.",
    built: [
      "Vehicle listings and detail pages",
      "Inquiry and lead flows",
      "Self-serve browsing to replace manual chat",
      "Admin management",
    ],
    outcome:
      "60% reduction in WhatsApp-dependent inquiries and a ~45% engagement lift after moving sales onto a real platform.",
    stack: ["Next.js", "TypeScript", "Node.js", "Tailwind"],
    team: ["Bashir Abdulah"],
    live: "https://www.clabedautos.com",
  },
  {
    slug: "sln-engineering",
    title: "SLN Engineering Ltd",
    sector: "Engineering / Energy",
    categories: ["SaaS"],
    tagline: "Corporate site for an engineering and energy firm.",
    problem:
      "An engineering and energy firm had limited online presence, making it hard for clients to find and assess them.",
    built: [
      "Corporate marketing site",
      "Service and capability pages",
      "Contact and inquiry flows",
      "Responsive, fast-loading design",
    ],
    outcome:
      "~70% improvement in client accessibility after launching a clear, professional corporate presence.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    team: ["Abass Ibrahim"],
    live: "https://www.slneng.com",
  },
  {
    slug: "serverless-youtube-pipeline",
    title: "Serverless YouTube Sync Pipeline",
    sector: "Cloud Engineering",
    categories: ["Cloud", "SaaS"],
    tagline: "Event-driven AWS pipeline — a showcase of cloud capability.",
    problem:
      "Syncing and processing YouTube data at scale needs an event-driven architecture that stays cheap at idle and scales on demand — without servers to babysit.",
    built: [
      "AWS CDK infrastructure-as-code",
      "Lambda + SQS event-driven processing",
      "DynamoDB storage",
      "Graviton / Docker workloads",
    ],
    outcome:
      "A fully serverless, event-driven pipeline that demonstrates the cloud architecture we bring to client systems — scales on demand, costs nothing at idle.",
    stack: ["AWS CDK", "Lambda", "SQS", "DynamoDB", "Docker", "Graviton"],
    team: ["Abdulhaleem Sanuth"],
    live: null,
  },
  {
    slug: "soc-detection-lab",
    title: "SOC Detection Lab & KQL Playbook",
    sector: "Cybersecurity",
    categories: ["Security"],
    tagline: "25+ documented threat-hunting queries, MITRE-mapped.",
    problem:
      "Detection is only as good as the queries behind it. This lab demonstrates a repeatable, documented threat-hunting capability mapped to a known framework.",
    built: [
      "25+ documented KQL threat-hunting queries",
      "Microsoft Sentinel + Defender for Endpoint",
      "MITRE ATT&CK-mapped incident reports",
      "Simulated phishing-campaign investigations",
    ],
    outcome:
      "A documented, MITRE-mapped detection capability with 25+ threat-hunting queries — the security rigor we apply to every product we ship.",
    stack: ["KQL", "Microsoft Sentinel", "Defender for Endpoint", "MITRE ATT&CK"],
    team: ["Olamilekan Emmanuel Oyedele"],
    live: null,
  },
];

export const featuredSlugs = ["atlas-hr", "helping-tribe-academy", "the-thesis-desk"];
