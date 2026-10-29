import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import PhotoBand from "@/components/PhotoBand";
import Safety from "@/components/Safety";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "15 años de operación sin interrupciones. Operadores certificados, certificación C-TPAT, seguro de mercancías y un equipo asignado para cada cliente.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Nosotros"
        lines={["15 años", "moviendo la carga", "de México."]}
        accentLine={1}
        lead="Somos TSL, Transportes y Soluciones Logísticas: una empresa mexicana con flotilla propia, equipo asignado y seguimiento real en cada servicio."
      />
      <About />
      <Team />
      <PhotoBand />
      <Safety />
    </>
  );
}
