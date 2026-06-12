"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  contactSchema,
  serviceOptions,
  budgetOptions,
} from "@/lib/contact-schema";
import { ArrowRight, Check } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-[10px] border border-grid bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate/70 focus-visible:border-blueprint";

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const presetValid = serviceOptions.some((o) => o.value === preset);

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(flat)) {
        if (v && v[0]) next[k] = v[0];
      }
      setFieldErrors(next);
      setStatus("error");
      setFormError("Please check the highlighted fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.fields) {
          const next: Record<string, string> = {};
          for (const [k, v] of Object.entries(
            json.fields as Record<string, string[]>
          )) {
            if (v && v[0]) next[k] = v[0];
          }
          setFieldErrors(next);
        }
        setStatus("error");
        setFormError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setFormError("Network error. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-start gap-4 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-verified text-verified">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="display-h3 text-[1.4rem]">Message sent</h2>
        <p className="lead">
          Message sent — expect a reply within 24 hours. We&apos;ll come back
          with next steps and, if it&apos;s a build, a written proposal within
          72 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 sm:p-8">
      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5">
        <Field label="Name" name="name" error={fieldErrors.name} required>
          <input id="name" name="name" type="text" autoComplete="name" className={fieldBase} placeholder="Your name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" error={fieldErrors.email} required>
            <input id="email" name="email" type="email" autoComplete="email" className={fieldBase} placeholder="you@company.com" />
          </Field>
          <Field label="Company" name="company" error={fieldErrors.company}>
            <input id="company" name="company" type="text" autoComplete="organization" className={fieldBase} placeholder="Optional" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Service" name="service" error={fieldErrors.service} required>
            <select
              id="service"
              name="service"
              defaultValue={presetValid ? preset : ""}
              className={fieldBase}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Budget" name="budget" error={fieldErrors.budget}>
            <select id="budget" name="budget" defaultValue="" className={fieldBase}>
              <option value="">Optional</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Message" name="message" error={fieldErrors.message} required>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={fieldBase}
            placeholder="What are you building? Where are you now, and what does done look like?"
          />
        </Field>

        {formError && (
          <p role="alert" className="text-[0.85rem] text-red-500">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-[0.78rem] text-slate">
          By sending this you agree we may reply by email. We don&apos;t share
          your details.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[0.72rem] uppercase tracking-wider text-slate"
      >
        {label}
        {required && <span className="text-blueprint"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.8rem] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
