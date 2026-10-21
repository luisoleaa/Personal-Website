import Link from "next/link";
import ContactForm from "./ContactForm";
import styles from "./ContactSection.module.css";

const LINKS = [
  {
    label: "Email",
    value: "luisolea097@gmail.com",
    href: "mailto:luisolea097@gmail.com",
  },
  {
    label: "GitHub",
    value: "luisoleaa",
    href: "https://github.com/luisoleaa",
  },
  {
    label: "LinkedIn",
    value: "Luis Olea",
    href: "https://www.linkedin.com/in/luis-olea-668759295/",
  },
  {
    label: "Résumé",
    value: "PDF",
    href: "/Olea_Luis_Resume.pdf",
    download: true,
  },
];

export default function ContactSection() {
  return (
    <>
      <div className={styles.left}>
        <h2 className={styles.title}>Get in touch</h2>
        <p className={styles.copy}>
          Email is the best way to reach me. I&apos;m happy to talk about
          internships, projects or anything you saw here.
        </p>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.link}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              download={"download" in link ? link.download : undefined}
            >
              <span>{link.label}</span>
              <span className={styles.linkValue}>{link.value}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <ContactForm />
      </div>
    </>
  );
}
