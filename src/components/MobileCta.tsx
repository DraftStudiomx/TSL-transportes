"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/** Botón flotante de WhatsApp en mobile: aparece después del hero y se oculta en el footer. */
export default function MobileCta() {
  const [show, setShow] = useState(false);
  const onContact = usePathname().startsWith("/contacto");

  useEffect(() => {
    const onScroll = () => {
      const footer = document.getElementById("cierre");
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // En Contacto el formulario ya tiene su botón de WhatsApp
  if (onContact) return null;

  return (
    <a
      className={`mobile-cta${show ? " is-visible" : ""}`}
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Cotizar por WhatsApp"
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon className="ico" />
    </a>
  );
}
