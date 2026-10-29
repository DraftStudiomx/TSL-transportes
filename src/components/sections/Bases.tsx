"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { basePhotos, basesDetail, offices } from "@/lib/site";
import PhotoSlot from "../PhotoSlot";

/** Infraestructura: flotilla por base (barras proporcionales) y oficinas / aliados. */
export default function Bases() {
  const ref = useRef<HTMLElement>(null);
  const max = Math.max(...basesDetail.flatMap((b) => b.units.map((u) => u.n)));

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.utils.toArray<HTMLElement>(".base").forEach((base) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: base, start: "top 78%" } });
        tl.fromTo(base, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }).fromTo(
          base.querySelectorAll(".bar i"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, stagger: 0.08, ease: "expo.out" },
          0.2
        );
      });
      gsap.fromTo(
        ".office",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".offices", start: "top 85%" } }
      );
    });
  });

  return (
    <section ref={ref} className="bases section-light">
      <div className="container">
        <div className="sec-head">
          <p className="label">Infraestructura</p>
          <h2 className="display-2">
            135 unidades <span className="muted">en dos bases propias.</span>
          </h2>
        </div>

        <div className="bases-grid">
          {basesDetail.map((b) => (
            <article key={b.city} className="base">
              {basePhotos[b.city] && <PhotoSlot photo={basePhotos[b.city]} className="base-photo" ratio="16 / 9" />}
              <header>
                <span className="base-kind">{b.kind}</span>
                <h3>{b.city}</h3>
                <p className="base-total">
                  <b>{b.total}</b> unidades
                </p>
              </header>
              <ul>
                {b.units.map((u) => (
                  <li key={u.name}>
                    <span className="bar-label">
                      {u.name}
                      <b>{u.n}</b>
                    </span>
                    <span className="bar" aria-hidden="true">
                      <i style={{ width: `${(u.n / max) * 100}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ul className="offices">
          {offices.map((o) => (
            <li key={o.city} className="office">
              <span className="base-kind">{o.kind}</span>
              <b>{o.city}</b>
              <span>{o.address}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
