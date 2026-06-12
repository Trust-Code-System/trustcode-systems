import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">/ {children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-h2 max-w-2xl">{title}</h2>
        {link && (
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[0.9rem] font-medium text-blueprint"
          >
            {link.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {intro && <p className="lead max-w-2xl">{intro}</p>}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
