"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { units } from "@/lib/site";

const MAX_SPEED = 88;
// Parte del recorrido fijado que ocupa el camión entrando y frenando; el resto recorre las unidades
const DRIVE_END = 0.45;

export default function Fleet() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useGsap(ref, (mm) => {
    const speedo = ref.current!.querySelector<HTMLElement>(".speedo-num");
    const truck = ref.current!.querySelector<HTMLElement>(".fleet-truck");
    // El camión entra desde la izquierda y frena (desaceleración cuadrática); el velocímetro baja a 00
    const render = (drive: number) => {
      const d = Math.min(1, Math.max(0, drive));
      if (truck) gsap.set(truck, { xPercent: -75 * (1 - d) ** 2 });
      if (speedo) speedo.textContent = String(Math.round(MAX_SPEED * (1 - d) ** 1.4)).padStart(2, "0");
    };

    mm.add(MQ.desktop, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".fleet-pin",
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.6,
          onUpdate: (st) => {
            render(st.progress / DRIVE_END);
            // Cada unidad ocupa la misma fracción del recorrido
            const idx = Math.min(units.length - 1, Math.floor(st.progress * units.length));
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });
      tl.fromTo(".fleet-progress i", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
    });

    // Mobile: el camión avanza mientras la escena cruza la pantalla; las tarjetas se apilan con sticky
    mm.add(MQ.mobile, () => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: ".fleet-scene",
            start: "top 85%",
            end: "bottom 35%",
            scrub: true,
            onUpdate: (st) => render(st.progress),
          },
        }
      );
      gsap.utils.toArray<HTMLElement>(".unit").forEach((card, i, all) => {
        if (i === all.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: all[i + 1], start: "top 85%", end: "top 20%", scrub: true },
        });
      });
    });

    // Sin animaciones: se muestra el camión ya detenido
    mm.add("(prefers-reduced-motion: reduce)", () => render(1));
  });

  return (
    <section id="flotilla" ref={ref} className="fleet section-dark">
      <div className="fleet-pin">
        <div className="fleet-scene" aria-hidden="true">
          <div className="fleet-glow" />
          <div className="fleet-truck">
            <span className="truck-shadow" />
            <img src="/img/truck-tsl.webp" srcSet="/img/truck-tsl-sm.webp 900w, /img/truck-tsl.webp 1708w" sizes="(max-width: 899px) 100vw, 64vw" alt="" />
          </div>
        </div>

        <div className="container fleet-head">
          <div>
            <p className="label label-accent">Nuestra flotilla</p>
            <h2 className="display-2">
              La unidad correcta
              <br />
              <span className="accent">para cada operación.</span>
            </h2>
          </div>
          <div className="speedo">
            <span className="speedo-num">{String(MAX_SPEED)}</span>
            <span className="speedo-unit">km/h</span>
          </div>
        </div>

        <div className="container fleet-units-wrap">
          <ol className="fleet-units">
            {units.map((u, i) => (
              <li key={u.name} className={`unit${i === active ? " is-active" : ""}`}>
                <span className="unit-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="unit-name">{u.name}</span>
                <span className="unit-use">{u.use}</span>
                <span className="unit-meta">
                  {u.count ? (
                    <>
                      <b>{u.count}</b> unidades
                    </>
                  ) : (
                    <b className="unit-tag">Disponible</b>
                  )}
                </span>
                <span className="unit-detail">{u.detail}</span>
              </li>
            ))}
          </ol>
          <div className="fleet-progress" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
