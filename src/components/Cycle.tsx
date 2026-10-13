"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { cycle } from "@/lib/site";

export default function Cycle() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    // Desktop: recorrido horizontal fijado, la línea avanza con un camión al frente
    mm.add(MQ.desktop, () => {
      const track = ref.current!.querySelector<HTMLElement>(".cycle-track")!;
      const dist = () => track.scrollWidth - window.innerWidth + 64;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".cycle-pin",
          start: "top top",
          end: () => "+=" + dist() * 1.2,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -dist() }, 0).fromTo(".cycle-fill", { scaleX: 0 }, { scaleX: 1 }, 0);
      gsap.utils.toArray<HTMLElement>(".step").forEach((step, i, all) => {
        tl.fromTo(step, { opacity: 0.3 }, { opacity: 1, duration: 0.08 }, (i / all.length) * 0.9);
      });
    });

    // Mobile: línea vertical que se llena al bajar
    mm.add(MQ.mobile, () => {
      gsap.fromTo(
        ".cycle-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".cycle-track", start: "top 70%", end: "bottom 60%", scrub: true } }
      );
      gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
        gsap.fromTo(step, { opacity: 0.25, x: 20 }, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 75%" } });
      });
    });
  });

  return (
    <section id="proceso" ref={ref} className="cycle section-dark">
      <div className="cycle-pin">
        <div className="container cycle-head">
          <p className="label label-accent">Ciclo del servicio</p>
          <h2 className="display-2">
            De tu solicitud <span className="accent">a la factura,</span>
            <br />
            sin perderte de vista.
          </h2>
          <p className="cycle-note">Cada servicio incluye un grupo exclusivo de WhatsApp con tu equipo asignado.</p>
        </div>

        <div className="cycle-rail">
          <div className="cycle-line" aria-hidden="true">
            <i className="cycle-fill" />
          </div>
          <ol className="cycle-track">
            {cycle.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
