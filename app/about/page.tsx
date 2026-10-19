import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HymnBoard from "@/components/about/HymnBoard";
import InterestCard from "@/components/about/InterestCard";
import Labyrinth from "@/components/about/Labyrinth";
import ContactSection from "@/components/about/ContactSection";
import styles from "./page.module.css";

const INTERESTS = [
  { title: "Volleyball", description: "I've been playing volleyball for around 5 years now, and it's the first thing I do when I have free time" },
  { title: "Basketball", description: "Even though I dont play Basketball as much as volleyball, it's my favorite sport to watch. #GOKINGS!" },
  { title: "Theology", description: "I love talking to others about my beliefs and hearing about others'. I also enjoy going to Mass and praying the Rosary." },
];

export default function AboutPage() {
  return (
    <div>
      <SiteHeader current="about" />
      <main className={styles.main}>
        <section className={styles.intro}>
          <div className={styles.bioCol}>
            <h1 className={styles.title}>About</h1>
            <p className={styles.bioLead}>
              <span aria-hidden="true" className={styles.dropCap}>
                I
              </span>
              <span className="sr-only">I</span>
              &apos;m a computer science student at UC Davis, working toward
              my B.S. I build full-stack apps and I&apos;m really interested in
              machine learning and AI. Right now I&apos;m looking for a
              Summer 2027 software engineering internship, especially one
              that touches AI.
            </p>
            <p className={styles.bioP}>
              I care about equity and fairness, and I like projects that
              help people directly.
            </p>
          </div>
          <HymnBoard />
        </section>

        <section className={styles.keyboard}>
          <h2 className={styles.sectionTitle}>Off the keyboard</h2>
          <div className={styles.interestGrid}>
            {INTERESTS.map((interest) => (
              <InterestCard key={interest.title} {...interest} />
            ))}
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <ContactSection />
        </section>

        <section aria-label="Labyrinth" className={styles.labyrinthSection}>
          <Labyrinth />
        </section>
      </main>
      <SiteFooter current="about" />
    </div>
  );
}
