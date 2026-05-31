import Link from "next/link";
import styles from "./navbar.module.css";

const navItems = [
  { href: "/FrontPage", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link key={item.href} className={styles.navLink} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
