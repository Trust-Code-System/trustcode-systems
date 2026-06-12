"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { categories, projects, type Category } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [active, setActive] = useState<(Category | "All")>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active as Category));

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter work by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((c) => {
          const selected = active === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[0.78rem] uppercase tracking-wider transition-colors",
                selected
                  ? "border-blueprint bg-blueprint text-white"
                  : "border-grid bg-surface text-slate hover:border-blueprint hover:text-ink"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
