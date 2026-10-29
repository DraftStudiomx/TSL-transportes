"use client";

import { useRef } from "react";
import { gsap, MQ, stackCards, useGsap } from "@/lib/gsap";
import { asset, differentiators, safety, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

const teamPoints = ["Grupo exclusivo de WhatsApp por servicio", "Seguimiento real 24/7", "Respuesta el mismo día"];

export default function Safety() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // Foto del equipo: se descubre de abajo hacia arriba y los puntos entran escalonados
      gsap.fromTo(
        ".team-photo img",
        { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".team", start: "top 75%" } }
      );
      gsap.fromTo(
        ".team-copy > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".team", start: "top 70%" } }
      );

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

      <div className="container team">
        <figure className="team-photo">
          <img src={asset("/img/asesora.jpg")} alt="Asesora de TSL México atendiendo un servicio" loading="lazy" />
          <figcaption>
            <span className="dot" aria-hidden="true" /> Tu asesora, en línea
          </figcaption>
        </figure>
        <div className="team-copy">
          <p className="label">Tu equipo asignado</p>
          <h2 className="display-2">
            No eres un número de guía. <span className="muted">Tienes nombre y equipo.</span>
          </h2>
          <p className="team-lead">
            Desde la cotización hasta la factura, una persona de TSL da seguimiento a tu carga y te responde por WhatsApp,
            correo o teléfono.
          </p>
          <ul className="team-points">
            {teamPoints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a className="btn btn-dark" href={waLink()} target="_blank" rel="noopener">
            <WhatsAppIcon className="ico" /> Hablar con un asesor
          </a>
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
