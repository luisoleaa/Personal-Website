"use client";

import { useMemo, useState } from "react";
import type { Project } from "./types";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectFilters.module.css";

const FILTER_DEFS = [
  { id: "all", label: "All" },
  { id: "ml", label: "Machine learning and AI" },
  { id: "web", label: "Web apps" },
] as const;

type FilterId = (typeof FILTER_DEFS)[number]["id"];

export default function ProjectFilters({
  projects,
}: {
  projects: Project[];
}) {
  const [filter, setFilter] = useState<FilterId>("all");

  const filters = FILTER_DEFS.map((def) => ({
    ...def,
    count:
      def.id === "all"
        ? projects.length
        : projects.filter((p) => p.category.includes(def.id)).length,
  }));

  const shown = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category.includes(filter)),
    [projects, filter],
  );

  return (
    <>
      <div className={styles.bar}>
        <div
          role="group"
          aria-label="Filter projects"
          className={styles.filterGroup}
        >
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={
                  active
                    ? `${styles.filterButton} ${styles.filterButtonActive}`
                    : styles.filterButton
                }
              >
                {f.label} <span className={styles.filterCount}>{f.count}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className={styles.status}>
          Showing {shown.length} of {projects.length}
        </p>
      </div>
      <div className={styles.grid}>
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
