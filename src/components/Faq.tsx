"use client";

import { useState } from "react";
import { faqs, mailLink } from "@/lib/site";
import { PlusIcon } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq section-light">
      <div className="container faq-grid">
        <div className="faq-head">
          <p className="label">F.A.Q.</p>
          <h2 className="display-2">Preguntas frecuentes</h2>
          <p className="faq-lead">Respuestas directas para que avances con confianza.</p>
          <p className="faq-more">
            ¿Tienes otra duda? <a href={mailLink}>Escríbenos</a>
          </p>
        </div>
        <ul className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <PlusIcon className="faq-ico" />
                </button>
                <div className="faq-a" role="region">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
