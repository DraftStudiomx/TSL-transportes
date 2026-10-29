"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { operationPhotos } from "@/lib/site";
import PhotoSlot from "../PhotoSlot";

/** Galería "TSL en operación": operadores, maniobras, patio y seguimiento. */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 70, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" } }
      );
    });
    // Desktop: las columnas se desfasan con el scroll
    mm.add(MQ.desktop, () => {
      gsap.fromTo(
        ".gallery-item:nth-child(even)",
        { y: 60 },
        { y: -60, ease: "none", scrollTrigger: { trigger: ".gallery-grid", start: "top bottom", end: "bottom top", scrub: true } }
      );
    });
  });

  return (
    <section ref={ref} className="gallery section-dark">
      <div className="container">
        <div className="sec-head sec-head-row">
          <div>
            <p className="label label-accent">TSL en operación</p>
            <h2 className="display-2">
              Así se ve <span className="accent">un día en el camino.</span>
            </h2>
          </div>
          <p className="sec-lead gallery-lead">
            Operadores certificados, unidades revisadas antes de cada salida y un equipo que da seguimiento real a tu carga.
          </p>
        </div>
        <ul className="gallery-grid">
          {operationPhotos.map((p, i) => (
            <li key={p.label} className={`gallery-item gi-${i + 1}`}>
              <PhotoSlot photo={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
