"use client";

import { useRef, useState } from "react";
import { gsap, MQ, stackCards, useGsap } from "@/lib/gsap";
import { asset, units } from "@/lib/site";

const MAX_SPEED = 88;
// Parte del recorrido fijado en la que el camión entra y acelera; después sigue en crucero
const DRIVE_END = 0.45;

export default function Fleet() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useGsap(ref, (mm) => {
    const speedo = ref.current!.querySelector<HTMLElement>(".speedo-num");
    const truck = ref.current!.querySelector<HTMLElement>(".fleet-truck");
    // Conforme haces scroll el velocímetro sube de 00 a MAX_SPEED mientras el camión entra;
    // después se queda en crucero y el camión sigue avanzando un poco
    const render = (drive: number, cruise = 0) => {
      const d = Math.min(1, Math.max(0, drive));
      if (truck) gsap.set(truck, { xPercent: -75 * (1 - d) ** 2 + 5 * cruise });
      if (speedo) speedo.textContent = String(Math.round(MAX_SPEED * Math.sqrt(d))).padStart(2, "0");
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
            render(st.progress / DRIVE_END, Math.max(0, (st.progress - DRIVE_END) / (1 - DRIVE_END)));
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
      stackCards(gsap.utils.toArray<HTMLElement>(".unit"));
    });

    // Sin animaciones: se muestra el camión en su lugar
    mm.add("(prefers-reduced-motion: reduce)", () => render(1));
  });

  return (
    <section id="flotilla" ref={ref} className="fleet section-dark">
      <div className="fleet-pin">
        <div className="fleet-scene" aria-hidden="true">
          <div className="fleet-glow" />
          <div className="fleet-truck">
            <span className="truck-shadow" />
            <img src={asset("/img/truck-tsl.webp")} srcSet={`${asset("/img/truck-tsl-sm.webp")} 900w, ${asset("/img/truck-tsl.webp")} 1708w`} sizes="(max-width: 899px) 100vw, 64vw" alt="" />
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
            <span className="speedo-num">00</span>
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
