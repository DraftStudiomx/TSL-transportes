"use client";

import { Fragment, useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const MOTION = "(prefers-reduced-motion: no-preference)";
export const MQ = {
  motion: MOTION,
  desktop: `(min-width: 900px) and ${MOTION}`,
  mobile: `(max-width: 899px) and ${MOTION}`,
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Corre animaciones GSAP con matchMedia limitado al scope; se revierten al desmontar. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (mm: gsap.MatchMedia) => void) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    setup(mm);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Tarjetas apiladas tipo archivero. Todas se quedan fijas en el mismo `top` (CSS: --stack-top) y,
 * conforme llega cada tarjeta nueva, las anteriores suben y se encogen: la inmediata anterior asoma
 * lo suficiente para leer su número (`peek`) y las más viejas quedan como pestañas delgadas (`tab`).
 */
export function stackCards(cards: HTMLElement[], { peek = 64, tab = 12, shrink = 0.04 } = {}) {
  const state = (depth: number) => ({
    y: depth <= 0 ? 0 : -(peek + tab * (depth - 1)),
    scale: 1 - shrink * Math.max(0, depth),
  });
  gsap.set(cards, { transformOrigin: "50% 0%" });
  cards.forEach((incoming, j) => {
    if (j === 0) return;
    // Mientras la tarjeta j recorre el último tramo antes de fijarse, todas las anteriores bajan un nivel
    const stackTop = () => parseFloat(getComputedStyle(incoming).top) || 0;
    const span = () => cards[j - 1].offsetHeight + parseFloat(getComputedStyle(incoming.parentElement!).rowGap || "0");
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: incoming,
        start: () => `top ${stackTop() + span()}px`,
        end: () => `top ${stackTop()}px`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    cards.slice(0, j).forEach((card, i) => {
      tl.fromTo(card, state(j - 1 - i), { ...state(j - i), immediateRender: false }, 0);
    });
  });
}

/** Separa un texto en palabras envueltas para animarlas una por una. */
export function splitWords(text: string, className = "w") {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className={className}>{word}</span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
