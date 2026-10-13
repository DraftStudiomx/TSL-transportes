"use client";

import { useRef } from "react";
import map from "@/data/mexico-map.json";
import { gsap, MQ, useGsap } from "@/lib/gsap";
import { bases, crossings } from "@/lib/site";

type City = { name: string; x: number; y: number; kind: string };
const cities = map.cities as Record<string, City>;

// Rutas desde las bases de flotilla hacia destinos y frontera
const routes: [string, string][] = [
  ["qro", "nld"], ["sma", "col"], ["qro", "mty"], ["qro", "cdmx"], ["qro", "pue"], ["sma", "gdl"],
  ["qro", "ver"], ["sma", "ags"], ["sma", "chi"], ["qro", "mer"], ["qro", "cun"], ["sma", "her"],
  ["sma", "tij"], ["sma", "mxl"], ["sma", "cul"], ["qro", "oax"], ["qro", "tux"], ["qro", "vsa"],
  ["sma", "dgo"], ["qro", "tam"], ["qro", "aca"], ["sma", "lap"], ["qro", "cam"], ["sma", "zac"],
  ["qro", "slp"], ["sma", "sal"], ["sma", "leo"], ["qro", "mor"],
];

function arc(a: City, b: City) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const k = 0.22; // curvatura
  return `M${a.x},${a.y} Q${mx - dy * k},${my + dx * k} ${b.x},${b.y}`;
}

const labelled = ["qro", "sma", "ags", "pue", "nld", "col"];

// Posición de cada etiqueta respecto a su punto (evita que se encimen en el Bajío)
const labelPos: Record<string, { x: number; y: number; anchor: "start" | "end" }> = {
  qro: { x: 14, y: 6, anchor: "start" },
  sma: { x: -12, y: 24, anchor: "end" },
  ags: { x: -12, y: -10, anchor: "end" },
  pue: { x: 14, y: 6, anchor: "start" },
  nld: { x: 14, y: 6, anchor: "start" },
  col: { x: -12, y: -10, anchor: "end" },
};

export default function Coverage() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    const build = (pin: boolean) => {
      const paths = gsap.utils.toArray<SVGPathElement>(".route");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const counter = ref.current!.querySelector<HTMLElement>(".cov-count");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: pin
          ? { trigger: ".cov-pin", start: "top top", end: "+=220%", pin: true, scrub: 0.6 }
          : { trigger: ".cov-map", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      });
      tl.fromTo(".cov-map .mx", { opacity: 0.2 }, { opacity: 1, duration: 0.15 }, 0)
        .to(paths, { strokeDashoffset: 0, duration: 0.25, stagger: 0.6 / paths.length }, 0.1)
        .fromTo(".dest", { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.05, stagger: 0.6 / paths.length }, 0.3)
        .fromTo(".hub-label", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.05 }, 0.15)
        .fromTo(".cov-list li", { opacity: 0.25 }, { opacity: 1, duration: 0.1, stagger: 0.08 }, 0.2);
      const obj = { v: 0 };
      tl.to(obj, { v: 32, duration: 0.8, onUpdate: () => counter && (counter.textContent = String(Math.round(obj.v)).padStart(2, "0")) }, 0.05);
    };
    mm.add(MQ.desktop, () => build(true));
    mm.add(MQ.mobile, () => build(false));
  });

  return (
    <section id="cobertura" ref={ref} className="coverage section-deep">
      <div className="cov-pin">
        <div className="container cov-grid">
          <div className="cov-copy">
            <p className="label label-accent">Cobertura nacional e internacional</p>
            <h2 className="display-2">
              <span className="cov-count">32</span>
              <span className="cov-of">/32</span>
              <br />
              estados.
            </h2>
            <p className="cov-lead">
              Rutas optimizadas por región, servicios consolidados y dedicados, y cruces a Estados Unidos por Laredo, TX y
              Colombia, N.L.
            </p>

            <ul className="cov-list">
              {bases.map((b) => (
                <li key={b.city}>
                  <span className={`cov-kind kind-${b.kind === "Flotilla propia" ? "hub" : b.kind === "Oficina central" ? "office" : "ally"}`}>
                    {b.kind}
                  </span>
                  <b>{b.city}</b>
                  <span>{b.note}</span>
                </li>
              ))}
              {crossings.map((c) => (
                <li key={c.city}>
                  <span className="cov-kind kind-border">Cruce fronterizo</span>
                  <b>{c.city}</b>
                  <span>{c.services}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cov-map">
            <svg viewBox={`0 0 ${map.width} ${map.height}`} role="img" aria-label="Mapa de cobertura de TSL en México">
              <defs>
                <radialGradient id="hubGlow">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path className="us" d={map.us} />
              <text className="us-label" x="560" y="70">
                EE.UU.
              </text>
              <path className="mx" d={map.mexico} />
              {routes.map(([a, b]) => (
                <path key={a + b} className={`route${["nld", "col"].includes(b) ? " route-border" : ""}`} d={arc(cities[a], cities[b])} />
              ))}
              {Object.entries(cities)
                .filter(([, c]) => c.kind === "dest")
                .map(([k, c]) => (
                  <circle key={k} className="dest" cx={c.x} cy={c.y} r="3.2" />
                ))}
              {labelled.map((k) => {
                const c = cities[k];
                const pos = labelPos[k];
                return (
                  <g key={k} className={`hub hub-${c.kind}`} transform={`translate(${c.x} ${c.y})`}>
                    <circle className="hub-glow" r="26" fill="url(#hubGlow)" />
                    <circle className="hub-ring" r="9" />
                    <circle className="hub-dot" r="4.5" />
                    <text className="hub-label" x={pos.x} y={pos.y} textAnchor={pos.anchor}>
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <ul className="cov-legend">
              <li>
                <i className="lg-hub" /> Flotilla propia
              </li>
              <li>
                <i className="lg-ally" /> Aliados y oficina
              </li>
              <li>
                <i className="lg-border" /> Cruce fronterizo
              </li>
              <li>
                <i className="lg-dest" /> Destinos frecuentes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
