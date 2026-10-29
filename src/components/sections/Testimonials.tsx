"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { testimonials } from "@/lib/site";

/** Testimonios de clientes: uno grande a la vez, con navegación por puntos. */
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const t = testimonials[i];

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".testi-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".testi-card", start: "top 80%" } }
      );
    });
  });

  const go = (n: number) => setI((n + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="testi section-light">
      <div className="container">
        <div className="sec-head sec-head-row">
          <div>
            <p className="label">Clientes</p>
            <h2 className="display-2">
              Lo que dicen <span className="muted">quienes ya mueven su carga con TSL.</span>
            </h2>
          </div>
          <div className="testi-nav">
            <button type="button" onClick={() => go(i - 1)} aria-label="Testimonio anterior">
              ←
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Siguiente testimonio">
              →
            </button>
          </div>
        </div>

        <figure className="testi-card" key={i}>
          <span className="testi-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{t.quote}</blockquote>
          <figcaption>
            <span className="testi-avatar" aria-hidden="true">
              {t.company.replace(/[[\]]/g, "").slice(0, 1) || "C"}
            </span>
            <span>
              <b>{t.name}</b>
              <small>
                {t.role} · {t.company}
              </small>
            </span>
          </figcaption>
        </figure>

        <div className="testi-dots" role="tablist" aria-label="Testimonios">
          {testimonials.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Testimonio ${n + 1}`}
              className={n === i ? "is-active" : undefined}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
