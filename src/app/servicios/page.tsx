import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import ServiceModes from "@/components/sections/ServiceModes";
import Fleet from "@/components/Fleet";
import Gallery from "@/components/sections/Gallery";
import UnitPhotos from "@/components/sections/UnitPhotos";
import Cargo from "@/components/Cargo";
import Cycle from "@/components/Cycle";
import Faq from "@/components/Faq";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Transporte terrestre dedicado, consolidado y con cruce fronterizo. Cajas 53′, torton, refrigerados, plataformas y camionetas para carga general y especializada.",
};

export default async function ServiciosPage() {
  const { texts } = await getContent();
  const hero = texts.heroServicios;

  return (
    <>
      <PageHero
        label="Servicios"
        lines={hero.lines}
        accentLine={hero.accentLine}
        lead={hero.lead}
        media={
          <img
            className="ph-truck"
            src={asset("/img/truck-tsl.webp")}
            srcSet={`${asset("/img/truck-tsl-sm.webp")} 800w, ${asset("/img/truck-tsl.webp")} 1280w`}
            sizes="(max-width: 899px) 100vw, 45vw"
            alt="Tractocamión de TSL México"
          />
        }
      />
      <ServiceModes />
      <Fleet />
      <UnitPhotos />
      <Gallery />
      <Cargo />
      <Cycle />
      <Faq />
    </>
  );
}
