import Footer from "@/components/Footer";
import Navbar from "@/components/common/navbar";
// Used to automate the making of pages since they have the same structure
type DefaultNavPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function DefaultNavPage({
  eyebrow,
  title,
  description,
}: DefaultNavPageProps) {
  return (
    <div className="shell">
      <main className="page">
        <Navbar />
        <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <p className="smallText">{eyebrow}</p>
          <h1 className="largeText">{title}</h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-[#b8b8b8]">
            {description}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
