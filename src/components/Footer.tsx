"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, MQ, splitWords, useGsap } from "@/lib/gsap";
import { bases, contact, mailLink, nav, waLink } from "@/lib/site";
import { LogoMark } from "./Logo";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  // En la página de contacto el formulario ya es el llamado a la acción
  const showCta = !usePathname().startsWith("/contacto");

  useGsap(ref, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ".cta-title .w",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.05, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".cta-title", start: "top 85%" } }
      );
      // El logo gigante se revela de abajo hacia arriba al llegar al final
      gsap.fromTo(
        ".footer-mark",
        { clipPath: "inset(100% 0 0 0)", yPercent: 20 },
        {
          clipPath: "inset(0% 0 0 0)",
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".footer-mark", start: "top bottom", end: "bottom bottom", scrub: true },
        }
      );
    });
  });

  return (
    <footer id="cierre" ref={ref} className={`footer section-deep${showCta ? "" : " no-cta"}`}>
      {showCta && (
        <div className="container cta">
        <p className="label label-accent">Hablemos</p>
        <h2 className="cta-title display-1">{splitWords("¿Listo para mover tu carga?")}</h2>
        <div className="cta-row">
          <p className="cta-lead">Sin call centers ni vueltas. Cuéntanos origen, destino y tipo de carga y te respondemos el mismo día.</p>
          <div className="btn-row">
            <a className="btn btn-accent btn-lg" href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon className="ico" /> Cotizar por WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href={mailLink}>
              <MailIcon className="ico" /> {contact.email}
            </a>
          </div>
        </div>
      </div>
      )}

      <div className="container footer-cols">
        <div>
          <p className="label">Navegación</p>
          <ul>
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Contacto</p>
          <ul>
            <li>
              <a href={waLink()} target="_blank" rel="noopener">
                <WhatsAppIcon className="ico" /> {contact.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`tel:+52${contact.phone}`}>
                <PhoneIcon className="ico" /> {contact.phoneLabel}
              </a>
            </li>
            <li>
              <a href={mailLink}>
                <MailIcon className="ico" /> {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bases">
          <p className="label">Ubicaciones</p>
          <ul>
            {bases.map((b) => (
              <li key={b.city}>
                <b>{b.city}</b>
                <span>{b.kind}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-mark-wrap" aria-hidden="true">
        <LogoMark className="footer-mark" />
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} TSL México · Transportes y Soluciones Logísticas</span>
        <span>
          Diseño y desarrollo por{" "}
          <a href="https://draftstudio.mx" target="_blank" rel="noopener">
            Draft Studio
          </a>
        </span>
      </div>
    </footer>
  );
}
