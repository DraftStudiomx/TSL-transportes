"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { crossingServices, crossings } from "@/lib/site";

/** Cruces fronterizos: ciudades y los tres servicios de frontera. */
export default function Crossings() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".cross-city",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".cross-cities", start: "top 80%" } }
      );
      gsap.fromTo(
        ".cross-service",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".cross-services", start: "top 85%" } }
      );
    });
  });

  return (
    <section ref={ref} className="crossings section-dark">
      <div className="container cross-grid">
        <div>
          <p className="label label-accent">Cruces fronterizos</p>
          <h2 className="display-2">
            De México <span className="accent">a Estados Unidos,</span> sin intermediarios.
          </h2>
          <p className="cross-lead">
            Operamos en dos puntos de cruce con certificación C-TPAT, el estándar de seguridad aduanera para mover carga hacia
            Estados Unidos.
          </p>
          <ul className="cross-cities">
            {crossings.map((c) => (
              <li key={c.city} className="cross-city">
                <b>{c.city}</b>
                <span>{c.services}</span>
              </li>
            ))}
          </ul>
        </div>
        <ol className="cross-services">
          {crossingServices.map((s, i) => (
            <li key={s.title} className="cross-service">
              <span className="cross-idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
