"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { linksFor, type Content } from "@/lib/content";

type Ctx = Content & ReturnType<typeof linksFor>;

const ContentContext = createContext<Ctx | null>(null);

/** Comparte con todos los componentes el contenido leído de Sanity al construir el sitio. */
export function ContentProvider({ content, children }: { content: Content; children: ReactNode }) {
  const value = useMemo(() => ({ ...content, ...linksFor(content.contact) }), [content]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent debe usarse dentro de <ContentProvider>");
  return ctx;
}
