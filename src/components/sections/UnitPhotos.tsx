"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { useContent } from "@/components/ContentProvider";
import PhotoSlot from "../PhotoSlot";

/** Fotos reales de las unidades TSL por tipo. */
export default function UnitPhotos() {
  const { unitPhotos } = useContent();
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".unit-photo",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".unit-photos-grid", start: "top 80%" } }
      );
    });
  });

  return (
    <section ref={ref} className="unit-photos section-light">
      <div className="container">
        <div className="sec-head sec-head-row">
          <div>
            <p className="label">Nuestras unidades</p>
            <h2 className="display-2">
              Unidades reales, <span className="muted">con nuestro nombre.</span>
            </h2>
          </div>
          <p className="sec-lead">Flotilla propia con operadores certificados, lista para carga general y especializada.</p>
        </div>
        <ul className="unit-photos-grid">
          {unitPhotos.map((u) => (
            <li key={u.unit} className="unit-photo">
              <PhotoSlot photo={u} ratio="4 / 5" />
              <b>{u.unit}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
