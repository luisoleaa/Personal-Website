import Navbar from "@/components/common/navbar";
import "./frontPage.css";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="shell">
      <div className="page">
        <Navbar />
        <div className="smallText">Hi my name is</div>
        <div className="largeText">Luis Olea</div>
      </div>
      <Footer />
    </div>
  );
}
