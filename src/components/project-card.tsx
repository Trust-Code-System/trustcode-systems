import Link from "next/link";
import type { Project } from "@/content/portfolio";
import { ProjectThumb } from "./project-thumb";
import { ArrowUpRight } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/work/${project.slug}`} aria-label={`${project.title} case study`}>
        <ProjectThumb project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <span key={c} className="badge">
              {c}
            </span>
          ))}
        </div>
        <h3 className="display-h3 mt-4 text-[1.25rem]">
          <Link href={`/work/${project.slug}`} className="hover:text-blueprint">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-slate">
          {project.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-grid pt-4">
          <Link
            href={`/work/${project.slug}`}
            className="text-[0.85rem] font-medium text-blueprint hover:underline"
          >
            Case study
          </Link>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-slate hover:text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-verified" />
              Visit live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
