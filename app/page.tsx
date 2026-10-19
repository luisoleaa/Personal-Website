import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PlaqueButton from "@/components/common/PlaqueButton";
import Triptych from "@/components/home/Triptych";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.shell}>
      <SiteHeader current="home" />
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.left}>
            <h1 className={styles.title}>Luis Olea</h1>
            <p className={styles.subtitle}>
              Full-stack developer with an interest in machine learning and
              AI.
            </p>
            <p className={styles.meta}>Computer science, UC Davis</p>
            <div className={styles.buttons}>
              <PlaqueButton href="/portfolio" variant="primary">
                See my work
              </PlaqueButton>
              <PlaqueButton href="/about" variant="secondary">
                About me
              </PlaqueButton>
              <PlaqueButton href="/Olea_Luis_Resume.pdf" variant="quiet" download>
                Download résumé
              </PlaqueButton>
            </div>
          </div>
          <Triptych />
        </div>
      </main>
      <SiteFooter current="home" />
    </div>
  );
}
