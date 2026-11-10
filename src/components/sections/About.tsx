"use client";

import { useRef } from "react";
import { gsap, MQ, splitWords, useGsap } from "@/lib/gsap";
import { useContent } from "@/components/ContentProvider";

/** Historia de TSL, cifras clave y valores. */
export default function About() {
  const { aboutValues, stats, texts } = useContent();
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".about-quote .w",
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".about-quote", start: "top 85%", end: "bottom 50%", scrub: true } }
      );
      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".about-stats", start: "top 85%" } }
      );
      gsap.fromTo(
        ".value",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".values", start: "top 80%" } }
      );
    });
  });

  return (
    <section ref={ref} className="about section-light">
      <div className="container">
        <div className="about-grid">
          <p className="label">Nuestra historia</p>
          <h2 className="about-quote display-2">
            {splitWords(texts.aboutQuote)}
          </h2>
          <div className="about-copy">
            {texts.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="about-stats">
          {stats.map((s) => (
            <li key={s.label} className="about-stat">
              <b>
                {s.value}
                {s.suffix && <span>{s.suffix}</span>}
              </b>
              <span>{s.unit ? `${s.unit} · ` : ""}{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="values">
          <div className="sec-head">
            <p className="label">Lo que nos mueve</p>
            <h2 className="display-2">
              Cuatro compromisos <span className="muted">en cada viaje.</span>
            </h2>
          </div>
          <ol className="values-grid">
            {aboutValues.map((v, i) => (
              <li key={v.title} className="value">
                <span className="value-idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
