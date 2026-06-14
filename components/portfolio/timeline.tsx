"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

function ProjectTimelineItem({ project }: { project: Project }) {
  const [month, year = ""] = project.date.split(" ");
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
      {/* so you can click on the entire project card for link */}
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
        {/* make this list out skills individually in their own element -> all in an array */}
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
  const timelineRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // useEffect runs after the Timeline component first renders in the browser.
    // The inner function can be async, while the effect callback itself stays sync.
    async function loadProjects() {
      const response = await fetch("/api/projects");
      const payload = (await response.json()) as ProjectsResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Error loading projects.");
      }

      // Updating state causes React to re-render the timeline with the API data.
      setProjects(payload.projects ?? []);
      setError(null);
    }

    // Run the async loader once. If it fails, keep the page alive and show an error.
    loadProjects().catch((error) => {
      console.error(error);
      setError("Unable to load projects right now.");
    });
  }, []);

  useEffect(() => {
    // This effect depends on projects because the DOM items do not exist
    // until after the API data has been rendered into timeline cards.
    const items = Array.from(
      timelineRef.current?.querySelectorAll<HTMLElement>(
        "[data-reveal-item='true']",
      ) ?? [],
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
        item.style.filter = "none";
      });
      return;
    }

    let frame = 0;

    function updateRevealProgress() {
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.58;

      items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        const progress = Math.min(
          1,
          Math.max(0, (start - top) / (start - end)),
        );
        const offset = Math.round((1 - progress) * 44);
        const blur = (1 - progress) * 4;

        item.style.opacity = `${0.12 + progress * 0.88}`;
        item.style.transform = `translateY(${offset}px)`;
        item.style.filter = `blur(${blur}px)`;
      });

      frame = 0;
    }

    function requestRevealUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateRevealProgress);
    }

    updateRevealProgress();
    window.addEventListener("scroll", requestRevealUpdate, { passive: true });
    window.addEventListener("resize", requestRevealUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestRevealUpdate);
      window.removeEventListener("resize", requestRevealUpdate);
    };
  }, [projects]);

  return (
    <section
      ref={timelineRef}
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
