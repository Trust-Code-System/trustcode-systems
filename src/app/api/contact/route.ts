import { NextResponse } from "next/server";
import { contactSchema, serviceOptions } from "@/lib/contact-schema";
import { site } from "@/content/site";

// Lightweight in-memory rate limiter (per warm instance). Good enough as a
// first line of defense; pair with platform-level limits in production.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function serviceLabel(value: string): string {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success, drop silently.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = `New project inquiry — ${serviceLabel(data.service)}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${serviceLabel(data.service)}`,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  // Send via Resend if configured; otherwise log so local dev still works.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "TrustCode <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "We couldn't send your message. Please email us directly." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Contact send failed:", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact] (no RESEND_API_KEY set) would send:\n", subject, "\n", text);
  }

  return NextResponse.json({ ok: true });
}
