import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

// Branded, deterministic placeholder thumbnail. Drop a real screenshot at
// /public/work/<slug>.png and swap this for next/image when available.
export function ProjectThumb({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "internal · showcase";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-t-card border-b border-grid bg-paper",
        className
      )}
      aria-hidden
    >
      <div className="grid-bg absolute inset-0" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
          <span className="h-2 w-2 rounded-full bg-grid" />
        </span>
        <span className="font-mono text-[0.65rem] text-slate">{host}</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="font-display text-2xl font-semibold tracking-tight text-ink">
          {project.title}
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate">
          {project.sector}
        </span>
      </div>
      {project.live && (
        <span className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-verified">
          <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
          LIVE
        </span>
      )}
    </div>
  );
}
