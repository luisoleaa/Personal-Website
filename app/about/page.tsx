import Footer from "@/components/Footer";
import PageBackground from "@/components/common/PageBackground";
import Navbar from "@/components/common/navbar";
import Link from "next/link";
import Image from "next/image";

const skills = [
  "Git",
  "React",
  "Next.js",
  "C/C++",
  "Python",
  "Java",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS/TailWind CSS",
];

const experiences = [
  {
    title: "Full-stack web development",
    text: "Building clean, responsive interfaces and connecting them to practical application logic.",
  },
  {
    title: "Portfolio projects",
    text: "Creating project pages, interactive UI, and polished site sections that present work clearly.",
  },
  {
    title: "Collaboration-ready workflow",
    text: "Working with reusable components, accessible navigation, and production build checks.",
  },
];

export default function AboutPage() {
  return (
    <div className="shell">
      <div className="page">
        <PageBackground />
        <Navbar />
        <main className="aboutPageV2">
          <section className="aboutLead" aria-labelledby="about-heading">
            <div className="aboutLeadText">
              <p className="aboutKicker">About me</p>
              <h1 id="about-heading">Luis Olea</h1>
              <p className="aboutRole !bg-gradient-to-r !from-blue-400 !via-white !to-purple-300 !bg-clip-text !text-transparent">
                Full-stack developer
              </p>
              <p className="aboutSummary">
                I love building websites, apps, and tools with thoughtful tech
                stacks and easy to navigate frontend structure. I prioritize
                usefullness and value when designing/building products for
                clients or solving problems.
              </p>
            </div>

            <div className="animatedProfile">
              <div className="aboutPhoto" aria-label="Profile picture">
                <Image
                  src="/profilePhoto.jpeg"
                  alt="Luis Olea"
                  fill
                  sizes="(max-width: 820px) 72vw, 320px"
                  priority
                />
              </div>
            </div>
          </section>

          <section className="aboutResumeBand" aria-label="Resume download">
            <div>
              <span>Resume</span>
              <p>Download a copy of my current resume.</p>
            </div>
            <Link href="/Resume.pdf" download>
              Download PDF
            </Link>
          </section>

          <section className="aboutDetails" aria-label="Skills and experience">
            <div className="aboutSkillBlock">
              <h2>Skills</h2>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="aboutExperienceBlock">
              <h2>Experience</h2>
              {experiences.map((experience) => (
                <article key={experience.title}>
                  <h3>{experience.title}</h3>
                  <p>{experience.text}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}