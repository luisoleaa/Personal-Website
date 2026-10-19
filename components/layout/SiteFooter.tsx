import Link from "next/link";
import styles from "./SiteFooter.module.css";
import type { NavPage } from "./SiteHeader";

const OTHER_PAGES: Record<NavPage, { href: string; label: string }[]> = {
  home: [],
  portfolio: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About and contact" },
  ],
  about: [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
  ],
};

export default function SiteFooter({ current }: { current: NavPage }) {
  if (current === "home") {
    return (
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <span>Davis, California, MMXXVI</span>
          <span>Now building Ball Up Top (App)</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} ${styles.innerSub}`}>
        <span>Luis Olea, Davis, California, MMXXVI</span>
        <span className={styles.links}>
          {OTHER_PAGES[current].map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
