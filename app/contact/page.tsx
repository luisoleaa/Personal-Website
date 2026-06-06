import Footer from "@/components/Footer";
import PageBackground from "@/components/common/PageBackground";
import Navbar from "@/components/common/navbar";
import Image from "next/image";
import Link from "next/link";

const linkedInUrl = "https://www.linkedin.com/in/luis-olea-668759295/";
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(
  linkedInUrl,
)}`;

export default function ContactPage() {
  return (
    <div className="shell">
      <div className="page">
        <PageBackground />
        <Navbar />
        <main className="profilePage">
          <section className="contactHero" aria-labelledby="contact-heading">
            <div className="contactCopy">
              <p className="eyebrow">Contact</p>
              <h1 id="contact-heading" className="largeText">
                Let&apos;s get in touch
              </h1>
              <p className="summaryText">
                Reach out about projects, internships, collaborations, or any
                questions about my work.
              </p>
              <div className="contactLinks" aria-label="Contact information">
                <Link href="mailto:luisolea097@gmail.com">
                  <span>Email</span>
                  luisolea097@gmail.com
                </Link>
                <Link
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  Luis Olea
                </Link>
                <Link
                  href="https://github.com/luisoleaa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  luisoleaa
                </Link>
              </div>
            </div>

            <div className="contactCard">
              <div className="animatedProfile" aria-label="Luis Olea profile">
                <div className="profilePortrait profilePortraitSmall">
                  <span>LO</span>
                </div>
                <p>Luis Olea</p>
              </div>
              <Link
                className="qrWrap"
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Luis Olea on LinkedIn"
              >
                <Image
                  src={qrCodeUrl}
                  alt="QR code for Luis Olea LinkedIn profile"
                  width={220}
                  height={220}
                />
              </Link>
              <Link
                className="primaryButton"
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open LinkedIn
              </Link>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
