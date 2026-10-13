"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Icons";
import { contact, mailLink, nav, tickerItems, waLink } from "@/lib/site";
import { gsap } from "@/lib/gsap";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fondo sólido al bajar y se esconde al hacer scroll hacia abajo
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      if (!reduce) {
        gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
        gsap.fromTo(
          menu.querySelectorAll(".menu-link span"),
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.3 }
        );
        gsap.fromTo(menu.querySelectorAll(".menu-foot > *"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.06, delay: 0.55 });
      }
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="ticker" aria-label="Datos clave de TSL">
          <div className="ticker-track">
            {[0, 1].map((dup) => (
              <div className="ticker-group" key={dup} aria-hidden={dup === 1}>
                {tickerItems.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="header-bar container">
          <a href="#inicio" className="header-logo" aria-label="TSL México, inicio">
            <Logo />
          </a>

          <nav className="header-nav" aria-label="Principal">
            {nav.slice(1, 5).map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="btn btn-accent btn-sm header-cta" href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon className="ico" />
              <span>Cotizar</span>
            </a>
            <button
              className={`menu-toggle${open ? " is-open" : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span className="menu-toggle-label">{open ? "Cerrar" : "Menú"}</span>
              <span className="menu-toggle-lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={menuRef} className={`site-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="container menu-inner">
          <nav className="menu-links" aria-label="Menú">
            {nav.map((l, i) => (
              <a key={l.href} href={l.href} className="menu-link" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  {l.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="menu-foot">
            <div>
              <p className="label">Cotiza hoy</p>
              <a href={waLink()} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
                WhatsApp {contact.whatsappLabel}
              </a>
            </div>
            <div>
              <p className="label">Correo</p>
              <a href={mailLink} tabIndex={open ? 0 : -1}>
                {contact.email}
              </a>
            </div>
            <div>
              <p className="label">Teléfono</p>
              <a href={`tel:+52${contact.phone}`} tabIndex={open ? 0 : -1}>
                {contact.phoneLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
