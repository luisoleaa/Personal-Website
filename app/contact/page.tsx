import Footer from "@/components/Footer";
import Navbar from "@/components/common/navbar";

export default function ContactPage() {
  return (
    <div className="shell">
      <div className="page">
        <Navbar />
        <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="largeText">How to get into Contact</h1>
          <p className="smallText">Reachable through:</p>
          <p className="smallText"> Email:</p>
          <p className="smallText">LinkedIn: </p>
          {/* Add qr code for LinkedIn with profile picture animation appearing */}
          <p className="smallText"></p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
