import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Fleet from "@/components/Fleet";
import Coverage from "@/components/Coverage";
import Safety from "@/components/Safety";
import Cycle from "@/components/Cycle";
import Cargo from "@/components/Cargo";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Fleet />
        <Coverage />
        <Safety />
        <Cycle />
        <Cargo />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
