import Navbar from "@/components/common/navbar";
import "./frontPage.css";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="shell">
      <div className="page">
        <Navbar />
        <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="largeText">Luis Olea</h1>
          <div className="largeText !text-[3.4rem] !bg-gradient-to-r !from-orange-300 !via-white !to-pink-300 !bg-clip-text !text-transparent">
            FullStack Developer
          </div>
          <p className="smallText">
            crea
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
