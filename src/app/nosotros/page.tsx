import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import PhotoBand from "@/components/PhotoBand";
import Safety from "@/components/Safety";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "15 años de operación sin interrupciones. Operadores certificados, certificación C-TPAT, seguro de mercancías y un equipo asignado para cada cliente.",
};

export default async function NosotrosPage() {
  const { texts } = await getContent();
  const hero = texts.heroNosotros;

  return (
    <>
      <PageHero
        label="Nosotros"
        lines={hero.lines}
        accentLine={hero.accentLine}
        lead={hero.lead}
      />
      <About />
      <Team />
      <PhotoBand />
      <Safety />
    </>
  );
}
