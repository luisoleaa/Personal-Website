import Image from "next/image";
import Link from "next/link";
import styles from "./timeline.module.css";

type Project = {
  name: string;
  date: string;
  description: string;
  image: string;
  link: string;
  skills: string;
};

const projects: Project[] = [
  {
    // have to say that im currently working on this - not done
    name: "Sports Letterbox",
    date: "June 2026",
    description: "Uses the Letterbox framework but on Sports games.",
    image: "/sportsLetterbox.png",
    link: "https://github.com/luisoleaa/sportLetterbox",
    skills: "React, TypeScript, Fullstack",
  },
  {
    name: "CodeLab Nova",
    date: "May 2026",
    description:
      "Is a dashboard/leaderboard for CodeLab's Open-Source projects to incentivize devlopers to contribute",
    image: "/window.svg",
    link: "https://github.com/Codelab-Davis/nova-os-dashboard",
    skills: "React, TypeScript, Fullstack",
  },
  {
    name: "Supply Spring - HackDavis Submission",
    date: "May 2026",
    description:
      "Digitalizes the donation box for WellSpring Womens' Center in Sacramento, a client for 2026 HackDavis (Hackathon)",
    image: "/WellSpring.jpeg",
    link: "https://github.com/Ryanm2108/hack-davis-2026",
    skills: "React, TypeScript, Fullstack",
  },
  {
    name: "Car Deprication Calculator",
    date: "March 2026",
    description:
      "Predicts how much a specific car make/model/year will depricate over a number of years",
    image: "/linkedin.svg",
    link: "https://github.com/luisoleaa/Car-Price-Depreciation-Predictor",
    skills: "React, TypeScript, Fullstack",
  },
];

function ProjectTimelineItem({ project }: { project: Project }) {
  const [month, year] = project.date.split(" ");
  const skills: string[] = project.skills.split(", ");

  return (
    <div className={styles.timelineItem}>
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
  return (
    <section className={styles.timeline} aria-label="Project timeline">
      {projects.map((project) => (
        <ProjectTimelineItem key={project.name} project={project} />
      ))}
    </section>
  );
}
