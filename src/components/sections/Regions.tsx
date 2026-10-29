"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { regions } from "@/lib/site";

/** Rutas optimizadas por región. */
export default function Regions() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".region",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".regions-grid", start: "top 82%" } }
      );
    });
  });

  return (
    <section ref={ref} className="regions section-light">
      <div className="container">
        <div className="sec-head sec-head-row">
          <div>
            <p className="label">Rutas por región</p>
            <h2 className="display-2">
              Todo México, <span className="muted">región por región.</span>
            </h2>
          </div>
          <p className="sec-lead">Rutas optimizadas por región, con servicios consolidados y dedicados según tu volumen.</p>
        </div>
        <ul className="regions-grid">
          {regions.map((r, i) => (
            <li key={r.name} className="region">
              <span className="region-idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{r.name}</h3>
              <p>{r.states}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
