import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CandleRack from "@/components/portfolio/CandleRack";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import { getProjects } from "@/lib/projects";
import { getContributionDays } from "@/lib/contributions";
import { sampleDays } from "@/lib/ascii";
import styles from "./page.module.css";

async function getContributions(): Promise<{ days: boolean[]; live: boolean }> {
  try {
    return { days: await getContributionDays(), live: true };
  } catch {
    return { days: sampleDays(), live: false };
  }
}

export default async function PortfolioPage() {
  const [projects, contributions] = await Promise.all([
    getProjects(),
    getContributions(),
  ]);

  return (
    <div>
      <SiteHeader current="portfolio" />
      <main className={styles.main}>
        <section className={styles.intro}>
          <div className={styles.introLeft}>
            <h1 className={styles.title}>Works</h1>
            <p className={styles.subtitle}>
              Everything I&apos;ve built, from a neural network that plays
              Tetris to web apps people use for real work.
            </p>
          </div>
          <CandleRack days={contributions.days} live={contributions.live} />
        </section>
        <section aria-label="Projects" className={styles.projects}>
          <ProjectFilters projects={projects} />
        </section>
      </main>
      <SiteFooter current="portfolio" />
    </div>
  );
}
