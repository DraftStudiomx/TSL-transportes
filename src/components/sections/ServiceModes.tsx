"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { serviceModes } from "@/lib/site";
import { ArrowIcon } from "../Icons";

/** Tres modalidades de servicio: dedicado, consolidado y cruce fronterizo. */
export default function ServiceModes() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".mode",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".modes-grid", start: "top 80%" } }
      );
    });
  });

  return (
    <section ref={ref} className="modes section-light">
      <div className="container">
        <div className="sec-head">
          <p className="label">Cómo trabajamos</p>
          <h2 className="display-2">
            Tres formas de mover <span className="muted">tu carga.</span>
          </h2>
        </div>
        <div className="modes-grid">
          {serviceModes.map((m, i) => (
            <article key={m.title} className={`mode mode-${i + 1}`}>
              <span className="mode-tag">{m.tag}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <ul>
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {i === 2 && (
                <Link href="/cobertura/" className="link-arrow">
                  Ver cobertura y cruces <ArrowIcon className="ico" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
