import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import * as d from "./site";

/**
 * Contenido del sitio. Se lee de Sanity al construir (export estático) y cada campo vacío
 * o con error cae al contenido por defecto de `site.ts`, así el sitio nunca se rompe.
 */

export const sanityConfig = { projectId: "8wo5q7ky", dataset: "production", apiVersion: "2026-10-01" };

const client = createClient({ ...sanityConfig, useCdn: false, perspective: "published" });
const builder = createImageUrlBuilder(sanityConfig);

type SanityImage = { asset?: { _ref?: string } } | null | undefined;
type SanityPhoto = { image?: SanityImage; label?: string; hint?: string } | null | undefined;

const imageUrl = (img: SanityImage, width = 1600) =>
  img?.asset?._ref ? builder.image(img).width(width).auto("format").quality(80).url() : undefined;

/** Foto de Sanity → foto del sitio; sin imagen queda como espacio "Foto pendiente". */
const photo = (p: SanityPhoto, fallback: d.Photo, width?: number): d.Photo => ({
  src: imageUrl(p?.image, width) ?? fallback.src,
  label: p?.label || fallback.label,
  hint: p?.hint || fallback.hint,
});

/** Usa el valor de Sanity si trae algo; si no, el de respaldo. */
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

type HeroTexts = { lines: string[]; accentLine: number; lead: string };
const hero = (v: Partial<HeroTexts> | undefined, fb: HeroTexts): HeroTexts => ({
  lines: pick(v?.lines, fb.lines),
  accentLine: typeof v?.accentLine === "number" ? v.accentLine : fb.accentLine,
  lead: pick(v?.lead, fb.lead),
});

export const defaults = {
  contact: d.contact,
  tickerItems: d.tickerItems,
  stats: d.stats,
  legal: d.legal,
  texts: {
    heroLede: "Transporte terrestre nacional e internacional con seguimiento real y cobertura en los 32 estados de México.",
    introLead:
      "Con 15 años en el camino, TSL mueve carga general y especializada en los 32 estados de México y cruza la frontera con Estados Unidos, con un equipo asignado que responde desde la recolección hasta la entrega.",
    introLeadDim:
      "Sin intermediarios que desaparecen. Sin respuestas genéricas. Solo personas con experiencia que entienden tu operación.",
    heroServicios: {
      lines: ["Transporte", "terrestre para", "cualquier necesidad."],
      accentLine: 2,
      lead: "Carga general y especializada en los 32 estados, con la unidad correcta para cada operación y un equipo que responde por ella.",
    },
    heroCobertura: {
      lines: ["32 estados.", "Dos fronteras.", "Un solo equipo."],
      accentLine: 1,
      lead: "Flotilla propia en el Bajío, aliados en Puebla y Nuevo Laredo, y cruces a Estados Unidos por Laredo, TX y Colombia, N.L.",
    },
    heroNosotros: {
      lines: ["15 años", "moviendo la carga", "de México."],
      accentLine: 1,
      lead: "Somos TSL, Transportes y Soluciones Logísticas: una empresa mexicana con flotilla propia, equipo asignado y seguimiento real en cada servicio.",
    },
    heroContacto: {
      lines: ["Cotiza", "tu envío."],
      accentLine: 1,
      lead: "Cuéntanos origen, destino y tipo de carga. Un asesor de TSL te responde el mismo día.",
    },
    aboutQuote: "Nacimos para resolver lo que ya conoces.",
    aboutParagraphs: [
      "Retrasos que frenan tu producción, carga sin rastro y proveedores que desaparecen después de la cotización. TSL, Transportes y Soluciones Logísticas, lleva 15 años moviendo carga por todo México con una idea simple: que cada cliente sepa dónde está su carga y quién responde por ella.",
      "Hoy operamos 135 unidades desde Querétaro y San Miguel de Allende, con oficina central en Aguascalientes, aliados en Puebla y Nuevo Laredo, y cruces a Estados Unidos con certificación C-TPAT.",
    ],
  },
  problems: d.problems,
  units: d.units,
  cargo: d.cargo,
  basesDetail: d.basesDetail.map((b) => ({ ...b, photo: d.basePhotos[b.city] ?? { label: `Patio ${b.city}` } })),
  offices: d.offices,
  crossings: d.crossings,
  crossingServices: d.crossingServices,
  regions: d.regions,
  safety: d.safety,
  differentiators: d.differentiators,
  cycle: d.cycle,
  faqs: d.faqs,
  serviceModes: d.serviceModes,
  aboutValues: d.aboutValues,
  leader: d.leader,
  team: d.team,
  advisor: { src: "/img/asesora.jpg", label: "Asesora de TSL México atendiendo un servicio" } as d.Photo,
  operationPhotos: d.operationPhotos,
  unitPhotos: d.unitPhotos,
  testimonials: d.testimonials,
  clientLogos: d.clientLogos,
};

