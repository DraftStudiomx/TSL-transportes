"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { leader, team } from "@/lib/site";
import PhotoSlot from "../PhotoSlot";

/** Director con su mensaje y el equipo que atiende a los clientes. */
export default function Team() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".leader-photo",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".leader", start: "top 75%" } }
      );
      gsap.fromTo(
        ".leader-copy > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".leader", start: "top 70%" } }
      );
      gsap.fromTo(
        ".member",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".team-grid", start: "top 80%" } }
      );
    });
  });

  return (
    <section ref={ref} className="people section-light">
      <div className="container">
        <div className="leader">
          <PhotoSlot photo={leader.photo} className="leader-photo" ratio="4 / 5" />
          <div className="leader-copy">
            <p className="label">Quién está detrás</p>
            <blockquote className="leader-quote">{leader.quote}</blockquote>
            <p className="leader-name">
              <b>{leader.name}</b>
              <span>{leader.role}</span>
            </p>
          </div>
        </div>

        <div className="sec-head">
          <p className="label">Conoce a tu equipo</p>
          <h2 className="display-2">
            Personas reales, <span className="muted">del otro lado del teléfono.</span>
          </h2>
        </div>
        <ul className="team-grid">
          {team.map((m) => (
            <li key={m.photo.label} className="member">
              <PhotoSlot photo={m.photo} ratio="3 / 4" />
              <b>{m.name}</b>
              <span>{m.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
