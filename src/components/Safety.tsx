"use client";

import { useRef } from "react";
import { gsap, MQ, stackCards, useGsap } from "@/lib/gsap";
import { differentiators, safety, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function Safety() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // Tarjetas apiladas tipo archivero
      stackCards(gsap.utils.toArray<HTMLElement>(".safe-card"), { peek: 72, tab: 14 });

      gsap.utils.toArray<HTMLElement>(".diff").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".diff-line, .diff-title, .diff-desc"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%" } }
        );
        gsap.fromTo(row.querySelector(".diff-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%" } });
      });
    });
  });

  return (
    <section id="seguridad" ref={ref} className="safety section-light">
      <div className="container safety-grid">
        <div className="safety-sticky">
          <p className="label">Seguridad</p>
          <h2 className="display-2">
            Tu carga protegida <span className="muted">en cada tramo.</span>
          </h2>
          <p className="safety-lead">
            Operadores certificados, estándares aduanales para cruzar a Estados Unidos y la opción de asegurar cada envío.
          </p>
          <a className="btn btn-dark" href={waLink()} target="_blank" rel="noopener">
            <WhatsAppIcon className="ico" /> Hablar con un asesor
          </a>
        </div>

        <div className="safety-cards">
          {safety.map((s) => (
            <article key={s.title} className="safe-card">
              <span className="safe-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="safe-mark" aria-hidden="true">
                {s.tag}
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className="container diffs">
        <div className="diffs-head">
          <p className="label">Por qué TSL</p>
          <h2 className="display-2">
            Lo que nos separa <span className="muted">del resto.</span>
          </h2>
        </div>
        <ol>
          {differentiators.map((d, i) => (
            <li key={d.title} className="diff">
              <i className="diff-line" aria-hidden="true" />
              <span className="diff-idx">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="diff-title">{d.title}</h3>
              <p className="diff-desc">{d.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