export type Content = typeof defaults & {
  /** Lista corta de ubicaciones (bases + oficinas) para mapa, pie y contacto. */
  bases: { kind: string; city: string; note: string }[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const query = `{
  "ajustes": *[_id == "ajustes"][0],
  "textos": *[_id == "textos"][0],
  "flotilla": *[_id == "flotilla"][0],
  "gente": *[_id == "gente"][0],
  "preguntas": *[_id == "preguntas"][0]
}`;

function merge(s: any): Content {
  const a = s?.ajustes ?? {};
  const t = s?.textos ?? {};
  const f = s?.flotilla ?? {};
  const g = s?.gente ?? {};
  const q = s?.preguntas ?? {};
  const dt = defaults.texts;

  const contact = { ...defaults.contact, ...Object.fromEntries(Object.entries(a.contact ?? {}).filter(([, v]) => v)) };
  const basesDetail = pick(f.basesDetail as any[], defaults.basesDetail).map((b: any, i: number) => {
    const fb = defaults.basesDetail[i] ?? defaults.basesDetail[0];
    const units = pick(b.units, fb.units) as { name: string; n: number }[];
    return {
      city: pick(b.city, fb.city),
      kind: pick(b.kind, fb.kind),
      units,
      total: units.reduce((sum, u) => sum + (u.n || 0), 0),
      photo: photo(b.photo, fb.photo, 1200),
    };
  });
  const offices = pick(f.offices, defaults.offices) as typeof defaults.offices;

  return {
    contact,
    tickerItems: pick(a.tickerItems, defaults.tickerItems),
    stats: pick(a.stats, defaults.stats),
    legal: { ...defaults.legal, ...Object.fromEntries(Object.entries(a.legal ?? {}).filter(([, v]) => v)) },
    texts: {
      heroLede: pick(t.heroLede, dt.heroLede),
      introLead: pick(t.introLead, dt.introLead),
      introLeadDim: pick(t.introLeadDim, dt.introLeadDim),
      heroServicios: hero(t.heroServicios, dt.heroServicios),
      heroCobertura: hero(t.heroCobertura, dt.heroCobertura),
      heroNosotros: hero(t.heroNosotros, dt.heroNosotros),
      heroContacto: hero(t.heroContacto, dt.heroContacto),
      aboutQuote: pick(t.aboutQuote, dt.aboutQuote),
      aboutParagraphs: pick(t.aboutParagraphs, dt.aboutParagraphs),
    },
    problems: pick(t.problems, defaults.problems),
    units: pick(f.units, defaults.units),
    cargo: pick(f.cargo, defaults.cargo),
    basesDetail,
    offices,
    crossings: pick(f.crossings, defaults.crossings),
    crossingServices: pick(f.crossingServices, defaults.crossingServices),
    regions: pick(f.regions, defaults.regions),
    safety: pick(t.safety, defaults.safety).map((x: any, i: number) => ({ ...x, tag: String(i + 1).padStart(2, "0") })),
    differentiators: pick(t.differentiators, defaults.differentiators),
    cycle: pick(t.cycle, defaults.cycle),
    faqs: pick(q.items, defaults.faqs),
    serviceModes: pick(t.serviceModes, defaults.serviceModes),
    aboutValues: pick(t.aboutValues, defaults.aboutValues),
    leader: {
      photo: photo(g.leader?.photo, defaults.leader.photo, 1000),
      quote: pick(g.leader?.quote, defaults.leader.quote),
      name: pick(g.leader?.name, defaults.leader.name),
      role: pick(g.leader?.role, defaults.leader.role),
    },
    team: pick(g.team as any[], defaults.team).map((m: any, i: number) => {
      const fb = defaults.team[i] ?? defaults.team[0];
      return { photo: photo(m.photo, fb.photo, 800), name: pick(m.name, fb.name), role: pick(m.role, fb.role) };
    }),
    advisor: photo(g.advisor, defaults.advisor, 1000),
    operationPhotos: pick(g.operationPhotos as any[], defaults.operationPhotos).map((p: any, i: number) =>
      photo(p, defaults.operationPhotos[i] ?? defaults.operationPhotos[0], 1400)
    ),
    unitPhotos: pick(f.unitPhotos as any[], defaults.unitPhotos).map((p: any, i: number) => {
      const fb = defaults.unitPhotos[i] ?? defaults.unitPhotos[0];
      return { unit: pick(p.unit, fb.unit), ...photo(p, fb, 1200) };
    }),
    testimonials: pick(g.testimonials, defaults.testimonials),
    clientLogos: pick(g.clientLogos as any[], defaults.clientLogos).map((l: any) => ({
      name: l.name ?? "",
      src: imageUrl(l.image, 400) ?? l.src,
    })),
    bases: [
      ...basesDetail.map((b) => ({ kind: b.kind, city: b.city, note: `${b.total} unidades` })),
      ...offices.map((o) => ({ kind: o.kind, city: o.city, note: o.address })),
    ],
  };
}

let cache: Promise<Content> | null = null;

/** Se llama al construir; una sola consulta a Sanity para todo el sitio. */
export function getContent(): Promise<Content> {
  cache ??= client
    .fetch(query)
    .then(merge)
    .catch((err) => {
      console.warn("[contenido] Sanity no respondió, se usa el contenido por defecto:", err?.message);
      return merge(null);
    });
  return cache;
}

/** Enlaces que dependen del contacto (también se usan en componentes de servidor). */
export const linksFor = (contact: Content["contact"]) => ({
  waLink: (msg = "Hola TSL, quiero cotizar un envío.") => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`,
  mailLink: `mailto:${contact.email}?subject=${encodeURIComponent("Cotización TSL")}`,
});
