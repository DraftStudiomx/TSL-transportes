"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/** Botón fijo de cotización en mobile: aparece después del hero y se oculta en el footer. */
export default function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.getElementById("contacto");
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a className={`mobile-cta${show ? " is-visible" : ""}`} href={waLink()} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>
      <WhatsAppIcon className="ico" /> Cotizar por WhatsApp
    </a>
  );
}
