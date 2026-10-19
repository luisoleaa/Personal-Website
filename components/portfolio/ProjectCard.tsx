import Image from "next/image";
import type { Project } from "./types";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.frame} aria-hidden="true">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, 340px"
            className={styles.frameImage}
          />
        ) : (
          <>
            <span className={styles.emblem}>{project.emblem}</span>
            <span className={styles.emblemCaption}>Screenshot goes here</span>
          </>
        )}
      </div>
      <div className={styles.headRow}>
        <h2 className={styles.name}>{project.name}</h2>
        <span className={styles.date}>{project.date}</span>
      </div>
      <p className={styles.desc}>{project.description}</p>
      <p className={styles.skills}>{project.skills}</p>
      <a
        href={project.link}
        className={styles.link}
        target="_blank"
        rel="noreferrer"
      >
        View project
        <span className="sr-only"> {project.name}</span>
      </a>
    </article>
  );
}
