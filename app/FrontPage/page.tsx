import Navbar from "@/components/common/navbar";
import "./frontPage.css";
import Footer from "@/components/Footer";
import PageBackground from "@/components/common/PageBackground";

export default function Home() {
  return (
    <div className="shell">
      <div className="page">
        <PageBackground />
        <Navbar />
        <section className="circleShell">
          <section className="mx-auto flex min-h-[45vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
            <h1 className="largeText">Luis Olea</h1>
            <div className="largeText !text-[3.4rem] !bg-gradient-to-r !from-blue-400 !via-white !to-purple-300 !bg-clip-text !text-transparent">
              FullStack Developer
            </div>
            <p className="smallText">Description</p>
          </section>
          <section className="flex justify-center">
            <a className="emailButton" href="mailto:luisolea097@gmail.com">
              Email Me
            </a>
            <a className="resumeButton" href="Resume.pdf">
              Download Resume
            </a>
          </section>
        </section>
      </div>
      <Footer />
    </div>
  );
}
