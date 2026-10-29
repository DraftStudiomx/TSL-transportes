"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { asset, mailLink, waLink } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "./Icons";

// Puntos interactivos sobre la foto (hero validado con el cliente). x/y en % de la imagen.
const hotspots = [
  {
    id: "carga",
    label: "Carga",
    x: 31,
    y: 26,
    open: "down",
    title: "Tipos de carga",
    desc: "Lo que transportamos todos los días, a nivel nacional:",
    chips: ["Plásticos", "Metales", "Autopartes", "Grado alimenticio", "Línea blanca", "Maquinaria"],
    foot: "Carga general y especializada",
  },
  {
    id: "cabina",
    label: "Cabina",
    x: 70,
    y: 35,
    open: "down",
    title: "Cabina y seguridad",
    desc: "Choferes con licencia tipo B, examen médico y antidoping vigentes. Certificación C-TPAT para cruces a Estados Unidos.",
    chips: [],
    foot: "Seguridad en cada tramo",
  },
  {
    id: "chasis",
    label: "Chasís",
    x: 44,
    y: 75,
    open: "up",
    title: "Tipos de unidad",
    desc: "La unidad correcta para cada operación:",
    chips: ["Cajas 53′", "Torton / Rabón", "Refrigerados", "3.5 / 1.5 ton", "Plataformas", "Vehículos"],
    foot: "135 unidades en flotilla",
  },
];

const heroStats = [
  { n: "15", t: "años de operación" },
  { n: "32", t: "estados cubiertos" },
  { n: "135", t: "unidades" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".hero-photo", { scale: 1.18, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2 })
        .fromTo(".hero-title .line > span", { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.3, stagger: 0.09 }, 0.25)
        .fromTo("[data-hero-in]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7)
        .fromTo(".hs", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, 1.3);
    });

    // Al salir del hero: la foto se acerca y el texto se desvanece (solo desktop, en mobile el layout es apilado)
    mm.add(MQ.desktop, () => {
      gsap.to(".hero-stage", {
        scale: 1.08,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-top, .hero-bottom", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "30% top", end: "bottom top", scrub: true },
      });
    });
  });

  const current = hotspots.find((h) => h.id === active);

  return (
    <section id="inicio" ref={ref} className={`hero${active ? " has-active-hs" : ""}`} onClick={(e) => !(e.target as HTMLElement).closest(".hs") && setActive(null)}>
      <div className="hero-top container">
        <p className="eyebrow" data-hero-in>
          <span className="rule" aria-hidden="true" /> Transportes y Soluciones Logísticas
        </p>
        <h1 className="hero-title">
          <span className="line">
            <span>Tu carga,</span>
          </span>
          <span className="line">
            <span>
              <em>nuestra</em>
            </span>
          </span>
          <span className="line">
            <span>responsabilidad.</span>
          </span>
        </h1>
      </div>

      <div className="hero-media">
        <div className="hero-stage">
          <span className="truck-shadow" aria-hidden="true" />
          <img
            className="hero-photo"
            src={asset("/img/truck-tsl.webp")}
            srcSet={`${asset("/img/truck-tsl-sm.webp")} 800w, ${asset("/img/truck-tsl.webp")} 1280w`}
            sizes="(max-width: 899px) 100vw, 60vw"
            alt="Tractocamión de TSL México con caja de 53 pies"
            fetchPriority="high"
          />
          {hotspots.map((h) => (
            <button
              key={h.id}
              className={`hs hs-open-${h.open}${active === h.id ? " is-active" : ""}`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              onClick={() => setActive((a) => (a === h.id ? null : h.id))}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(h.id)}
              onMouseLeave={() => window.matchMedia("(hover: hover)").matches && setActive(null)}
              aria-expanded={active === h.id}
              aria-label={h.title}
            >
              <span className="hs-chip">
                <span className="hs-dot" />
                {h.label}
              </span>
              <span className="hs-card" role="tooltip">
                <strong>{h.title}</strong>
                <span>{h.desc}</span>
                {h.chips.length > 0 && (
                  <span className="chips">
                    {h.chips.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </span>
                )}
                <small>{h.foot}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="hero-shade" aria-hidden="true" />
      </div>

      {/* En mobile el detalle del punto se muestra debajo de la foto */}
      <div className={`hs-panel container${current ? " is-open" : ""}`} aria-live="polite">
        {current ? (
          <>
            <strong>{current.title}</strong>
            <span>{current.desc}</span>
            {current.chips.length > 0 && (
              <span className="chips">
                {current.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </span>
            )}
          </>
        ) : (
          <span className="hs-hint">Toca los puntos del camión para conocer más</span>
        )}
      </div>

      <div className="hero-bottom container">
        <div className="hero-copy">
          <p className="lede" data-hero-in>
            Transporte terrestre nacional e internacional con seguimiento real y cobertura en los 32 estados de México.
          </p>
          <div className="btn-row" data-hero-in>
            <a className="btn btn-accent" href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon className="ico" /> Cotizar por WhatsApp
            </a>
            <a className="btn btn-ghost" href={mailLink}>
              <MailIcon className="ico" /> Escribir por correo
            </a>
          </div>
        </div>
        <ul className="hero-stats" data-hero-in>
          {heroStats.map((s) => (
            <li key={s.t}>
              <b>{s.n}</b>
              <span>{s.t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-scroll" aria-hidden="true" data-hero-in>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
