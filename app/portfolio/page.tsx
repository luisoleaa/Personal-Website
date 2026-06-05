import Footer from "@/components/Footer";
import Navbar from "@/components/common/navbar";
import Timeline from "@/components/portfolio/timeline";

export default function PortfolioPage() {
  return (
    <div className="shell">
      <div className="page">
        <Navbar />
        <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="largeText !text-[3.4rem] !bg-gradient-to-r !from-orange-300 !via-white !to-pink-300 !bg-clip-text !text-transparent">
            Portfolio
          </h1>
          <p className="smallText"></p>
        </section>
        <section>
          <Timeline />
        </section>
      </div>
      <Footer />
    </div>
  );
}
