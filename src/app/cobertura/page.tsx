import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import Coverage from "@/components/Coverage";
import Bases from "@/components/sections/Bases";
import Crossings from "@/components/sections/Crossings";
import Regions from "@/components/sections/Regions";

export const metadata: Metadata = {
  title: "Cobertura",
  description:
    "Cobertura en los 32 estados de México, cruces fronterizos en Laredo TX y Colombia N.L., flotilla en Querétaro y San Miguel de Allende y oficina central en Aguascalientes.",
};

export default async function CoberturaPage() {
  const { texts } = await getContent();
  const hero = texts.heroCobertura;

  return (
    <>
      <PageHero
        label="Cobertura"
        lines={hero.lines}
        accentLine={hero.accentLine}
        lead={hero.lead}
      />
      <Coverage />
      <Bases />
      <Crossings />
      <Regions />
    </>
  );
}
