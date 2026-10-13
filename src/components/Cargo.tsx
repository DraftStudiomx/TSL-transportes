"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGsap } from "@/lib/gsap";
import { cargo } from "@/lib/site";

export default function Cargo() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      // Dos filas infinitas en sentidos opuestos; la velocidad reacciona al scroll
      const rows = gsap.utils.toArray<HTMLElement>(".cargo-row-inner");
      const loops = rows.map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 })
      );
      let target = 1;
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          target = Math.min(6, 1 + Math.abs(self.getVelocity()) / 350);
        },
      });
      const tick = () => {
        loops.forEach((l) => l.timeScale(l.timeScale() + (target - l.timeScale()) * 0.12));
        target += (1 - target) * 0.06;
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    });
  });

  const row = (items: string[], key: string) => (
    <div className="cargo-row" key={key}>
      <div className="cargo-row-inner">
        {[...items, ...items].map((c, i) => (
          <span key={i} className={i % 2 ? "outline" : ""} aria-hidden={i >= items.length}>
            {c}
            <i className="sep" />
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={ref} className="cargo section-light" aria-label="Tipos de carga">
      <div className="container cargo-head">
        <p className="label">Lo que movemos todos los días</p>
      </div>
      {row(cargo, "a")}
      {row([...cargo].reverse(), "b")}
    </section>
  );
}
