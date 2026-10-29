"use client";

import { useRef } from "react";
import { gsap, MQ, splitWords, useGsap } from "@/lib/gsap";
import { asset } from "@/lib/site";

/** Franja de foto a todo el ancho: puente visual entre la intro (clara) y la flotilla (oscura). */
export default function PhotoBand() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    // Solo en desktop: la foto se aleja un poco y se desplaza más lento que el scroll (profundidad)
    mm.add(MQ.desktop, () => {
      gsap.fromTo(
        ".band-photo",
        { scale: 1.08, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".band-title .w",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".band-copy", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".band-meta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "expo.out", scrollTrigger: { trigger: ".band-copy", start: "top 85%" } }
      );
    });
  });

  return (
    <section ref={ref} className="band" aria-label="Unidad de TSL México en carretera">
      <img
        className="band-photo"
        src={asset("/img/band-truck.jpg")}
        srcSet={`${asset("/img/band-truck-sm.jpg")} 1200w, ${asset("/img/band-truck.jpg")} 2400w`}
        sizes="100vw"
        alt="Tractocamión de TSL México en un camino de terracería"
        loading="lazy"
      />
      <div className="band-shade" aria-hidden="true" />
      <div className="container band-copy">
        <h2 className="band-title display-2">
          {splitWords("15 años")}
          <br />
          {splitWords("en el camino.")}
        </h2>
        <p className="band-meta">Querétaro · San Miguel de Allende · Aguascalientes · Puebla · Nuevo Laredo</p>
      </div>
    </section>
  );
}
