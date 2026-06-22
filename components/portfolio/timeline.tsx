"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./timeline.module.css";

type Project = {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
  link: string;
  skills: string;
};

type ProjectsResponse = {
  projects?: Project[];
  error?: string;
};

function parseDate(raw: string): { month: string; year: string } {
  // Supabase timestamps come back as "YYYY-MM-DD HH:MM:SS"
  if (/^\d{4}-\d{2}/.test(raw)) {
    const d = new Date(raw.replace(" ", "T"));
    return {
      month: d.toLocaleString("en-US", { month: "long" }),
      year: String(d.getFullYear()),
    };
  }
  const [month, year = ""] = raw.split(" ");
  return { month, year };
}

function ProjectTimelineItem({ project }: { project: Project }) {
  const { month, year } = parseDate(project.date);
  const skills = project.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className={styles.timelineItem} data-reveal-item="true">
      <div className={styles.itemDate}>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      <Link
        href={project.link}
        className={styles.projectCard}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.imageWrapper}>
          <Image
            src={project.image}
            alt={project.name}
            width={300}
            height={220}
          />
        </div>
        <h3 className={styles.title}>{project.name}</h3>
        <div className={styles.description}>{project.description}</div>
        <div className={styles.skills}>
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default function Timeline() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch("/api/projects");
      const payload = (await response.json()) as ProjectsResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Error loading projects.");
      }

      setProjects(payload.projects ?? []);
      setError(null);
    }

    loadProjects().catch((error) => {
      console.error(error);
      setError("Unable to load projects right now.");
    });
  }, []);

  return (
    <section
      className={styles.timeline}
      aria-label="Project timeline"
    >
      {error && <p>{error}</p>}
      {projects.map((project) => (
        <ProjectTimelineItem key={project.id} project={project} />
      ))}
    </section>
  );
}
