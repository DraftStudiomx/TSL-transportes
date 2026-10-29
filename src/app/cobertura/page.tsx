import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Coverage from "@/components/Coverage";
import Bases from "@/components/sections/Bases";
import Crossings from "@/components/sections/Crossings";
import Regions from "@/components/sections/Regions";

export const metadata: Metadata = {
  title: "Cobertura",
  description:
    "Cobertura en los 32 estados de México, cruces fronterizos en Laredo TX y Colombia N.L., flotilla en Querétaro y San Miguel de Allende y oficina central en Aguascalientes.",
};

export default function CoberturaPage() {
  return (
    <>
      <PageHero
        label="Cobertura"
        lines={["32 estados.", "Dos fronteras.", "Un solo equipo."]}
        accentLine={1}
        lead="Flotilla propia en el Bajío, aliados en Puebla y Nuevo Laredo, y cruces a Estados Unidos por Laredo, TX y Colombia, N.L."
      />
      <Coverage />
      <Bases />
      <Crossings />
      <Regions />
    </>
  );
}
