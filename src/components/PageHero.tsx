"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, MQ, useGsap } from "@/lib/gsap";

type Props = {
  label: string;
  /** Cada elemento es una línea del titular; la línea en `accentLine` va en turquesa. */
  lines: string[];
  accentLine?: number;
  lead: string;
  /** Imagen opcional a la derecha (recorte sin fondo o foto). */
  media?: ReactNode;
  children?: ReactNode;
};

/** Encabezado de páginas internas: misma línea visual que el hero del inicio, más compacto. */
export default function PageHero({ label, lines, accentLine, lead, media, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".ph-title .line > span", { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.2, stagger: 0.08 }, 0.1)
        .fromTo("[data-ph-in]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.45)
        .fromTo(".ph-media", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.6 }, 0.3);
    });
  });

  return (
    <section ref={ref} className={`page-hero${media ? " has-media" : ""}`}>
      <div className="container ph-grid">
        <div className="ph-copy">
          <nav className="ph-crumbs" aria-label="Ruta" data-ph-in>
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{label}</span>
          </nav>
          <h1 className="ph-title">
            {lines.map((l, i) => (
              <span className="line" key={i}>
                <span className={i === accentLine ? "accent" : undefined}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="ph-lead" data-ph-in>
            {lead}
          </p>
          {children && (
            <div className="ph-extra" data-ph-in>
              {children}
            </div>
          )}
        </div>
        {media && <div className="ph-media">{media}</div>}
      </div>
    </section>
  );
}
