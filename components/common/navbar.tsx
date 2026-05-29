import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link href="/FrontPage">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
