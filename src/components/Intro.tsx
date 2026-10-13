"use client";

import { useRef } from "react";
import { gsap, MQ, splitWords, useGsap } from "@/lib/gsap";
import { asset, problems, stats } from "@/lib/site";
import { ArrowIcon } from "./Icons";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // Titular: las palabras se "encienden" conforme haces scroll (igual que la referencia)
      gsap.fromTo(
        ".intro-title .w",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".intro-title", start: "top 85%", end: "bottom 45%", scrub: true },
        }
      );

      gsap.fromTo(
        ".intro-thumb",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".intro-thumb", start: "top 85%" },
        }
      );

      // Problemas: cada uno se resalta con un marcador conforme haces scroll y aparece la respuesta de TSL
      const rows = gsap.utils.toArray<HTMLElement>(".problem");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".problems", start: "top 70%", end: "bottom 55%", scrub: true },
      });
      rows.forEach((row) => {
        tl.fromTo(row, { opacity: 0.3 }, { opacity: 1, ease: "none", duration: 0.4 }).fromTo(
          row.querySelector(".hl"),
          { backgroundSize: "0% 38%" },
          { backgroundSize: "100% 38%", ease: "none" },
          "<"
        );
      });
      tl.fromTo(".problems-answer", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });

      // Contadores
      gsap.utils.toArray<HTMLElement>(".stat-num [data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
      gsap.fromTo(
        ".stat",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } }
      );
    });
  });

  return (
    <section ref={ref} className="intro section-light">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-left">
            <img className="intro-thumb" src={asset("/img/intro-aerial.jpg")} alt="" aria-hidden="true" />
            <h2 className="intro-title display-2">
              <span className="muted">{splitWords("Movemos tu carga.")}</span>
              <br />
              {splitWords("Respondemos por ella.")}
            </h2>
          </div>
          <div className="intro-right">
            <p className="intro-lead">
              Con 15 años en el camino, TSL mueve carga general y especializada en los 32 estados de México y
              cruza la frontera con Estados Unidos, con un equipo asignado que responde desde la recolección hasta la entrega.
            </p>
            <p className="intro-lead dim">
              Sin intermediarios que desaparecen. Sin respuestas genéricas. Solo personas con experiencia que
              entienden tu operación.
            </p>
            <a href="#seguridad" className="link-arrow">
              Conoce por qué confían en nosotros <ArrowIcon className="ico" />
            </a>
          </div>
        </div>

        <div className="problems">
          <p className="label">Los problemas que ya conoces</p>
          <ul>
            {problems.map((p) => (
              <li key={p.title} className="problem">
                <span className="problem-text">
                  <b className="hl">{p.title}</b> {p.desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="problems-answer">
            TSL nació para resolver <em>exactamente esto.</em>
          </p>
        </div>

        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label} className="stat">
              <span className="stat-num">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix && <span className="suffix">{s.suffix}</span>}
                {s.unit && <span className="stat-unit">{s.unit}</span>}
              </span>
              <span className="stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
