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
