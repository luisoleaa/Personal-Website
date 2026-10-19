import Link from "next/link";
import styles from "./SiteHeader.module.css";

export type NavPage = "home" | "portfolio" | "about";

const NAV_ITEMS: { id: NavPage; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "portfolio", href: "/portfolio", label: "Portfolio" },
  { id: "about", href: "/about", label: "About" },
];

export default function SiteHeader({ current }: { current: NavPage }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>
          Luis Olea
        </Link>
        <nav aria-label="Primary" className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isCurrent = item.id === current;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={
                  isCurrent
                    ? `${styles.navLink} ${styles.navLinkCurrent}`
                    : styles.navLink
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
