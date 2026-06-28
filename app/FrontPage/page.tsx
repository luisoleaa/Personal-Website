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

        <main className="frontMain">
          <section className="circleShell">
            {/* Drop your PNG at /public/floating.png */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/IMG_7339.jpg"
              alt="luis"
              role="presentation"
              className="floatingImg"
            />
            <section className="mx-auto flex min-h-[15vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
              <h1 className="largeText heroName">Luis Olea</h1>
              <div className="largeText heroRole !text-[3.4rem] !bg-gradient-to-r !from-orange-300 !via-white !to-pink-300 !bg-clip-text !text-transparent">
                FullStack Developer
              </div>
            </section>
            <section className="heroButtons flex justify-center gap-4 mt-9">
              <a className="emailButton" href="mailto:luisolea097@gmail.com">
                <span>Email Me</span>
              </a>
              <a className="resumeButton" href="Resume.pdf">
                <span>Download Resume</span>
              </a>
            </section>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
