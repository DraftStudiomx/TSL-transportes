import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import PhotoBand from "@/components/PhotoBand";
import Fleet from "@/components/Fleet";
import Coverage from "@/components/Coverage";
import Safety from "@/components/Safety";
import Cycle from "@/components/Cycle";
import Cargo from "@/components/Cargo";
import Testimonials from "@/components/sections/Testimonials";
import ClientLogos from "@/components/sections/ClientLogos";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <PhotoBand />
      <Fleet />
      <Coverage />
      <Safety />
      <Cycle />
      <Testimonials />
      <ClientLogos />
      <Cargo />
      <Faq />
    </>
  );
}
