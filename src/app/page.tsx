import Navbar from "@/src/components/common/Navbar";
import Hero from "@/src/components/home/Hero";
import Team from "@/src/components/home/Team";
import Gallery from "@/src/components/home/Gallery";
import Footer from "@/src/components/common/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Team />
      <Gallery />
      <Footer />
    </main>
  );
}
